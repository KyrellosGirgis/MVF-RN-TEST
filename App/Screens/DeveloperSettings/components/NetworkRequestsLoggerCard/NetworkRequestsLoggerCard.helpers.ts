import {
  startNetworkLogging,
  stopNetworkLogging
} from 'App/Utils/RNNativeModules/networkLogs.RNNativeModules'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

const onNetworkLoggingToggleChange = async (shouldLogNetworkRequests) => {
  shouldLogNetworkRequests ? startNetworkLogging() : stopNetworkLogging()
  await EncryptedStorage.setBoolean(
    STORAGE_KEYS.shouldLogNetworkRequests,
    shouldLogNetworkRequests
  )
}

const getShouldLogNetworkRequests = async () => {
  return await EncryptedStorage.getBoolean(
    STORAGE_KEYS.shouldLogNetworkRequests
  )
}

export { onNetworkLoggingToggleChange, getShouldLogNetworkRequests }
