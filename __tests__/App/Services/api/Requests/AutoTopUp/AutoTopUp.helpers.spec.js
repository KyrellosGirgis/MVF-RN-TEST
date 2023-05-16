import { store } from 'App/Redux'
import { AUTO_TOPUP_STATUS } from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/BalanceTab.constants'
import { constructAutoTopupStatusBody } from 'App/Services/API/Requests/AutoTopUp/AutoTopUp.helpers'

describe('Auto topup helpers test', () => {
  it('should map AutoTopupStatus enum to autoTopupStatusModel', () => {
    store.getState = () => ({
      appUserData: {
        currentlyActiveSubscription: {
          id: '003444556662'
        }
      }
    })
    const autoTopupStatusBody = {
      subscriptionVBO: [
        {
          type: 'mobile',
          subscriptions: [
            {
              details: {
                msisdn: '003444556662'
              },
              topup: {
                status: 'NotRegistered'
              }
            }
          ]
        }
      ]
    }
    expect(
      constructAutoTopupStatusBody(AUTO_TOPUP_STATUS.NOT_REGISTERED)
    ).toEqual(autoTopupStatusBody)
  })
})
