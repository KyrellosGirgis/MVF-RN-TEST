/* eslint-disable import/namespace */
import { Linking } from 'react-native'

import {
  initializeDeeplinksHandling,
  initNetworkRequestsLoggger,
  setAppKey
} from 'App/Services/AppLifecycleManager/helpers/executeAppBootstrapTasks.helpers'
import * as sensitiveInfoManager from 'App/Utils/SensitiveInfoManager'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import * as genericHelpers from 'App/Utils/Helpers/generic.helpers'
import * as RNNativeModules from 'App/Utils/RNNativeModules/networkLogs.RNNativeModules'
import * as deeplinksHelper from 'App/Services/Deeplinks/Deeplinks.helper'
import * as adjustManager from 'App/Services/SDKsManagment/SDKs/Adjust/AdjustManager'

describe('test executeAppBootstrapTasks helpers', () => {
  sensitiveInfoManager.setItem = jest.fn()

  it('should not set item if it already exists', async () => {
    sensitiveInfoManager.getItem = jest.fn().mockReturnValue('Item')
    await setAppKey()
    expect(sensitiveInfoManager.getItem).toHaveBeenCalled()
    expect(sensitiveInfoManager.setItem).toHaveBeenCalledTimes(0)
  })
  it('should set item if it not exists', async () => {
    sensitiveInfoManager.getItem = jest.fn()
    await setAppKey()
    expect(sensitiveInfoManager.getItem).toHaveBeenCalled()
    expect(sensitiveInfoManager.setItem).toHaveBeenCalled()
  })
  it('should start Network Requests Loggger in IOS', async () => {
    EncryptedStorage.getBoolean = jest.fn().mockReturnValue(true)
    genericHelpers.isIOS = jest.fn().mockReturnValue(true)
    RNNativeModules.startNetworkLogging = jest.fn()
    await initNetworkRequestsLoggger()
    expect(RNNativeModules.startNetworkLogging).toHaveBeenCalled()
  })

  it('should storeDeeplinkInRedux while initializing Deeplinks Handling', async () => {
    Linking.getInitialURL = jest.fn().mockReturnValue(
      new Promise((resolve, reject) => {
        resolve('https://deeplink')
      })
    )
    deeplinksHelper.storeDeeplinkInRedux = jest.fn()
    adjustManager.adjustConfig = jest.fn().mockReturnValue({})
    adjustManager.adjustConfig.setDeferredDeeplinkCallbackListener = jest.fn()
    await initializeDeeplinksHandling()
    expect(Linking.getInitialURL).toHaveBeenCalled()
    expect(deeplinksHelper.storeDeeplinkInRedux).toHaveBeenCalled()
    expect(
      adjustManager.adjustConfig.setDeferredDeeplinkCallbackListener
    ).toHaveBeenCalled()
  })
})
