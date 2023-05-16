import moment from 'moment'

import { Amount } from './subscriptionUnbilledUsage.d'

import { DISPLAYED_UNIT } from 'App/Services/API/Requests/Dashboard/subscriptionUnbilledUsage/UsageData.constants'

import { isDecimal } from 'App/Utils/Helpers/number.helpers'

const formatDecimalByLanguage = (
  num: number,
  options?: Intl.NumberFormatOptions | undefined
) => {
  return new Intl.NumberFormat(moment().locale(), options).format(num)
}

const calcCorrectUnit = (size: string, unit: string) => {
  let value = Number(size)
  const shouldForceGBUnit = value >= 1024 && unit.toLowerCase() === 'mb'

  if (shouldForceGBUnit) {
    value = value / 1024
  }
  return <Amount>{
    value: isDecimal(value) ? Number(value.toFixed(2)) : value,
    unit: shouldForceGBUnit ? DISPLAYED_UNIT.gb : DISPLAYED_UNIT[unit]
  }
}

const getDurationinDays = (date1: string, date2 = moment().startOf('day')) =>
  moment.duration(
    moment(date1, 'YYYY-MM-DD').startOf('day').diff(date2, 'days')
  )

export { calcCorrectUnit, getDurationinDays, formatDecimalByLanguage }
