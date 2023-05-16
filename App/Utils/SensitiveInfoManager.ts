import SInfo from 'react-native-sensitive-info'

const SHARED_PERFS = 'MeinVodafoneSharedPerfs'
const KEYCHAIN_SERVICE = 'MeinVodafoneKeychain'
const keyChainOptions = {
  sharedPreferencesName: SHARED_PERFS,
  keychainService: KEYCHAIN_SERVICE
}
async function getItem<T>(key: string): Promise<T | null> {
  const value = await SInfo.getItem(key, keyChainOptions)
  return value ? JSON.parse(value)?.[key] || null : null
}
async function setItem<T>(key: string, value: T): Promise<void> {
  SInfo.setItem(key, JSON.stringify({ [key]: value }), keyChainOptions)
}
async function removeItem(key: string): Promise<void> {
  SInfo.deleteItem(key, keyChainOptions)
}

export { getItem, setItem, removeItem }
