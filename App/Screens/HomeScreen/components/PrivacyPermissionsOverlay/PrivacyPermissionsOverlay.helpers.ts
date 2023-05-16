import { getCmsItem } from 'App/Services/StorageWrappers/CMSStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

const getConsentVersionFromCMS = async () => {
  const privacyCms = await getCmsItem(STORAGE_KEYS.CMS_ITEMS.PRIVACY)
  return privacyCms?.privacy?.cookie_permissions?.consent_version
}

export default getConsentVersionFromCMS
