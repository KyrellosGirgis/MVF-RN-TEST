import { getHashedMintUserId } from 'App/Utils/Helpers/generic.helpers'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

describe('Test DataPrivacyStep Helper functions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should return the same hash key for same LoggedIn MintUserId', async () => {
    EncryptedStorage.getItemParsedToJSON = jest.fn(() => 'abc')
    EncryptedStorage.setItem = jest.fn()

    expect(await getHashedMintUserId()).toStrictEqual(
      'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad'
    )
  })
})
