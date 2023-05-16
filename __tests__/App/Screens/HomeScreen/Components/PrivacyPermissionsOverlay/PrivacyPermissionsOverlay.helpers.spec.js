/* eslint-disable import/namespace */
import getConsentVersionFromCMS from 'App/Screens/HomeScreen/components/PrivacyPermissionsOverlay/PrivacyPermissionsOverlay.helpers'
import * as cmsStore from 'App/Services/StorageWrappers/CMSStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

const privacyObject = {
  privacy: {
    cookie_permissions: {
      consent_version: 5
    }
  }
}
describe('test getPrivacySettingsSections', () => {
  test('should return the privacy object in the same sahpe of privacyObject', async () => {
    cmsStore.getCmsItem = jest.fn(async () => privacyObject)
    const consentVersion = await getConsentVersionFromCMS()

    expect(cmsStore.getCmsItem).toHaveBeenCalledWith(
      STORAGE_KEYS.CMS_ITEMS.PRIVACY
    )
    expect(consentVersion).toBe(5)
  })
})
