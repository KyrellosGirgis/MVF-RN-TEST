import { Platform } from 'react-native'

import {
  handleSplashEndAnimation,
  setLogoPosition
} from 'App/Services/SplashAnimationHandler/SplashAnimationHandler.helpers'
import Routes from 'App/Containers/AppNavigation/Routes'

jest.mock('App/Utils/Helpers/generic.helpers', () => {
  return {
    getCurrentScreenName: jest.fn(() => 'HomeScreen')
  }
})

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native')
  RN.NativeModules.CustomApiCallModule = {
    getRequestNoRedirectionsWithUrl: jest.fn()
  }
  RN.NativeModules.SettingsManager = {
    settings: { AppleLocale: 'en-US', AppleLanguages: ['en-US'] }
  }
  RN.NativeModules.ExitAppModule = {
    exitApp: jest.fn()
  }

  RN.Dimensions.get = () => {
    return { width: 4, height: 4 }
  }
  return RN
})

describe('Test splashAnimationHandler', () => {
  const setSplashLogoPositionObject = { setSplashLogoPosition: jest.fn() }
  const handleSplashEndAnimationProps = {
    LogoViewRef: {
      measure: jest.fn(),
      setNativeProps: jest.fn(),
      _children: [{ setNativeProps: jest.fn() }]
    },
    setSplashMode: jest.fn(),
    startSplashEndingAnimation: () => {
      return new Promise((resolve, reject) => {
        resolve(() => jest.fn())
      })
    },
    isSplashAnimtaed: true
  }

  it(' Ensure that  setLogoPosition call setSplashLogoPosition with the right calculated parameters ', async () => {
    Platform.OS = 'android'

    setLogoPosition(10, 10, setSplashLogoPositionObject)
    expect(
      setSplashLogoPositionObject.setSplashLogoPosition
    ).toHaveBeenCalledWith({ logoX: 24, logoY: 23.5 })
  })

  it('Ensure that handleSplashEndAnimation call  setNativeProps and setSplashMode ', () => {
    handleSplashEndAnimation({
      ...handleSplashEndAnimationProps,
      screenName: Routes.HomeScreen
    })
    expect(handleSplashEndAnimationProps.setSplashMode).toHaveBeenCalled()
    expect(
      handleSplashEndAnimationProps.LogoViewRef.setNativeProps
    ).toHaveBeenCalled()
  })
})
