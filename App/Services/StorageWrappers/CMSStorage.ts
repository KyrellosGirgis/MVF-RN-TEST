// eslint-disable-next-line no-restricted-imports
import * as BundleCms from '../../../CMS/index'

import { CMSTypes } from 'App/Services/API/Requests/CMS/CMS.constants'

import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

const getCmsItem = async (cmsItemID: string): Promise<any> => {
  const cmsMockedRootUrl = await EncryptedStorage.getItem(
    STORAGE_KEYS.mockedCMSRootURL
  )
  const cmsKey = cmsMockedRootUrl
    ? CMSTypes.CMS_MOCK_KEY
    : CMSTypes.CMS_DEFAULT_KEY
  return await EncryptedStorage.getItemParsedToJSON(cmsKey + cmsItemID)
}

const getTempCmsItem = async (cmsItemID: string) => {
  return await EncryptedStorage.getItemParsedToJSON(
    CMSTypes.CMS_TEMP_KEY + cmsItemID
  )
}
const getBundleCmsItem = (cmsItemID: string) => {
  // eslint-disable-next-line import/namespace
  return BundleCms[cmsItemID]
}
const setCmsItem = async (cmsItemID: string, value: any) => {
  await EncryptedStorage.setObject(CMSTypes.CMS_DEFAULT_KEY + cmsItemID, value)
}
const setTempCmsItem = async (
  cmsItemID: string,
  value: any,
  isMocked: boolean = false
) => {
  const cmsKey = isMocked ? CMSTypes.CMS_MOCK_KEY : CMSTypes.CMS_TEMP_KEY
  await EncryptedStorage.setObject(cmsKey + cmsItemID, value)
}

const clearCmsItem = async (cmsItemID: string) => {
  await EncryptedStorage.removeItem(CMSTypes.CMS_DEFAULT_KEY + cmsItemID)
}
const clearTempCmsItem = async (cmsItemID: string) => {
  await EncryptedStorage.removeItem(CMSTypes.CMS_TEMP_KEY + cmsItemID)
}

export {
  getCmsItem,
  clearCmsItem,
  getTempCmsItem,
  setCmsItem,
  getBundleCmsItem,
  setTempCmsItem,
  clearTempCmsItem
}
