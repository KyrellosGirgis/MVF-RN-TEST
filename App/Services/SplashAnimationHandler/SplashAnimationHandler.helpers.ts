import { Platform, StatusBar } from 'react-native'

import { get, isFunction } from 'lodash'

import { SplashModes } from '@vfgroup-oneplatform/foundation/Splash'

import { HandleSplashEndAnimationParams } from 'App/Services/SplashAnimationHandler/SplashAnimationHandler'

import { WindowDimenions } from 'App/Utils/RNNativeModules/generic.RNNativeModules'
import { SplashTransitionAnimationRoutes } from 'App/Containers/AppNavigation/Routes'

const { height, width } = WindowDimenions

const setLogoPosition = (
  x: number,
  y: number,
  { setSplashLogoPosition }: { setSplashLogoPosition: Function }
) => {
  const logoX = x + 16 - width / 2

  let statusBarHeight = get(StatusBar, 'currentHeight', 0)

  if (Platform.OS === 'android') {
    statusBarHeight = statusBarHeight > 24 ? 0 : 25
  }

  const addY = Platform.OS === 'ios' ? 16 : 15.5

  const logoY = y + addY - (height - statusBarHeight) / 2

  setSplashLogoPosition({ logoX, logoY })
}

const handleSplashEndAnimation = async ({
  LogoViewRef,
  setSplashMode,
  startSplashEndingAnimation,
  isSplashAnimtaed,
  screenName = ''
}: HandleSplashEndAnimationParams) => {
  if (isSplashAnimtaed) {
    if (LogoViewRef && isFunction(LogoViewRef.measure)) {
      LogoViewRef.setNativeProps({
        opacity: 0
      })
    }

    SplashTransitionAnimationRoutes.includes(screenName) &&
      setSplashMode?.(SplashModes.TRANSITION)

    const response = await startSplashEndingAnimation({
      startAfter: 2600
    })
    if (response.done) {
      if (LogoViewRef && isFunction(LogoViewRef.measure)) {
        LogoViewRef.setNativeProps({
          opacity: 1
        })
      }
      response.dismissSplash()
    }
  }
}

const setCurrentLogoPosition = (
  LogoViewRef: any,
  setSplashLogoPosition: Function,
  onPositionChange?: Function
) => {
  if (LogoViewRef.current && isFunction(LogoViewRef.current.measureInWindow)) {
    LogoViewRef.current.measureInWindow((x: number, y: number) => {
      setLogoPosition(x, y, { setSplashLogoPosition })
      onPositionChange && onPositionChange()
    })
  }
}

export { setLogoPosition, handleSplashEndAnimation, setCurrentLogoPosition }
