import {
  calcCorrectUnit,
  formatDecimalByLanguage,
  getDurationinDays
} from './helpers'

import { Amount, Usage } from './subscriptionUnbilledUsage.d'

import { DISPLAYED_UNIT, UNLIMITED_DATA_THRESHOLD } from './UsageData.constants'

import { USAGE_TYPES } from 'App/Utils/Enums/index'
import { translate } from 'App/Utils'
import { GenericObject } from 'App/types'

const USAGE_TYPES_SORT: { [key: string]: number } = {
  [USAGE_TYPES.DATA]: 1,
  [USAGE_TYPES.VOICE]: 4,
  [USAGE_TYPES.SMS]: 2,
  [USAGE_TYPES.MMS]: 3
}

const UNLIMITED_TEXT: GenericObject = {
  [USAGE_TYPES.DATA]: 'unlimited_access',
  [USAGE_TYPES.VOICE]: 'unlimited_calls',
  [USAGE_TYPES.SMS]: 'unlimited_sms',
  [USAGE_TYPES.MMS]: 'unlimited_mms'
}

const constructFooterText = (
  usageType: string,
  isUnlimited: boolean,
  billCycleEndDate: string
) => {
  if (isUnlimited) {
    return UNLIMITED_TEXT[usageType]
  }
  const daysCount = getDurationinDays(billCycleEndDate) + 1
  return translate(daysCount === 1 ? 'resetIn_one' : 'resetIn_other', {
    count: daysCount
  })
}

const constructLeftOfText = (total: Amount) => {
  return `${translate('leftOf')} ${total?.stringValue}${
    total?.unit
  } ${translate('bundle')}`
}

const getFormattedValue = (
  amount: string,
  unitOfMeasure: string,
  usageType: string
) => {
  const valueUnit = unitOfMeasure.toLowerCase()
  const newAmount =
    usageType === USAGE_TYPES.DATA
      ? calcCorrectUnit(amount, valueUnit)
      : <Amount>{
          value: Number(amount),
          unit: DISPLAYED_UNIT[valueUnit]
        }

  return <Amount>{
    ...newAmount,
    stringValue: formatDecimalByLanguage(newAmount.value)
  }
}

const calculateRemainingValuePercentage = (
  remainingValue: string,
  totalValue: string
) => {
  const remainingValuePercentage =
    (Number(remainingValue) / Number(totalValue)) * 100

  return isNaN(remainingValuePercentage) ? 0 : remainingValuePercentage
}

const isUnlimitedData = ({ value, unit }: Amount) =>
  (unit === DISPLAYED_UNIT.gb ? value * 1024 : value) > UNLIMITED_DATA_THRESHOLD

const isUsageUnlimited = (
  formatedTotal: Amount,
  description: string,
  type: string
) =>
  isUnlimitedData(formatedTotal) ||
  (formatedTotal.value === 0 && description.toLowerCase().includes('flat')) ||
  type === 'unlimited'

const removePasseUsages = (usages?: Usage[]) => {
  const usageBlackList = ['Vodafone Pässe', 'Vodafone Pass im EU-Ausland']
  return usages?.filter((usage) => !usageBlackList.includes(usage.name))
}

export {
  constructFooterText,
  isUsageUnlimited,
  getFormattedValue,
  constructLeftOfText,
  calculateRemainingValuePercentage,
  removePasseUsages,
  USAGE_TYPES_SORT
}
