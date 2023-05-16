import { LoginStatuses as Status } from '@vfgroup-oneplatform/login'

import { ErrorType } from 'App/Services/API/Requests/Common/ErrorTypes'

import { isDeviceConnectedToNetwork } from 'App/Utils/Helpers/generic.helpers'
import { ErrorTypeObject } from 'App/Screens/Login/LoginErrorTray/LoginError'
import LoginErrorTrayBody from 'App/Screens/Login/LoginErrorTray/LoginErrorTrayBody'

import { showModal } from 'App/Containers/AppModal/AppModal.helpers'

const NoConnectionErrorObject = {
  status: Status.Failed,
  errorMessage: 'no_connection_error_body_message'
}
const unreachableServerErrorObject = {
  status: Status.Failed,
  errorMessage: 'unreachable_server_body_message'
}
const handleGenericApiErrorsIfNeeded = async (error: any) => {
  const isConnected = await isDeviceConnectedToNetwork()
  if (!isConnected) {
    return { finalError: NoConnectionErrorObject, isGeneric: true }
  }
  if (!error?.response) {
    return { finalError: unreachableServerErrorObject, isGeneric: true }
  }
  return { finalError: error?.response }
}

const showErrorBasedOnType = (errorObject: ErrorTypeObject) => {
  if (errorObject?.Type === ErrorType.Tray) {
    const loginErrorConfig = {
      title: 'login_error',
      modalBody:
        errorObject.CTAHandler &&
        LoginErrorTrayBody({
          errorMessage: errorObject.body,
          CTAhandler: errorObject.CTAHandler
        })
    }
    showModal(loginErrorConfig)
  } else if (errorObject?.Type === ErrorType.Inline) {
    return {
      status: Status.Failed,
      errorMessage: errorObject.body
    }
  }
}

export { handleGenericApiErrorsIfNeeded, showErrorBasedOnType }
