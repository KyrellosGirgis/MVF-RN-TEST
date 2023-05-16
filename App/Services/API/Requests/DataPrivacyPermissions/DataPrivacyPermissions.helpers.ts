import { DATA_PRIVACY_PERMISSIONS } from './DataPrivacyPermissions.constants'

import { loadBEWPermissions } from './BEWPermissions'

import { UserDataServicesTypes } from 'App/Services/API/Requests/userData/userData.d'
import {
  BEWPermission,
  BEWPermissionsReferenceDetails,
  BEWPermissionsStatus
} from 'App/Services/API/Requests/DataPrivacyPermissions/DataPrivacyPermissions.d'

import { store } from 'App/Redux'
import { getHashedMintUserId } from 'App/Utils/Helpers/generic.helpers'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import { NetperformUserStatus } from 'App/Services/SDKsManagment/SDKs/NetPerform/Netperform.constants'
import { updateNetperformSDKStatus } from 'App/Services/SDKsManagment/SDKs/NetPerform/Netperform.helper'

const mapBEWSelectionsToRequestBody = (
  bewPermissionsStatus: BEWPermissionsStatus
) => {
  const {
    advBEWVersion,
    devBEWVersion,
    originalDEV,
    originalADV,
    shouldShowBEWADV,
    shouldShowBEWDEV
  } = bewPermissionsStatus

  return {
    bewVersion: `V${advBEWVersion}${devBEWVersion}`,
    permissionList: [
      {
        permissionId: 'Original_DEV',
        permissionValue: originalDEV
      },
      {
        permissionId: 'Original_ADV',
        permissionValue: originalADV
      },
      {
        permissionId: 'DEV',
        permissionValue: shouldShowBEWDEV
          ? !!bewPermissionsStatus[DATA_PRIVACY_PERMISSIONS.DEV]
          : null
      },
      {
        permissionId: 'ADV',
        permissionValue: shouldShowBEWADV
          ? !!bewPermissionsStatus[DATA_PRIVACY_PERMISSIONS.ADV]
          : null
      }
    ]
  }
}

const getPermissionVersion = (
  permissionBEWReferenceDetails: BEWPermissionsReferenceDetails[] | undefined,
  permission: string
) => {
  return permissionBEWReferenceDetails?.find(
    ({ permissionId }) => permissionId === permission
  )?.bewVersion
}

const getPrivacyPermissionsStatusFromBE = async () => {
  const { type } = store?.getState()?.appUserData?.currentlyActiveSubscription
  const isBEWEligibleSubscription = [
    UserDataServicesTypes.mobile,
    UserDataServicesTypes.fixednet
  ].includes(type)

  var bewPermissionsStatus: BEWPermissionsStatus = {}

  if (isBEWEligibleSubscription) {
    try {
      const bewPermissionData: BEWPermission = await loadBEWPermissions()
      const {
        permissionBEWReferenceDetails,
        showBEW_ADV: shouldShowBEWADV,
        showBEW_DEV: shouldShowBEWDEV,
        Original_ADV: originalADV,
        Original_DEV: originalDEV
      } = bewPermissionData?.customerPartyVBO?.[0]?.marketingPreferences || {}

      bewPermissionsStatus = {
        shouldShowBEWADV,
        shouldShowBEWDEV,
        originalADV,
        originalDEV,
        advBEWVersion: getPermissionVersion(
          permissionBEWReferenceDetails,
          DATA_PRIVACY_PERMISSIONS.ADV
        ),
        devBEWVersion: getPermissionVersion(
          permissionBEWReferenceDetails,
          DATA_PRIVACY_PERMISSIONS.DEV
        )
      }
    } catch (error) {}
  }

  const userNetperformStatus = await EncryptedStorage.getItemParsedToJSON(
    await getHashedMintUserId()
  )
  bewPermissionsStatus.shouldShowNetperform =
    !userNetperformStatus?.[NetperformUserStatus.status]
  updateNetperformSDKStatus(userNetperformStatus)

  return bewPermissionsStatus
}

export { mapBEWSelectionsToRequestBody, getPrivacyPermissionsStatusFromBE }
