import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

const setLoginTokens = async (loginData) => {
  await EncryptedStorage.setItem(
    STORAGE_KEYS.loginData,
    JSON.stringify(loginData)
  )
}

const getLoginTokens = async () => {
  return await EncryptedStorage.getItemParsedToJSON(STORAGE_KEYS.loginData)
}

const clearLoginTokens = async () => {
  await EncryptedStorage.setItem(STORAGE_KEYS.loginData, JSON.stringify({}))
}

const CHARSET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
function bufferToString(buffer) {
  var state = []
  for (var i = 0; i < buffer.byteLength; i += 1) {
    const index = buffer[i] % CHARSET.length
    state.push(CHARSET[index])
  }
  return state.join('')
}

const generateRandom = function (size) {
  const buffer = new Uint8Array(size)
  for (var i = 0; i < size; i += 1) {
    buffer[i] = (Math.random() * CHARSET.length) | 0
  }
  return bufferToString(buffer)
}

const getLoginChecksFromAsyncStorage = async () => {
  return await EncryptedStorage.getBooleanWithDefault({
    isLoggedIn: false
  })
}

const setLoggedInMintUserId = async (id) => {
  id &&
    (await EncryptedStorage.setItem(
      STORAGE_KEYS.loggedInMintUserId,
      String(id)
    ))
}

const getParamsFromUrl = (urlString) => {
  const regex = /[?&]([^=#]+)=([^&#]*)/g,
    params = {}
  let match
  while ((match = regex.exec(urlString))) {
    params[match[1]] = match[2]
  }
  return params
}

export {
  setLoginTokens,
  getLoginTokens,
  clearLoginTokens,
  generateRandom,
  getLoginChecksFromAsyncStorage,
  setLoggedInMintUserId,
  getParamsFromUrl
}
