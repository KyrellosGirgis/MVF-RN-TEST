import {
  userDataWithAllProducts,
  unbilledUsageMappedTiles,
  subscriptionUnbilledUsageData
} from '__tests__/App/Services/api/Requests/Dashboard/data'

import store from 'App/Redux/store'
import * as legacy from 'App/Services/API/Interceptors/legacy.interceptor'

import mapUnbilledUsagesToTiles from 'App/Services/API/Requests/Dashboard/subscriptionUnbilledUsage/subscriptionUnbilledUsageMapper'

jest.mock('App/Utils/Helpers/generic.helpers', () => {
  const actualHelper = jest.requireActual('App/Utils/Helpers/generic.helpers')
  return {
    ...actualHelper,
    translate: (str) => str,
    testID: (str) => str,
    isDE: jest.fn()
  }
})

describe('test mapUnbilledUsagesToTiles', () => {
  const currentlyActiveSubscription = {
    type: 'mobile',
    marketCode: 'MMC',
    id: 111,
    mboId: 890,
    mboName: 'Mobilfunk-Business'
  }
  store.getState = () => ({
    appUserData: { currentlyActiveSubscription: currentlyActiveSubscription }
  })
  it('should return usageTiles as expected', () => {
    store.getState = () => ({
      appUserData: userDataWithAllProducts
    })
    legacy.legacyAxios.get.mockImplementation(() => {
      return {
        data: subscriptionUnbilledUsageData
      }
    })

    const usageTiles = mapUnbilledUsagesToTiles(
      subscriptionUnbilledUsageData,
      userDataWithAllProducts.userAccountVBO.mobile[0].contract.subscription[0]
    )
    expect(usageTiles).toEqual(unbilledUsageMappedTiles)
  })
})
