import React, { useState } from 'react'

import ChangePassword from '@vfgroup-oneplatform/framework/ChangePassword'

import {
  validatePassword,
  onChangePasswordPress
} from './ChangePasswordScreen.helpers'

import { NavigationFunctions } from 'App/Containers'

const ChangePasswordScreen = () => {
  const [changePasswordErrorDescription, setChangePasswordErrorDescription] =
    useState('change_password_modal_failure_subtitle')
  const onClose = () => {
    NavigationFunctions.popToTop()
    return null
  }
  const onChangePassword = (currentPassword: string, newPassword: string) =>
    onChangePasswordPress(
      currentPassword,
      newPassword,
      setChangePasswordErrorDescription
    )

  return (
    <ChangePassword
      testID="changePasswordTestId"
      validateNewPassword={validatePassword}
      onChangePasswordPress={onChangePassword}
      onClosePress={onClose}
      onSuccess={onClose}
      changePasswordErrorDescription={changePasswordErrorDescription}
      invalidNewPasswordHelperText="change_password_invalid_new_password_helper_text"
    />
  )
}

export default ChangePasswordScreen
