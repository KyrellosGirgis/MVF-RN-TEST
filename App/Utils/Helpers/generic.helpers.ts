import {
  StatusBar,
  BackHandler,
  Platform,
  Linking,
  Dimensions
} from 'react-native'
/* eslint-disable no-unused-vars */
import { LoginStatuses as Status } from '@vfgroup-oneplatform/login'
import { get as _get, isEqual as _isEqual } from 'lodash'
import I18n from 'i18n-js'
import Moment from 'moment'
import NetInfo from '@react-native-community/netinfo'

import { sha256 } from 'js-sha256'

import { closeAppOnBackRoutes } from 'App/Containers/AppNavigation/Routes'
import { AppNavRef } from 'App/Containers/AppNavigation/AppNavigation'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

const isIOS = Platform.OS === 'ios'

const errorObjectConstructor = (error: Object, defaultError: Object) => {
  const errorResponse = _get(error, 'response.data', undefined)
  return errorResponse
    ? {
        status: Status.Failed,
        errorMessage: errorResponse.error,
        subErrorMessage: errorResponse.error_description
      }
    : defaultError
}

const translate = (text: string, options: Object = {}) => {
  return text ? I18n.t(text, options) : ''
}

const getCurrentScreenName = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(AppNavRef?.getCurrentRoute?.().name ?? '')
    }, 0)
  })
}

const getLastScreenName = () => {
  const state = AppNavRef?.getState?.()
  return state?.routes?.[state?.index - 1]?.name
}

const androidBackHandler = () => {
  const currentRouteName = AppNavRef?.getCurrentRoute?.().name ?? ''
  if (closeAppOnBackRoutes.includes(currentRouteName)) {
    BackHandler.exitApp()
    return true
  }
  return false
}

const includesObject = (arr: Object[], obj: Object) =>
  arr.some((item) => _isEqual(item, obj))

const getPathFromUrl = (url: string) => url?.split('?')[0]

const getTimeDifferenceFromNow = (time) =>
  Moment.duration(Moment().diff(time)).asMinutes()

const openExternalWebView = (url: string) => Linking.openURL(url)

const isDeviceConnectedToNetwork = async () =>
  await (
    await NetInfo.fetch()
  ).isConnected

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

const convertArrayToObject = (array, key) => {
  const initialValue = {}
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item
    }
  }, initialValue)
}

const stringify = JSON.stringify

const removeKeysFromObject = (dataSource: Object, keys: String[]) => {
  keys.forEach((key) => {
    delete dataSource?.[key]
  })
}

const replaceCountryCodeInMSISDN = (msisdn: string) => {
  return removeCountryCode(msisdn, '49', '0')
}

const removeCountryCode = (
  msisdn: string,
  countryCode: string,
  replaced: string
) => {
  const regex = new RegExp(`^(\\+?${countryCode})([0-9]{8,16})`)
  const match = msisdn.match(regex)
  return match ? msisdn?.replace(match[1], replaced) : msisdn
}

const isDE = () => Moment().locale() === 'de'

const getBaseURL = (url: string) => {
  return /([a-zA-Z-0-9]+[^www.](\.[a-zA-Z]+)+)/.exec(url)?.[0] || ''
}

const getHashedMintUserId = async () => {
  const loggedInMintUserId = await EncryptedStorage.getItemParsedToJSON(
    STORAGE_KEYS.loggedInMintUserId
  )
  return sha256(loggedInMintUserId.toString())
}

const nameOfObjectKey = <T>(
  obj: T,
  expression: (x: { [prop in keyof T]: () => string }) => () => string
) => {
  const res = {} as {
    [prop in keyof T]: () => string
  }
  Object.keys(obj).map((k) => (res[k as keyof T] = () => k))
  return expression(res)()
}

const screenHeight =
  Dimensions.get('window').height + (StatusBar.currentHeight ?? 0)

export {
  errorObjectConstructor,
  translate,
  includesObject,
  androidBackHandler,
  getCurrentScreenName,
  getPathFromUrl,
  isIOS,
  getTimeDifferenceFromNow,
  openExternalWebView,
  isDeviceConnectedToNetwork,
  delay,
  convertArrayToObject,
  stringify,
  removeKeysFromObject,
  replaceCountryCodeInMSISDN,
  isDE,
  getBaseURL,
  getHashedMintUserId,
  nameOfObjectKey,
  screenHeight,
  getLastScreenName
}
