import { updateNetperformSDKStatus } from 'App/Services/SDKsManagment/SDKs/NetPerform/Netperform.helper'
import { NetperformUserStatus } from 'App/Services/SDKsManagment/SDKs/NetPerform/Netperform.constants'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import { getHashedMintUserId } from 'App/Utils/Helpers/generic.helpers'

const enablePersonalizedServicePermission = async (value: boolean) => {
  await updateNetperformSDKStatus({ isPersonalized: value })
  await EncryptedStorage.updateObject(await getHashedMintUserId(), {
    [NetperformUserStatus.isPersonalized]: value
  })
}

const enableNetperformPermission = async (value: boolean) => {
  await updateNetperformSDKStatus({ status: value })
  await EncryptedStorage.updateObject(await getHashedMintUserId(), {
    [NetperformUserStatus.status]: value
  })
}

const disableNetperformPermissions = async () => {
  await updateNetperformSDKStatus({ status: false, isPersonalized: false })
  await EncryptedStorage.setObject(await getHashedMintUserId(), {
    [NetperformUserStatus.status]: false,
    [NetperformUserStatus.isPersonalized]: false
  })
}

export {
  enableNetperformPermission,
  enablePersonalizedServicePermission,
  disableNetperformPermissions
}
