import React, { createRef, useEffect, useState } from 'react'
import WebView from '@vfgroup-oneplatform/framework/CommonUI/WebView/WebView'

import { withTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { NativeSyntheticEvent } from 'react-native'

import { WebViewNavigation } from 'react-native-webview'

import { store } from 'App/Redux'
import { webViewOpenedActions } from 'App/Redux/reducers/WebView.reducer'
import {
  getInjectedJavaScriptCodeToSetCurrentlyActiveSubscription,
  getWhitelistedDomains,
  isURLWhiteListed,
  onCookieExpire,
  resetWebView
} from 'App/Screens/WebViewScreen/WebViewScreen.helper'
import { useBackHandler } from 'App/Hooks'
import { showBlurView } from 'App/Containers/AppNavigation/AppNavigation.helpers'
import { isIOS, openExternalWebView } from 'App/Utils/Helpers/generic.helpers'

type WebViewScreenProps = { navigation: object; route: object }

const WebViewScreen = (props: WebViewScreenProps) => {
  const webViewRef = createRef<WebView>()
  const { navigation, route } = props
  const { url, onClosingWebView } = route.params
  const [whitelistedURLs, setWhitelistedURLs] = useState([])

  const { currentlyActiveSubscription } = store.getState().appUserData

  const loadWhitelistedDomains = async () => {
    setWhitelistedURLs(await getWhitelistedDomains())
  }

  useEffect(() => {
    store.dispatch(webViewOpenedActions.setIsWebViewOpened(true))
    store.dispatch(webViewOpenedActions.setInitialURL(url))
    loadWhitelistedDomains()
  }, [])

  const onMessage = async (event: NativeSyntheticEvent<any>) => {
    if (event.nativeEvent.data === 'SESSION_EXPIRED') {
      showBlurView({ opacity: 0.8, showSpinner: true })
      try {
        await onCookieExpire()
      } catch (error) {}
    }
  }

  const onClose = async () => {
    await resetWebView()
    onClosingWebView?.()
    navigation.goBack()
  }

  useBackHandler(() => {
    onClose()
    return true
  })

  const onShouldStartLoadWithRequest = (event: WebViewNavigation) => {
    if (!isURLWhiteListed(event.url, whitelistedURLs)) {
      openExternalWebView(event.url)
      return false
    }
    return true
  }

  return (
    <WebView
      ref={webViewRef}
      url={url}
      onMessage={onMessage}
      sharedCookiesEnabled={true}
      onClose={onClose}
      navigation={navigation}
      mediaPlaybackRequiresUserAction={true}
      originWhitelist={whitelistedURLs}
      setSupportMultipleWindows={false}
      onShouldStartLoadWithRequest={
        !isIOS ? onShouldStartLoadWithRequest : undefined
      }
      injectedJavaScriptBeforeContentLoaded={getInjectedJavaScriptCodeToSetCurrentlyActiveSubscription(
        currentlyActiveSubscription
      )}
    />
  )
}
export default withTheme(WebViewScreen)
