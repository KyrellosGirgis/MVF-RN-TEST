/* eslint-disable import/namespace */

import * as CookiesManagerHelpers from 'App/Services/CookiesManager/CookiesManager.helpers'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import * as CookiesManagerService from 'App/Services/CookiesManager/CookiesManager'

describe('CookiesManager helpers', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  EncryptedStorage.getItemParsedToJSON = jest
    .fn()
    .mockReturnValue({ version: { name: 'version', value: '1' } })
  const {
    getStorageMockedWebViewCookies,
    mapFromCookieJSONToCookieManagerObject,
    mapFromCookieManagerObjectToString,
    setStorageMockedWebViewCookies
  } = CookiesManagerHelpers

  describe('getStorageMockedWebCookies', () => {
    it('should call EncryptedStorage.getItemParsedToJSON function with mockedWebCookies param', async () => {
      const webCookies = await getStorageMockedWebViewCookies()
      expect(EncryptedStorage.getItemParsedToJSON).toHaveBeenCalledWith(
        'mockedWebCookies'
      )
      expect(webCookies).toEqual({ version: { name: 'version', value: '1' } })
    })
  })

  describe('setStorageMockedWebCookies', () => {
    it('should call EncryptedStorage.setObject function with mockedWebCookies value', async () => {
      await setStorageMockedWebViewCookies({
        version: { name: 'version', value: '1' }
      })
      expect(EncryptedStorage.setObject.mock.calls[0][0]).toBe(
        'mockedWebCookies'
      )
      expect(EncryptedStorage.setObject.mock.calls[0][1]).toStrictEqual({
        version: { name: 'version', value: '1' }
      })
    })
  })

  describe('mapFromCookieJSONToCookieManagerObject', () => {
    test('should return cookieManagerSchema to save it by cookieManager in the system', () => {
      const generatedSchema = mapFromCookieJSONToCookieManagerObject({
        forApp: 'true',
        version: '1'
      })

      const expectedSchema = {
        forApp: { name: 'forApp', value: 'true' },
        version: { name: 'version', value: '1' }
      }

      expect(generatedSchema).toStrictEqual(expectedSchema)
    })
  })

  describe('mapFromCookieManagerObjectToString', () => {
    it('should return empty string if i passed null value', () => {
      const mappedCookiesString = mapFromCookieManagerObjectToString(null)
      expect(mappedCookiesString).toBe('')
    })

    it('should return empty string if i passed empty object {}', () => {
      const mappedCookiesString = mapFromCookieManagerObjectToString({})
      expect(mappedCookiesString).toBe('')
    })

    it('should return string mapped from passed object param keys and values', () => {
      const mappedCookiesString = mapFromCookieManagerObjectToString({
        forApp: { name: 'forApp', value: 'true' },
        age: { name: 'age', value: '30' }
      })
      expect(mappedCookiesString).toBe('forApp=true;age=30;')
    })
  })

  describe('getStorageCookiesAsString', () => {
    it('should call getStorageCookies and covert the cookies top string', async () => {
      CookiesManagerService.getStorageCookies = jest.fn(() => {
        return { mint: { name: 'mint', value: '1234' } }
      })
      expect(await CookiesManagerHelpers.getStorageCookiesAsString()).toBe(
        'mint=1234; '
      )
      expect(CookiesManagerService.getStorageCookies).toHaveBeenCalled()
    })
  })

  describe('injectStorageCookiesInRequestHeader', () => {
    it('should call getStorageCookieString in injectStorageCookiesInRequestHeader', async () => {
      CookiesManagerHelpers.getStorageCookiesAsString = jest.fn(() => '')
      expect(
        await CookiesManagerHelpers.injectStorageCookiesInRequestHeader({})
      ).toMatchObject({
        headers: { Cookie: '' }
      })
      expect(CookiesManagerHelpers.getStorageCookiesAsString).toHaveBeenCalled()
    })
  })
})
