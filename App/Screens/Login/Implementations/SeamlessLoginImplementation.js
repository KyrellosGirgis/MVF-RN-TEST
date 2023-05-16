import { LoginStatuses as Status } from '@vfgroup-oneplatform/login'
import { SeamlessLoginBase } from '@vfgroup-oneplatform/login/BaseClasses'

import { clearOSCookies } from 'App/Services/CookiesManager/CookiesManager'

import { setLoggedInMintUserId } from 'App/Screens/Login/Implementations/Login.helper'

import { LOGIN_TYPES } from 'App/Utils/Enums'
import { loadOIDCToken, seamlessLoginDE } from 'App/Services/API'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'
import {
  hideBlurView,
  showBlurView
} from 'App/Containers/AppNavigation/AppNavigation.helpers'

class SeamlessLoginImplementation extends SeamlessLoginBase {
  constructor(
    authConfig = {},
    onLoadingStart = () => {},
    onLoadingEnd = () => {},
    showSpinner = false
  ) {
    super(authConfig, onLoadingStart, onLoadingEnd)
    this.showSpinner = showSpinner
  }

  onLoginStart = () => {
    this.__onLoadingStart()
  }
  onLogin = async () => {
    try {
      this.showSpinner && showBlurView({ showSpinner: true, opacity: 0.8 })
      await clearOSCookies()
      const response = await seamlessLoginDE()
      await loadOIDCToken()

      await EncryptedStorage.setItem(
        STORAGE_KEYS.loginType,
        LOGIN_TYPES.SEAMLESS
      )
      await setLoggedInMintUserId(response?.data?.userId)

      this.__onLoadingEnd()

      return {
        status: Status.Success,
        response
      }
    } catch (error) {
      return {
        status: Status.Failed,
        response: error
      }
    } finally {
      this.showSpinner && hideBlurView()
    }
  }

  onError = () => {}
  onSuccess = () => {}
}

export default SeamlessLoginImplementation
