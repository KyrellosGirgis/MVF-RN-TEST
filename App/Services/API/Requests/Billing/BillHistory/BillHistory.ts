import { mapBillHistory } from 'App/Services/API/Requests/Billing/BillHistory/BillHistoryMapper'
import { getOffestFromUrl } from 'App/Utils/Helpers/url.helpers'

import { DXLAxios } from 'App/Services/API/Interceptors/DXL.interceptor'
import { store } from 'App/Redux'
import { ApiRoutes } from 'App/Services'

const loadBillingHistory = async (billUrl?: string) => {
  const ban = store?.getState()?.appUserData?.currentlyActiveSubscription?.ban
  const { URL, cache, headers, apiId } = ApiRoutes.DXL.billHistory
  try {
    const { data } = await DXLAxios.get(URL(ban, getOffestFromUrl(billUrl)), {
      cache,
      headers,
      apiId
    })
    return mapBillHistory(data)
  } catch (error) {
    throw error
  }
}

export { loadBillingHistory }
