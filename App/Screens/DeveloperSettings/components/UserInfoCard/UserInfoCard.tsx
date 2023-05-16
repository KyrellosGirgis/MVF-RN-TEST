import React, { useEffect, useState } from 'react'
import { VFText } from '@vfgroup-oneplatform/foundation/Components'

import {
  getThemeImages,
  useTheme
} from '@vfgroup-oneplatform/foundation/Components/Themes'

import styles from './UserInfoCard.styles'

import DeveloperSettingsCardSection from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCardSection/DeveloperSettingsCardSection'
import DeveloperSettingsCard from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCard/DeveloperSettingsCard'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import { testID } from 'App/Utils/Helpers/testId.helpers'

const UserInfoCard = () => {
  const theme = useTheme()
  const Images = getThemeImages(theme.name)
  const [loggedInUMID, setLoggedInUMID] = useState('')
  const [loggedInUMDID, setLoggedInUMDID] = useState('')

  const loadUserInfo = async () => {
    setLoggedInUMID(await EncryptedStorage.getItem(STORAGE_KEYS.umid))
    setLoggedInUMDID(await EncryptedStorage.getItem(STORAGE_KEYS.umdid))
  }

  useEffect(() => {
    loadUserInfo()
  }, [])

  const renderUMID = () => {
    return (
      <VFText
        selectable
        style={styles.textStyle(theme)}
        i18nKey={`${loggedInUMID}`}
        testID={testID('UMIDValueText')}
      />
    )
  }

  const renderUMDID = () => {
    return (
      <VFText
        selectable
        style={styles.textStyle(theme)}
        i18nKey={`${loggedInUMDID}`}
        testID={testID('UMDIDValueText')}
      />
    )
  }

  return (
    <DeveloperSettingsCard
      title="User info"
      icon={Images.community_or_foundation}
    >
      <DeveloperSettingsCardSection
        title="UMID"
        renderRightElement={renderUMID}
        containerStyle={styles.cardSectionStyleWithNoBorder}
      />
      <DeveloperSettingsCardSection
        title="UMDID"
        renderRightElement={renderUMDID}
        containerStyle={styles.cardSectionStyleWithNoBorder}
      />
    </DeveloperSettingsCard>
  )
}

export default UserInfoCard
