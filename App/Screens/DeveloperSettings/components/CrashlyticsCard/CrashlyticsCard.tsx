import React from 'react'

import { VFButton } from '@vfgroup-oneplatform/foundation/Components'

import crashlytics from '@react-native-firebase/crashlytics'

import styles from './CrashlyticsCard.styles'

import DeveloperSettingsCard from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCard/DeveloperSettingsCard'
import { testID } from 'App/Utils/Helpers/testId.helpers'

const CrashlyticsCard = () => {
  const ErrorBtn = () => (
    <VFButton
      testID={testID('DevSettings_crashlyticsErrorBtn')}
      title="Trigger error"
      onPress={() => {
        crashlytics().log('Testing error')
        crashlytics().recordError(
          new Error('An error was caught in devSettings')
        )
      }}
      style={styles.button}
    />
  )

  const CrashBtn = () => (
    <VFButton
      testID={testID('DevSettings_crashlyticsCrashBtn')}
      title="Trigger crash"
      onPress={() => {
        crashlytics().log('Testing a crash')
        crashlytics().crash()
      }}
      style={styles.button}
    />
  )

  return (
    <DeveloperSettingsCard
      title="Crashlytics"
      childContainerStyle={styles.cardContainer}
      titleTestID={testID('DevSettings_crashlyticsCardTitle')}
    >
      <ErrorBtn />
      <CrashBtn />
    </DeveloperSettingsCard>
  )
}

export default CrashlyticsCard
