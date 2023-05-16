import { Config } from 'react-native-config'

import { CmsItem } from './CMS.d'

import { shouldUpdateLocalisationsIfNeeded } from './Localisations/localisations'

import { loadRemoteCMS } from './CMS'

import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

import { CMSAxios } from 'App/Services/API/Interceptors/index'
import { HOURS_TILL_CMS_UPDATE } from 'App/Services/API/Constants'
import ApiRoutes from 'App/Services/API/ApiRoutes'

import { getDateDifference } from 'App/Utils'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import { getCmsItem } from 'App/Services/StorageWrappers/CMSStorage'

const fetchFromCMSWithoutErrorHandling = async (url: string) => {
  const { cache } = ApiRoutes.CMS
  try {
    const { data } = await CMSAxios.get(url, { cache })

    if (data) {
      return data
    }
  } catch (error) {}
}

const fetchFromCMSWithErrorHandling = async (url: string) => {
  const { cache } = ApiRoutes.CMS
  try {
    const { data } = await CMSAxios.get(url, { cache })

    if (data) {
      return data
    }
  } catch (error) {
    throw error
  }
}

const checkCmsItemStoreRules = async (requiredId: string) => {
  switch (requiredId) {
    case STORAGE_KEYS.CMS_ITEMS.INTERNATIONALISATION:
      return shouldUpdateLocalisationsIfNeeded()

    default:
      return true
  }
}

const shouldAddUpdateCmsItem = async (
  cmsItemId: string,
  cmsTimeStamp: string
) => {
  const cmsStoredItemData: CmsItem = await getCmsItem(cmsItemId)
  return (
    cmsTimeStamp == null ||
    cmsStoredItemData?.timestamp == null ||
    Number(cmsTimeStamp) > Number(cmsStoredItemData.timestamp)
  )
}

const shouldUpdateCMS = async () => {
  const lastTimeCMSUpdated = await EncryptedStorage.getItem(
    STORAGE_KEYS.lastTimeCMSUpdated
  )
  if (lastTimeCMSUpdated) {
    const timeDiffInHours = getDateDifference(lastTimeCMSUpdated).asHours()

    if (timeDiffInHours >= HOURS_TILL_CMS_UPDATE) {
      return true
    } else {
      return false
    }
  }
  return true
}

const fetchAndStoreRemoteCMSIfNeeded = async () => {
  if ((await exports.shouldUpdateCMS()) || Config.IS_PRODUCTION === 'false') {
    loadRemoteCMS()
  }
}

const getMockedCMSRootURL = async () =>
  await EncryptedStorage.getItem(STORAGE_KEYS.mockedCMSRootURL)

export {
  shouldAddUpdateCmsItem,
  shouldUpdateCMS,
  fetchAndStoreRemoteCMSIfNeeded,
  fetchFromCMSWithoutErrorHandling,
  checkCmsItemStoreRules,
  getMockedCMSRootURL,
  fetchFromCMSWithErrorHandling
}
