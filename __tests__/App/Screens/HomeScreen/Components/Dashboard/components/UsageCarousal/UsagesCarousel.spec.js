/* eslint-disable import/namespace */
import React from 'react'

import { act, create } from 'react-test-renderer'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination, Card } from '@vfgroup-oneplatform/foundation/Components'
import CardCarousel from '@vfgroup-oneplatform/foundation/Components/CardCarousel'

import DashboardErrorCard from '@vfgroup-oneplatform/framework/Dashboard/Dashboard/DashboardErrorCard/DashboardErrorCard'

import UsagesCarousel from 'App/Screens/HomeScreen/components/Dashboard/components/UsagesCarousel/UsagesCarousel'
import * as UnbilledUsagesThunk from 'App/Redux/Usages/usages.thunk'

const props = {
  onSwipeMainCard: jest.fn(),
  userType: 'mobile',
  theme: { name: 'light', isDark: false, colors: {} }
}

describe('render UsagesCarousel feature sucessfully', () => {
  test('should render UsagesCarousel feature screen successfully', async () => {
    let element
    useSelector.mockImplementation(() => ({
      usagesTilesLoadingStatus: 'fulfilled'
    }))
    await act(async () => {
      element = create(<UsagesCarousel {...props} />)
    })

    expect(
      element.root.findByProps({
        testID: 'MainCard'
      })
    ).toBeDefined()
    let pagination = element.root.findAllByType(Pagination)[0]
    expect(pagination).toBeDefined()
    expect(pagination.props.activeDotIndex).toBe(0)

    const cardCarousel = element.root.findAllByType(CardCarousel)[0]
    expect(cardCarousel).toBeDefined()
    expect(cardCarousel.props.activeCardIndex).toBe(0)
    cardCarousel.props.onSwipe(2)

    cardCarousel.props.renderCard({
      item: {
        usageType: 'mobile',
        remainingValue: {
          amount: '77',
          units: '$'
        },
        valueName: '77',
        value: { amount: '66', units: '$' },
        resetTextValue: '',
        isRoaming: false,
        footerText: '',
        headerTitle: '',
        remainingValueName: ''
      },
      index: 1,
      isActiveCard: false,
      theme: { name: 'light', isDark: false, colors: {} }
    })
    cardCarousel.props.onCardPositionChange({ x: 2, y: 2 })
    await act(async () => {
      element.update(<UsagesCarousel {...props} />)
    })
    pagination = element.root.findAllByType(Pagination)[0]
    expect(pagination.props.activeDotIndex).toBe(2)
  })

  test('should render dashboardError component when usagesTilesLoadingStatus is rejected', async () => {
    let element
    UnbilledUsagesThunk.fetchUnbilledUsages = jest.fn(() => {})
    useDispatch.mockReturnValue(jest.fn())
    useSelector.mockImplementation(() => ({
      usagesTilesLoadingStatus: 'rejected'
    }))
    await act(async () => {
      element = create(<UsagesCarousel {...props} />)
    })

    const dashboardErrorCard = element.root.findAllByType(DashboardErrorCard)[0]
    expect(dashboardErrorCard).toBeDefined()
    expect(dashboardErrorCard.props.accessibilityID).toEqual(
      'UsagesCarousel_DashboardErrorCard'
    )
    expect(dashboardErrorCard.props.errorText).toEqual('error')

    dashboardErrorCard.props.errorHandler()
    expect(UnbilledUsagesThunk.fetchUnbilledUsages).toHaveBeenCalled()
  })

  test('should render card shimmering when usagesTilesLoadingStatus is pending', async () => {
    let element
    useSelector.mockImplementation(() => ({
      usagesTilesLoadingStatus: 'pending'
    }))
    await act(async () => {
      element = create(<UsagesCarousel {...props} />)
    })

    const coreCard = element.root.findAllByType(Card)[0]
    expect(coreCard).toBeDefined()
    expect(coreCard.props.isLoading).toBeTruthy()

    const pagination = element.root.findAllByType(Pagination)
    expect(pagination.length).toBe(0)
  })
})
