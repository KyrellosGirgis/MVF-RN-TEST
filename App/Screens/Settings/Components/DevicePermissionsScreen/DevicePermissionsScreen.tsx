import React from 'react'
import AppPermissions from '@vfgroup-oneplatform/framework/Settings/AppPermissions'
import {
  ANDROID_CONFIG,
  IOS_CONFIG
} from '@vfgroup-oneplatform/framework/Settings/AppPermissions/Configration'

import { Platform } from 'react-native'

import { NavigationFunctions } from 'App/Containers'
import { navigateToDashboardScreen } from 'App/Screens/Helpers'

const DevicePermissionsScreen = () => {
  const handleOnBack = () => {
    NavigationFunctions.goBack()
  }
  return (
    <AppPermissions
      onClose={navigateToDashboardScreen}
      onBack={handleOnBack}
      PermissionsData={Platform.select({
        ios: IOS_CONFIG,
        android: ANDROID_CONFIG
      })}
      withTray
    />
  )
}
export default DevicePermissionsScreen
