/* eslint-disable import/namespace */
import { Alert } from 'react-native'

import * as WebViewScreenHelper from 'App/Screens/WebViewScreen/WebViewScreen.helper'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

describe('test the functionality of getInjectedJavaScriptCodeToSetCurrentlyActiveSubscription', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date('2020-01-01'))
  })

  test('should return the total mboIdsObject when called with mobile subscription', () => {
    const mobileSubscription = {
      type: 'mobile',
      contractMboId: '123456',
      mboId: '78910'
    }

    const returnValue = `localStorage.setItem("ecare-LocalStore.data.mboIdsObject",JSON.stringify({"key":"mboIdsObject","value":{"contract":{"mboId":"123456"},"subscription":{"mboId":"78910"}}}));
    localStorage.setItem("ecare-LocalStore.data.idleness", JSON.stringify({"key":"idleness","value":"2020-01-01T00:00:00.000Z"}));`

    expect(
      WebViewScreenHelper.getInjectedJavaScriptCodeToSetCurrentlyActiveSubscription(
        mobileSubscription
      )
    ).toEqual(returnValue)
  })
  test('should return empty string when called with subscription has no contract mboId nor subscription mboId', () => {
    const mobileSubscription = {
      type: 'mobile'
    }

    expect(
      WebViewScreenHelper.getInjectedJavaScriptCodeToSetCurrentlyActiveSubscription(
        mobileSubscription
      )
    ).toEqual('')
  })

  test('should return mboIdsObject with empty subscription object if the subscription has no mboId', () => {
    const mobileSubscription = {
      type: 'mobile',
      contractMboId: '123456'
    }

    const returnValue = `localStorage.setItem("ecare-LocalStore.data.mboIdsObject",JSON.stringify({"key":"mboIdsObject","value":{"contract":{"mboId":"123456"},"subscription":{}}}));
    localStorage.setItem("ecare-LocalStore.data.idleness", JSON.stringify({"key":"idleness","value":"2020-01-01T00:00:00.000Z"}));`

    expect(
      WebViewScreenHelper.getInjectedJavaScriptCodeToSetCurrentlyActiveSubscription(
        mobileSubscription
      )
    ).toEqual(returnValue)
  })

  test('showDebugAlertInWebIfEnabled should show alert if shouldDebugWebView = true ', async () => {
    jest.useRealTimers()
    Alert.alert = jest.fn()
    EncryptedStorage.getBoolean = jest.fn(() => true)
    await WebViewScreenHelper.showDebugAlertInWebIfEnabled('url')
    expect(EncryptedStorage.getBoolean).toHaveBeenCalledWith(
      STORAGE_KEYS.shouldDebugWebView
    )
    expect(Alert.alert).toHaveBeenCalledWith('url')
  })

  test('showDebugAlertInWebIfEnabled should NOT show alert if shouldDebugWebView = false ', async () => {
    jest.useRealTimers()
    Alert.alert = jest.fn()
    EncryptedStorage.getBoolean = jest.fn(() => false)
    await WebViewScreenHelper.showDebugAlertInWebIfEnabled('url')
    expect(EncryptedStorage.getBoolean).toHaveBeenCalledWith(
      STORAGE_KEYS.shouldDebugWebView
    )
    expect(Alert.alert).not.toHaveBeenCalled()
  })
})
