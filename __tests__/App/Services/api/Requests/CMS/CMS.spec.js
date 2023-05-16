/* eslint-disable import/namespace */

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

import * as LocalisationsHelpers from 'App/I18n/helpers/localisations.helpers'
import * as CMS from 'App/Services/API/Requests/CMS/CMS'

import * as CMSStorage from 'App/Services/StorageWrappers/CMSStorage'
import * as CMSHelpers from 'App/Services/API/Requests/CMS/CMS.helper'

const rootCMSData = {
  app_package: {
    items: [
      {
        timestamp: '1655964303',
        'cms-guid': '31EE35CD662645EAB37F41E3D5D80E57',
        'cms-id': '10',
        id: 'internationalisation',
        resource:
          'https://am-vodafone.github.io/cms/mvf/configfiles/rn/op_1421/internationalisation.json'
      },
      {
        timestamp: '1650611062',
        'cms-guid': '4471E90754DD44D6AF77FE2880ED143E',
        'cms-id': '6080',
        id: 'deeplinks',
        resource: 'https://am-vodafone.github.io/MVF-RN/cms/deeplinks'
      },
      {
        timestamp: '1660032684',
        'cms-guid': '736DJ90754DD44D6AF77FE2880ED748D',
        'cms-id': '7834',
        id: 'features',
        resource:
          'https://am-vodafone.github.io/cms/mvf/configfiles/rn/op_1421/features.json'
      }
    ]
  }
}

jest.mock('App/I18n/helpers/localisations.helpers', () => {
  const LocalisationsHelpers = jest.requireActual(
    'App/I18n/helpers/localisations.helpers'
  )
  LocalisationsHelpers.applyAppLanguage = jest.fn()
  return LocalisationsHelpers
})

jest.mock('App/Services/StorageWrappers/CMSStorage', () => {
  const CMSStorage = jest.requireActual(
    'App/Services/StorageWrappers/CMSStorage'
  )
  CMSStorage.getCmsItem = jest.fn()
  CMSStorage.clearTempCmsItem = jest.fn()
  CMSStorage.getBundleCmsItem = jest.fn()
  CMSStorage.getTempCmsItem = jest.fn()
  CMSStorage.setCmsItem = jest.fn()
  CMSStorage.setTempCmsItem = jest.fn()
  return CMSStorage
})

jest.mock('App/Services/API/Requests/CMS/CMS.helper', () => {
  const CMSHelpers = jest.requireActual(
    'App/Services/API/Requests/CMS/CMS.helper'
  )
  CMSHelpers.getMockedCMSRootURL = jest.fn()
  CMSHelpers.fetchFromCMSWithErrorHandling = jest.fn()
  CMSHelpers.fetchFromCMSWithoutErrorHandling = jest.fn()
  CMSHelpers.checkCmsItemStoreRules = jest.fn()
  CMSHelpers.shouldAddUpdateCmsItem = jest.fn()
  return CMSHelpers
})

describe('test CMS functions', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {})

  describe('test executeTasksAfterUpdateCMS', () => {
    it('should call applyAppLanguage and setItem after calling executeTasksAfterUpdateCMS', async () => {
      EncryptedStorage.setItem = jest.fn()

      await CMS.executeTasksAfterUpdateCMS()

      expect(EncryptedStorage.setItem).toHaveBeenCalled()
      expect(LocalisationsHelpers.applyAppLanguage).toHaveBeenCalled()
    })
  })

  describe('test prepareLocalCMS', () => {
    it('should call getTempCmsItem and executeTasksAfterUpdateCMS after calling prepareLocalCMS', async () => {
      CMS.executeTasksAfterUpdateCMS = jest.fn()
      CMSStorage.getTempCmsItem = jest.fn(() => 'test')

      await CMS.prepareLocalCMS()

      expect(CMSStorage.getTempCmsItem).toHaveBeenCalled()
      expect(CMSStorage.setCmsItem).toHaveBeenCalled()
      expect(CMSStorage.clearTempCmsItem).toHaveBeenCalled()
      expect(CMS.executeTasksAfterUpdateCMS).toHaveBeenCalled()
    })

    it('should call getTempCmsItem , executeTasksAfterUpdateCMS , getCMSItem after calling prepareLocalCMS if tempCmsItem is undefined ', async () => {
      CMS.executeTasksAfterUpdateCMS = jest.fn()
      CMSStorage.getTempCmsItem = jest.fn(() => Promise.resolve(undefined))
      CMSStorage.getCmsItem = jest.fn(() =>
        Promise.resolve({
          rootCMSData
        })
      )

      await CMS.prepareLocalCMS()

      expect(CMSStorage.getTempCmsItem).toHaveBeenCalled()
      expect(CMSStorage.getCmsItem).toHaveBeenCalled()
      expect(CMSStorage.clearTempCmsItem).not.toHaveBeenCalled()
      expect(CMSStorage.setCmsItem).not.toHaveBeenCalled()
      expect(CMSStorage.getBundleCmsItem).not.toHaveBeenCalled()

      expect(CMS.executeTasksAfterUpdateCMS).toHaveBeenCalled()
    })

    it('should call getTempCmsItem , executeTasksAfterUpdateCMS , getCMSItem  and getBundleCmsItem after calling prepareLocalCMS if tempCmsItem is undefined ', async () => {
      CMS.executeTasksAfterUpdateCMS = jest.fn()
      CMSStorage.getTempCmsItem = jest.fn(() => Promise.resolve(undefined))
      CMSStorage.getCmsItem = jest.fn(() => Promise.resolve(undefined))

      await CMS.prepareLocalCMS()

      expect(CMSStorage.getTempCmsItem).toHaveBeenCalled()
      expect(CMSStorage.getCmsItem).toHaveBeenCalled()
      expect(CMSStorage.clearTempCmsItem).not.toHaveBeenCalled()
      expect(CMSStorage.setCmsItem).toHaveBeenCalled()
      expect(CMSStorage.getBundleCmsItem).toHaveBeenCalled()

      expect(CMS.executeTasksAfterUpdateCMS).toHaveBeenCalled()
    })
  })

  describe('test fetchAndStoreRemoteCMSItems', () => {
    it('test fetchAndStoreRemoteCMSItems while mocking', async () => {
      CMSHelpers.fetchFromCMSWithErrorHandling = jest.fn(() => rootCMSData)

      await CMS.fetchAndStoreRemoteCMSItems(
        {
          id: 'root',
          resource: 'test'
        },
        true
      )

      expect(CMSHelpers.fetchFromCMSWithErrorHandling).toHaveBeenCalled()
      expect(CMSHelpers.fetchFromCMSWithoutErrorHandling).not.toHaveBeenCalled()
      expect(CMSStorage.setTempCmsItem).toHaveBeenCalled()
      expect(CMSHelpers.checkCmsItemStoreRules).not.toHaveBeenCalled()
      expect(CMSHelpers.shouldAddUpdateCmsItem).not.toHaveBeenCalled()
    })

    it('test fetchAndStoreRemoteCMSItems with default root cms url while checkCmsItemStoreRules and shouldAddUpdateCmsItem are true ', async () => {
      CMSHelpers.fetchFromCMSWithoutErrorHandling = jest.fn(() => rootCMSData)
      CMSHelpers.checkCmsItemStoreRules = jest.fn(() => true)
      CMSHelpers.shouldAddUpdateCmsItem = jest.fn(() => true)

      await CMS.fetchAndStoreRemoteCMSItems(
        {
          id: 'root',
          resource: '/root'
        },
        false
      )

      expect(CMSHelpers.fetchFromCMSWithErrorHandling).not.toHaveBeenCalled()
      expect(CMSHelpers.fetchFromCMSWithoutErrorHandling).toHaveBeenCalled()
      expect(CMSHelpers.checkCmsItemStoreRules).toHaveBeenCalled()
      expect(CMSHelpers.shouldAddUpdateCmsItem).toHaveBeenCalled()
      expect(CMSStorage.setTempCmsItem).toHaveBeenCalled()
    })

    it('test fetchAndStoreRemoteCMSItems with default root cms url while checkCmsItemStoreRules and shouldAddUpdateCmsItem are false', async () => {
      CMSHelpers.fetchFromCMSWithoutErrorHandling = jest.fn(() => rootCMSData)
      CMSHelpers.checkCmsItemStoreRules = jest.fn(() => false)
      CMSHelpers.shouldAddUpdateCmsItem = jest.fn(() => false)

      await CMS.fetchAndStoreRemoteCMSItems(
        {
          id: 'root',
          resource: '/root'
        },
        false
      )

      expect(CMSHelpers.fetchFromCMSWithErrorHandling).not.toHaveBeenCalled()
      expect(CMSHelpers.fetchFromCMSWithoutErrorHandling).toHaveBeenCalled()
      expect(CMSHelpers.checkCmsItemStoreRules).toHaveBeenCalled()
      expect(CMSHelpers.shouldAddUpdateCmsItem).not.toHaveBeenCalled()
      expect(CMSStorage.setTempCmsItem).not.toHaveBeenCalled()
    })

    it('test fetchAndStoreRemoteCMSItems with default root cms url while checkCmsItemStoreRules is true and shouldAddUpdateCmsItem is false', async () => {
      CMSHelpers.fetchFromCMSWithoutErrorHandling = jest.fn(() => rootCMSData)
      CMSHelpers.checkCmsItemStoreRules = jest.fn(() => true)
      CMSHelpers.shouldAddUpdateCmsItem = jest.fn(() => false)

      await CMS.fetchAndStoreRemoteCMSItems(
        {
          id: 'root',
          resource: '/root'
        },
        false
      )

      expect(CMSHelpers.fetchFromCMSWithErrorHandling).not.toHaveBeenCalled()
      expect(CMSHelpers.fetchFromCMSWithoutErrorHandling).toHaveBeenCalled()
      expect(CMSHelpers.checkCmsItemStoreRules).toHaveBeenCalled()
      expect(CMSHelpers.shouldAddUpdateCmsItem).toHaveBeenCalled()
      expect(CMSStorage.setTempCmsItem).not.toHaveBeenCalled()
    })

    it('test fetchAndStoreRemoteCMSItems with default root cms url while checkCmsItemStoreRules is false and shouldAddUpdateCmsItem is true', async () => {
      CMSHelpers.fetchFromCMSWithoutErrorHandling = jest.fn(() => rootCMSData)
      CMSHelpers.checkCmsItemStoreRules = jest.fn(() => false)
      CMSHelpers.shouldAddUpdateCmsItem = jest.fn(() => true)

      await CMS.fetchAndStoreRemoteCMSItems(
        {
          id: 'root',
          resource: '/root'
        },
        false
      )

      expect(CMSHelpers.fetchFromCMSWithErrorHandling).not.toHaveBeenCalled()
      expect(CMSHelpers.fetchFromCMSWithoutErrorHandling).toHaveBeenCalled()
      expect(CMSHelpers.checkCmsItemStoreRules).toHaveBeenCalled()
      expect(CMSHelpers.shouldAddUpdateCmsItem).not.toHaveBeenCalled()
      expect(CMSStorage.setTempCmsItem).not.toHaveBeenCalled()
    })
  })

  describe('test loadRemoteCMS', () => {
    it('should call fetchAndStoreRemoteCMSItems with cmsMockedRootUrl', async () => {
      CMSHelpers.getMockedCMSRootURL = jest.fn(() => 'test')
      CMSHelpers.fetchFromCMSWithErrorHandling = jest.fn(() => rootCMSData)

      await CMS.loadRemoteCMS()

      expect(CMSHelpers.getMockedCMSRootURL).toHaveBeenCalled()
      expect(CMSHelpers.fetchFromCMSWithErrorHandling).toHaveBeenCalled()
      expect(CMSHelpers.fetchFromCMSWithoutErrorHandling).not.toHaveBeenCalled()
      expect(CMSStorage.setTempCmsItem).toHaveBeenCalled()
      expect(CMSHelpers.checkCmsItemStoreRules).not.toHaveBeenCalled()
      expect(CMSHelpers.shouldAddUpdateCmsItem).not.toHaveBeenCalled()
    })

    it('should call fetchAndStoreRemoteCMSItems with default rootCMSURL', async () => {
      CMSHelpers.getMockedCMSRootURL = jest.fn(() => undefined)
      CMSHelpers.fetchFromCMSWithoutErrorHandling = jest.fn(() => rootCMSData)
      CMSHelpers.checkCmsItemStoreRules = jest.fn(() => true)
      CMSHelpers.shouldAddUpdateCmsItem = jest.fn(() => true)

      await CMS.loadRemoteCMS()

      expect(CMSHelpers.getMockedCMSRootURL).toHaveBeenCalled()
      expect(CMSHelpers.fetchFromCMSWithErrorHandling).not.toHaveBeenCalled()
      expect(CMSHelpers.fetchFromCMSWithoutErrorHandling).toHaveBeenCalled()
    })
  })

  describe('test loadRemoteCMSSync', () => {
    it('should call fetchAndStoreRemoteCMSItems with cmsMockedRootUrl', async () => {
      CMSHelpers.fetchFromCMSWithErrorHandling = jest.fn(() => rootCMSData)

      await CMS.loadRemoteCMSSync('test')

      expect(CMSHelpers.fetchFromCMSWithErrorHandling).toHaveBeenCalled()
      expect(CMSHelpers.fetchFromCMSWithoutErrorHandling).not.toHaveBeenCalled()
      expect(CMSStorage.setTempCmsItem).toHaveBeenCalled()
      expect(CMSHelpers.checkCmsItemStoreRules).not.toHaveBeenCalled()
      expect(CMSHelpers.shouldAddUpdateCmsItem).not.toHaveBeenCalled()
    })

    it('should call fetchAndStoreRemoteCMSItems with default rootCMSURL', async () => {
      CMSHelpers.fetchFromCMSWithoutErrorHandling = jest.fn(() => rootCMSData)
      CMSHelpers.checkCmsItemStoreRules = jest.fn(() => true)
      CMSHelpers.shouldAddUpdateCmsItem = jest.fn(() => true)

      await CMS.loadRemoteCMSSync()

      expect(CMSHelpers.fetchFromCMSWithErrorHandling).not.toHaveBeenCalled()
      expect(CMSHelpers.fetchFromCMSWithoutErrorHandling).toHaveBeenCalled()
      expect(CMSStorage.setTempCmsItem).toHaveBeenCalled()
      expect(CMSHelpers.checkCmsItemStoreRules).toHaveBeenCalled()
      expect(CMSHelpers.shouldAddUpdateCmsItem).toHaveBeenCalled()
    })
  })

  describe('test updateCMS', () => {
    it('should call prepareLocalCMS and loadRemoteCMS after calling updateCMS', async () => {
      CMS.prepareLocalCMS = jest.fn()
      CMS.loadRemoteCMS = jest.fn()

      await CMS.updateCMS()

      expect(CMS.prepareLocalCMS).toHaveBeenCalled()
      expect(CMS.loadRemoteCMS).toHaveBeenCalled()
    })
  })
})
