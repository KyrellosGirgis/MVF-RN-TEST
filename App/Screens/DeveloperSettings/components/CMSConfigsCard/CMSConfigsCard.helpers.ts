import { loadRemoteCMSSync } from 'App/Services/API/Requests/CMS/CMS'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

const saveAndApplyCmsConfigs = async (cmsUrl: string) => {
  if (!cmsUrl) {
    await EncryptedStorage.removeItem(STORAGE_KEYS.mockedCMSRootURL)
    return
  }

  try {
    await loadRemoteCMSSync(cmsUrl)
    await EncryptedStorage.setItem(STORAGE_KEYS.mockedCMSRootURL, cmsUrl)
  } catch (error) {
    throw Error("Couldn't load CMS files")
  }
}

export { saveAndApplyCmsConfigs }
