/* eslint-disable import/namespace */

import * as Ident from 'App/Services/API/Requests/ThirdPartyPermissions/ident/ident'
import * as Info from 'App/Services/API/Requests/ThirdPartyPermissions/info/info'
import * as Hashing from 'App/Services/API/Requests/ThirdPartyPermissions/hashing/hashing'

import {
  NOTIFICATION_NAME,
  subscriptionTypeHeaderValues,
  THIRD_PARTY_PERMISSIONS
} from 'App/Services/API/Requests/ThirdPartyPermissions/ThirdPartyPermissions.constants'

import * as ThirdPartyHelpers from 'App/Services/API/Requests/ThirdPartyPermissions/ThirdPartyPermissions.helper'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'
import * as cmsStore from 'App/Services/StorageWrappers/CMSStorage'

const expectedHashedID = {
  id: '123',
  hash: '321',
  type: 'mobile'
}

const expecedIdentResponse = {
  headers: {
    'set-cookie': ['umdid=1234;']
  }
}
const privacyCookiePermissionsVersion = {
  privacy: {
    cookie_permissions: {
      consent_version: 4
    }
  }
}

const infoWithItemsHigherThanCMSinVersion = {
  umid: 123,
  notificationHistory: [
    {
      version: 999,
      permissions: ['HVF-CP', 'HVF-DP']
    }
  ]
}

const infoWithItemsHigherThanCMSinVersionandAllPermissions = {
  umid: 123,
  notificationHistory: [
    {
      version: 999,
      permissions: [
        THIRD_PARTY_PERMISSIONS.LI_NBA,
        THIRD_PARTY_PERMISSIONS.LI_OM,
        THIRD_PARTY_PERMISSIONS.LI_OPT
      ]
    }
  ]
}

const expectedLoadInfoResponse = {
  umid: 123,
  notificationHistory: [
    {
      version: 1
    }
  ]
}

describe('test API headers', () => {
  beforeEach(() => {
    ThirdPartyHelpers.findCurrentActiveSubscriptionHashedId = jest.fn(() => {
      return expectedHashedID
    })

    Hashing.getHashing = jest.fn(() => ({}))

    Ident.getIdent = jest.fn(() => {
      return expecedIdentResponse
    })
    Info.loadInfo = jest.fn(() => expectedLoadInfoResponse)
    cmsStore.getCmsItem = jest.fn(() => privacyCookiePermissionsVersion)
  })

  it('should call findCurrentActiveSubscriptionHashedId with correct hashedIds', async () => {
    Hashing.getHashing = jest.fn(() => ({ hashedIds: [] }))
    cmsStore.getCmsItem = jest.fn(() => undefined)
    await ThirdPartyHelpers.shouldShowThirdPartyStep()
    expect(
      ThirdPartyHelpers.findCurrentActiveSubscriptionHashedId
    ).toBeCalledWith([])
  })

  it('should call getIdent with correct parameters', async () => {
    await ThirdPartyHelpers.shouldShowThirdPartyStep()

    expect(Ident.getIdent).toBeCalledWith(
      subscriptionTypeHeaderValues[expectedHashedID.type],
      expectedHashedID.hash
    )
  })

  it('should save UMDID of ident request in encrypted storage', async () => {
    ThirdPartyHelpers.shouldShowThirdPartyStep()

    expect(EncryptedStorage.setItem).toBeCalledWith(STORAGE_KEYS.umdid, '1234')
  })

  it('should call loadInfo API', async () => {
    await ThirdPartyHelpers.shouldShowThirdPartyStep()
    expect(Info.loadInfo).toBeCalled()
  })

  it('should set umid in encrypted storage', async () => {
    await ThirdPartyHelpers.shouldShowThirdPartyStep()
    expect(await EncryptedStorage.setItem).toBeCalledWith(
      STORAGE_KEYS.umid,
      123
    )
  })

  it('should return true if versions of notification history items are all less than cms version', async () => {
    const shouldShowPermissionsSection =
      await ThirdPartyHelpers.shouldShowThirdPartyStep()
    expect(shouldShowPermissionsSection).toEqual(true)
  })

  it('should return true if at least on of notification history items has higher version than cms', async () => {
    Info.loadInfo = jest.fn(() => infoWithItemsHigherThanCMSinVersion)

    const shouldShowPermissionsSection =
      await ThirdPartyHelpers.shouldShowThirdPartyStep()
    expect(shouldShowPermissionsSection).toEqual(true)
  })

  it('should return false if at least on of notification history items has higher version than cms', async () => {
    cmsStore.getCmsItem = jest.fn(() => privacyCookiePermissionsVersion)
    Info.loadInfo = jest.fn(
      () => infoWithItemsHigherThanCMSinVersionandAllPermissions
    )

    const shouldShowPermissionsSection =
      await ThirdPartyHelpers.shouldShowThirdPartyStep()
    expect(shouldShowPermissionsSection).toEqual(false)
  })

  it('should constructInfoRequestBody get privacyCookiePermissionsVersion from redux and construct the correct body for info post request', async () => {
    cmsStore.getCmsItem = jest.fn(() => privacyCookiePermissionsVersion)

    const permissions = { 'LI-OM': true, 'LI-OPT': false, 'LI-NBA': false }
    const expectedInfoRequestBody = {
      permission: permissions,
      notification: [
        {
          name: NOTIFICATION_NAME,
          version: 4,
          permissions: Object.keys(permissions)
        }
      ]
    }

    const infoRequestBody = await ThirdPartyHelpers.constructInfoRequestBody(
      permissions
    )
    expect(expectedInfoRequestBody).toStrictEqual(infoRequestBody)
  })
})
