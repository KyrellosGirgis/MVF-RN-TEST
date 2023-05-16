import { LoginStatuses as Status } from '@vfgroup-oneplatform/login'
import { SoftLoginBase } from '@vfgroup-oneplatform/login/BaseClasses'

import { setLoggedInMintUserId } from 'App/Screens/Login/Implementations/Login.helper'

import VerifyCodeSingleton from 'App/Screens/Login/VerifyCode/VerifyCodeImplementation'

import { LOGIN_TYPES } from 'App/Utils/Enums'
import { SMSLoginProvideTAN, loadOIDCToken } from 'App/Services/API'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

class SoftLoginImplementation extends SoftLoginBase {
  constructor(
    authConfig = {},
    onLoadingStart = () => {},
    onLoadingEnd = () => {}
  ) {
    super(authConfig, onLoadingStart, onLoadingEnd)
    this.maxLength = 14
    this.authStatus = {
      success: {
        status: Status.Success,
        response: {}
      },
      verificationCodeFailure: {
        status: Status.Failed,
        errorMessage: 'verification_error_code_is_not_correct',
        subErrorMessage: 'Please_try_again'
      },
      phoneNumberFailure: {
        status: Status.Failed,
        errorMessage: 'An error occurred',
        subErrorMessage: 'Please_try_again'
      }
    }
  }

  getAuthConfig = () => {
    return this.__authConfig
  }

  validatePhone = (phoneNumber) => {
    const regex = /^[0-9]{10,18}$/
    return regex.test(phoneNumber)
  }

  onCodeSubmit = async (phoneNumber, verificationCode) => {
    try {
      const processId = VerifyCodeSingleton.authConfig?.processId
      const response = await SMSLoginProvideTAN(verificationCode, processId)
      await loadOIDCToken()

      return {
        status: Status.Success,
        response
      }
    } catch (error) {
      return error
    }
  }

  onLoginStart = () => {
    this.__onLoadingStart()
  }

  onVerifyCodeSuccess = async (response = {}) => {
    // dispatch(updateUser({ isSoftLogin: true }))
    this.__onLoadingEnd()
    EncryptedStorage.setItem(STORAGE_KEYS.loginType, LOGIN_TYPES.SMS)
    await setLoggedInMintUserId(response?.data?.parameters?.userId)
  }
}

export default SoftLoginImplementation
