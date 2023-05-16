import { UsageGroup, Usage, UsageTile } from './subscriptionUnbilledUsage.d'

import {
  getFormattedValue,
  isUsageUnlimited,
  calculateRemainingValuePercentage,
  removePasseUsages
} from './UsageData.helpers'

import { Subscription } from 'App/Services/API/Requests/userData/userData.d'

// mapper for bucket to match core main component UI data structure to render it.
// Tile Title: Subscription Name + (Usage description).
// GB if total is >= 1 GB
// MB if total is < 1 GB
// NOTE: 1 bucket can contain different usages.
// NOTE: For each data usage entry for each subscription, a consumption tile is shown.
// UNLIMITED DATA BUCKET: if total more than 999000 mb

const mapUsageDataToUsageTiles = (
  subscription: Subscription,
  usageData: UsageGroup,
  billCycleEndDate: string
) => {
  const filteredUsages = removePasseUsages(usageData?.usage)

  return (
    filteredUsages?.map((usage: Usage) => {
      const { mboId, mboName } = subscription
      const { unitOfMeasure, total, description, remaining, type } = usage

      const usageType = usageData.container.toLowerCase()

      const formattedTotal = getFormattedValue(total, unitOfMeasure, usageType)

      const formatedRemaining = getFormattedValue(
        remaining,
        unitOfMeasure,
        usageType
      )

      const isUnlimited = isUsageUnlimited(formattedTotal, description, type)

      return <UsageTile>{
        _id: `${mboId}_${usageType}_${description}`,
        title: `${mboName ? mboName + ' ' : ''}${description}`,
        usageType,
        isUnlimited,
        billCycleEndDate,
        formattedTotal,
        remaining: isUnlimited ? 'unlimited' : formatedRemaining.stringValue,
        remainingUnit: isUnlimited ? '' : formatedRemaining.unit,
        remainingValuePercentage: isUnlimited
          ? 100
          : calculateRemainingValuePercentage(remaining, total)
      }
    }) || []
  )
}

export default mapUsageDataToUsageTiles
