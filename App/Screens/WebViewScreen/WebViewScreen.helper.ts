import { Alert } from 'react-native'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import {
  clearOSCookiesByName,
  clearOSCookies,
  loadStorageCookiesToSystemForWebview
} from 'App/Services/CookiesManager/CookiesManager'

import { getCmsItem } from 'App/Services/StorageWrappers/CMSStorage'

import { refreshCookies } from 'App/Services/API/Interceptors/Helpers/Legacy.helpers'
import { NavigationFunctions } from 'App/Containers'
import Routes from 'App/Containers/AppNavigation/Routes'
import { LEGACY_BASE_URL } from 'App/Services/API'
import { hideBlurView } from 'App/Containers/AppNavigation/AppNavigation.helpers'
import { store } from 'App/Redux'

import { webViewOpenedActions } from 'App/Redux/reducers/WebView.reducer'
import webURLs from 'App/Services/webURLs'
import {
  getBaseURL,
  openExternalWebView
} from 'App/Utils/Helpers/generic.helpers'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'
import { UserDataServicesTypes } from 'App/Services/API/Requests/userData/userData.d'

const addForAppQueryParamToUrl = (url: String) => {
  const queryParamsSymbol = url.includes('?') ? '&' : '?'
  return `${url}${queryParamsSymbol}forApp=true`
}

const restartWebview = async () => {
  NavigationFunctions.goBack()
  await openWebView(store.getState().webViewOpened.initialURL)
  hideBlurView()
}

const openWebView = async (
  url: string,
  forApp: boolean = false,
  onClosingWebView?: Function
) => {
  const whitelistedURLs = await getWhitelistedDomains()
  if (!isURLWhiteListed(url, whitelistedURLs)) {
    openExternalWebView(url)
    return
  }
  await exports.showDebugAlertInWebIfEnabled(url)
  const baseUrl = getBaseURL(url)
  if (forApp && LEGACY_BASE_URL.includes(baseUrl)) {
    url = addForAppQueryParamToUrl(url)
  }
  await loadStorageCookiesToSystemForWebview()
  await clearOSCookiesByName(LEGACY_BASE_URL, 'forApp', true)
  NavigationFunctions.navigate(Routes.WebViewScreen, {
    url: url,
    onClosingWebView: onClosingWebView
  })
}

const resetWebView = async () => {
  await clearOSCookies()
  store.dispatch(webViewOpenedActions.setIsWebViewOpened(false))
  store.dispatch(webViewOpenedActions.setInitialURL(''))
}

const isURLWhiteListed = (redirectURL: string, whitelistedURLs: string[]) => {
  const redirectBaseURL = getBaseURL(redirectURL)
  return !!whitelistedURLs?.find((whiteListURL) =>
    redirectBaseURL.includes(whiteListURL.replace('*.', ''))
  )
}

const onCookieExpire = async () => {
  await clearOSCookies()
  await refreshCookies()
  await restartWebview()
}

const openServiceWebview = () => {
  openWebView(webURLs.serviceURL, true)
}

const getWhitelistedDomains = async () => {
  return (await getCmsItem(STORAGE_KEYS.CMS_ITEMS.WEBVIEW))?.webview
    ?.whitelisted_domains
}

const getInjectedJavaScriptCodeToSetCurrentlyActiveSubscription = (
  currentlyActiveSubscription: any
): string => {
  const contractMboId =
    currentlyActiveSubscription.type === UserDataServicesTypes.mobile
      ? currentlyActiveSubscription.contractMboId
      : currentlyActiveSubscription.id

  //we guard against the "0" alongside the other falsy values
  if (!contractMboId && !currentlyActiveSubscription.mboId) {
    return ''
  }
  //TODO to test stacks other than mobile after their web integration
  const mboIdsObject = JSON.stringify({
    key: 'mboIdsObject',
    value: {
      contract: {
        mboId: contractMboId
      },
      subscription: {
        mboId: currentlyActiveSubscription.mboId
      }
    }
  })

  const idlenessObject = JSON.stringify({
    key: 'idleness',
    value: new Date()
  })

  return `localStorage.setItem("ecare-LocalStore.data.mboIdsObject",JSON.stringify(${mboIdsObject}));
    localStorage.setItem("ecare-LocalStore.data.idleness", JSON.stringify(${idlenessObject}));`
}

const showDebugAlertInWebIfEnabled = async (url: string) => {
  const shouldDebugWeb = await EncryptedStorage.getBoolean(
    STORAGE_KEYS.shouldDebugWebView
  )
  shouldDebugWeb && Alert.alert(url)
}
export {
  openWebView,
  addForAppQueryParamToUrl,
  restartWebview,
  resetWebView,
  onCookieExpire,
  isURLWhiteListed,
  openServiceWebview,
  getWhitelistedDomains,
  getInjectedJavaScriptCodeToSetCurrentlyActiveSubscription,
  showDebugAlertInWebIfEnabled
}
