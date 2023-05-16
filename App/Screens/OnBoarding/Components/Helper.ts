import { Alert } from 'react-native'
import { isFunction as _isFunction } from 'lodash'

import { OnboardingStep } from 'App/Screens/OnBoarding/Configurations/OnboardingStep'

import { translate } from 'App/Utils'

const setToBiProps = (value: number, props: OnboardingStep) => {
  const { isActive, initToBi, setToBiSize, withToBi, setToBiX, setToBiY } =
    props
  if (isActive && withToBi) {
    if (_isFunction(initToBi)) {
      initToBi(50, value, 140)
    }
    if (_isFunction(setToBiSize)) {
      setToBiSize(140)
    }
    if (_isFunction(setToBiX)) {
      setToBiX(50)
    }
    if (_isFunction(setToBiY)) {
      setToBiY(value + 50)
    }
  }
}

const showErrorAlert = (callback: () => void) => {
  Alert.alert('Error', translate('error'), [
    {
      text: translate('captcha_cancel_button'),
      onPress: () => {},
      style: 'cancel'
    },
    { text: translate('captcha_continue_button'), onPress: callback }
  ])
}

export { setToBiProps, showErrorAlert }
