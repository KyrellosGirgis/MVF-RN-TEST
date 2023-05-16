import { getMsisdn } from 'App/Services/AppUserData/AppUserData.helpers'
import { UserDataServicesTypes } from 'App/Services/API/Requests/userData/userData.d'

const constructVoucherTopupBody = (code: string) => {
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
              voucherCode: code
            }
          }
        ]
      }
    ]
  }
}

export { constructVoucherTopupBody }
