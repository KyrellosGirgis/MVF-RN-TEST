import { store } from 'App/Redux'
import {
  getDisplayedTilesMap,
  mapUsagesToSettingsTiles
} from 'App/Screens/Settings/Screens/EditDashboardTiles/EditDashboardTiles.helper'

const buckets = [
  { _id: '9876_daten', title: 'data tile', usageType: 'daten' },
  { _id: '9876_sms', title: 'sms tile', usageType: 'sms' },
  { _id: '9876_minuten', title: 'calls tile', usageType: 'minuten' },
  { _id: '9854_daten', title: 'data tile', usageType: 'daten' },
  { _id: '9854_sms', title: 'sms tile', usageType: 'sms' }
]

const persistedSubscriptionTiles = [
  {
    _id: '9876_daten',
    name: 'data tile',
    icon: 'ic_data_sharing'
  },
  {
    _id: '9876_sms',
    name: 'sms tile',
    icon: 'ic_sms_text'
  },
  {
    _id: '9876_minuten',
    name: 'calls tile',
    icon: 'ic_call_log'
  }
]
const optionalTiles = [
  {
    _id: '9854_daten',
    name: 'data tile',
    icon: 'ic_data_sharing'
  },
  {
    _id: '9854_sms',
    name: 'sms tile',
    icon: 'ic_sms_text'
  }
]

const mappedTiles = [...persistedSubscriptionTiles, ...optionalTiles]

describe('Edit dashboard tiles helper', () => {
  beforeAll(() => {
    store.getState = () => ({
      settings: {
        persistedSubscriptionTiles: {
          ['1234']: persistedSubscriptionTiles.map((tile) => tile._id)
        }
      }
    })
  })
  test('partitionTiles should return result as expected when savedTiles is not empty and not default', () => {
    const { selectedTiles: selected, optionalTiles: optional } =
      getDisplayedTilesMap(mappedTiles, persistedSubscriptionTiles, false)
    expect(selected).toEqual(persistedSubscriptionTiles)
    expect(optional).toEqual(optionalTiles)
  })

  test('partitionTiles should return result as expected when default is true', () => {
    const { selectedTiles: selected, optionalTiles: optional } =
      getDisplayedTilesMap(mappedTiles, persistedSubscriptionTiles, true)
    expect(selected).toEqual(mappedTiles.slice(0, 3))
    expect(optional).toEqual(mappedTiles.slice(3))
  })

  test('partitionTiles should not crash when bucketsLength < 3', () => {
    const { selectedTiles: selected, optionalTiles: optional } =
      getDisplayedTilesMap(
        mappedTiles.slice(0, 2),
        persistedSubscriptionTiles,
        true
      )
    expect(selected).toEqual(mappedTiles.slice(0, 2))
    expect(optional).toEqual([])
  })

  test('mapToSettingsTiles should function correctly', () => {
    const mappedOutput = mapUsagesToSettingsTiles(buckets, mappedTiles)
    expect(mappedOutput).toEqual(mappedTiles)
  })
})
