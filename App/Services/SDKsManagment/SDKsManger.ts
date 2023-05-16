import { UserThirdPartyPermissions } from './UserThirdPartyPermissions.d'

import { startOrStopSDKsTable } from './SDKsManger.helpers'

import { store } from 'App/Redux'

const getValueWithDefault = (
  value: boolean | undefined,
  defaultValue: boolean
) => {
  return value === undefined ? defaultValue : value
}

const updateSDKsStatus = (
  userThirdPartyPermissionsChanged: UserThirdPartyPermissions = {}
) => {
  const userThirdPartyPermissions = {
    ...store.getState().userThirdPartyPermissions.userThirdPartyPermissions,
    ...userThirdPartyPermissionsChanged
  }
  const {
    NetworkOptimizationPermission,
    PersonalizedNetworkOptimizationPermission
  } = userThirdPartyPermissions.NetperformPermissions || {}

  const startOrStopSDKsTableUpdated: { [key: string]: boolean } = {
    AdobeAnalyticsTracking: getValueWithDefault(
      userThirdPartyPermissions.LIOPT,
      true
    ),
    AdobeAudienceManager: getValueWithDefault(
      userThirdPartyPermissions.LIOM,
      false
    ),
    AdobeTargetOffers: getValueWithDefault(
      userThirdPartyPermissions.LIOM ||
        userThirdPartyPermissions.LINBA ||
        userThirdPartyPermissions.LIOPT,
      false
    ),
    Tealium: getValueWithDefault(userThirdPartyPermissions.LIOPT, false),
    Crashlytics: getValueWithDefault(userThirdPartyPermissions.LIOPT, true),
    AppDynamics: getValueWithDefault(userThirdPartyPermissions.LIOPT, true),
    AirshipTags: getValueWithDefault(
      userThirdPartyPermissions.LIOM &&
        (userThirdPartyPermissions.LINBA || userThirdPartyPermissions.LIOPT),
      true
    ),
    Netperform: getValueWithDefault(NetworkOptimizationPermission, false),
    PersonalizedNetperform: getValueWithDefault(
      PersonalizedNetworkOptimizationPermission,
      false
    ),
    Adjust: getValueWithDefault(userThirdPartyPermissions.LIOM, false)
  }

  Object.keys(startOrStopSDKsTableUpdated).forEach(function (key) {
    startOrStopSDKsTable[key](startOrStopSDKsTableUpdated[key])()
  })
}

export { updateSDKsStatus }
