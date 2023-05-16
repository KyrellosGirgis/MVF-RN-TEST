import React from 'react'
import { VFButton } from '@vfgroup-oneplatform/foundation/Components'

import { styles } from './DeveloperSettingsEntryPoint.styles'

import Routes from 'App/Containers/AppNavigation/Routes'
import { NavigationFunctions } from 'App/Containers'
import { testID } from 'App/Utils/Helpers/testId.helpers'

const DeveloperSettingsEntryPoint = () => {
  return (
    <VFButton
      onPress={function (): void {
        NavigationFunctions.navigate(Routes.DeveloperSettingsScreen)
      }}
      title=""
      style={styles.hiddenBtn}
      testKey={testID('DevSettingHidden')}
    />
  )
}

export default DeveloperSettingsEntryPoint
