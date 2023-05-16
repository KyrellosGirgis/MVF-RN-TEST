import { Permission } from 'App/Services/API/Requests/ThirdPartyPermissions/info/info.d'

import { THIRD_PARTY_PERMISSIONS } from 'App/Services/API/Requests/ThirdPartyPermissions/ThirdPartyPermissions.constants'

const getThirdPartyPermissionsWithDefaultValue = (value: boolean) =>
  <Permission>{
    [THIRD_PARTY_PERMISSIONS.LI_OPT]: value,
    [THIRD_PARTY_PERMISSIONS.LI_OM]: value,
    [THIRD_PARTY_PERMISSIONS.LI_NBA]: value
  }

export { getThirdPartyPermissionsWithDefaultValue }
