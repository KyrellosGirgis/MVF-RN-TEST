/* eslint-disable import/namespace */
import CookieManager from '@react-native-cookies/cookies'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import * as CookiesManagerService from 'App/Services/CookiesManager/CookiesManager'
import * as CookiesManagerHelpers from 'App/Services/CookiesManager/CookiesManager.helpers'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

describe('CookiesManager', () => {
  EncryptedStorage.getItem = jest.fn().mockReturnValue('forApp=true;version=1')
  EncryptedStorage.getItemParsedToJSON = jest
    .fn()
    .mockReturnValue({ version: { name: 'version', value: '1' } })

  const { loadStorageCookiesToSystemForWebview, getStorageCookies } =
    CookiesManagerService

  describe('getStorageCookies', () => {
    it('should call EncryptedStorage.getItemParsedToJSON function with mockedWebCookies param', async () => {
      const legacyCookies = await getStorageCookies()
      expect(EncryptedStorage.getItemParsedToJSON).toHaveBeenCalled()

      expect(legacyCookies).toStrictEqual({
        version: { name: 'version', value: '1' }
      })
    })
  })
  describe('loadStorageCookiesToSystemForWebview', () => {
    CookieManager.get = jest
      .fn()
      .mockReturnValue({ forApp: { name: 'forApp', value: 'true' } })
    CookieManager.set = jest.fn()

    CookiesManagerService.getStorageCookies = jest.fn().mockReturnValue({
      version: { name: 'version', value: '1' }
    })

    CookiesManagerHelpers.getStorageMockedWebViewCookies = jest
      .fn()
      .mockReturnValue({ header: { name: 'header', value: 'false' } })

    it('should call (cookieManager.get, getStorageCookies, parseCookiesFromString, getStorageMockedWebCookies, mapFromCookieJSONToCookieManagerObject)', async () => {
      await loadStorageCookiesToSystemForWebview()
      expect(CookieManager.get).toHaveBeenCalled()
      expect(CookiesManagerService.getStorageCookies).toHaveBeenCalled()
      expect(
        CookiesManagerHelpers.getStorageMockedWebViewCookies
      ).toHaveBeenCalled()

      expect(CookieManager.set.mock.calls[0][0]).toStrictEqual(
        'https://www.vodafone.de'
      )
      expect(CookieManager.set.mock.calls[0][1]).toStrictEqual({
        name: 'forApp',
        value: 'true'
      })

      expect(CookieManager.set.mock.calls[1][0]).toStrictEqual(
        'https://www.vodafone.de'
      )
      expect(CookieManager.set.mock.calls[1][1]).toStrictEqual({
        name: 'version',
        value: '1'
      })
      expect(CookieManager.set.mock.calls[2][0]).toStrictEqual(
        'https://www.vodafone.de'
      )
      expect(CookieManager.set.mock.calls[2][1]).toStrictEqual({
        name: 'header',
        value: 'false'
      })
    })
  })

  it('clears all the cookies in the key chain from the OS', async () => {
    CookieManager.clearOSCookiesByName = jest.fn()
    CookiesManagerService.getStorageCookies = jest.fn(() => {
      return { mint: {}, 'mint-sso-token': {}, 'mint-session-id': {} }
    })
    await CookiesManagerService.clearOSCookies()
    expect(CookieManager.clearAll).toHaveBeenCalled()
    expect(CookieManager.clearAll).toHaveBeenCalledWith(true)
  })

  it('gets the cookies from OS then updates the keychain with it', async () => {
    CookieManager.get = jest.fn(() => {
      return { mint: '1', 'mint-session-id': '2' }
    })
    CookiesManagerService.getStorageCookies = jest.fn(() => {
      return { mint: '5', CSID: '3' }
    })
    CookiesManagerService.setStorageCookies = jest.fn()
    await CookiesManagerService.setOrUpdateStorageCookiesFromOSCookies()
    expect(CookieManager.get).toHaveBeenCalled()
    expect(CookiesManagerService.getStorageCookies).toHaveBeenCalled()
    expect(EncryptedStorage.setItem.mock.calls[0][0]).toBe('legacyCookies')
    expect(EncryptedStorage.setItem.mock.calls[0][1]).toStrictEqual(
      JSON.stringify({ mint: '1', CSID: '3', 'mint-session-id': '2' })
    )
  })

  describe('clearStorageCookies', () => {
    it('Test clearStorageCookies with valid data', async () => {
      EncryptedStorage.setItem = jest.fn()
      await CookiesManagerService.clearStorageCookies()
      expect(EncryptedStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEYS.legacyCookies,
        '{}'
      )
    })
  })
})
