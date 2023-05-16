/* eslint-disable import/namespace */
import { showPrivacyPermissionsOverlayIfNeeded } from 'App/Services/AppLifecycleManager/helpers/executeEndSplashAnimationTasks.helpers'
import * as cmsHelpers from 'App/Services/StorageWrappers/CMSStorage'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import * as AppEventEmitter from 'App/Services/AppEventEmitter/AppEventEmitter'
import { AppEvents } from 'App/Services/AppEventEmitter/AppEvents'

const privacyConsentVersion = {
  cookie_permissions: {
    consent_version: 5
  }
}

describe('EndSlashAnimation helpers', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  test('should emit SHOW_PRIVACY_PERMISSIONS_OVERLAY event and set consent version successfully if the consent version updated', async () => {
    AppEventEmitter.emitEvent = jest.fn()
    cmsHelpers.getCmsItem = jest.fn(() => ({
      privacy: privacyConsentVersion
    }))
    EncryptedStorage.getItem = jest.fn(() => '6')

    await showPrivacyPermissionsOverlayIfNeeded()

    expect(AppEventEmitter.emitEvent).toHaveBeenCalledWith(
      AppEvents.SHOW_PRIVACY_PERMISSIONS_OVERLAY,
      true
    )
    expect(EncryptedStorage.setItem).toHaveBeenCalledWith('consentVersion', '5')
  })

  test("shouldn't show privacy permissions overlay if the consent version not updated", async () => {
    AppEventEmitter.emitEvent = jest.fn()
    cmsHelpers.getCmsItem = jest.fn(() => ({
      privacy: privacyConsentVersion
    }))
    EncryptedStorage.getItem = jest.fn(() => '5')

    await showPrivacyPermissionsOverlayIfNeeded()

    expect(AppEventEmitter.emitEvent).not.toHaveBeenCalled()
    expect(EncryptedStorage.setItem).not.toHaveBeenCalled()
  })
})
