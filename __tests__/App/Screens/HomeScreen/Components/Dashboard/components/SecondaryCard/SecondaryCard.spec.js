/* eslint-disable import/namespace */
import React from 'react'

import { useSelector } from 'react-redux'

import { act, create } from 'react-test-renderer'

import SecondaryCard from 'App/Screens/HomeScreen/components/Dashboard/components/SecondaryCard/SecondaryCard'
import { handleDeeplinkingWhenAppIsOpened } from 'App/Services/Deeplinks/Deeplinks.helper'

import { mockMediumTilesJson } from '__tests__/__mocks__/MockedStubbingData'
import { store } from 'App/Redux'

import * as MediumTilesThunk from 'App/Redux/reducers/MediumTiles/MediumTiles.thunk'

import * as UserDataService from 'App/Services/AppUserData/AppUserData.helpers'
import NavigationFunctions from 'App/Containers/AppNavigation/NavigationFunctions'
import * as LoginFlowManager from 'App/Services/LoginFlowManager/LoginFlowManager'

jest.mock('App/Services/Deeplinks/Deeplinks.helper', () => ({
  handleDeeplinkingWhenAppIsOpened: jest.fn()
}))

const state = {
  appUserData: {
    currentlyActiveSubscription: {
      itemTitle: 'Mobilfunk',
      itemSubTitle: '01522992786',
      itemImage: 'mobile_image',
      id: '491699022786',
      type: 'mobile',
      marketCode: 'MMC',
      ban: 1111222,
      hasBanAccess: true,
      mboId: 12746753
    }
  },
  dashboardSkeleton: {
    dashboardSkeletonLoadingStatus: 'fulfilled'
  },
  mediumTiles: {
    mediumTilesLoadingStatus: 'fulfilled',
    ...mockMediumTilesJson
  }
}

const failedMediumTilesState = {
  ...state,
  mediumTiles: {
    mediumTilesLoadingStatus: 'rejected',
    mediumTiles: []
  }
}

const noBanAccessState = {
  ...state,
  appUserData: {
    currentlyActiveSubscription: {
      ...state.appUserData.currentlyActiveSubscription,
      hasBanAccess: false
    }
  }
}

describe('Testing dashboard Secondary Card', () => {
  beforeAll(() => {
    NavigationFunctions.navigate = jest.fn()
    UserDataService.isMobilePostpaidSubscription = jest.fn(() => true)
    useSelector.mockImplementation((callBack) => {
      return callBack(state)
    })
  })

  test('should render SecondaryCard component correctly', async () => {
    const element = create(<SecondaryCard />)

    const component = element.root.findByProps({
      testID: 'DashboardSecondaryTile'
    }).props
    expect(component).toBeTruthy()

    const secondaryCardTitle = element.root.findByProps({
      testID: 'SecondaryCardTitle_txt'
    }).props

    const secondaryCardSubTitle = element.root.findByProps({
      testID: 'SecondaryCardSubTitle_txt'
    }).props

    const secondaryCardIcon = element.root.findByProps({
      testID: 'SecondaryCardIcon_image'
    }).props

    const secondaryCardBillingInfo = element.root.findByProps({
      testID: 'SecondaryCardBillAmount_txt'
    }).props

    expect(secondaryCardBillingInfo.children).toBe('99.99$')

    expect(secondaryCardTitle.i18nKey).toBe(
      mockMediumTilesJson.mediumTiles[0].title
    )
    expect(secondaryCardSubTitle.i18nKey).toBe(
      mockMediumTilesJson.mediumTiles[0].description
    )
    expect(secondaryCardIcon.source.uri).toBe(
      mockMediumTilesJson.mediumTiles[0].icon.href
    )
  })

  test('should handleDeeplinkingWhenAppIsOpened when subscription has ban level access', () => {
    const element = create(<SecondaryCard />)

    const card = element.root.findByProps({
      testID: 'DashboardSecondaryTile'
    }).props
    expect(card).toBeTruthy()

    card.onPressCard()
    expect(handleDeeplinkingWhenAppIsOpened).toHaveBeenCalledWith(
      mockMediumTilesJson.mediumTiles[0].action.href
    )
  })

  test('should render error card when service failed', async () => {
    useSelector.mockImplementation((callback) => {
      return callback(failedMediumTilesState)
    })

    store.dispatch = jest.fn()
    MediumTilesThunk.fetchMediumTiles = jest.fn()

    var element
    await act(async () => {
      element = create(<SecondaryCard />)
    })
    const component = element.root.findByProps({
      errorText: 'error'
    }).props
    expect(component).toBeTruthy()

    component.errorHandler()
    expect(MediumTilesThunk.fetchMediumTiles).toHaveBeenCalledTimes(1)
  })

  describe('Testing dashboard Secoondary Card when currentlyActiveSubscription has no ban access', () => {
    beforeAll(() => {
      LoginFlowManager.startBanLevelLoginFlow = jest.fn()
      useSelector.mockImplementation((callBack) => {
        return callBack(noBanAccessState)
      })
    })

    test('should render SecondaryCard with locked bill', () => {
      const element = create(<SecondaryCard />)

      expect(
        element.root.findByProps({
          testID: 'SecondaryCardLockedBillContainer'
        })
      ).toBeDefined()
    })

    test('should call startBanLevelLoginFlow when pressing on secondary card', () => {
      const element = create(<SecondaryCard />)

      const secondaryCardProps = element.root.findByProps({
        testID: 'DashboardSecondaryTile'
      }).props

      secondaryCardProps.onPressCard()
      expect(LoginFlowManager.startBanLevelLoginFlow).toHaveBeenCalledTimes(1)
    })
  })
})
