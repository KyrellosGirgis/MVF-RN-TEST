import React, { useEffect } from 'react'

import { withTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import {
  VFButton,
  VFText,
  TimelineEvents
} from '@vfgroup-oneplatform/foundation/Components'
import { View } from 'react-native'

import styles from './BiometricsStep.styles'

import { setToBiProps } from 'App/Screens/OnBoarding/Components/Helper'

import { OnboardingStep } from 'App/Screens/OnBoarding/Configurations/OnboardingStep'

import {
  isBiometricsAvailableAndEnabled,
  enableBiometrics,
  showBiometricsWarning
} from 'App/Services/AppBiometrics/AppBiometrics.helpers'
import { BIOMETRICS_STATUS } from 'App/Services/AppBiometrics/AppBiometrics.constants'
import { testID } from 'App/Utils/Helpers/testId.helpers'

const BiometricsStep = (props: OnboardingStep) => {
  const { onNextStep, onSkipStep, isActive } = props

  useEffect(() => {
    TimelineEvents.subscribe((value) => setToBiProps(value, props))
  }, [isActive])

  const onNextStepPress = async () => {
    const { status } = await isBiometricsAvailableAndEnabled()
    if (status === BIOMETRICS_STATUS.AVAILABLE) {
      await enableBiometrics()
      onNextStep()
    } else {
      showBiometricsWarning({})
    }
  }

  return (
    <View style={styles.container} testID="Biometrics_Step_Component_Wrapper">
      <VFText
        i18nKey="biometrics_step_description"
        style={styles.text}
        testID={testID('Biometrics_Step_Text')}
      />
      <VFButton
        type="primary"
        title="captcha_continue_button"
        onPress={onNextStepPress}
        style={styles.buttonStyle}
        textStyle={styles.buttonText}
        textAccessibilityLabel={testID('Biometrics_Step_Continue_Button_Text')}
        testID={testID('Biometrics_Step_Continue_Button')}
      />

      <VFButton
        type="secondary"
        title="notNow"
        onPress={onSkipStep}
        style={styles.skipButtonStyle}
        textStyle={styles.skipButtonText}
        textAccessibilityLabel={testID('Biometrics_Step_NotNnow_Button_Text')}
        testID={testID('Biometrics_Step_NotNnow_Button')}
      />
    </View>
  )
}

export default withTheme(BiometricsStep)
