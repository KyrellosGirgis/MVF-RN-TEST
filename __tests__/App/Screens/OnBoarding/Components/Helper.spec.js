import { Alert } from 'react-native'

import {
  showErrorAlert,
  setToBiProps
} from 'App/Screens/OnBoarding/Components/Helper'

const initToBi = jest.fn()
const setToBiSize = jest.fn()
const setToBiX = jest.fn()
const setToBiY = jest.fn()

const props = {
  isActive: true,
  initToBi,
  setToBiSize,
  withToBi: true,
  setToBiX,
  setToBiY
}

describe('Test Onboarding components Helper functions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should set tobi props when isActive and withTobi are true', () => {
    setToBiProps(20, props)

    expect(initToBi).toHaveBeenCalledWith(50, 20, 140)
    expect(setToBiSize).toHaveBeenCalledWith(140)
    expect(setToBiX).toHaveBeenCalledWith(50)
    expect(setToBiY).toHaveBeenCalledWith(70)
  })

  test('should not set tobi props when isActive and withTobi are false', () => {
    setToBiProps(20, { ...props, isActive: false, withToBi: false })

    expect(initToBi).not.toHaveBeenCalled()
    expect(setToBiSize).not.toHaveBeenCalled()
    expect(setToBiX).not.toHaveBeenCalled()
    expect(setToBiY).not.toHaveBeenCalled()
  })

  test('should not set tobi props when isActive and withTobi are true and no rest props', () => {
    setToBiProps(20, { isActive: false, withToBi: false })

    expect(initToBi).not.toHaveBeenCalled()
    expect(setToBiSize).not.toHaveBeenCalled()
    expect(setToBiX).not.toHaveBeenCalled()
    expect(setToBiY).not.toHaveBeenCalled()
  })

  test('should show Alert when calling showErrorAlert', () => {
    let onContinuePress
    let onCancelPress
    const callback = jest.fn()
    Alert.alert = jest.fn((_title, _message, buttons) => {
      onCancelPress = buttons[0].onPress
      onContinuePress = buttons[1].onPress
    })

    showErrorAlert(callback)

    expect(Alert.alert).toHaveBeenCalled()
    onContinuePress()
    expect(callback).toHaveBeenCalled()
    onCancelPress()
  })

  test('should not set tobi props when other props are not functions', () => {
    setToBiProps(20, { isActive: true, withToBi: true })
    expect(initToBi).not.toHaveBeenCalled()
    expect(setToBiSize).not.toHaveBeenCalled()
    expect(setToBiX).not.toHaveBeenCalled()
    expect(setToBiY).not.toHaveBeenCalled()
  })
})
