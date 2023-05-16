import React, { useRef } from 'react'

import { PersonalPreferences as PersonalPreferencesComponent } from '@vfgroup-oneplatform/framework/PrivacySettings'
import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import {
  permissionObject,
  PERMISSIONS_KEYS_Enum
} from '@vfgroup-oneplatform/framework/PrivacySettings/Screens/PersonalPreferences/PersonalPreferences.d'

import { without as _without } from 'lodash'

import FrameworkTestKeys from '@vfgroup-oneplatform/framework/FrameworkTestKeys'

import { getThemeImages } from 'App/Themes'

import HTMLDescription from 'App/Screens/PrivacySettings/Components/HTMLDescription/HTMLDescription'

import { onScreenBackPress } from 'App/Screens/PrivacySettings/Screens/Helper'

import useSuccessModal from 'App/Screens/PrivacySettings/Hooks/useSuccessModal'

import PersonalPreferencesData from 'App/Screens/PrivacySettings/Configurations/PersonalPreferencesData'

import { delay } from 'App/Utils/Helpers/generic.helpers'
import { navigateToDashboardScreen } from 'App/Screens/Helpers'

const PersonalPreferences = () => {
  const [setShowSuccessModal, setSuccessModalLoading] = useSuccessModal()
  const changedPermissions = useRef<string[]>([])

  const theme = useTheme()
  const images = getThemeImages(theme.name)

  const onConfirm = async () => {
    setSuccessModalLoading(true)
    setShowSuccessModal(true)
    await delay(2000)
    setSuccessModalLoading(false)
  }

  const onPermissionChange = ({ key, value }: permissionObject) => {
    if (value) {
      changedPermissions.current.push(key)
    } else {
      changedPermissions.current = _without(changedPermissions.current, key)
    }
  }

  return (
    <PersonalPreferencesComponent
      images={images}
      onClose={navigateToDashboardScreen}
      onBack={() => onScreenBackPress(!!changedPermissions.current.length)}
      onConfirm={onConfirm}
      onPermissionChange={onPermissionChange}
      isBasicDependant={false}
      renderDescription={(sectionName: PERMISSIONS_KEYS_Enum) => {
        const description =
          sectionName === PERMISSIONS_KEYS_Enum.ADVANCED
            ? 'personal_preferences_advanced_description'
            : 'personal_preferences_basic_description'

        const testID = `${FrameworkTestKeys.OBDescription}${sectionName}`

        return <HTMLDescription description={description} testID={testID} />
      }}
      {...PersonalPreferencesData}
    />
  )
}

export default PersonalPreferences
