import EncryptedStorage from './StorageWrappers/EncryptedStorage'

import STORAGE_KEYS from './StorageWrappers/StorageKeys.constants'

import { LOGIN_TYPES } from 'App/Utils/Enums'

export const isUpfront = async () => {
  return (
    (await EncryptedStorage.getItem(STORAGE_KEYS.loginType)) ===
    LOGIN_TYPES.UPFRONT
  )
}

export const isSMS = async () => {
  return (
    (await EncryptedStorage.getItem(STORAGE_KEYS.loginType)) === LOGIN_TYPES.SMS
  )
}

export const isSeamless = async () => {
  return (
    (await EncryptedStorage.getItem(STORAGE_KEYS.loginType)) ===
    LOGIN_TYPES.SEAMLESS
  )
}
