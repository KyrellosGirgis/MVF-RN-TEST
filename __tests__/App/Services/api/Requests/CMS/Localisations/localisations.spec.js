/* eslint-disable import/namespace */
import moment from 'moment'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

import * as Localisations from 'App/Services/API/Requests/CMS/Localisations/localisations'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

describe('test localisations functions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {})
  describe('test isLocalisationsDataValid', () => {
    it('should return true if lastTimeLocalisationsUpdated is undefined', async () => {
      EncryptedStorage.getItem = jest.fn(() => undefined)

      const result = await Localisations.isLocalisationsDataValid()
      expect(result).toEqual(true)
    })

    it('should return true if lastTimeLocalisationsUpdated is old and diff in time greater than 24 hours', async () => {
      EncryptedStorage.getItem = jest.fn(() => 999999999)

      const result = await Localisations.isLocalisationsDataValid()
      expect(result).toEqual(true)
    })

    it('should return false if lastTimeLocalisationsUpdateds is recent and diff in time less than 24 hours', async () => {
      EncryptedStorage.getItem = jest.fn(() => moment().format())

      const result = await Localisations.isLocalisationsDataValid()
      expect(result).toEqual(false)
    })
  })

  describe('test shouldUpdateLocalisationsIfNeeded', () => {
    it('should return true and call setItem if isLocalisationsDataValid is true', async () => {
      Localisations.isLocalisationsDataValid = jest.fn(() => true)
      EncryptedStorage.setItem = jest.fn()

      const result = await Localisations.shouldUpdateLocalisationsIfNeeded()
      expect(EncryptedStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEYS.lastTimeLocalisationsUpdated,
        moment().format()
      )
      expect(result).toEqual(true)
    })

    it('should return false and not calling setItem if isLocalisationsDataValid is false', async () => {
      Localisations.isLocalisationsDataValid = jest.fn(() => false)
      EncryptedStorage.setItem = jest.fn()

      const result = await Localisations.shouldUpdateLocalisationsIfNeeded()
      expect(EncryptedStorage.setItem).not.toHaveBeenCalledWith(
        STORAGE_KEYS.lastTimeLocalisationsUpdated,
        moment().format()
      )
      expect(result).toEqual(false)
    })
  })
})
