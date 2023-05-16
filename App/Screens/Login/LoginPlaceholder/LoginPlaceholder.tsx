import React, { useLayoutEffect } from 'react'

import { useRoute } from '@react-navigation/native'

import { startLoginFlow } from 'App/Services/LoginFlowManager/LoginFlowManager'
import { SplashProps } from 'App/types'

interface LoginPlaceholder {
  splashProps: SplashProps
}
const LoginPlaceholder = ({ splashProps }: LoginPlaceholder) => {
  const {
    enableSplashAnimation,
    enableSeamless,
    disableEndAnimationAndShowSpinnerForSeamless
  } = useRoute()?.params

  useLayoutEffect(() => {
    startLoginFlow({
      splashProps,
      enableSeamless,
      disableEndAnimationAndShowSpinnerForSeamless,
      enableSplashAnimation
    })
  }, [])

  return <></>
}

export default LoginPlaceholder
