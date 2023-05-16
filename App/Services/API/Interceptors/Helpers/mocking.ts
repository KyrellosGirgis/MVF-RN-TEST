import { AxiosRequestConfig } from 'axios'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

const mockRequestIfNeeded = async (config: AxiosRequestConfig) => {
  let mockedApi
  try {
    const { apis } = await EncryptedStorage.getItemParsedToJSON(
      STORAGE_KEYS.MOCK_OBJECT
    )
    mockedApi = apis?.[config?.apiId]
  } catch (error) {}

  return mockedApi ? { ...config, ...mockedApi } : config
}

export { mockRequestIfNeeded }
