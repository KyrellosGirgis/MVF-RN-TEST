import CookieManager from '@react-native-cookies/cookies'

import { LOGIN_COOKIES_KEYS } from 'App/Utils/Enums'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'
import { LEGACY_BASE_URL } from 'App/Services/API/Constants'
import { getStorageMockedWebViewCookies } from 'App/Services/CookiesManager/CookiesManager.helpers'

const getStorageCookies = async () =>
  await EncryptedStorage.getItemParsedToJSON(STORAGE_KEYS.legacyCookies)

const setStorageCookies = async (storageCookies: Record<string, string>) =>
  await EncryptedStorage.setItem(
    STORAGE_KEYS.legacyCookies,
    JSON.stringify(storageCookies)
  )

const clearStorageCookies = async () => {
  await EncryptedStorage.setItem(STORAGE_KEYS.legacyCookies, JSON.stringify({}))
}

const getOSCookies = (url: string, useWebKit?: boolean | undefined) =>
  CookieManager.get(url, useWebKit)

const clearOSCookies = () =>
  Promise.all([CookieManager.clearAll(), CookieManager.clearAll(true)])

const clearOSCookiesByName = (
  url: string,
  name: string,
  useWebKit?: boolean | undefined
) => CookieManager.clearByName(url, name, useWebKit)

const clearStorageAndOSCookies = async () => {
  await exports.clearStorageCookies()
  await exports.clearOSCookies()
}

const setOrUpdateStorageCookiesFromOSCookies = async () => {
  const OSCookies = await exports.getOSCookies(LEGACY_BASE_URL)
  const storageCookies = (await exports.getStorageCookies()) ?? {}
  for (const cookieKey in OSCookies) {
    if (LOGIN_COOKIES_KEYS.includes(cookieKey)) {
      storageCookies[cookieKey] = OSCookies[cookieKey]
    }
  }

  await EncryptedStorage.setItem(
    STORAGE_KEYS.legacyCookies,
    JSON.stringify(storageCookies)
  )
}

const loadStorageCookiesToSystemForWebview = async () => {
  const OSCookies = await exports.getOSCookies(LEGACY_BASE_URL)
  const storageCookies = await exports.getStorageCookies()
  const mockedWebCookies = await getStorageMockedWebViewCookies()
  const updatedCookies = {
    ...OSCookies,
    ...storageCookies,
    ...mockedWebCookies
  }
  Object.keys(updatedCookies).forEach(async (key: string) => {
    await CookieManager.set(LEGACY_BASE_URL, {
      ...updatedCookies[key]
    })
  })
}

export {
  loadStorageCookiesToSystemForWebview,
  getStorageCookies,
  clearStorageAndOSCookies,
  setOrUpdateStorageCookiesFromOSCookies,
  clearOSCookies,
  clearStorageCookies,
  getOSCookies,
  clearOSCookiesByName,
  setStorageCookies
}
