import {
  Dimensions,
  NativeEventEmitter,
  NativeModules,
  Platform
} from 'react-native'

const ShakeModule = new NativeEventEmitter(NativeModules.RNShakeEvent)
const FlexInspector = NativeModules.FlexModule

const WindowDimenions = Dimensions.get('window')

const exitApp = NativeModules.ExitAppModule.exitApp
const openAndroidSecuritySettings =
  Platform.OS === 'android' &&
  NativeModules.RNAndroidDeviceSettings.securitySettings
const openAndroidPermissionSettings =
  Platform.OS === 'android' &&
  NativeModules.RNAndroidDeviceSettings.openPermissionSettings

export {
  ShakeModule,
  FlexInspector,
  WindowDimenions,
  exitApp,
  openAndroidSecuritySettings,
  openAndroidPermissionSettings
}
