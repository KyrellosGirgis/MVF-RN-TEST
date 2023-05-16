/* eslint-disable import/namespace */
import * as CMS from 'App/Services/API/Requests/CMS/CMS'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import { saveAndApplyCmsConfigs } from 'App/Screens/DeveloperSettings/components/CMSConfigsCard/CMSConfigsCard.helpers'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

describe('Test CMS Configs Card helper functions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {
    EncryptedStorage.setItem = jest.fn()
    CMS.loadRemoteCMSSync = jest.fn()
  })

  it('should load cms and save url in encrypted storage when mocked and the url is valid', async () => {
    const cmsMockeUrl = 'Test'

    await saveAndApplyCmsConfigs(cmsMockeUrl)

    expect(CMS.loadRemoteCMSSync).toHaveBeenCalledWith(cmsMockeUrl)
    expect(EncryptedStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.mockedCMSRootURL,
      cmsMockeUrl
    )
  })

  it('should load cms and clear mocked url from encrypted storage when it is not mocked', async () => {
    await saveAndApplyCmsConfigs('')

    expect(EncryptedStorage.removeItem).toHaveBeenCalledWith(
      STORAGE_KEYS.mockedCMSRootURL
    )
  })

  it('should throw error when loadRemoteCMSSync failed to load all items ', async () => {
    CMS.loadRemoteCMSSync = jest.fn(() => Promise.reject())
    const cmsMockeUrl = 'Test'
    await expect(saveAndApplyCmsConfigs(cmsMockeUrl)).rejects.toEqual(
      Error("Couldn't load CMS files")
    )

    expect(CMS.loadRemoteCMSSync).toHaveBeenCalledWith(cmsMockeUrl)
    expect(EncryptedStorage.setItem).not.toHaveBeenCalledWith(
      STORAGE_KEYS.mockedCMSRootURL,
      cmsMockeUrl
    )
  })
})
