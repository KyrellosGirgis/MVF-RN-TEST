/* eslint-disable import/namespace */

import { getTotalAmount } from 'App/Screens/ProductsAndServicesScreen/ProductsAndServices.helpers'
import * as userHelpers from 'App/Services/AppUserData/AppUserData.helpers'
import * as BillHistoryApi from 'App/Services/API/Requests/Billing/BillHistory/BillHistory'

describe('Test ProductsAndServicesScreen Helper', () => {
  const mappedBillHistoryData = {
    nextBillsLink: {
      href: 'https://api.vodafone.de/mva/v1/history?relatedParty.id=urn:vf-de-dxl-tmf:vf:mobile:ban:123456789&offset=3&limit=3'
    },
    billHistoryItems: [
      {
        billingAccount: {
          accountBalance: [
            {
              amount: {
                value: 10,
                unit: 'EUR'
              }
            }
          ]
        }
      }
    ]
  }

  it('getTotalAmount returns the right value for postpaid user', async () => {
    userHelpers.isMobilePostpaidSubscription = jest.fn(() => true)
    BillHistoryApi.loadBillingHistory = jest.fn(() => mappedBillHistoryData)
    const amount = await getTotalAmount()
    expect(BillHistoryApi.loadBillingHistory).toHaveBeenCalledTimes(1)
    expect(amount).toBe('10€')
  })
})
