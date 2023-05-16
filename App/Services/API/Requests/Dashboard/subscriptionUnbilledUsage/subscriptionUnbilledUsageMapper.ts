import { subscriptionUnbilledUsageType } from './subscriptionUnbilledUsage.d'

import mapUsageDataToUsageTiles from './UsageDataMapper'

import { Subscription } from 'App/Services/API/Requests/userData/userData.d'

const mapUnbilledUsagesToTiles = (
  subscriptionUnbilledUsage: subscriptionUnbilledUsageType,
  subscription: Subscription
) => {
  const usagesData =
    subscriptionUnbilledUsage.serviceUsageVBO.usageAccounts[0].usageGroup

  const billCycleEndDate =
    subscriptionUnbilledUsage.serviceUsageVBO.billDetails.billCycleEndDate

  const usageTiles = usagesData.flatMap((usageData) =>
    mapUsageDataToUsageTiles(subscription, usageData, billCycleEndDate)
  )

  return usageTiles
}

export default mapUnbilledUsagesToTiles
