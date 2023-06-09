import { AppKeys } from './Keys.d'

let API_KEY = ''
let CLIENT_ID = ''
let APP_DYNAMICS_KEY = ''
let ADJUST_KEY = ''
let AIRSHIP_KEY = ''
let AIRSHIP_SECRET = ''
let TEALIUM_PROFILE_NAME = ''

const setAppBridgeValues = (keys: AppKeys) => {
  API_KEY = keys.API_KEY
  CLIENT_ID = keys.CLIENT_ID
  APP_DYNAMICS_KEY = keys.APP_DYNAMICS_KEY
  ADJUST_KEY = keys.ADJUST_KEY
  AIRSHIP_SECRET = keys.AIRSHIP_SECRET
  AIRSHIP_KEY = keys.AIRSHIP_KEY
  TEALIUM_PROFILE_NAME = keys.TEALIUM_PROFILE_NAME
}

export {
  setAppBridgeValues,
  API_KEY,
  CLIENT_ID,
  APP_DYNAMICS_KEY,
  ADJUST_KEY,
  AIRSHIP_KEY,
  AIRSHIP_SECRET,
  TEALIUM_PROFILE_NAME
}
