import PermissionsManager from '@vfgroup-oneplatform/foundation/PermissionsManager'
import { IOSPermissionTypes } from '@vfgroup-oneplatform/foundation/PermissionsManager/permissionTypes'

const requestAppTrackingPermission = async () => {
  const permissionList = {
    [IOSPermissionTypes.APP_TRACKING_TRANSPARENCY]: true
  }
  const permissionsManager = new PermissionsManager()
  await permissionsManager.requestPermissions({}, permissionList)
}

export { requestAppTrackingPermission }
