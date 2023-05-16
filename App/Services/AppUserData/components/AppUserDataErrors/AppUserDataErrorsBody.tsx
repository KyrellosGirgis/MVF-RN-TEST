import React from 'react'
import { View } from 'react-native'

import { VFButton } from '@vfgroup-oneplatform/foundation/Components'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { AppUserDataErrorsBodyProps } from 'App/Services/AppUserData/components/AppUserDataErrors/AppUserDataErrorsBody.d'

import styles from 'App/Services/AppUserData/components/AppUserDataErrors/AppUserDataErrorsBody.styles'

import { testID } from 'App/Utils/Helpers/testId.helpers'

const AppUserDataErrorsBody = ({
  body,
  primaryButtonTitle,
  onPrimaryButtonPress,
  secondaryButtonTitle,
  onSecondaryButtonPress
}: AppUserDataErrorsBodyProps) => {
  const theme = useTheme()
  return (
    <View
      style={styles.container(theme)}
      testID={testID('appUserDataErrorsBody')}
    >
      {body}
      <View style={styles.buttonsWrappers}>
        {primaryButtonTitle && (
          <VFButton
            onPress={onPrimaryButtonPress}
            title={primaryButtonTitle}
            style={styles.primaryButton}
            testKey={testID('appUserDataErrorsBodyPrimaryButton')}
          />
        )}
        {secondaryButtonTitle && (
          <VFButton
            onPress={onSecondaryButtonPress}
            title={secondaryButtonTitle}
            type="secondary"
            testKey={testID('appUserDataErrorsBodySecondaryButton')}
          />
        )}
      </View>
    </View>
  )
}
export default AppUserDataErrorsBody
