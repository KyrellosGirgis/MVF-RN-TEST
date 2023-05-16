/* eslint-disable no-unused-vars */
import Config from 'react-native-config'

import { UserDataServicesTypes } from './Requests/userData/userData.d'

import { GenericObject } from 'App/types'

const DXL_BASE_URL = Config.BASE_URL_DXL
const LEGACY_BASE_URL = Config.BASE_URL_LEGACY
const minutesTillNextCookieRefresh = 15
const HOURS_TILL_CMS_LOCALISATIONS_UPDATE = 24
const HOURS_TILL_CMS_UPDATE = 1
const CMS_CMS_BASE_URL = Config.CMS_BASE_URL
const FUNNEL_CONNECT_BASE_URL = Config.FUNNEL_CONNECT_BASE_URL
enum REQUEST_METHODS {
  GET = 'GET',
  PUT = 'PUT'
}

const RELATED_PARTY_ID_FORMAT: GenericObject = {
  [UserDataServicesTypes.mobile]: 'urn:vf-de-dxl-tmf:vf:mobile:msisdn:',
  [UserDataServicesTypes.fixednet]: 'urn:vf-de-dxl-tmf:arcor:dsl:acn:',
  [UserDataServicesTypes.cable]: 'urn:vf-de-dxl-tmf:kd:cable:can:',
  [UserDataServicesTypes.unitymedia]: 'urn:vf-de-dxl-tmf:um:cable:uan:',
  ban: 'urn:vf-de-dxl-tmf:vf:mobile:ban:',
  useraccountLevel: 'urn:vf-de-dxl-tmf:vf:ulm:'
}

export {
  LEGACY_BASE_URL,
  DXL_BASE_URL,
  minutesTillNextCookieRefresh,
  HOURS_TILL_CMS_LOCALISATIONS_UPDATE,
  CMS_CMS_BASE_URL,
  FUNNEL_CONNECT_BASE_URL,
  HOURS_TILL_CMS_UPDATE,
  REQUEST_METHODS,
  RELATED_PARTY_ID_FORMAT
}
