import {
  userDataWithAllProducts,
  subscriptionUnbilledUsageData,
  subscriptionUnbilledUsageDataMapped
} from '__tests__/App/Services/api/Requests/Dashboard/data'

import { store } from 'App/Redux'
import * as legacy from 'App/Services/API/Interceptors/legacy.interceptor'

import { loadUnbilledUsagesTiles } from 'App/Services/API/Requests/Dashboard/subscriptionUnbilledUsage/subscriptionUnbilledUsage'

jest.mock('App/Utils/Helpers/generic.helpers', () => {
  const actualHelper = jest.requireActual('App/Utils/Helpers/generic.helpers')
  return {
    ...actualHelper,
    translate: (str) => str,
    testID: (str) => str,
    isDE: jest.fn()
  }
})

describe('test loadUnbilledUsagesTiles', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should loadUnbilledUsagesTiles correctly', async () => {
    const currentlyActiveSubscription = {
      type: 'mobile',
      marketCode: 'MMC',
      id: 111,
      mboId: 890,
      mboName: 'Mobilfunk-Business'
    }
    store.getState = () => ({
      appUserData: {
        ...userDataWithAllProducts,
        currentlyActiveSubscription
      }
    })
    legacy.legacyAxios.get.mockImplementation(() => {
      return {
        data: subscriptionUnbilledUsageData
      }
    })

    const result = await loadUnbilledUsagesTiles(currentlyActiveSubscription)
    expect(result).toEqual(subscriptionUnbilledUsageDataMapped)
  })

  it('should loadUnbilledUsagesTiles correctly when no mobile subscriptions', async () => {
    const currentlyActiveSubscription = {
      type: 'cable',
      id: 890
    }
    store.getState = () => ({
      appUserData: {
        userAccountVBO: {
          ...userDataWithAllProducts.userAccountVBO,
          mobile: undefined
        },
        currentlyActiveSubscription
      }
    })
    legacy.legacyAxios.get.mockImplementation(() => {
      return {
        data: subscriptionUnbilledUsageData
      }
    })

    const result = await loadUnbilledUsagesTiles(currentlyActiveSubscription)
    expect(result).toEqual([])
  })

  it('should throw error when api call fails', async () => {
    const currentlyActiveSubscription = {
      type: 'mobile',
      marketCode: 'MMC',
      id: 890
    }
    store.getState = () => ({
      appUserData: {
        ...userDataWithAllProducts,
        currentlyActiveSubscription
      }
    })
    legacy.legacyAxios.get.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        reject('error')
      })
    })

    await expect(
      loadUnbilledUsagesTiles(currentlyActiveSubscription)
    ).rejects.toEqual('error')
  })
})
