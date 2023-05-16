/* eslint-disable import/namespace */
import React from 'react'

import { act, create } from 'react-test-renderer'
import WebView from '@vfgroup-oneplatform/framework/CommonUI/WebView/WebView'

import * as cmsHelpers from 'App/Services/StorageWrappers/CMSStorage'

import { showBlurView } from 'App/Containers/AppNavigation/AppNavigation.helpers'
import { NavigationFunctions } from 'App/Containers'

import WebViewScreen from 'App/Screens/WebViewScreen/WebViewScreen'
import * as WebViewScreenHelper from 'App/Screens/WebViewScreen/WebViewScreen.helper'

import {
  addForAppQueryParamToUrl,
  openWebView
} from 'App/Screens/WebViewScreen/WebViewScreen.helper'
import * as CookiesManagerServices from 'App/Services/CookiesManager/CookiesManager'
import { LEGACY_BASE_URL } from 'App/Services/API'
import { openExternalWebView } from 'App/Utils/Helpers/generic.helpers'
import { testID } from 'App/Utils/Helpers/testId.helpers'

const whitelistedDomainVodafone = {
  webview: {
    whitelisted_domains: ['*.vodafone.de']
  }
}
const whitelistedDomainfacebook = {
  webview: {
    whitelisted_domains: ['https://facebook.com']
  }
}

jest.mock('App/Containers/AppNavigation/NavigationFunctions', () => {
  return { navigate: jest.fn() }
})
jest.mock('App/Containers/AppNavigation/AppNavigation.helpers', () => {
  return { showBlurView: jest.fn() }
})

CookiesManagerServices.clearOSCookiesByName = jest.fn()
CookiesManagerServices.getOSCookies = jest.fn()
WebViewScreenHelper.showDebugAlertInWebIfEnabled = jest.fn()

describe('render WebViewScreen feature sucessfully', () => {
  const props = {
    navigation: {
      goBack: jest.fn()
    },
    route: {
      params: { url: LEGACY_BASE_URL }
    }
  }
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should render WebViewScreen feature screen successfully', async () => {
    WebViewScreenHelper.getInjectedJavaScriptCodeToSetCurrentlyActiveSubscription =
      jest.fn()
    let element
    CookiesManagerServices.clearAllOSCookies = jest.fn()
    CookiesManagerServices.getOSCookies = jest.fn()
    await act(async () => {
      element = create(<WebViewScreen {...props} />)
    })
    expect(element).toBeTruthy()
    expect(
      element.root.findByProps({
        testID: testID('webView')
      })
    ).toBeTruthy()

    expect(
      element.root.findByProps({
        testID: testID('webViewReloadBtn')
      })
    ).toBeTruthy()

    expect(
      element.root.findByProps({
        testID: testID('webViewCloseBtn')
      })
    ).toBeTruthy()

    const WebViewComponent = element.root.findAllByType(WebView)[0]
    expect(WebViewComponent.props.url.includes(LEGACY_BASE_URL)).toBe(true)
    expect(WebViewComponent.props.withReload).toBeTruthy()
    expect(WebViewComponent.props.withBackIcon).toBeTruthy()

    WebViewComponent.props.onMessage({
      nativeEvent: { data: 'SESSION_EXPIRED' }
    })
    expect(showBlurView).toHaveBeenCalled()
    WebViewComponent.props.onClose()
  })
  test('should render openWebView function successfully', async () => {
    cmsHelpers.getCmsItem = jest.fn(() => whitelistedDomainVodafone)
    await openWebView(LEGACY_BASE_URL)
    expect(WebViewScreenHelper.showDebugAlertInWebIfEnabled).toHaveBeenCalled()
    expect(NavigationFunctions.navigate).toHaveBeenCalledWith('WebViewScreen', {
      url: LEGACY_BASE_URL
    })
    expect(CookiesManagerServices.getOSCookies).toHaveBeenCalled()
  })
  test('openWebView should open internal webview when url is whitelisted with forApp true to open url with forApp query param', async () => {
    cmsHelpers.getCmsItem = jest.fn(() => whitelistedDomainVodafone)

    await openWebView(LEGACY_BASE_URL, true)
    expect(NavigationFunctions.navigate).toHaveBeenCalledWith('WebViewScreen', {
      url: `${LEGACY_BASE_URL}?forApp=true`
    })
    expect(CookiesManagerServices.getOSCookies).toHaveBeenCalled()
  })
  test('openWebView should open internal webview when url is whitelisted with forApp true and url has query params to have both the url query params and forApp=true ', async () => {
    cmsHelpers.getCmsItem = jest.fn(() => whitelistedDomainVodafone)
    await openWebView(`${LEGACY_BASE_URL}?someParams=true`, true)
    expect(NavigationFunctions.navigate).toHaveBeenCalledWith('WebViewScreen', {
      url: `${LEGACY_BASE_URL}?someParams=true&forApp=true`
    })
    expect(CookiesManagerServices.getOSCookies).toHaveBeenCalled()
  })

  test('openWebView should open external webview when url is not whitelisted', async () => {
    cmsHelpers.getCmsItem = jest.fn(() => whitelistedDomainfacebook)

    await openWebView(`${LEGACY_BASE_URL}?someParams=true`, true)
    expect(openExternalWebView).toBeCalled()
    expect(NavigationFunctions.navigate).not.toHaveBeenCalledWith(
      'WebViewScreen',
      {
        url: `${LEGACY_BASE_URL}?someParams=true&forApp=true`
      }
    )
    expect(CookiesManagerServices.getOSCookies).not.toHaveBeenCalled()
  })

  test('addForAppQueryParamToUrl to return url with forApp query param equal to true', () => {
    expect(addForAppQueryParamToUrl('https://www.google.com/')).toEqual(
      'https://www.google.com/?forApp=true'
    )
  })
  test('addForAppQueryParamToUrl to return url with forApp query param equal to true if the url has query params already', () => {
    expect(
      addForAppQueryParamToUrl('https://www.google.com/?someParams=true')
    ).toEqual('https://www.google.com/?someParams=true&forApp=true')
  })
})
