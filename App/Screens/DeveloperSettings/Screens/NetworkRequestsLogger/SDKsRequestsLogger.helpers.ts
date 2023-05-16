import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'
import { readNetworkLogs } from 'App/Utils/RNNativeModules/networkLogs.RNNativeModules'

const setSDKsNetworkLogsInEncryptedStorage = async (key: string, data: any) => {
  const stringifiedLogs = JSON.stringify(data)
  await EncryptedStorage.setItem(key, stringifiedLogs)
}

const loadSDKsNewLogs = async () => {
  var currentNetworkLogs = await readNetworkLogs()
  const storageLogs =
    (await EncryptedStorage.getItemParsedToJSON(STORAGE_KEYS.networkLogs)) ?? []
  const allLogs = [...storageLogs, ...currentNetworkLogs]
  setSDKsNetworkLogsInEncryptedStorage(STORAGE_KEYS.networkLogs, allLogs)
  return allLogs
}

export { setSDKsNetworkLogsInEncryptedStorage, loadSDKsNewLogs }
