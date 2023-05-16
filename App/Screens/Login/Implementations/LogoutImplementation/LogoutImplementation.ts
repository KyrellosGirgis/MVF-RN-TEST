import { AppLifecycleManager } from 'App/Services/AppLifecycleManager/AppLifecycleManager'

import { AppRoutes, NavigationFunctions } from 'App/Containers'
import { LogOutAPI } from 'App/Services/API'

import {
  hideBlurView,
  showBlurView
} from 'App/Containers/AppNavigation/AppNavigation.helpers'

const logOut = async ({ shouldNavigateToLogin = true } = {}) => {
  showBlurView({ showSpinner: true, opacity: 0.8 })
  try {
    await LogOutAPI()
    AppLifecycleManager.executeOnLogoutTasks()
    if (shouldNavigateToLogin) {
      NavigationFunctions.navigateWithResetAction(AppRoutes.LoginPlaceholder, {
        enableSeamless: false,
        disableEndAnimationAndShowSpinnerForSeamless: false,
        enableSplashAnimation: false
      })
    }
  } finally {
    hideBlurView()
  }
}

export default logOut
