// eslint-disable-next-line import/named
import { PrivacyPermissionsSection } from '@vfgroup-oneplatform/framework/CommonUI/PrivacyPermissionsOverlay/PrivacyPermissionsOverlay'

import { PRIVACY_SETTINGS_PERMISSIONS } from './PrivacyPermissionsOverlay.constants'

type PrivacySettingsKeys = keyof typeof PRIVACY_SETTINGS_PERMISSIONS

export interface OverlaySections {
  introSections: PrivacyPermissionsSection[]
  privacySettingsSections: PrivacyPermissionsSection[]
  privacyPolicySections: PrivacyPermissionsSection[]
}

export type PrivacySettingsToggelsProps = {
  [key: keyof PRIVACY_SETTINGS_PERMISSIONS]: boolean
}

export type OnToggleChange = (
  key: typeof PRIVACY_SETTINGS_PERMISSIONS[PrivacySettingsKeys]
) => void
