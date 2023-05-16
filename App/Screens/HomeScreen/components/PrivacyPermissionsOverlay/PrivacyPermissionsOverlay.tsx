import React, { useEffect, useMemo, useState } from 'react'

import PrivacyPermissionsOverlay from '@vfgroup-oneplatform/framework/CommonUI/PrivacyPermissionsOverlay'

import {
  getPrivacySettingsSections,
  INTRO_SECTIONS,
  PRIVACY_POLICY_SECTIONS
} from './PrivacyPermissionsOverlay.configs'

import { PRIVACY_SETTINGS_PERMISSIONS } from './PrivacyPermissionsOverlay.constants'

import { OnToggleChange } from './PrivacyPermissionsOverlay.d'

import { listenForEvent } from 'App/Services/AppEventEmitter/AppEventEmitter'
import { AppEvents } from 'App/Services/AppEventEmitter/AppEvents'

export default function PrivacyAndPermissionsUpdateOverlay() {
  const [isOverlayVisible, setIsOverlayVisible] = useState(false)
  const [privacySettingsToggelsValues, setPrivacySettingsToggelesValues] =
    useState({
      [PRIVACY_SETTINGS_PERMISSIONS.PRIVACY_BASIC_PROFILE]: true,
      [PRIVACY_SETTINGS_PERMISSIONS.PRIVACY_ADVANCED_PROFILE]: false,
      [PRIVACY_SETTINGS_PERMISSIONS.PRIVACY_POST]: false,
      [PRIVACY_SETTINGS_PERMISSIONS.PRIVACY_MESSAGING]: false,
      [PRIVACY_SETTINGS_PERMISSIONS.PRIVACY_PHONE_CALLS]: false,
      [PRIVACY_SETTINGS_PERMISSIONS.PRIVACY_EMAIL]: false
    })

  const onToggleChange: OnToggleChange = (key) =>
    setPrivacySettingsToggelesValues((prevState) => ({
      ...prevState,
      [key]: !prevState[key]
    }))

  const privacySettingsSections = useMemo(
    () =>
      getPrivacySettingsSections(privacySettingsToggelsValues, onToggleChange),
    [privacySettingsToggelsValues]
  )

  useEffect(() => {
    listenForEvent(AppEvents.SHOW_PRIVACY_PERMISSIONS_OVERLAY, () => {
      setIsOverlayVisible(true)
    })
  }, [])

  return (
    // @ts-ignore
    <PrivacyPermissionsOverlay
      isVisible={isOverlayVisible}
      isLoading={false}
      onDismiss={() => setIsOverlayVisible(false)}
      onAcceptAll={() =>
        new Promise((resolve) => {
          setIsOverlayVisible(false)
          resolve(true)
        })
      }
      onRejectAll={() => setIsOverlayVisible(false)}
      onOkButtonPress={() => setIsOverlayVisible(false)}
      onAcceptAllManagePrivacy={() => setIsOverlayVisible(false)}
      onRejectAllManagePrivacy={() => setIsOverlayVisible(false)}
      introSections={INTRO_SECTIONS}
      privacySettingsSections={privacySettingsSections}
      privacyPolicySections={PRIVACY_POLICY_SECTIONS}
    />
  )
}
