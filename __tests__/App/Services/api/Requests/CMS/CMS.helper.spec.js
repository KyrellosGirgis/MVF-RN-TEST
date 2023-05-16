/* eslint-disable import/namespace */
import moment from 'moment'

import Config from 'react-native-config'

import * as CMSInterceptor from 'App/Services/API/Interceptors/CMS.interceptor'
import * as cmsStore from 'App/Services/StorageWrappers/CMSStorage'

import * as CMSHelpers from 'App/Services/API/Requests/CMS/CMS.helper'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

import * as Localisations from 'App/Services/API/Requests/CMS/Localisations/localisations'

import * as CMS from 'App/Services/API/Requests/CMS/CMS'

jest.mock('react-native-config', () => {
  return {
    IS_PRODUCTION: 'false'
  }
})

jest.mock('App/Services/API/Requests/CMS/Localisations/localisations', () => {
  const Localisations = jest.requireActual(
    'App/Services/API/Requests/CMS/Localisations/localisations'
  )
  Localisations.shouldUpdateLocalisationsIfNeeded = jest.fn()
  return Localisations
})

jest.mock('App/Services/API/Requests/CMS/CMS', () => {
  const CMS = jest.requireActual('App/Services/API/Requests/CMS/CMS')
  CMS.loadRemoteCMS = jest.fn()
  return CMS
})

const CMSData = {
  app_package: {
    items: [
      {
        id: 'internationalisation',
        timestamp: '1655964303',
        'cms-guid': '31EE35CD662645EAB37F41E3D5D80E57',
        'cms-id': '10',
        resource:
          'https://c7b9dd36-9b17-49d5-a447-c66d801df00a.mock.pstmn.io/cms/internationalisation'
      },
      {
        id: 'deeplinks',
        timestamp: '1650611062',
        'cms-guid': '4471E90754DD44D6AF77FE2880ED143E',
        'cms-id': '6080',
        resource:
          'https://c7b9dd36-9b17-49d5-a447-c66d801df00a.mock.pstmn.io/cms/deeplinks'
      },
      {
        id: 'features',
        timestamp: '1660032684',
        'cms-guid': '736DJ90754DD44D6AF77FE2880ED748D',
        'cms-id': '7834',
        resource:
          'https://c7b9dd36-9b17-49d5-a447-c66d801df00a.mock.pstmn.io/cms/features'
      }
    ]
  }
}

describe('Test CMS helper functions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {})

  describe('Test fetchFromCMSWithoutErrorHandling', () => {
    it('should return expected data from fetchFromCMSWithoutErrorHandling when api succeeds', async () => {
      CMSInterceptor.CMSAxios.get = jest.fn(() => {
        return {
          data: CMSData
        }
      })

      const response = await CMSHelpers.fetchFromCMSWithoutErrorHandling('')
      expect(response).toBe(CMSData)
    })
    it('should throw error from fetchFromCMSWithoutErrorHandling when api fails', async () => {
      CMSInterceptor.CMSAxios.get.mockImplementation(() => {
        return Promise.reject('failed to load CMS')
      })
      const response = await CMSHelpers.fetchFromCMSWithoutErrorHandling('')
      expect(response).toBe(undefined)
    })

    it('should return undefined from fetchFromCMSWithoutErrorHandling when data is undefined', async () => {
      CMSInterceptor.CMSAxios.get = jest.fn(() => {
        return {
          data: undefined
        }
      })
      const response = await CMSHelpers.fetchFromCMSWithoutErrorHandling('')
      expect(response).toBe(undefined)
    })
  })

  describe('Test fetchFromCMSWithErrorHandling', () => {
    it('should return expected data from fetchFromCMSWithErrorHandling when api succeeds', async () => {
      CMSInterceptor.CMSAxios.get = jest.fn(() => {
        return {
          data: CMSData
        }
      })

      const response = await CMSHelpers.fetchFromCMSWithErrorHandling('')
      expect(response).toBe(CMSData)
    })

    it('should throw error from fetchFromCMSWithErrorHandling when api fails', async () => {
      CMSInterceptor.CMSAxios.get.mockImplementation(() => {
        return Promise.reject('failed to load CMS')
      })
      await expect(
        CMSHelpers.fetchFromCMSWithErrorHandling('')
      ).rejects.toEqual('failed to load CMS')
    })

    it('should throw error from fetchFromCMSWithErrorHandlings when api fails', async () => {
      CMSInterceptor.CMSAxios.get = jest.fn(() => {
        return {
          data: undefined
        }
      })
      const response = await CMSHelpers.fetchFromCMSWithErrorHandling('')
      expect(response).toBe(undefined)
    })
  })

  describe('Test shouldAddUpdateCmsItem', () => {
    it('should return true if the stored cms timestamp is older than the new remote cms ', async () => {
      const storedCMSItem = {
        timestamp: 1111111
      }
      cmsStore.getCmsItem = jest.fn(() => storedCMSItem)
      const testTimeStamp = 999999999

      const response = await CMSHelpers.shouldAddUpdateCmsItem(
        'mockTestID',
        testTimeStamp
      )
      expect(response).toBe(true)
    })
    it('should return false if the stored cms timestamp is older than the new remote cms ', async () => {
      const storedCMSItem = {
        timestamp: 9999999999
      }
      cmsStore.getCmsItem = jest.fn(() => storedCMSItem)
      const testTimeStamp = 1111111

      const response = await CMSHelpers.shouldAddUpdateCmsItem(
        'mockTestID',
        testTimeStamp
      )
      expect(response).toBe(false)
    })
  })
  describe('Test shouldUpdateCms', () => {
    it('should return true if the stored cms timestamp is older than 1 hour  ', async () => {
      EncryptedStorage.getItem = jest.fn(() =>
        moment().subtract(2, 'hours').format()
      )

      const response = await CMSHelpers.shouldUpdateCMS()
      expect(response).toBe(true)
    })
    it('should return false if the stored cms timestamp is older than 1 hour  ', async () => {
      EncryptedStorage.getItem = jest.fn(() => moment().format())

      const response = await CMSHelpers.shouldUpdateCMS()
      expect(response).toBe(false)
    })

    it('should return true if the stored cms timestamp is undefined  ', async () => {
      EncryptedStorage.getItem = jest.fn(() => undefined)

      const response = await CMSHelpers.shouldUpdateCMS()
      expect(response).toBeTruthy()
    })
  })

  describe('Test getMockedCMSRootURL', () => {
    it('should return the stored mocked CMS URL', async () => {
      const expected = 'Test URL'
      EncryptedStorage.getItem = jest.fn(() => expected)
      const result = await CMSHelpers.getMockedCMSRootURL()
      expect(result).toEqual(expected)
    })
  })

  describe('Test checkCmsItemStoreRules', () => {
    it('should return true as default value', async () => {
      const result = await CMSHelpers.checkCmsItemStoreRules('test')
      expect(result).toBeTruthy()
    })

    it('should return true with internationalisation key value if shouldUpdateLocalisationsIfNeeded is true', async () => {
      Localisations.shouldUpdateLocalisationsIfNeeded = jest.fn(() => true)
      const result = await CMSHelpers.checkCmsItemStoreRules(
        'internationalisation'
      )
      expect(result).toBeTruthy()
    })

    it('should return false with internationalisation key value if shouldUpdateLocalisationsIfNeeded is false', async () => {
      Localisations.shouldUpdateLocalisationsIfNeeded = jest.fn(() => false)
      const result = await CMSHelpers.checkCmsItemStoreRules(
        'internationalisation'
      )
      expect(result).not.toBeTruthy()
    })
  })

  describe('Test shouldFetchAndStoreRemoteCMS', () => {
    it('should call loadRemoteCMS if shouldUpdateCMS is true and IS_PRODUCTION is false', async () => {
      Config.IS_PRODUCTION = 'false'
      CMSHelpers.shouldUpdateCMS = jest.fn(() => true)
      await CMSHelpers.fetchAndStoreRemoteCMSIfNeeded()
      expect(CMS.loadRemoteCMS).toHaveBeenCalled()
    })

    // it('should call loadRemoteCMS if shouldUpdateCMS is false and IS_PRODUCTION is false', async () => {
    //   Config.IS_PRODUCTION = 'false'
    //   CMSHelpers.shouldUpdateCMS = jest.fn(() => false)
    //   await CMSHelpers.shouldFetchAndStoreRemoteCMS()
    //   expect(CMS.loadRemoteCMS).toHaveBeenCalled()
    // })

    // it('should call not loadRemoteCMS if shouldUpdateCMS is false and IS_PRODUCTION is true', async () => {
    //   const Config = require('react-native-config')
    //   Config.IS_PRODUCTION = 'true'
    //   console.log('Config2', Config)
    //   CMSHelpers.shouldUpdateCMS = jest.fn(() => false)
    //   await CMSHelpers.shouldFetchAndStoreRemoteCMS()
    //   expect(CMS.loadRemoteCMS).not.toHaveBeenCalled()
    // })
  })
})
