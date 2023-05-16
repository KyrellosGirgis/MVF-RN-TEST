import { shouldShowPaperBillBanner } from 'App/Services/API/Requests/Billing/BillBalance/BillBalance.helpers'

import { ApiRoutes } from 'App/Services'

import { DXLAxios } from 'App/Services/API/Interceptors/DXL.interceptor'
import { store } from 'App/Redux'

const getBillBalanceData = async () => {
  const { ban } = store?.getState()?.appUserData?.currentlyActiveSubscription
  const { URL, apiId } = ApiRoutes.DXL.billBalance
  try {
    const { data } = await DXLAxios.get(URL(ban), {
      apiId
    })
    return shouldShowPaperBillBanner(data)
  } catch (error) {
    throw error
  }
}

export { getBillBalanceData }
