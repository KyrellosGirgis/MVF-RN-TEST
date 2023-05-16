import { BillDunning } from './BillDunning.d'

import { legacyAxios } from 'App/Services/API/Interceptors/legacy.interceptor'

import { store } from 'App/Redux'
import { ApiRoutes } from 'App/Services'

const getBillDunningData = async () => {
  const { ban } = store?.getState()?.appUserData?.currentlyActiveSubscription
  const { URL, apiId } = ApiRoutes.Nil.billDunning
  try {
    const { data } = await legacyAxios.get(URL(ban), {
      apiId
    })
    return <BillDunning>data
  } catch (error) {
    throw error
  }
}

export { getBillDunningData }
