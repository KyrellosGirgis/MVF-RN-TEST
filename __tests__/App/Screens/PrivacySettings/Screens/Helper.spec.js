import { Alert } from 'react-native'

import {
  onScreenBackPress,
  getStateInitialized
} from 'App/Screens/PrivacySettings/Screens/Helper'

import { navigateToDashboardScreen } from 'App/Screens/Helpers'

import * as NavigationFunctions from 'App/Containers'

describe('Privacy settings screens helper test', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should navigateToDashboardScreen successfully', () => {
    NavigationFunctions.NavigationFunctions.popToTop = jest.fn()
    navigateToDashboardScreen()
    expect(
      NavigationFunctions.NavigationFunctions.popToTop
    ).toHaveBeenCalledTimes(1)
  })

  test('should not show alert when calling onScreenBackPress and navigate to previous screen', () => {
    NavigationFunctions.NavigationFunctions.goBack = jest.fn()
    onScreenBackPress(false)
    expect(NavigationFunctions.NavigationFunctions.goBack).toHaveBeenCalled()
  })

  test('should show alert when calling onScreenBackPress and navigate to previous screen on ok', () => {
    NavigationFunctions.NavigationFunctions.goBack = jest.fn()
    let okPress
    let cancelPress

    Alert.alert = jest.fn((_title, _message, buttons) => {
      cancelPress = buttons[0].onPress
      okPress = buttons[1].onPress
    })
    onScreenBackPress(true)
    expect(Alert.alert).toHaveBeenCalled()
    okPress()
    cancelPress()
    expect(NavigationFunctions.NavigationFunctions.goBack).toHaveBeenCalled()
  })

  test('should getStateInitialized return object with keys initialized by give value', () => {
    const dataObj = [{ title: 'june' }, { title: 'july' }, { title: 'august' }]
    const initializedObjWithTrue = getStateInitialized(dataObj, true)
    expect(initializedObjWithTrue).toEqual({
      june: true,
      july: true,
      august: true
    })
    const initializedObjWithFalse = getStateInitialized(dataObj)
    expect(initializedObjWithFalse).toEqual({
      june: false,
      july: false,
      august: false
    })
  })
})
