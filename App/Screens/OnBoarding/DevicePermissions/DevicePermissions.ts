import { Platform } from 'react-native'
import {
  androidPermissionTypes,
  IOSPermissionTypes
} from '@vfgroup-oneplatform/foundation/PermissionsManager/permissionTypes'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

const permissionBuilder = (
  title: string,
  description: string,
  icon: string,
  permissionsKey: string,
  id: string,
  subPermissions: any[],
  withToggleAsText: boolean
) => ({
  title: title,
  description: description,
  icon: icon,
  permissionsKey: permissionsKey,
  id: id,
  subPermissions: subPermissions,
  withToggleAsText: withToggleAsText
})

const getDevicePermissions = async () => {
  const currentPlatform = Platform.OS
  const isOnboardingDevicePermissionsFinished =
    await EncryptedStorage.getBoolean(
      STORAGE_KEYS.isOnboardingDevicePermissionsFinished
    )
  const commonPermissions = [
    permissionBuilder(
      'location_permission_title',
      `location_permission_description_${currentPlatform}`,
      'icLocation',
      currentPlatform === 'ios'
        ? IOSPermissionTypes.LOCATION_WHEN_IN_USE
        : androidPermissionTypes.ACCESS_FINE_LOCATION,
      'OBpermissionLocation',
      [],
      isOnboardingDevicePermissionsFinished
    )
  ]

  const permissionList = {
    ios: [
      ...commonPermissions,
      permissionBuilder(
        'push_notifications_permission_title',
        'push_notifications_permission_description',
        'ic_Notification',
        IOSPermissionTypes.PUSH_NOTIFICATIONS,
        'OBpushNotification',
        [],
        isOnboardingDevicePermissionsFinished
      )
    ],
    android: [
      ...commonPermissions,
      permissionBuilder(
        'phone_calls_permission_title',
        'phone_calls_permission_description',
        'ic_Landline_Or_Call_Minutes',
        androidPermissionTypes.READ_PHONE_STATE,
        'OBpermissionCalls',
        [],
        isOnboardingDevicePermissionsFinished
      )
    ]
  }
  if (currentPlatform === 'android' && Platform.Version < 28) {
    permissionList.android.splice(1, 1)
  }
  return Platform.select({
    android: permissionList.android,
    ios: permissionList.ios
  })
}

export { getDevicePermissions }
