import { Alert } from 'react-native'

import { showPermissionWarningAlert } from 'App/Utils/Helpers/alert.helper'

describe('test alert helper functions ', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should showPermissionWarningAlert show alert successfully', () => {
    const onSettingsButtonPress = jest.fn()
    let alertTitle
    let alertMessage

    Alert.alert = jest.fn((title, message, buttons) => {
      alertTitle = title
      alertMessage = message
      buttons[1].onPress()
    })

    showPermissionWarningAlert('anyTitle', 'anyMessage', onSettingsButtonPress)

    expect(Alert.alert).toHaveBeenCalled()
    expect(alertTitle).toEqual('anyTitle')
    expect(alertMessage).toEqual('anyMessage')
    expect(onSettingsButtonPress).toHaveBeenCalled()
  })
})
