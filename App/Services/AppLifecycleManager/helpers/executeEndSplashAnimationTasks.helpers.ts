import getConsentVersionFromCMS from 'App/Screens/HomeScreen/components/PrivacyPermissionsOverlay/PrivacyPermissionsOverlay.helpers'
import { emitEvent } from 'App/Services/AppEventEmitter/AppEventEmitter'
import { AppEvents } from 'App/Services/AppEventEmitter/AppEvents'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

// eslint-disable-next-line import/prefer-default-export
export const showPrivacyPermissionsOverlayIfNeeded = async () => {
  const currentCMSConsentVersion = await getConsentVersionFromCMS()

  const localStoredConsentVersion = await EncryptedStorage.getItem(
    STORAGE_KEYS.consentVersion
  )

  if (Number(localStoredConsentVersion) === Number(currentCMSConsentVersion)) {
    return
  }

  if (localStoredConsentVersion) {
    emitEvent(AppEvents.SHOW_PRIVACY_PERMISSIONS_OVERLAY, true)
  }

  EncryptedStorage.setItem(
    STORAGE_KEYS.consentVersion,
    `${currentCMSConsentVersion}`
  )
}
