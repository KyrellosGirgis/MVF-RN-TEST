import { VFButton } from '@vfgroup-oneplatform/foundation/Components'

import React from 'react'

import DeveloperSettingsCardSection from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCardSection/DeveloperSettingsCardSection'

import DeveloperSettingsCard from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCard/DeveloperSettingsCard'

import styles from 'App/Screens/DeveloperSettings/DeveloperSettings.styles'

import { NavigationFunctions } from 'App/Containers'
import Routes from 'App/Containers/AppNavigation/Routes'
import { testID } from 'App/Utils/Helpers/testId.helpers'

const EncryptedStorageLogsCard = () => {
  const renderLogsBtn = (
    <VFButton
      testID={testID('DatabaseBtn')}
      title="Open Logs"
      onPress={() => {
        NavigationFunctions.navigate(Routes.EncryptedStorageLogs)
      }}
      style={styles.button}
    />
  )

  return (
    <DeveloperSettingsCard
      title="Encrypted Storage Logger"
      titleTestID={'ESCardTitle'}
    >
      <DeveloperSettingsCardSection
        title={''}
        description=""
        renderRightElement={() => renderLogsBtn}
      />
    </DeveloperSettingsCard>
  )
}

export default EncryptedStorageLogsCard
