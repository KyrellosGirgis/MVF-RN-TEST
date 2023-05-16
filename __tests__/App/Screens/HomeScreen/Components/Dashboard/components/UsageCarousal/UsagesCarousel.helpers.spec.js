import { store } from 'App/Redux'
import {
  getDisplayedUsages,
  prepareDisplayedTiles,
  updatePreviousUsagesTilesIds
} from 'App/Screens/HomeScreen/components/Dashboard/components/UsagesCarousel/UsagesCarousel.helpers'
import { DEFAULT_TILES_COUNT } from 'App/Utils/Constants'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import { settingsActions } from 'App/Redux/reducers/settings.reducer'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

jest.mock('App/Services/StorageWrappers/EncryptedStorage.ts', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(null)
    })
  }),
  getItemParsedToJSON: jest.fn(() => ({
    12345: ['9999_daten', '9999_sms', '9998_sms']
  }))
}))

store.dispatch = jest.fn()

const usageTiles = [
  { _id: '9999_daten', headerTitle: 'data tile', usageType: 'daten' },
  { _id: '9999_sms', headerTitle: 'sms tile', usageType: 'sms' },
  { _id: '9999_minuten', headerTitle: 'calls tile', usageType: 'minuten' },
  { _id: '9998_daten', headerTitle: 'data tile', usageType: 'daten' },
  { _id: '9998_sms', headerTitle: 'sms tile', usageType: 'sms' }
]

describe('Test UsagesCarousel helpers', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should getDisplayedUsages successfully return array of two saved tiles', () => {
    store.getState = () => ({
      appUserData: {
        currentlyActiveSubscription: {
          id: 12345
        }
      },
      usages: { usagesTiles: usageTiles, usagesTilesIds: [] },
      settings: {
        persistedSubscriptionTiles: {
          12345: ['9999_daten', '9999_minuten'],
          66666: [],
          55555: []
        }
      }
    })
    const element = getDisplayedUsages()
    expect(element).toEqual([usageTiles[0], usageTiles[2]])
    expect(element.length).toBe(2)
  })

  test('should getDisplayedUsages return [] if there are no usages', () => {
    store.getState = () => ({
      appUserData: { loggedInUserId: 12345 },
      usages: { usagesTiles: undefined },
      settings: {
        persistedSubscriptionTiles: {
          66666: [],
          55555: []
        }
      }
    })
    const element = getDisplayedUsages()
    expect(element).toStrictEqual([])
    expect(element.length).toBe(0)
  })

  test('should getDisplayedUsages return default tiles when no persisted settings for user', () => {
    store.getState = () => ({
      appUserData: { loggedInUserId: 12345 },
      usages: { usagesTiles: usageTiles },
      settings: {
        persistedSubscriptionTiles: {}
      }
    })
    const element = getDisplayedUsages({})
    expect(element).toEqual(usageTiles.slice(0, 3))
    expect(element.length).toBe(DEFAULT_TILES_COUNT)
  })

  test('should prepareDisplayedTiles not call dispatch and setItem when no usagesTiles', async () => {
    store.getState = () => ({
      appUserData: { loggedInUserId: 12345 },
      usages: { usagesTiles: undefined },
      settings: {
        persistedSubscriptionTiles: {
          12345: ['9999_daten', '9999_minuten'],
          66666: []
        }
      }
    })

    await prepareDisplayedTiles()

    expect(store.dispatch).not.toHaveBeenCalledWith(
      settingsActions.setPersistedSubscriptionTiles()
    )
    expect(EncryptedStorage.setItem).not.toHaveBeenCalled()
  })

  test('should prepareDisplayedTiles not call setItem and dispatch when no persistedTilesIds', async () => {
    store.getState = () => ({
      appUserData: { loggedInUserId: 12345 },
      usages: { usagesTiles: usageTiles },
      settings: {
        persistedSubscriptionTiles: {
          66666: []
        }
      }
    })
    await prepareDisplayedTiles()
    expect(store.dispatch).not.toHaveBeenCalledWith(
      settingsActions.setPersistedSubscriptionTiles()
    )
    expect(EncryptedStorage.setItem).not.toHaveBeenCalled()
  })

  test('should prepareDisplayedTiles call setItem and dispatch when there are previousUsagesTilesIds', async () => {
    store.getState = () => ({
      appUserData: {
        currentlyActiveSubscription: {
          id: 12345
        }
      },
      usages: { usagesTiles: usageTiles },
      settings: {
        persistedSubscriptionTiles: {
          12345: ['9999_daten'],
          66666: []
        }
      }
    })
    await prepareDisplayedTiles()
    expect(store.dispatch).toHaveBeenCalled()
    expect(EncryptedStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.previousUsagesTilesIds,
      JSON.stringify({
        ['12345']: usageTiles.map((tile) => tile._id)
      })
    )
  })

  test('should prepareDisplayedTiles call setItem and dispatch when no previousUsagesTilesIds', async () => {
    store.getState = () => ({
      appUserData: {
        currentlyActiveSubscription: {
          id: 12345
        }
      },
      usages: { usagesTiles: usageTiles },
      settings: {
        persistedSubscriptionTiles: {
          12345: ['9999_daten', '9999_minuten'],
          66666: []
        }
      }
    })
    EncryptedStorage.getItemParsedToJSON = jest.fn(() => undefined)
    await prepareDisplayedTiles()
    expect(store.dispatch).toHaveBeenCalled()

    expect(EncryptedStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.previousUsagesTilesIds,
      JSON.stringify({
        ['12345']: usageTiles.map((tile) => tile._id)
      })
    )
  })

  test('should updatePreviousUsagesTilesIds call setItem with the correct parameters', async () => {
    store.getState = () => ({
      appUserData: {
        currentlyActiveSubscription: {
          id: 12345
        }
      }
    })
    await updatePreviousUsagesTilesIds(usageTiles.map((tile) => tile._id))
    expect(EncryptedStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.previousUsagesTilesIds,
      JSON.stringify({
        ...{ 12345: ['9999_daten', '9999_sms', '9998_sms'] },
        ['12345']: usageTiles.map((tile) => tile._id)
      })
    )
  })
})
