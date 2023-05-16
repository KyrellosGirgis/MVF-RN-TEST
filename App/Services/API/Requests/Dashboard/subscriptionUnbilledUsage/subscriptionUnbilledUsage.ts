import mapUnbilledUsagesToTiles from './subscriptionUnbilledUsageMapper'

import { UsageTile } from './subscriptionUnbilledUsage.d'

import { USAGE_TYPES_SORT } from './UsageData.helpers'

import { Subscription } from 'App/Services/API/Requests/userData/userData.d'

import ApiRoutes from 'App/Services/API/ApiRoutes'
import { legacyAxios } from 'App/Services/API/Interceptors/legacy.interceptor'

import { store } from 'App/Redux'
import { isMobilePostpaidSubscription } from 'App/Services/AppUserData/AppUserData.helpers'

const getUsagesTilesForSingleSubscription = async (
  subscription: Subscription
) => {
  const { URL, cache, apiId } = ApiRoutes.Nil.subscriptionUnbilledUsage
  const { id: msisdn, marketCode } = subscription
  try {
    const { data } = await legacyAxios.get(URL(msisdn, marketCode), {
      cache,
      apiId
    })

    return mapUnbilledUsagesToTiles(data, subscription)
  } catch (error) {
    throw error
  }
}

const loadUnbilledUsagesTiles = async () => {
  let usagesTiles: UsageTile[] = []

  const { currentlyActiveSubscription } = store.getState().appUserData

  usagesTiles = isMobilePostpaidSubscription()
    ? await getUsagesTilesForSingleSubscription(currentlyActiveSubscription)
    : []

  return usagesTiles.sort((a, b) =>
    USAGE_TYPES_SORT[a.usageType] > USAGE_TYPES_SORT[b.usageType] ? 1 : -1
  )
}

export { loadUnbilledUsagesTiles }
