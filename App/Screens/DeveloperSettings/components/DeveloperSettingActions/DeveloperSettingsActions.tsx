import React from 'react'
import { View } from 'react-native'
import { VFButton } from '@vfgroup-oneplatform/foundation/Components'

import {
  dismiss,
  saveDeveloperSettings
} from 'App/Screens/DeveloperSettings/components/DeveloperSettingActions/DeveloperSettingActions.helper'

import styles from 'App/Screens/DeveloperSettings/components/DeveloperSettingActions/DeveloperSettingActions.styles'
import { testID } from 'App/Utils/Helpers/testId.helpers'

import { DeveloperSettingsActionsProps } from 'App/Screens/DeveloperSettings/components/DeveloperSettingActions/DeveloperSettingsActions.d'

const DeveloperSettingsActions = ({
  persistAllDeveloperSettingsSections
}: DeveloperSettingsActionsProps) => {
  return (
    <View style={styles.ActionsContainer}>
      <VFButton
        style={styles.Button}
        title="Cancel"
        onPress={dismiss}
        testKey={testID('DeveloperSettingCancel_Btn')}
      />

      <VFButton
        style={styles.Button}
        title="Save & Continue"
        onPress={() => {
          saveDeveloperSettings({
            persistAllDeveloperSettingsSections
          })
        }}
        testKey={testID('DeveloperSettingSaveAndContinue_Btn')}
      />

      <VFButton
        style={styles.Button}
        title="Save & Logout"
        onPress={() => {
          saveDeveloperSettings({
            shouldLogoutAndClose: true,
            persistAllDeveloperSettingsSections
          })
        }}
        testKey={testID('DeveloperSettingSaveAndClose_Btn')}
      />
    </View>
  )
}

export default DeveloperSettingsActions
