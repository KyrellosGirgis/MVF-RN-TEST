import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

import { isSeamless, isSMS, isUpfront } from 'App/Services/Helpers'

describe('Test login types helpers ', () => {
  test('Ensure that isUpfront  call getItem from async storage ', async () => {
    isUpfront()
    expect(EncryptedStorage.getItem).toHaveBeenCalled()
  })

  test('Ensure that isSMS  call getItem from async storage ', async () => {
    isSMS()
    expect(EncryptedStorage.getItem).toHaveBeenCalled()
  })

  test('Ensure that isSeamless  call getItem from async storage ', async () => {
    isSeamless()
    expect(EncryptedStorage.getItem).toHaveBeenCalled()
  })
})
