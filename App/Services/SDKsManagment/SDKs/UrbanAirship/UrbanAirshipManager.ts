import { UrbanAirship } from 'urbanairship-react-native'

import { checkNotifications } from 'react-native-permissions'

import {
  clearAirShipMessages,
  isUrbanAirshipInitialized
} from './UrbanAirship.helpers'

import { AIRSHIP_KEY, AIRSHIP_SECRET } from 'App/Services/Keys/Keys.helper'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

const initializeUrbanAirship = async () => {
  if (!(await isUrbanAirshipInitialized())) {
    await UrbanAirship.takeOff({
      default: {
        appSecret: AIRSHIP_SECRET,
        appKey: AIRSHIP_KEY
      },
      urlAllowList: ['*']
    })
  }
}

const setUrbanAirshipUserDetails = async () => {
  if (await isUrbanAirshipInitialized()) {
    const loggedInUMID = await EncryptedStorage.getItem(STORAGE_KEYS.umid)
    const { status } = await checkNotifications()
    UrbanAirship.setUserNotificationsEnabled(status === 'granted')
    UrbanAirship.setNamedUser(loggedInUMID)
  }
}

const clearUrbanAirshipUserDetails = async () => {
  if (await isUrbanAirshipInitialized()) {
    await clearAirShipMessages()
    UrbanAirship.setNamedUser(null)
    UrbanAirship.setUserNotificationsEnabled(false)
  }
}

export {
  setUrbanAirshipUserDetails,
  clearUrbanAirshipUserDetails,
  initializeUrbanAirship
}
