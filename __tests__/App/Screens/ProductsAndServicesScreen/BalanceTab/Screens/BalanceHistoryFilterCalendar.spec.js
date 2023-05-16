/* eslint-disable import/namespace */

import React from 'react'

import { create } from 'react-test-renderer'

import { BalanceDateFilter } from '@vfgroup-oneplatform/framework/Balance/Screens'

import { useRoute } from '@react-navigation/native'

import { BalanceHistoryFilterCalendarScreen } from 'App/Screens'
import * as navigation from 'App/Containers'

describe('Balance calendar screen ', () => {
  let BalanceDateFilterElement
  const dummyFunction = jest.fn()
  beforeAll(() => {
    useRoute.mockImplementation(() => ({
      params: {
        onApplyCalendarFilter: dummyFunction,
        dateFilterPeriod: { start: '1-1-2020', end: '5-1-2020' }
      }
    }))
    navigation.NavigationFunctions.pop = jest.fn()
    const element = create(<BalanceHistoryFilterCalendarScreen />)
    BalanceDateFilterElement = element.root.findAllByType(BalanceDateFilter)[0]
  })

  test('should render BalanceCalendar component successfully', () => {
    expect(BalanceDateFilterElement).toBeDefined()
  })

  test('should pop on balanceCalendar close', async () => {
    BalanceDateFilterElement.props.onClose()
    expect(navigation.NavigationFunctions.pop).toHaveBeenCalled()
  })

  test('should call onFilterPress and navigate when clicking on view history', async () => {
    BalanceDateFilterElement.props.onViewHistory()
    expect(dummyFunction).toHaveBeenCalled()
    expect(navigation.NavigationFunctions.pop).toHaveBeenCalled()
  })
  test('should use start and end dates in BalanceDateFilter from useRoute', async () => {
    expect(BalanceDateFilterElement.props.start).toEqual('1-1-2020')
    expect(BalanceDateFilterElement.props.end).toEqual('5-1-2020')
  })
})
