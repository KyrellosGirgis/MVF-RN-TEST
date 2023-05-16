import { UpfrontLoginBase } from '@vfgroup-oneplatform/login/BaseClasses'

import { LoginStatuses as Status } from '@vfgroup-oneplatform/login'

import {
  upfrontLogin,
  backupAndClearLoginData,
  restoreLoginData
} from './UpfrontLoginImplementation.helper'

import { webURLs } from 'App/Services'
import { clearOSCookies } from 'App/Services/CookiesManager/CookiesManager'
import { UPFRONT_LOGIN_MODES } from 'App/Services/LoginFlowManager/LoginFlowManager.constants'
import { AppLifecycleManager } from 'App/Services/AppLifecycleManager/AppLifecycleManager'
import { openExternalWebView } from 'App/Utils/Helpers/generic.helpers'

class UpfrontLoginImplementation extends UpfrontLoginBase {
  constructor(authConfig, onLoadingStart, onLoadingEnd, mode) {
    super(authConfig, onLoadingStart, onLoadingEnd)
    this.mode = mode
  }

  rememberMe = true
  showRememberMe = true

  getAuthConfig = () => {
    return this.__authConfig
  }

  getIsBiometricsLoginEnabled = () => {
    return false
  }

  validatePhone = (phoneNumber) => {
    return true
  }

  validateEmail = (userName) => {
    return true
  }

  validatePassword = (password) => {
    return true
  }

  onRememberMeChange = (rememberMe) => {
    this.rememberMe = rememberMe
  }

  onForgetPassword = () => {
    try {
      openExternalWebView(webURLs.forgotPasswordURL)
    } catch (err) {}
  }

  onRegister = () => {
    try {
      openExternalWebView(webURLs.registerationURL)
    } catch (err) {}
  }

  onLoginStart = () => {
    this.__onLoadingStart()
  }

  onLogin = async (userName, password) => {
    const loginCredentials = { userName, password, rememberMe: this.rememberMe }
    const isBanLevelLogin =
      this.mode === UPFRONT_LOGIN_MODES.ACCESS_SECURE_CONTENT

    let oldLoginData
    try {
      isBanLevelLogin && (oldLoginData = await backupAndClearLoginData())
      await clearOSCookies()

      await upfrontLogin(loginCredentials)

      isBanLevelLogin &&
        (await AppLifecycleManager.executeOnBanLevelLoginTasks())

      this.__onLoadingEnd()
      return {
        status: Status.Success,
        response: {}
      }
    } catch (error) {
      isBanLevelLogin && (await restoreLoginData(oldLoginData))
      return error?.hideError || error
    }
  }
}

export default UpfrontLoginImplementation
