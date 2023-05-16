import * as ReactNativePermissions from 'react-native-permissions'
import {
  IOSPermissionTypes,
  permissions
} from '@vfgroup-oneplatform/foundation/PermissionsManager/permissionTypes'

import { requestAppTrackingPermission } from 'App/Services/AppLifecycleManager/helpers/executeAppLaunchingTasks.helpers'

jest.mock('react-native-permissions', () =>
  require('react-native-permissions/mock')
)

describe('AppLifecycleMethods helpers', () => {
  afterAll(() => {
    jest.clearAllMocks()
  })

  test('should call requestAppTrackingPermission successfuly', async () => {
    ReactNativePermissions.request = jest.fn()

    await requestAppTrackingPermission()

    expect(ReactNativePermissions.request).toHaveBeenCalledWith(
      permissions[IOSPermissionTypes.APP_TRACKING_TRANSPARENCY]
    )
  })
})
