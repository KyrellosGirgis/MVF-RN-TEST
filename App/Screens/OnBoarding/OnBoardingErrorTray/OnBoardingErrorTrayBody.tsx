import React from 'react'
import { View } from 'react-native'

import StatusView from '@vfgroup-oneplatform/foundation/Components/StatusView'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { ErrorTrayBodyProps } from './OnBoardingError'

import { getThemeImages } from 'App/Themes'

import { testID } from 'App/Utils/Helpers/testId.helpers'
import styles from 'App/Screens/OnBoarding/OnBoardingErrorTray/OnBoardingErrorTrayBody.styles'

export default function OnBoardingErrorTrayBody({
  errorMessage,
  primaryButtonHandler,
  secondaryButtonHandler
}: ErrorTrayBodyProps) {
  const theme = useTheme()

  return (
    <View testID={testID('ErrorTrayBody')} style={styles.container}>
      <StatusView
        primaryButtonProps={{
          title: primaryButtonHandler.title,
          onPress: primaryButtonHandler.handlerAction,
          testKey: testID('ErrorTray_primaryBtn')
        }}
        secondaryButtonProps={{
          title: secondaryButtonHandler.title,
          onPress: secondaryButtonHandler.handlerAction,
          testKey: testID('ErrorTray_secondaryBtn')
        }}
        image={getThemeImages(theme.name).ic_WarningHiLight_Theme}
        title="captcha_something_went_wrong"
        description={errorMessage}
      />
    </View>
  )
}
