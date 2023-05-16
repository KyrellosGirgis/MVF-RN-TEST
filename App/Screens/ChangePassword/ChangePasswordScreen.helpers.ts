import { changePassword } from 'App/Services/API/Requests/ChangePassword/changePassword'

const validatePassword = (password: string) => {
  return new RegExp(
    '^(?=[\\S].*[0-9])(?=.*[a-zäöüß])(?=.*[\\-\\!#\\$%\\^&\\*\\(\\)_\\+\\|~\\=`\\{\\}\\[\\]\\:";\'\\<\\>\\?,\\.\\/@])[\\S]{8,64}$'
  ).test(password)
}

const onChangePasswordPress = async (
  currentPassword: string,
  newPassword: string,
  setChangePasswordErrorDescription: Function
) => {
  handlePasswordValidationStep(newPassword, setChangePasswordErrorDescription)
  try {
    await changePassword(currentPassword, newPassword)
  } catch (error) {
    setChangePasswordErrorDescription(error.errorMessage)
    throw error
  }
}

const handlePasswordValidationStep = (
  newPassword: string,
  setChangePasswordErrorDescription: Function
) => {
  if (!validatePassword(newPassword)) {
    setChangePasswordErrorDescription(
      'step_1_put_change_password_password_policy_violation_error_message'
    )
    throw null
  }
}

export { validatePassword, onChangePasswordPress }
