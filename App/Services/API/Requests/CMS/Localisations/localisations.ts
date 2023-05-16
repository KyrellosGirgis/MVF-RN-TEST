import moment from 'moment'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import { HOURS_TILL_CMS_LOCALISATIONS_UPDATE } from 'App/Services/API/Constants'
import { getDateDifference } from 'App/Utils/Helpers/date.helpers'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

const isLocalisationsDataValid = async () => {
  const lastTimeLocalisationsUpdated = await EncryptedStorage.getItem(
    STORAGE_KEYS.lastTimeLocalisationsUpdated
  )
  if (lastTimeLocalisationsUpdated) {
    const timeDiffInHours = getDateDifference(
      lastTimeLocalisationsUpdated
    ).asHours()
    return timeDiffInHours >= HOURS_TILL_CMS_LOCALISATIONS_UPDATE
  }
  return true
}

const shouldUpdateLocalisationsIfNeeded = async () => {
  if (await exports.isLocalisationsDataValid()) {
    await EncryptedStorage.setItem(
      STORAGE_KEYS.lastTimeLocalisationsUpdated,
      moment().format()
    )
    return true
  }
  return false
}

export { shouldUpdateLocalisationsIfNeeded, isLocalisationsDataValid }
