import { LoginManager } from '@vfgroup-oneplatform/login'

import {
  BuildLoginManagerConfigProps,
  StartLoginFlow
} from './LoginFlowManager.d'

import { UPFRONT_LOGIN_MODES } from './LoginFlowManager.constants'

import { isSeamless } from 'App/Services/Helpers'

import { NavigationFunctions } from 'App/Containers/'
import SoftLoginImplementation from 'App/Screens/Login/Implementations/SoftLoginImplementation'

import UpfrontLoginImplementation from 'App/Screens/Login/Implementations/UpfrontLoginImplementation'

import VerifyCodeSingleton from 'App/Screens/Login/VerifyCode/VerifyCodeImplementation'

import SeamlessLoginImplementation from 'App/Screens/Login/Implementations/SeamlessLoginImplementation'
import { AppLifecycleManager } from 'App/Services/AppLifecycleManager/AppLifecycleManager'

const buildLoginManagerConfig = ({
  startSplashEndingAnimation,
  enableSeamless,
  disableEndAnimationAndShowSpinnerForSeamless,
  enableSplashAnimation
}: BuildLoginManagerConfigProps) => {
  const startSplashEndingAnimationfn =
    enableSplashAnimation ||
    (enableSeamless && !disableEndAnimationAndShowSpinnerForSeamless)
      ? startSplashEndingAnimation
      : () => {}

  const loginConfig = [
    {},
    startSplashEndingAnimationfn,
    async () => {
      AppLifecycleManager.executeOnLoginEndTasks(
        (await isSeamless()) && !disableEndAnimationAndShowSpinnerForSeamless
      )
    }
  ]
  return {
    renderLoginIconView: undefined,
    renderVerifyLoginIconView: undefined,
    verifyCode: VerifyCodeSingleton,
    soft: new SoftLoginImplementation(...loginConfig),
    upfront: new UpfrontLoginImplementation(...loginConfig),
    ...(enableSeamless && {
      seamless: new SeamlessLoginImplementation(
        ...loginConfig,
        disableEndAnimationAndShowSpinnerForSeamless
      )
    })
  }
}

const startLoginFlow = async ({
  splashProps,
  enableSeamless,
  disableEndAnimationAndShowSpinnerForSeamless,
  enableSplashAnimation
}: StartLoginFlow) => {
  const { startSplashEndingAnimation, dismissSplash, endingDuration } =
    splashProps

  const loginConfig = await buildLoginManagerConfig({
    startSplashEndingAnimation,
    enableSeamless: enableSeamless,
    disableEndAnimationAndShowSpinnerForSeamless,
    enableSplashAnimation
  })
  const onNext = await new LoginManager(loginConfig, NavigationFunctions).init()
  onNext()

  enableSplashAnimation &&
    setTimeout(() => {
      dismissSplash()
    }, endingDuration + 300)
}

const startBanLevelLoginFlow = async () => {
  const upfrontLoginConfig = [
    {},
    () => {},
    () => AppLifecycleManager.executeOnLoginEndTasks(false),
    UPFRONT_LOGIN_MODES.ACCESS_SECURE_CONTENT
  ]
  const loginConfig = {
    upfront: new UpfrontLoginImplementation(...upfrontLoginConfig)
  }

  const onNext = await new LoginManager(loginConfig, NavigationFunctions).init()
  onNext()
}

export { startLoginFlow, startBanLevelLoginFlow }
