import moment from 'moment'

import {
  fetchFromCMSWithoutErrorHandling,
  checkCmsItemStoreRules,
  shouldAddUpdateCmsItem,
  getMockedCMSRootURL,
  fetchFromCMSWithErrorHandling
} from 'App/Services/API/Requests/CMS/CMS.helper'

import {
  getCmsItem,
  clearTempCmsItem,
  getBundleCmsItem,
  getTempCmsItem,
  setCmsItem,
  setTempCmsItem
} from 'App/Services/StorageWrappers/CMSStorage'

import ApiRoutes from 'App/Services/API/ApiRoutes'
import { applyAppLanguage } from 'App/I18n/helpers/localisations.helpers'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

const executeTasksAfterUpdateCMS = async () => {
  await EncryptedStorage.setItem(
    STORAGE_KEYS.lastTimeCMSUpdated,
    moment().format()
  )
  // init localization
  await applyAppLanguage()
}

const prepareLocalCMS = async () => {
  for (var cmsItem in STORAGE_KEYS.CMS_ITEMS) {
    const cmsItemID: string = STORAGE_KEYS.CMS_ITEMS[cmsItem]
    const tempCmsItem = await getTempCmsItem(cmsItemID)
    if (tempCmsItem) {
      await setCmsItem(cmsItemID, tempCmsItem)
      await clearTempCmsItem(cmsItemID)
    } else if (!(await getCmsItem(cmsItemID))) {
      await setCmsItem(cmsItemID, getBundleCmsItem(cmsItemID))
    }
  }
  // init cms Data in app components
  await exports.executeTasksAfterUpdateCMS()
}

async function fetchAndStoreRemoteCMSItems(
  theObject: any,
  isMocked: boolean = false,
  memo: { [index: string]: string } = {}
) {
  for (var prop in theObject) {
    if (prop === 'resource') {
      const requiredId = theObject.id
      if (memo[requiredId]) {
        return
      }

      const fetchFromCMS = isMocked
        ? fetchFromCMSWithErrorHandling
        : fetchFromCMSWithoutErrorHandling

      theObject[prop] = await fetchFromCMS(theObject[prop])

      if (!theObject[prop]) {
        return
      }

      if (
        isMocked ||
        ((await checkCmsItemStoreRules(requiredId)) &&
          (await shouldAddUpdateCmsItem(requiredId, theObject.timestamp)))
      ) {
        // add timeStamp from outer obj to inner obj
        theObject[prop].timestamp = theObject.timestamp
        setTempCmsItem(requiredId, theObject[prop], isMocked)
        memo[requiredId] = 'any_value'
      } else {
        return
      }
    }
    if (theObject[prop] instanceof Object) {
      await fetchAndStoreRemoteCMSItems(theObject[prop], isMocked, memo)
    }
  }
}

const loadRemoteCMS = async () => {
  const cmsMockedRootUrl = await getMockedCMSRootURL()

  fetchAndStoreRemoteCMSItems(
    {
      id: 'root',
      resource: cmsMockedRootUrl || ApiRoutes.CMS.entryPoint
    },
    !!cmsMockedRootUrl
  )
}

const loadRemoteCMSSync = async (cmsMockedRootUrl: string) => {
  await fetchAndStoreRemoteCMSItems(
    {
      id: 'root',
      resource: cmsMockedRootUrl || ApiRoutes.CMS.entryPoint
    },
    !!cmsMockedRootUrl
  )
}

const updateCMS = async () => {
  // load Cms from TEMP storage or from app local bundle
  await exports.prepareLocalCMS()
  // load the latest Remote CMS in temp structure
  exports.loadRemoteCMS()
}

export {
  updateCMS,
  loadRemoteCMS,
  loadRemoteCMSSync,
  executeTasksAfterUpdateCMS,
  prepareLocalCMS,
  fetchAndStoreRemoteCMSItems
}
