import {
  clearLoginTokens,
  getLoginChecksFromAsyncStorage,
  setLoggedInMintUserId,
  setLoginTokens
} from 'App/Screens/Login/Implementations/Login.helper'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

describe('Test login helper functions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {})
  describe('Test setLoginTokens', () => {
    it('Test setLoginTokens with valid data', async () => {
      EncryptedStorage.setItem = jest.fn()
      await setLoginTokens('test')
      expect(EncryptedStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEYS.loginData,
        JSON.stringify('test')
      )
    })
  })

  describe('Test clearLoginTokens', () => {
    it('Test clearLoginTokens with valid data', async () => {
      EncryptedStorage.setItem = jest.fn()
      await clearLoginTokens()
      expect(EncryptedStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEYS.loginData,
        '{}'
      )
    })
  })

  describe('Test getLoginChecksFromAsyncStorage', () => {
    it('Test getLoginChecksFromAsyncStorage with valid data', async () => {
      EncryptedStorage.getBooleanWithDefault = jest.fn()
      await getLoginChecksFromAsyncStorage()
      expect(EncryptedStorage.getBooleanWithDefault).toHaveBeenCalledWith({
        isLoggedIn: false
      })
    })
  })

  describe('Test setLoggedInMintUserId', () => {
    it('Test setLoggedInMintUserId with valid id', async () => {
      EncryptedStorage.setItem = jest.fn()
      await setLoggedInMintUserId('test')
      expect(EncryptedStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEYS.loggedInMintUserId,
        String('test')
      )
    })

    it('Test setLoggedInMintUserId with invalid id', async () => {
      EncryptedStorage.setItem = jest.fn()
      await setLoggedInMintUserId()
      expect(EncryptedStorage.setItem).not.toHaveBeenCalled()
    })
  })
})
