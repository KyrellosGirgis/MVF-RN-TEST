import React from 'react'

import { BalanceDateFilter } from '@vfgroup-oneplatform/framework/Balance/Screens'

import moment from 'moment'

import testIDs from 'react-native-calendars/src/testIDs'

import { useRoute } from '@react-navigation/native'
import type { RouteProp } from '@react-navigation/native'

import BalanceCalendarScreenTestIDs from './BalanceHistoryFilterCalendar.testIds'

import {
  BalanceCalendarScreenParams,
  DateFilterPeriod
} from './BalanceHistoryFilterCalendar.d'

import { NavigationFunctions } from 'App/Containers'

Object.assign(testIDs, BalanceCalendarScreenTestIDs)

const BalanceHistoryFilterCalendarScreen = () => {
  const minMonth = '-24'

  const { onApplyCalendarFilter, dateFilterPeriod } =
    useRoute<RouteProp<BalanceCalendarScreenParams, 'BalanceCalendar'>>()
      ?.params

  const onBalanceHistoryFilterApply = (dateFilterPeriod: DateFilterPeriod) => {
    onApplyCalendarFilter(dateFilterPeriod)
    NavigationFunctions.pop()
  }

  return (
    <BalanceDateFilter
      onClose={NavigationFunctions.pop}
      minDate={moment().add(minMonth, 'M').format('YYYY-MM-DD')}
      maxDate={moment().format('YYYY-MM-DD')}
      onViewHistory={onBalanceHistoryFilterApply}
      start={dateFilterPeriod?.start}
      end={dateFilterPeriod?.end}
    />
  )
}

export default BalanceHistoryFilterCalendarScreen
