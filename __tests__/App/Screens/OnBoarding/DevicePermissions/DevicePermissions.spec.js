import {
  androidPermissionTypes,
  IOSPermissionTypes
} from '@vfgroup-oneplatform/foundation/PermissionsManager/permissionTypes'

import { getDevicePermissions } from 'App/Screens/OnBoarding/DevicePermissions/DevicePermissions'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

const Platform = require('react-native').Platform

describe('Test Permissions function in ios platform', () => {
  beforeEach(() => {
    EncryptedStorage.getBoolean = jest.fn(() => false)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should return expected permissions object withToggleAsText = false', async () => {
    const resultPermissions = await getDevicePermissions()
    const expectedPermissions = [
      {
        title: 'location_permission_title',
        description: 'location_permission_description_ios',
        icon: 'icLocation',
        permissionsKey: IOSPermissionTypes.LOCATION_WHEN_IN_USE,
        id: 'OBpermissionLocation',
        subPermissions: [],
        withToggleAsText: false
      },
      {
        title: 'push_notifications_permission_title',
        description: 'push_notifications_permission_description',
        icon: 'ic_Notification',
        permissionsKey: IOSPermissionTypes.PUSH_NOTIFICATIONS,
        id: 'OBpushNotification',
        subPermissions: [],
        withToggleAsText: false
      }
    ]

    expect(resultPermissions).toEqual(expectedPermissions)
  })

  test('should return expected permissions object withToggleAsText = true', async () => {
    EncryptedStorage.getBoolean = jest.fn(() => true)

    const resultPermissions = await getDevicePermissions()
    const expectedPermissions = [
      {
        title: 'location_permission_title',
        description: 'location_permission_description_ios',
        icon: 'icLocation',
        permissionsKey: IOSPermissionTypes.LOCATION_WHEN_IN_USE,
        id: 'OBpermissionLocation',
        subPermissions: [],
        withToggleAsText: true
      },
      {
        title: 'push_notifications_permission_title',
        description: 'push_notifications_permission_description',
        icon: 'ic_Notification',
        permissionsKey: IOSPermissionTypes.PUSH_NOTIFICATIONS,
        id: 'OBpushNotification',
        subPermissions: [],
        withToggleAsText: true
      }
    ]

    expect(resultPermissions).toEqual(expectedPermissions)
  })
})

describe('Test Permissions function in android platform', () => {
  beforeAll(() => {
    Platform.OS = 'android'
    Platform.select = (obj) => obj.android
    EncryptedStorage.getBoolean = jest.fn(() => false)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should return expected permissions object withToggleAsText = false', async () => {
    const resultPermissions = await getDevicePermissions()
    const expectedPermissions = [
      {
        title: 'location_permission_title',
        description: 'location_permission_description_android',
        icon: 'icLocation',
        permissionsKey: androidPermissionTypes.ACCESS_FINE_LOCATION,
        id: 'OBpermissionLocation',
        subPermissions: [],
        withToggleAsText: false
      },
      {
        title: 'phone_calls_permission_title',
        description: 'phone_calls_permission_description',
        icon: 'ic_Landline_Or_Call_Minutes',
        permissionsKey: androidPermissionTypes.READ_PHONE_STATE,
        id: 'OBpermissionCalls',
        subPermissions: [],
        withToggleAsText: false
      }
    ]

    expect(resultPermissions).toEqual(expectedPermissions)
  })

  test('should return expected permissions object when Platform.Version < 28 and withToggleAsText = false ', async () => {
    Object.defineProperty(Platform, 'Version', {
      get: () => 27
    })

    const resultPermissions = await getDevicePermissions()
    const expectedPermissions = [
      {
        title: 'location_permission_title',
        description: 'location_permission_description_android',
        icon: 'icLocation',
        permissionsKey: androidPermissionTypes.ACCESS_FINE_LOCATION,
        id: 'OBpermissionLocation',
        subPermissions: [],
        withToggleAsText: false
      }
    ]

    expect(resultPermissions).toEqual(expectedPermissions)
  })
})
