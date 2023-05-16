import { SplashProps } from 'App/types'

export type BuildLoginManagerConfigProps = {
  startSplashEndingAnimation: () => void
  enableSeamless: boolean
  disableEndAnimationAndShowSpinnerForSeamless: () => void
  enableSplashAnimation: boolean
}

export type StartLoginFlow = {
  splashProps: SplashProps
  enableSeamless: boolean
  disableEndAnimationAndShowSpinnerForSeamless: () => void
  enableSplashAnimation: boolean
}
