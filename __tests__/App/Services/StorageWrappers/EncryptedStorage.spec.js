import Realm from 'realm'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

jest.mock('App/Services/StorageWrappers/EncryptedStorage', () =>
  jest.requireActual('App/Services/StorageWrappers/EncryptedStorage')
)

jest.mock('App/Utils/SensitiveInfoManager', () => {
  return {
    getItem: jest.fn(() =>
      JSON.stringify(
        [...new Array(64)].map(() => Math.round(Math.random() * 127))
      )
    ),
    setItem: jest.fn(),
    deleteItem: jest.fn()
  }
})

describe('Test functions of EncryptedStorage', () => {
  beforeEach(() => {
    Realm.open = jest.fn(() => {
      return new Promise((resolve, reject) => {
        resolve({
          objects: jest.fn(() => ({
            filtered: jest.fn(() => [
              {
                entries: () => [
                  ['key', 'item'],
                  ['value', `${JSON.stringify({ name: 'David' })}`]
                ]
              }
            ])
          })),
          close: jest.fn(() => {}),
          write: jest.fn((callback) => {
            callback()
          }),
          create: jest.fn(() => {}),
          delete: jest.fn(() => {})
        })
      })
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Ensure that getItem opens realm connection and returns the expected output', async () => {
    const item = await EncryptedStorage.getItem('item')
    expect(Realm.open).toHaveBeenCalledTimes(1)
    expect(item).toBe(`${JSON.stringify({ name: 'David' })}`)
  })

  it('Ensure that setItem opens realm connection', async () => {
    await EncryptedStorage.setItem('item', 'itemValue')
    expect(Realm.open).toHaveBeenCalledTimes(1)
  })

  it('Ensure that removeItem opens realm connection', async () => {
    await EncryptedStorage.removeItem('item')
    expect(Realm.open).toHaveBeenCalledTimes(1)
  })

  it('Ensure that getAllKeys opens realm connection', async () => {
    Realm.open = jest.fn(() => {
      return new Promise((resolve, reject) => {
        resolve({
          objects: jest.fn(() => [
            {
              entries: () => [
                ['key', 'item'],
                ['value', `${JSON.stringify({ name: 'David' })}`]
              ]
            },
            {
              entries: () => [
                ['key', 'item2'],
                ['value', `${JSON.stringify({ name: 'Jane' })}`]
              ]
            }
          ]),
          close: jest.fn(() => {})
        })
      })
    })
    const keys = await EncryptedStorage.getAllKeys()
    expect(Realm.open).toHaveBeenCalledTimes(1)
    expect(keys).toEqual(['item', 'item2'])
  })

  it('Ensure that multiRemove opens realm connection', async () => {
    await EncryptedStorage.multiRemove(['item'])
    expect(Realm.open).toHaveBeenCalledTimes(1)
  })

  it('Ensure that clear opens realm connection', async () => {
    await EncryptedStorage.clear()
    expect(Realm.open).toHaveBeenCalledTimes(1)
  })

  it('Ensure that getItemParsedToJSON opens realm connection and returns the expected output', async () => {
    const item = await EncryptedStorage.getItemParsedToJSON('item')
    expect(Realm.open).toHaveBeenCalledTimes(1)
    expect(item).toEqual({ name: 'David' })
  })

  it('Ensure that getBoolean opens realm connection and returns the expected output', async () => {
    const item = await EncryptedStorage.getBoolean('item')
    expect(Realm.open).toHaveBeenCalledTimes(1)
    expect(item).toEqual(false)
  })

  it('Ensure that getBooleanWithDefault opens realm connection and returns the expected output', async () => {
    const item = await EncryptedStorage.getBooleanWithDefault({
      item: undefined
    })
    expect(Realm.open).toHaveBeenCalledTimes(1)
    expect(item).toEqual({ item: { name: 'David' } })
  })

  it('Ensure that getBooleanWithDefault opens realm connection and returns default when value not found', async () => {
    Realm.open = jest.fn(() => {
      return new Promise((resolve, reject) => {
        resolve({
          objects: jest.fn(() => ({
            filtered: jest.fn(() => [])
          })),
          close: jest.fn(() => {}),
          write: jest.fn((callback) => {
            callback()
          }),
          create: jest.fn(() => {}),
          delete: jest.fn(() => {})
        })
      })
    })

    const item = await EncryptedStorage.getBooleanWithDefault({
      item: { name: 'Default' }
    })
    expect(Realm.open).toHaveBeenCalledTimes(1)
    expect(item).toEqual({ item: { name: 'Default' } })
  })

  it('Ensure that setObject opens realm connection', async () => {
    await EncryptedStorage.setObject('item', { name: 'json' })
    expect(Realm.open).toHaveBeenCalledTimes(1)
  })

  it('Ensure that getAllItems opens realm connection and returns the expected output', async () => {
    Realm.open = jest.fn(() => {
      return new Promise((resolve, reject) => {
        resolve({
          objects: jest.fn(() => [
            {
              entries: () => [
                ['key', 'item'],
                ['value', `${JSON.stringify({ name: 'David' })}`]
              ]
            },
            {
              entries: () => [
                ['key', 'item2'],
                ['value', `${JSON.stringify({ name: 'Jane' })}`]
              ]
            }
          ]),
          close: jest.fn(() => {})
        })
      })
    })
    const item = await EncryptedStorage.getAllItems()
    expect(Realm.open).toHaveBeenCalledTimes(1)
    expect(JSON.stringify(item)).toBe(
      `${JSON.stringify({ item: { name: 'David' }, item2: { name: 'Jane' } })}`
    )
  })
})
