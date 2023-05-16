import { getMsisdn } from 'App/Services/AppUserData/AppUserData.helpers'
import { UserDataServicesTypes } from 'App/Services/API/Requests/userData/userData.d'
import { AUTO_TOPUP_STATUS } from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/BalanceTab.constants'

const constructAutoTopupStatusBody = (autoTopupStatus: AUTO_TOPUP_STATUS) => {
  return {
    subscriptionVBO: [
      {
        type: UserDataServicesTypes.mobile,
        subscriptions: [
          {
            details: {
              msisdn: getMsisdn()
            },
            topup: {
              status: autoTopupStatus
            }
          }
        ]
      }
    ]
  }
}
export { constructAutoTopupStatusBody }
