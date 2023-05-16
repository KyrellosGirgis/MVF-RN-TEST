import { Platform, Linking } from 'react-native'

import RNShake from 'react-native-shake'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

import { getItem, setItem } from 'App/Utils/SensitiveInfoManager'

import {
  FlexInspector,
  ShakeModule
} from 'App/Utils/RNNativeModules/generic.RNNativeModules'
import { NavigationFunctions } from 'App/Containers'
import Routes from 'App/Containers/AppNavigation/Routes'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'
import { startNetworkLogging } from 'App/Utils/RNNativeModules/networkLogs.RNNativeModules'
import { isIOS } from 'App/Utils/Helpers/generic.helpers'
import { listenForEvent } from 'App/Services/AppEventEmitter/AppEventEmitter'
import { AppEvents } from 'App/Services/AppEventEmitter/AppEvents'
import {
  handleDeeplinkingWhenAppIsOpened,
  storeDeeplinkInRedux
} from 'App/Services/Deeplinks/Deeplinks.helper'
import { adjustConfig } from 'App/Services/SDKsManagment/SDKs/Adjust/AdjustManager'

const activateFlexShakeListenerForIOS = () => {
  Platform.OS === 'ios' &&
    ShakeModule.addListener('ShakeEvent', () => {
      FlexInspector.toggleFlexBar()
    })
}

const activateDeveloperSettings = () => {
  RNShake.addListener(() => {
    NavigationFunctions.navigate(Routes.DeveloperSettingsScreen)
  })
}

const setAppKey = async () => {
  let appKey: any = await getItem('appKey')

  if (!appKey) {
    appKey = [...new Array(64)].map(() => Math.round(Math.random() * 127))
    await setItem('appKey', JSON.stringify(appKey))
  }
}

const initNetworkRequestsLoggger = async () => {
  const shouldStartLogging = await EncryptedStorage.getBoolean(
    STORAGE_KEYS.shouldLogNetworkRequests
  )
  if (isIOS) {
    shouldStartLogging && startNetworkLogging()
  }
}

const initializeDeeplinksHandling = async () => {
  Linking.getInitialURL().then(storeDeeplinkInRedux)
  adjustConfig?.setDeferredDeeplinkCallbackListener(storeDeeplinkInRedux)

  listenForEvent(AppEvents.DEEP_LINK_URL, ({ url }) => {
    handleDeeplinkingWhenAppIsOpened(url)
  })
}

export {
  activateDeveloperSettings,
  initNetworkRequestsLoggger,
  setAppKey,
  activateFlexShakeListenerForIOS,
  initializeDeeplinksHandling
}
