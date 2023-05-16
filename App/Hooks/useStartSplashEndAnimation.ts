import { useEffect } from 'react'

import { useRoute } from '@react-navigation/native'

import { store } from 'App/Redux'
import { handleSplashEndAnimation } from 'App/Services/SplashAnimationHandler/SplashAnimationHandler.helpers'
import { handleDeepLinkNavigation } from 'App/Services/Deeplinks/Deeplinks.helper'
import { checkIfJailBrokenOrRooted } from 'App/Utils/Helpers/jailBroken.helpers'
import { SplashProps } from 'App/types/withSplash'
import { AppLifecycleManager } from 'App/Services/AppLifecycleManager/AppLifecycleManager'

type UseStartSplashEndAnimationProps = {
  LogoViewRef: any
  splashProps: SplashProps
  onStartSplashEndAnimation?: Function
  handleDeeplinking?: boolean
  screenName?: string
}

const useStartSplashEndAnimation = ({
  LogoViewRef,
  splashProps,
  screenName = '',
  onStartSplashEndAnimation,
  handleDeeplinking = false
}: UseStartSplashEndAnimationProps) => {
  const {
    params: { animateSplash }
  } = useRoute<any>()
  let currentScreenName: string = screenName

  const { startSplashEndingAnimation, setSplashMode } = splashProps

  const startSplashEndAnimation = async () => {
    onStartSplashEndAnimation?.()
    await handleSplashEndAnimation({
      LogoViewRef: LogoViewRef?.current,
      isSplashAnimtaed: animateSplash,
      startSplashEndingAnimation,
      setSplashMode,
      screenName: currentScreenName
    })
  }

  const setCurrentScreenName = (screenName: string) => {
    currentScreenName = screenName
  }

  const handleIfOpenedFromDeeplink = async () => {
    const { deeplinkUrl } = store.getState().app

    if (deeplinkUrl && handleDeeplinking) {
      await handleDeepLinkNavigation(deeplinkUrl, setCurrentScreenName)
    }
  }

  useEffect(() => {
    setTimeout(async () => {
      await handleIfOpenedFromDeeplink()
      await checkIfJailBrokenOrRooted() // to stop splash to show jailbroken alert
      await startSplashEndAnimation()
      AppLifecycleManager.executeEndSplashAnimationTasks()
    }, 0)
  }, [])
}

export default useStartSplashEndAnimation
