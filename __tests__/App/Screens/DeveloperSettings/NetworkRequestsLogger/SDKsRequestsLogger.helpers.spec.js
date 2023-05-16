/* eslint-disable import/namespace */

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import * as SDKsRequestsLoggerHelpers from 'App/Screens/DeveloperSettings/Screens/NetworkRequestsLogger/SDKsRequestsLogger.helpers'
import * as RNNativeModules from 'App/Utils/RNNativeModules/networkLogs.RNNativeModules'

afterEach(() => {
  // restore the spy created with spyOn
  jest.restoreAllMocks()
})
describe('SDKs Requests Logger helpers Implementation', () => {
  it('test setSDKsNetworkLogsInEncryptedStorage', async () => {
    EncryptedStorage.setItem = jest.fn()

    await SDKsRequestsLoggerHelpers.setSDKsNetworkLogsInEncryptedStorage(
      'id',
      {}
    )

    expect(await EncryptedStorage.setItem).toHaveBeenCalledWith('id', '{}')
  })

  it('test loadSDKsNewLogs function', async () => {
    const arr1 = [{ id: 1 }]
    const arr2 = [{ id: 2 }]

    RNNativeModules.readNetworkLogs = jest.fn(() => arr1)
    EncryptedStorage.getItemParsedToJSON = jest.fn(() => arr2)
    EncryptedStorage.setItem = jest.fn()

    const result = await SDKsRequestsLoggerHelpers.loadSDKsNewLogs()
    expect(await EncryptedStorage.getItemParsedToJSON).toHaveBeenCalled()
    expect(await EncryptedStorage.setItem).toHaveBeenCalled()
    expect(result).toStrictEqual([...arr2, ...arr1])
  })
})
