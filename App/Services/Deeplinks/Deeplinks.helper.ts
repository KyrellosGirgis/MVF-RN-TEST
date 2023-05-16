import { AdjustUri } from 'react-native-adjust'

import {
  ADJUST_RAW_UNIVERSAL_LINK,
  MEINVODAFONE_UNIVERSAL_LINK
} from './Deeplinks.constants'

import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

import { getCmsItem } from 'App/Services/StorageWrappers/CMSStorage'

import Routes, { DEEPLINKS_SCREENS } from 'App/Containers/AppNavigation/Routes'
import { NavigationFunctions } from 'App/Containers'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import { store } from 'App/Redux'
import { appActions } from 'App/Redux/reducers/AppReducer/app.reducer'
import { openWebView } from 'App/Screens/WebViewScreen/WebViewScreen.helper'
import { parseParamsFromURL } from 'App/Utils/Helpers/string.helpers'

type DeeplinkScreen = {
  screenId: string
  deeplinkSchemes: string[]
}

type DeeplinksConfiguration = {
  deeplinkScreens: DeeplinkScreen[]
}

const DeeplinksConfig: DeeplinksConfiguration = {
  deeplinkScreens: [
    {
      screenId: 'home',
      deeplinkSchemes: ['mvf://home']
    }
  ]
}

const getSupportedDeeplinks = async () => {
  const supportedDeeplinks: DeeplinksConfiguration = await getCmsItem(
    STORAGE_KEYS.CMS_ITEMS.DEEPLINKS
  )

  return supportedDeeplinks || DeeplinksConfig
}

const getScreenId = async (deeplinkUrl: string) => {
  const supportedDeeplinks = await getSupportedDeeplinks()
  const filteredDeepLinkScreens = supportedDeeplinks.deeplinkScreens.find(
    (screen) => screen.deeplinkSchemes.some((scheme) => deeplinkUrl === scheme)
  )
  return filteredDeepLinkScreens?.screenId
}

const getTargetScreenForDeeplinkUrl = async (deeplinkUrl: string) => {
  const [urlWithoutParams] = deeplinkUrl.split('?')
  const screenId = (await getScreenId(urlWithoutParams)) || ''
  const screenName = DEEPLINKS_SCREENS[screenId]
  const params = {
    ...parseParamsFromURL(deeplinkUrl),
    deepLinkScreenName: screenId
  }
  return screenName ? { screenName, params } : undefined
}

const convertToUniversalLinkIfAdjustRawURL = (deeplinkUrl: string) => {
  const convertedUrl = deeplinkUrl.replace(
    ADJUST_RAW_UNIVERSAL_LINK,
    MEINVODAFONE_UNIVERSAL_LINK
  )
  return convertedUrl
}

const handleDeepLinkNavigation = async (
  deeplinkUrl: string | undefined,
  setCurrentScreenName?: Function
) => {
  store.dispatch(appActions.setDeeplinkUrl(undefined))

  if (!deeplinkUrl) {
    return
  }

  const convertedUrl = convertToUniversalLinkIfAdjustRawURL(deeplinkUrl)

  const { screenName, params } =
    (await getTargetScreenForDeeplinkUrl(convertedUrl)) || {}

  if (!screenName) {
    openWebView(convertedUrl)
    return
  }

  setCurrentScreenName?.(screenName)
  const navigationFunction =
    screenName === Routes.HomeScreen
      ? NavigationFunctions.navigate
      : NavigationFunctions.push

  navigationFunction(screenName, {
    openedFromDeeplink: true,
    deeplinkParams: params
  })
}

const handleDeeplinkingWhenAppIsOpened = async (deeplinkUrl: string) => {
  const isOnboardingFinished = await EncryptedStorage.getBoolean(
    STORAGE_KEYS.isOnboardingFinished
  )
  if (isOnboardingFinished) {
    await handleDeepLinkNavigation(deeplinkUrl)
  } else {
    storeDeeplinkInRedux(deeplinkUrl)
  }
}

//  Saving deeplink in redux to handle it in the target screen (internal deferred deeplink)
const storeDeeplinkInRedux = (url: string | null | AdjustUri) =>
  store.dispatch(appActions.setDeeplinkUrl(url))

export {
  handleDeepLinkNavigation,
  handleDeeplinkingWhenAppIsOpened,
  storeDeeplinkInRedux
}
