import StorageCacheStore from 'App/Services/StorageWrappers/StorageCacheStore/StorageCacheStore'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

describe('Test functions of StorageCacheStore class', () => {
  it('Ensure that getItem of this class call getItem of EncryptedStorage  ', async () => {
    await StorageCacheStore.getItem('Item1')
    expect(EncryptedStorage.getItemParsedToJSON).toHaveBeenCalled()
  })

  it('Ensure that setItem of this class call setItem of EncryptedStorage  ', async () => {
    await StorageCacheStore.setItem('Item1', 'Item1Value')
    expect(EncryptedStorage.setItem).toHaveBeenCalled()
  })

  it('Ensure removeItem of this class call removeItem of EncryptedStorage', async () => {
    await StorageCacheStore.removeItem('Item1')
    expect(EncryptedStorage.removeItem).toHaveBeenCalled()
  })

  it('Ensure clear of this class call multiRemove of EncryptedStorage', async () => {
    EncryptedStorage.getAllKeys = jest.fn(() => ['cache/test1', 'cache/test2'])

    EncryptedStorage.multiRemove = jest.fn()
    await StorageCacheStore.clear()
    expect(EncryptedStorage.getAllKeys).toHaveBeenCalled()
    expect(EncryptedStorage.multiRemove).toHaveBeenCalled()
  })

  it('Ensure that the return from clear function is undefiend if there is no keys cached in AsyncStorage ', async () => {
    EncryptedStorage.getAllKeys = jest.fn(() => [])
    const result = await StorageCacheStore.clear()
    expect(result).toBe(undefined)
  })

  it('Ensure length of this class call getAllKeys of EncryptedStorage and return the right length', async () => {
    EncryptedStorage.getAllKeys = jest.fn(() => ['cache/test1', 'cache/test2'])

    const result = await StorageCacheStore.length()
    expect(EncryptedStorage.getAllKeys).toHaveBeenCalled()
    expect(result).toBe(2)
  })

  it('Esure iterate of this class call  getAllKeys of EncryptedStorage ', async () => {
    EncryptedStorage.getAllKeys = jest.fn(() => ['cache/test1', 'cache/test2'])

    await StorageCacheStore.iterate(() => {})
    expect(EncryptedStorage.getAllKeys).toHaveBeenCalled()
  })

  it('Ensure that the return from iterate function is undefiend if there is no keys cached in AsyncStorage', async () => {
    EncryptedStorage.getAllKeys = jest.fn(() => [])
    const result = await StorageCacheStore.iterate(() => {})
    expect(result).toBe(undefined)
  })
})
