import * as legacy from 'App/Services/API/Interceptors/legacy.interceptor'
import {
  loadBEWPermissions,
  saveBEWPermissionsToBE
} from 'App/Services/API/Requests/DataPrivacyPermissions/BEWPermissions'
import { store } from 'App/Redux'

import {
  expectedGetBEWPermissionsData,
  expectedPostBEWPermissionsData,
  mockedCurrentlySubscriptionObject,
  mockedSelectedBEWPermissions
} from '__tests__/App/APIsDataMocks/BEWPermissionsMockedData'

describe('Test BEWPermissions Requests ', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    store.getState = () => ({
      appUserData: {
        currentlyActiveSubscription: mockedCurrentlySubscriptionObject
      }
    })
  })

  it('Test loadBEWPermissions with success data', async () => {
    legacy.legacyAxios.get.mockImplementation(() => ({
      data: expectedGetBEWPermissionsData
    }))

    const actualData = await loadBEWPermissions()
    expect(actualData).toEqual(expectedGetBEWPermissionsData)
  })

  it('Test if loadBEWPermissions fails, it throws an error', async () => {
    legacy.legacyAxios.get.mockImplementation(() => {
      return Promise.reject('error')
    })
    await expect(loadBEWPermissions()).rejects.toEqual('error')
  })

  it('Test saveBEWPermissionsToBE with success data', async () => {
    legacy.legacyAxios.post.mockImplementation(() => ({
      data: expectedPostBEWPermissionsData
    }))

    const actualData = await saveBEWPermissionsToBE({
      bewPermissionsFromBE: mockedSelectedBEWPermissions
    })
    expect(actualData).toEqual(expectedPostBEWPermissionsData)
  })

  it('Test if saveBEWPermissionsToBE fails, it throws an error', async () => {
    legacy.legacyAxios.post.mockImplementation(() => {
      return Promise.reject('error')
    })
    await expect(
      saveBEWPermissionsToBE({
        bewPermissionsFromBE: mockedSelectedBEWPermissions
      })
    ).rejects.toEqual('error')
  })
})
