import React from 'react'

import { getVersion, getBuildNumber } from 'react-native-device-info'

import { VFText } from '@vfgroup-oneplatform/foundation/Components'

import {
  getThemeImages,
  useTheme
} from '@vfgroup-oneplatform/foundation/Components/Themes'

import styles from './AppVersionCard.styles'

import DeveloperSettingsCardSection from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCardSection/DeveloperSettingsCardSection'

import DeveloperSettingsCard from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCard/DeveloperSettingsCard'

const AppVerionCard = () => {
  const theme = useTheme()
  const Images = getThemeImages(theme.name)

  const renderVersionNumber = () => {
    return (
      <VFText
        style={styles.textStyle(theme)}
        i18nKey={`${getVersion()}(${getBuildNumber()})`}
      />
    )
  }

  return (
    <DeveloperSettingsCard
      title="App info"
      icon={Images.community_or_foundation}
    >
      <DeveloperSettingsCardSection
        title="Version number"
        renderRightElement={renderVersionNumber}
        containerStyle={styles.cardSectionStyleWithNoBorder}
      />
    </DeveloperSettingsCard>
  )
}

export default AppVerionCard
