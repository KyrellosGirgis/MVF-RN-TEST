import { getStorageCookies } from './CookiesManager'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

// all cookies values stored in the secure storage is formatted with "@react-native-cookies/cookies" library format
// {key: {name: key, version: value}} this the library format
const mapFromCookieJSONToCookieManagerObject = (
  cookieObject: Record<string, string>
) => {
  return Object.keys(cookieObject).reduce(
    (acc: Record<string, { [key: string]: string }>, key) => {
      acc[key] = { name: key, value: cookieObject[key] }
      return acc
    },
    {}
  )
}

const mapFromCookieManagerObjectToString = (
  cookieManagerObj: Record<string, { [key: string]: string }> = {}
) => {
  if (!cookieManagerObj) {
    return ''
  }
  return Object.keys(cookieManagerObj).reduce((acc: string, key) => {
    acc += `${key}=${cookieManagerObj[key].value};`
    return acc
  }, '')
}

const getStorageCookiesAsString = async () => {
  const storageCookies = await getStorageCookies()
  let cookieStr = ''
  for (const cookieKey in storageCookies) {
    cookieStr += `${cookieKey}=${storageCookies?.[cookieKey].value}; `
  }
  return cookieStr
}

//apply Login cookies to os to be used by the request
const injectStorageCookiesInRequestHeader = async (config: any) => {
  const cookieStr = await exports.getStorageCookiesAsString()
  config.headers = { ...config?.headers, Cookie: cookieStr }
  return config
}

const getStorageMockedWebViewCookies = async () => {
  return await EncryptedStorage.getItemParsedToJSON(
    STORAGE_KEYS.mockedWebCookies
  )
}

const setStorageMockedWebViewCookies = async (
  mockedWebCookies: Record<
    string,
    {
      [key: string]: string
    }
  >
) => {
  await EncryptedStorage.setObject(
    STORAGE_KEYS.mockedWebCookies,
    mockedWebCookies
  )
}

export {
  mapFromCookieJSONToCookieManagerObject,
  mapFromCookieManagerObjectToString,
  getStorageCookiesAsString,
  injectStorageCookiesInRequestHeader,
  getStorageMockedWebViewCookies,
  setStorageMockedWebViewCookies
}
