import { GenericObject } from 'App/types'

const LEGACY_URL_TYPES = {
  MINT: '/mint',
  NIL: '/api/enterprise-resources/core/bss',
  VLUXGATE: {
    MAIN: '/api/vluxgate',
    VERSION_2: '/api/vluxgate/bew/'
  }
}

const API_TYPES = {
  MINT: 'mint',
  NIL: 'nil',
  VLUXGATE: { MAIN: 'vluxgate', VERSION_2: 'vluxgate_2' },
  DXL: 'dxl'
}

const LOGIN_TYPES = {
  UPFRONT: 'upfront',
  SEAMLESS: 'seamless',
  SMS: 'sms'
}

const TILE_ICONS: GenericObject = Object.freeze({
  daten: 'ic_data_sharing',
  sms: 'ic_sms_text',
  minuten: 'ic_call_log',
  mms: 'ic_sms_text'
})

const LOGIN_COOKIES_KEYS = [
  'mint',
  'mint-sso-token',
  'mint-session-id',
  'CTC',
  'CSID'
]

export {
  LEGACY_URL_TYPES,
  API_TYPES,
  LOGIN_TYPES,
  TILE_ICONS,
  LOGIN_COOKIES_KEYS
}
