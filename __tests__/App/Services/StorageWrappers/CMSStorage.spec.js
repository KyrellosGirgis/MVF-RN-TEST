import { CMSTypes } from 'App/Services/API/Requests/CMS/CMS.constants'
import {
  clearCmsItem,
  clearTempCmsItem,
  getBundleCmsItem,
  getCmsItem,
  getTempCmsItem,
  setCmsItem,
  setTempCmsItem
} from 'App/Services/StorageWrappers/CMSStorage'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import * as BundleCms from 'CMS/index'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

describe('Test CMSStorage functions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {})

  describe('Test getCmsItem', () => {
    it('should get default cms item from the encrypted storage', async () => {
      EncryptedStorage.getItem = jest.fn(() => undefined)
      EncryptedStorage.getItemParsedToJSON = jest.fn()
      await getCmsItem('Test')
      expect(EncryptedStorage.getItem).toHaveBeenCalledWith(
        STORAGE_KEYS.mockedCMSRootURL
      )
      expect(EncryptedStorage.getItemParsedToJSON).toHaveBeenCalledWith(
        `${CMSTypes.CMS_DEFAULT_KEY}Test`
      )
    })

    it('should get mocked cms item from the encrypted storage', async () => {
      EncryptedStorage.getItem = jest.fn(() => 'test')
      EncryptedStorage.getItemParsedToJSON = jest.fn()
      await getCmsItem('Test')
      expect(EncryptedStorage.getItem).toHaveBeenCalledWith(
        STORAGE_KEYS.mockedCMSRootURL
      )
      expect(EncryptedStorage.getItemParsedToJSON).toHaveBeenCalledWith(
        `${CMSTypes.CMS_MOCK_KEY}Test`
      )
    })
  })

  describe('Test getTempCmsItem', () => {
    it('should get temp cms item from the encrypted storage', async () => {
      EncryptedStorage.getItemParsedToJSON = jest.fn()
      await getTempCmsItem('Test', 'Test Data')
      expect(EncryptedStorage.getItemParsedToJSON).toHaveBeenCalledWith(
        `${CMSTypes.CMS_TEMP_KEY}Test`
      )
    })
  })

  describe('Test getBundleCmsItem', () => {
    it('should get root cms item from the bundle', async () => {
      const expected = await getBundleCmsItem('root')
      const actual = BundleCms.root
      expect(expected).toEqual(actual)
    })
    it('should get features cms item from the bundle', async () => {
      const expected = await getBundleCmsItem('features')
      const actual = BundleCms.features
      expect(expected).toEqual(actual)
    })
    it('should get internationalisation cms item from the bundle', async () => {
      const expected = await getBundleCmsItem('internationalisation')
      const actual = BundleCms.internationalisation
      expect(expected).toEqual(actual)
    })
    it('should get deeplinks cms item from the bundle', async () => {
      const expected = await getBundleCmsItem('deeplinks')
      const actual = BundleCms.deeplinks
      expect(expected).toEqual(actual)
    })
    it('should get privacy cms item from the bundle', async () => {
      const expected = await getBundleCmsItem('privacy')
      const actual = BundleCms.privacy
      expect(expected).toEqual(actual)
    })
    it('should get webview cms item from the bundle', async () => {
      const expected = await getBundleCmsItem('webview')
      const actual = BundleCms.webview
      expect(expected).toEqual(actual)
    })
    it('should get internationalisation_de_DE cms item from the bundle', async () => {
      const expected = await getBundleCmsItem('internationalisation_de_DE')
      const actual = BundleCms.internationalisation_de_DE
      expect(expected).toEqual(actual)
    })

    it('should get internationalisation_en_GB cms item from the bundle', async () => {
      const expected = await getBundleCmsItem('internationalisation_en_GB')
      const actual = BundleCms.internationalisation_en_GB
      expect(expected).toEqual(actual)
    })

    it('should not get cms item from the bundle with wrong id', async () => {
      const expected = await getBundleCmsItem('test')
      const actual = BundleCms.webview
      expect(expected).not.toEqual(actual)
    })
  })

  describe('Test setCmsItem', () => {
    it('should set cms item in the encrypted storage', async () => {
      EncryptedStorage.setObject = jest.fn()
      await setCmsItem('Test', 'Test Data')
      expect(EncryptedStorage.setObject).toHaveBeenCalledWith(
        `${CMSTypes.CMS_DEFAULT_KEY}Test`,
        'Test Data'
      )
    })
  })

  describe('Test setTempCmsItem', () => {
    it('should set temp cms item in the encrypted storage', async () => {
      EncryptedStorage.setObject = jest.fn()
      await setTempCmsItem('Test', 'Test Data')
      expect(EncryptedStorage.setObject).toHaveBeenCalledWith(
        `${CMSTypes.CMS_TEMP_KEY}Test`,
        'Test Data'
      )
    })

    it('should set mocked cms item in the encrypted storage', async () => {
      EncryptedStorage.setObject = jest.fn()
      await setTempCmsItem('Test', 'Test Data', true)
      expect(EncryptedStorage.setObject).toHaveBeenCalledWith(
        `${CMSTypes.CMS_MOCK_KEY}Test`,
        'Test Data'
      )
    })
  })

  describe('Test clearCmsItem', () => {
    it('should clear cms item from the encrypted storage', async () => {
      EncryptedStorage.removeItem = jest.fn()
      await clearCmsItem('Test')
      expect(EncryptedStorage.removeItem).toHaveBeenCalledWith(
        `${CMSTypes.CMS_DEFAULT_KEY}Test`
      )
    })
  })

  describe('Test clearTempCmsItem', () => {
    it('should clear temp cms item from the encrypted storage', async () => {
      EncryptedStorage.removeItem = jest.fn()
      await clearTempCmsItem('Test')
      expect(EncryptedStorage.removeItem).toHaveBeenCalledWith(
        `${CMSTypes.CMS_TEMP_KEY}Test`
      )
    })
  })
})
