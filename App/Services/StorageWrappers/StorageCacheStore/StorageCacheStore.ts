import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

const prefix = 'cache/'
const store = EncryptedStorage

const generateKey = (key: string) => `${prefix}${key}`

const AsyncStorageCacheStore = {
  getItem: async (key: string) => {
    const value = await store.getItemParsedToJSON(generateKey(key))
    return value
  },

  setItem: async (key: string, value: string) => {
    await store.setItem(generateKey(key), JSON.stringify(value))
  },

  removeItem: async (key: string) => store.removeItem(generateKey(key)),

  clear: async () => {
    const keys = await store.getAllKeys()
    const filtered = keys.filter((key: string) => key.startsWith(prefix))

    if (filtered.length <= 0) {
      return
    }

    await store.multiRemove(filtered)
  },

  length: async () => {
    const keys = await store.getAllKeys()
    const filtered = keys.filter((key: string) => key.startsWith(prefix))
    return filtered.length
  },

  iterate: async (fn: Function) => {
    const keys = await store.getAllKeys()
    const filtered = keys.filter((key: string) => key.startsWith(prefix))

    if (filtered.length <= 0) {
      return
    }

    const tasks: any = filtered.map(async (key: any) =>
      fn(
        key.replace(new RegExp(`^${prefix}`), ''),
        await EncryptedStorage.getItem(key)
      )
    )

    await Promise.all(tasks)
  }
}
export default AsyncStorageCacheStore
