import { Platform } from 'react-native'
import DeviceInfo from 'react-native-device-info'

import { DXL_BASE_URL, LEGACY_BASE_URL } from 'App/Services/API'

import { LEGACY_URL_TYPES, API_TYPES } from 'App/Utils/Enums'
import { ApiRoutes } from 'App/Services'

import { deviceLanguage } from 'App/Utils/RNNativeModules/internationalization.RNNativeModules'

import { API_KEY } from 'App/Services/Keys/Keys.helper'

const getCommonHeaders = () => {
  return {
    'x-vf-rep-os': Platform.OS,
    'x-vf-rep-osv': DeviceInfo.getSystemVersion(),
    'x-vf-rep-appv': DeviceInfo.getVersion(),
    'Accept-Language': deviceLanguage
  }
}

const getCommonNonMintHeaders = (isLegacyBase: boolean) => {
  return {
    ...getCommonHeaders(),
    Accept: 'application/json',
    'x-vf-api': Math.ceil(new Date().getTime() / 1000),
    Referer: `${isLegacyBase ? LEGACY_BASE_URL : DXL_BASE_URL}/api`,
    'x-vf-target-auth-system': 'M',
    'x-client-application': 'VFAPP',
    'x-vf-rep-from': 'app',
    'x-vf-clientid': 'MyVFApp'
  }
}

const getVluxgateHeader = (AcceptVersion: string) => {
  return {
    ...getCommonNonMintHeaders(true),
    'Accept-Version': AcceptVersion,
    'APP-Version': DeviceInfo.getVersion(),
    Platform: Platform.OS
  }
}

const getMintHeaders = (url: string) => {
  const mintHeaders: any = {
    'x-vf-rep-from': 'app',
    Accept: '*/*',
    ...getCommonHeaders()
  }

  if (
    url.includes(ApiRoutes.Mint.oidcRevoke.URL) ||
    url.includes(ApiRoutes.Mint.oidcToken.URL)
  ) {
    mintHeaders['Content-Type'] = 'application/x-www-form-urlencoded'
  } else {
    mintHeaders['Content-Type'] = 'application/json'
  }
  return mintHeaders
}

const getDXLHeaders = () => {
  return {
    ...getCommonNonMintHeaders(false),
    'x-api-key': API_KEY
  }
}

const headers: { [key: string]: any } = {
  [API_TYPES.MINT]: (url: string) => getMintHeaders(url),
  [API_TYPES.NIL]: () => getCommonNonMintHeaders(true),
  [API_TYPES.DXL]: () => getDXLHeaders(),
  [API_TYPES.VLUXGATE.MAIN]: () => getVluxgateHeader('1.0'),
  [API_TYPES.VLUXGATE.VERSION_2]: () => getVluxgateHeader('2.0')
}

const getAPIType = (url: string = '') => {
  if (url.includes(LEGACY_URL_TYPES.MINT)) {
    return API_TYPES.MINT
  } else if (url.includes(LEGACY_URL_TYPES.NIL)) {
    return API_TYPES.NIL
  } else if (url.includes(LEGACY_URL_TYPES.VLUXGATE.VERSION_2)) {
    return API_TYPES.VLUXGATE.VERSION_2
  } else if (url.includes(LEGACY_URL_TYPES.VLUXGATE.MAIN)) {
    return API_TYPES.VLUXGATE.MAIN
  } else if (url.includes(DXL_BASE_URL)) {
    // DXL is the only different base url
    return API_TYPES.DXL
  }
  return ''
}

const getHeaders = (url: string) => {
  const APIType = getAPIType(url)
  return headers[APIType]?.(url) || {}
}

export { getCommonHeaders, getHeaders }
