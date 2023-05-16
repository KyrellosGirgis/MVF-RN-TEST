import React, { useEffect } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { useColorScheme } from 'react-native'
import { ThemeProvider } from '@vfgroup-oneplatform/foundation/Components/Themes'

import {
  withDisplayOptions,
  OptionsEnum
} from '@vfgroup-oneplatform/framework/Settings/DisplayOptions'

import { SafeAreaProvider } from 'react-native-safe-area-context'

import { getThemeColors } from 'App/Themes'

import { store } from 'App/Redux'

import { AppNavigation } from 'App/Containers'
import { BlurView, OfflineModeAlert } from 'App/Components'
import useAppOpeningBiometricsAuth from 'App/Services/AppBiometrics/useAppOpeningBiometricsAuth'
import { listenForEvent } from 'App/Services/AppEventEmitter/AppEventEmitter'
import { useAppState, useForceUpdate } from 'App/Hooks'
import { AppEvents } from 'App/Services/AppEventEmitter/AppEvents'

import { AppLifecycleManager } from 'App/Services/AppLifecycleManager/AppLifecycleManager'
import AppModal from 'App/Containers/AppModal/AppModal'
import CaptchaModal from 'App/Containers/AppModal/CaptchaModal/CaptchaModal'

import { _persistor } from 'App/Redux/store'

function App(props: AppType) {
  const colorScheme = useColorScheme()
  const {
    authenticateUsingBiometricsWrapper,
    onBackgroundHandler,
    onForegroundHandler
  } = useAppOpeningBiometricsAuth()
  const handelDisplayOptions = getThemeColors(
    props.displayOption === OptionsEnum.auto
      ? colorScheme!
      : props.displayOption
  )
  const forceUpdate = useForceUpdate()

  useAppState({
    onForeground: () => {
      AppLifecycleManager.executeOnForegroundTasks(onForegroundHandler)
    },
    onBackground: () => {
      AppLifecycleManager.executeOnBackgroundTasks(onBackgroundHandler)
    }
  })

  useEffect(() => {
    AppLifecycleManager.executeAppBootstrapTasks(props)
    listenForEvent(AppEvents.LANGUAGE_CHANGED, () => {
      forceUpdate()
    })
  }, [])

  return (
    <SafeAreaProvider>
      <ThemeProvider theme={handelDisplayOptions}>
        <OfflineModeAlert />

        <Provider store={store}>
          <PersistGate loading={null} persistor={_persistor}>
            <AppNavigation />
          </PersistGate>
        </Provider>

        <BlurView
          unlockButton={{
            onPress: authenticateUsingBiometricsWrapper,
            title: 'unlock'
          }}
        />
        <AppModal />
        <CaptchaModal />
      </ThemeProvider>
    </SafeAreaProvider>
  )
}

interface AppType {
  displayOption: string
  keys: any
}

export default withDisplayOptions(App)
