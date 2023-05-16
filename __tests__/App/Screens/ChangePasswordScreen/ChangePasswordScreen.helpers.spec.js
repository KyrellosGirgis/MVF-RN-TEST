/* eslint-disable import/namespace */
import * as changePasswordHelpers from 'App/Screens/ChangePassword/ChangePasswordScreen.helpers'
import * as MintAPIs from 'App/Services/API/Requests/Common/Mint/mint'
import * as ChangePassordService from 'App/Services/API/Requests/ChangePassword/changePassword'

describe('test change password helpers ', () => {
  const loadAuthProcessStartDataResponse = {
    data: {
      actionType: 'actionType',
      stepName: 'stepName',
      processId: 'processId'
    }
  }

  const changePasswordError = {
    errorMessage: 'Change password excution faild'
  }
  test('should call proceedMintProcessStep with the value returned from startMintProcess when changePassword is called', async () => {
    MintAPIs.startMintProcess = jest
      .fn()
      .mockReturnValue(loadAuthProcessStartDataResponse)
    MintAPIs.proceedMintProcessStep = jest.fn()
    await ChangePassordService.changePassword('currentPassword', 'newPassword')
    expect(MintAPIs.proceedMintProcessStep).toHaveBeenCalledTimes(1)
  })

  test('should validatePassword return true when the password matches validation rules', () => {
    //Validation rules:
    //1- from 8 to 64 chars
    //2- Use at least one letter and one number and one of these special characters: +-_&@,§$%.
    //3- Spaces are not allowed
    expect(changePasswordHelpers.validatePassword('dummyy@1')).toBeTruthy()
  })

  test('should validatePassword return false when the password is less than 8 chars', () => {
    expect(changePasswordHelpers.validatePassword('aaaaa1@')).toBeFalsy()
  })

  test('should validatePassword return false when the password is more than 64 chars', () => {
    expect(
      changePasswordHelpers.validatePassword(
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1@'
      )
    ).toBeFalsy()
  })

  test('should validatePassword return false when the password deos not contain a number', () => {
    expect(changePasswordHelpers.validatePassword('aaaaaaa@')).toBeFalsy()
  })

  test('should validatePassword return false when the password deos not contain a special char', () => {
    expect(changePasswordHelpers.validatePassword('aaaaaaa1')).toBeFalsy()
  })

  test('should validatePassword return false when the password deos not contain a letter', () => {
    expect(changePasswordHelpers.validatePassword('1234567@')).toBeFalsy()
  })

  test('should validatePassword return false when the password contains a space', () => {
    expect(changePasswordHelpers.validatePassword('dummy @1')).toBeFalsy()
  })

  test('should call startChangePasswordProcess when calling onChangePasswordPress', async () => {
    ChangePassordService.changePassword = jest.fn()
    await changePasswordHelpers.onChangePasswordPress(
      'oldPassword',
      'Vodafone15@'
    )
    expect(ChangePassordService.changePassword).toHaveBeenCalledWith(
      'oldPassword',
      'Vodafone15@'
    )
  })

  test('should call setChangePasswordErrorDescription when onChangePasswordPress excution failed', async () => {
    changePasswordHelpers.validatePassword = jest.fn(() => true)
    ChangePassordService.changePassword.mockImplementation(() =>
      Promise.reject(changePasswordError)
    )
    const setChangePasswordErrorDescription = jest.fn()

    try {
      await changePasswordHelpers
        .onChangePasswordPress(
          'oldPassword',
          'dummyy@1',
          setChangePasswordErrorDescription
        )
        .catch()
    } catch (error) {}

    expect(setChangePasswordErrorDescription).toHaveBeenCalledWith(
      changePasswordError.errorMessage
    )
  })

  test('should call setChangePasswordErrorDescription when the password is not valid', async () => {
    changePasswordHelpers.validatePassword = jest.fn(() => false)
    ChangePassordService.changePassword = jest.fn()
    const setChangePasswordErrorDescription = jest.fn()

    try {
      await changePasswordHelpers.onChangePasswordPress(
        'oldPassword',
        'newPassword',
        setChangePasswordErrorDescription
      )
    } catch (error) {}

    expect(setChangePasswordErrorDescription).toHaveBeenCalledWith(
      'step_1_put_change_password_password_policy_violation_error_message'
    )
  })
})
