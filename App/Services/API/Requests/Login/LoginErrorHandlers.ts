import LoginErrors from 'App/Screens/Login/LoginErrorTypes'
import {
  handleGenericApiErrorsIfNeeded,
  showErrorBasedOnType
} from 'App/Services/API/Requests/Common/Requests.helpers'
import { ErrorFiveHundreds } from 'App/Services/API/Requests/Common/ErrorTypes'

const handleUpFrontLoginAPIError = async (error: any) => {
  const { isGeneric, finalError } = await handleGenericApiErrorsIfNeeded(error)
  if (isGeneric) {
    return finalError
  }
  const { data, status } = finalError
  const message: string = data?.operationError?.code
  let errorObject = LoginErrors.StartPost[message]

  if (!errorObject) {
    errorObject = getErrorObject500sOrElse(status)
  }
  return showErrorBasedOnType(errorObject)
}

const handleSMSLoginProvideTANError = async (error: any) => {
  const { isGeneric, finalError } = await handleGenericApiErrorsIfNeeded(error)
  if (isGeneric) {
    return finalError
  }
  const { data, status } = finalError
  const message: string = data?.operationError?.code
  let errorObject = LoginErrors.Step2[message]

  if (!errorObject) {
    switch (status) {
      case 403:
        errorObject = LoginErrors.Step2.step_2_403
        break
      case 500:
        errorObject = LoginErrors['5xx']
        break
      default:
        errorObject = LoginErrors.Else
        break
    }
  }

  return showErrorBasedOnType(errorObject)
}

const handleOIDCError = async (error: any) => {
  const { isGeneric, finalError } = await handleGenericApiErrorsIfNeeded(error)
  return isGeneric
    ? finalError
    : showErrorBasedOnType(LoginErrors.OIDC.OIDC_Authorize)
}

const handleVerifyCaptchaCodeThenLoginApiError = async (error: any) => {
  if (error?.response?.data.captcha_validation_failed) {
    return LoginErrors.Captcha
  }
  return await handleUpFrontLoginAPIError(error)
}

const getErrorObject500sOrElse = (status: number) =>
  ErrorFiveHundreds.includes(status) ? LoginErrors['5xx'] : LoginErrors.Else

export {
  handleUpFrontLoginAPIError,
  showErrorBasedOnType,
  handleSMSLoginProvideTANError,
  handleOIDCError,
  handleVerifyCaptchaCodeThenLoginApiError
}
