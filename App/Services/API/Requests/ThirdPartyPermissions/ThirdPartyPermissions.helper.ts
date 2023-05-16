import { getHashing } from './hashing/hashing'

import { getCmsItem } from 'App/Services/StorageWrappers/CMSStorage'

import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

import { getIdent } from 'App/Services/API/Requests/ThirdPartyPermissions/ident/ident'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

import {
  NOTIFICATION_NAME,
  subscriptionTypeHeaderValues,
  THIRD_PARTY_PERMISSIONS
} from 'App/Services/API/Requests/ThirdPartyPermissions/ThirdPartyPermissions.constants'

import { HashedId } from 'App/Services/API/Requests/ThirdPartyPermissions/hashing/hashedId'

import { loadInfo } from 'App/Services/API/Requests/ThirdPartyPermissions/info/info'
import { store } from 'App/Redux'
import {
  Info,
  InfoPayload,
  Permission,
  Permissions
} from 'App/Services/API/Requests/ThirdPartyPermissions/info/info.d'

import { setUserThirdPartyPermissions } from 'App/Redux/UserThirdPartyPermissions/UserThirdPartyPermissions.thunk'

const storeUmid = async (umid: string) => {
  await EncryptedStorage.setItem(STORAGE_KEYS.umid, umid)
}

const storePermissions = (permissions: Permissions) => {
  store.dispatch(
    setUserThirdPartyPermissions({
      LIOM: permissions['LI-OM'],
      LINBA: permissions['LI-NBA'],
      LIOPT: permissions['LI-OPT']
    })
  )
}

const findCurrentActiveSubscriptionHashedId = (hashedIds: HashedId[]) => {
  const currentlyActiveSubscription =
    store.getState().appUserData.currentlyActiveSubscription
  const hashedId: HashedId = hashedIds.find(
    (hashedId) => hashedId.id === currentlyActiveSubscription?.id
  )!

  return hashedId
}

const getAndSaveHashing = async () => {
  const hashedIdsData = await getHashing()
  await EncryptedStorage.setObject(STORAGE_KEYS.hashing, hashedIdsData)
  return hashedIdsData
}

const getUMDIDCookie = async (hashedId: HashedId) => {
  const ident = await getIdent(
    subscriptionTypeHeaderValues[hashedId.type],
    hashedId.hash
  )

  //get UMDID cookie
  const newUmdidCookie: string = ident.headers['set-cookie']?.[0]
    .split(';')[0]
    .split('=')[1]!

  // save UMDID in database
  await EncryptedStorage.setItem(STORAGE_KEYS.umdid, newUmdidCookie)
  return newUmdidCookie
}

const constructInfoRequestBody = async (permissions: Permission) => {
  const privacyCookiePermissionsVersion = await getCmsItem(
    STORAGE_KEYS.CMS_ITEMS.PRIVACY
  )

  return <InfoPayload>{
    permission: permissions,
    notification: [
      {
        name: NOTIFICATION_NAME,
        version:
          privacyCookiePermissionsVersion?.privacy?.cookie_permissions
            ?.consent_version,
        permissions: Object.keys(permissions)
      }
    ]
  }
}

const executeThirPartyPermissionsFlow = async ({
  ignoreCache,
  shouldSavePermissions = true
}: {
  ignoreCache: boolean
  shouldSavePermissions?: boolean
}) => {
  let newUmdidCookie = ''

  if (ignoreCache) {
    // get hashing
    let hashedIdsData = await EncryptedStorage.getItemParsedToJSON(
      STORAGE_KEYS.hashing
    )
    !hashedIdsData && (hashedIdsData = await getAndSaveHashing())

    // get UMID
    const activeUserHashedID: HashedId =
      exports.findCurrentActiveSubscriptionHashedId(hashedIdsData.hashedIds)

    newUmdidCookie = await getUMDIDCookie(activeUserHashedID)
  } else {
    newUmdidCookie = await EncryptedStorage.getItem(STORAGE_KEYS.umdid)
  }

  // get info data (info get)
  const infoData: Info = await loadInfo(newUmdidCookie, ignoreCache)

  storeUmid(infoData.umid)

  shouldSavePermissions && storePermissions(infoData.permissions)

  return infoData
}

const shouldShowThirdPartyStep = async () => {
  const { notificationHistory } = await executeThirPartyPermissionsFlow({
    ignoreCache: true,
    shouldSavePermissions: false
  })
  const privacyCookiePermissionsVersion = (
    await getCmsItem(STORAGE_KEYS.CMS_ITEMS.PRIVACY)
  )?.privacy?.cookie_permissions?.consent_version
  if (typeof privacyCookiePermissionsVersion === 'number') {
    const isPrivacyCookiePermissionsTheHigherVersion =
      notificationHistory.every(
        (notificationHistoryItem) =>
          privacyCookiePermissionsVersion > notificationHistoryItem.version
      )

    const isPermissionMissingInTheHigherVersion = notificationHistory.some(
      (notificationHistoryItem) =>
        notificationHistoryItem.version >= privacyCookiePermissionsVersion &&
        !Object.values(THIRD_PARTY_PERMISSIONS).every((permission) =>
          notificationHistoryItem.permissions.includes(permission)
        )
    )

    return (
      isPrivacyCookiePermissionsTheHigherVersion ||
      isPermissionMissingInTheHigherVersion
    )
  }

  return false
}

export {
  findCurrentActiveSubscriptionHashedId,
  shouldShowThirdPartyStep,
  constructInfoRequestBody,
  executeThirPartyPermissionsFlow,
  storePermissions
}
