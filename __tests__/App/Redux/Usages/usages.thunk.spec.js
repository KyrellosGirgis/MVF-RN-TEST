/* eslint-disable import/namespace */
import { store } from 'App/Redux'
import { fetchUnbilledUsages } from 'App/Redux/Usages/usages.thunk'
import * as SubscriptionUnbilledUsage from 'App/Services/API/Requests/Dashboard/subscriptionUnbilledUsage/subscriptionUnbilledUsage'

describe('unit testing for usages thunk', () => {
  it('fetchUnbilledUsages should call loadUnbilledUsagesTiles when fulfilled if there is currentlyActiveSubscription saved', async () => {
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
    store.getState = () => ({
      appUserData: { currentlyActiveSubscription: currentlyActiveSubscription }
    })
    SubscriptionUnbilledUsage.loadUnbilledUsagesTiles = jest.fn(() =>
      Promise.resolve()
    )
    store.dispatch(fetchUnbilledUsages())
    expect(SubscriptionUnbilledUsage.loadUnbilledUsagesTiles).toHaveBeenCalled()
  })
})
