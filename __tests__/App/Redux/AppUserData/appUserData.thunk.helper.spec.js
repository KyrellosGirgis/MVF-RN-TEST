/* eslint-disable import/namespace */
import { store } from 'App/Redux'
import { saveCurrentlyActiveSubscriptionIfNeeded } from 'App/Redux/AppUserData/appUserData.thunk.helper'
import { userDataWithAllProductsMappedToSubscriptions } from '__tests__/App/Services/api/Requests/Dashboard/data'

const currentlyActiveSubscription = {
  itemTitle: 'Mobilfunk',
  itemSubTitle: '01522992786',
  itemImage: 'mobile_image',
  id: '491699022786',
  type: 'mobile',
  marketCode: 'MMC',
  ban: 1111222,
  hasBanAccess: true,
  mboId: 12746753
}

describe('test user data thunk Helper functions', () => {
  beforeAll(() => {
    store.dispatch = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('saveCurrentlyActiveSubscriptionIfNeeded should get CurrentlyActiveSubscription and return if found', () => {
    store.getState = jest.fn(() => ({
      appUserData: { currentlyActiveSubscription: currentlyActiveSubscription }
    }))
    saveCurrentlyActiveSubscriptionIfNeeded()
    expect(store.getState).toHaveBeenCalled()
    expect(store.dispatch).not.toHaveBeenCalled()
  })
  test('saveCurrentlyActiveSubscriptionIfNeeded should get CurrentlyActiveSubscription and save default value if NOT found', () => {
    store.getState = jest.fn(() => ({
      appUserData: {
        currentlyActiveSubscription: undefined,
        userAccountVBO: {
          subscriptions: userDataWithAllProductsMappedToSubscriptions
        }
      }
    }))
    saveCurrentlyActiveSubscriptionIfNeeded()
    expect(store.getState).toHaveBeenCalled()
    expect(store.dispatch).toHaveBeenCalled()
  })
})
