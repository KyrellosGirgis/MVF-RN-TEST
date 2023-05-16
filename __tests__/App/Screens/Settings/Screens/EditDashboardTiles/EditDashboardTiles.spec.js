/* eslint-disable import/namespace */
import React from 'react'

import { create } from 'react-test-renderer'
import { useSelector, useDispatch } from 'react-redux'
import { VFButton } from '@vfgroup-oneplatform/foundation/Components'

import { EditDashboardTilesScreen } from '@vfgroup-oneplatform/framework/EditDashboardTiles'

import { useRoute } from '@react-navigation/native'

import { store } from 'App/Redux'

import { NavigationFunctions } from 'App/Containers'
import { EditDashboardTiles } from 'App/Screens'
import * as navigateHelper from 'App/Screens/Helpers'

jest.mock('react-native-reanimated', () => ({
  ...require('react-native-reanimated/mock'),
  call: jest.fn()
}))

jest.mock('App/Containers/AppNavigation/NavigationFunctions', () => {
  return { goBack: jest.fn(), navigate: jest.fn(), popToTop: jest.fn() }
})

const buckets = [
  { _id: '9876_daten', title: 'data tile', usageType: 'daten' },
  { _id: '9876_sms', title: 'sms tile', usageType: 'sms' },
  { _id: '9876_minuten', title: 'calls tile', usageType: 'minuten' },
  { _id: '9854_daten', title: 'data tile', usageType: 'daten' },
  { _id: '9854_sms', title: 'sms tile', usageType: 'sms' }
]

const selectedTiles = [
  {
    _id: '9876_daten',
    name: 'data tile',
    icon: 'ic_data_sharing'
  },
  {
    _id: '9876_sms',
    name: 'sms tile',
    icon: 'ic_sms_text'
  },
  {
    _id: '9876_minuten',
    name: 'calls tile',
    icon: 'ic_call_log'
  }
]
const optionalTiles = [
  {
    _id: '9854_daten',
    name: 'data tile',
    icon: 'ic_data_sharing'
  },
  {
    _id: '9854_sms',
    name: 'sms tile',
    icon: 'ic_sms_text'
  }
]

const mappedTiles = [...selectedTiles, ...optionalTiles]

const state = {
  appUserData: {
    currentlyActiveSubscription: {
      id: 1234
    }
  },
  settings: { persistedSubscriptionTiles: {} },
  usages: { usagesTiles: buckets }
}

describe('Edit dashboard tiles screen', () => {
  beforeAll(() => {
    store.getState = () => ({
      settings: {
        persistedSubscriptionTiles: {
          ['1234']: selectedTiles.map((tile) => tile._id)
        }
      }
    })
    useSelector.mockImplementation(() => ({
      currentlyActiveSubscription: {
        id: 1234
      },
      usagesTiles: buckets,
      usagesTilesLoadingStatus: 'fulfilled'
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should render Edit dashboard tiles screen successfully', () => {
    const element = create(<EditDashboardTiles />)
    const screenHeader = element.root.findByProps({
      testID: 'EditDashboardTilesScreen_Header_Title'
    }).props
    expect(screenHeader).toBeTruthy()
  })

  test('should render selectedTiles and optionalTiles as expected', () => {
    const element = create(<EditDashboardTiles />)

    const EditDashboardTilesProps = element.root.findAllByType(
      EditDashboardTilesScreen
    )[0].props

    expect(EditDashboardTilesProps.selectedTiles).toEqual(selectedTiles)

    expect(EditDashboardTilesProps.optionalTiles).toEqual(optionalTiles)
  })

  test('should render default tiles when no persisted tiles or userId', () => {
    store.getState = () => ({
      settings: {
        persistedSubscriptionTiles: {}
      }
    })
    useSelector.mockImplementation((callBack) => {
      return callBack(state)
    })
    const element = create(<EditDashboardTiles />)
    const EditDashboardTilesProps = element.root.findAllByType(
      EditDashboardTilesScreen
    )[0].props
    expect(EditDashboardTilesProps.selectedTiles).toEqual(
      mappedTiles.slice(0, 3)
    )
    expect(EditDashboardTilesProps.optionalTiles).toEqual(mappedTiles.slice(3))
  })

  test('should render no tiles when no persisted tiles and userId exists', () => {
    store.getState = () => ({
      settings: {
        persistedSubscriptionTiles: {
          ['1234']: []
        }
      }
    })
    useSelector.mockImplementation(() => ({
      currentlyActiveSubscription: {
        id: 1234
      },
      usagesTiles: buckets
    }))
    const element = create(<EditDashboardTiles />)
    const EditDashboardTilesProps = element.root.findAllByType(
      EditDashboardTilesScreen
    )[0].props
    expect(EditDashboardTilesProps.selectedTiles).toEqual([])

    expect(EditDashboardTilesProps.optionalTiles).toEqual(mappedTiles)
  })

  test('should call dispatch when pressing on confirm button & navigate to dashboard', () => {
    useDispatch.mockReturnValue(jest.fn)
    navigateHelper.navigateToDashboardScreen = jest.fn()
    const element = create(<EditDashboardTiles />)
    const confirmButton = element.root.findAllByType(VFButton)[0]
    confirmButton.props.onPress()
    expect(useDispatch).toHaveBeenCalledTimes(1)
    expect(navigateHelper.navigateToDashboardScreen).toHaveBeenCalled()
  })

  test('should call NavigationFunctions goBack when pressing back icon when it is shown', () => {
    useRoute.mockImplementation(() => ({
      params: {
        showBackButton: true
      }
    }))

    const element = create(<EditDashboardTiles />)

    const backScreenButton = element.root.findByProps({
      testID: 'backBTNtest'
    })

    backScreenButton.props.onPress()
    expect(NavigationFunctions.goBack).toHaveBeenCalledTimes(1)
  })

  test('should navigateToDashboardScreen when pressing close icon', () => {
    navigateHelper.navigateToDashboardScreen = jest.fn()
    const element = create(<EditDashboardTiles />)
    const closeScreenButton = element.root.findByProps({
      testID: 'closeBTNtest'
    })

    closeScreenButton.props.onPress()
    expect(navigateHelper.navigateToDashboardScreen).toHaveBeenCalledTimes(1)
  })

  test('should show shimmering when usagesTiles status is pending', () => {
    useSelector.mockImplementation(() => ({
      currentlyActiveSubscription: {
        id: 1234
      },
      usagesTiles: buckets,
      usagesTilesLoadingStatus: 'pending'
    }))

    const element = create(<EditDashboardTiles />)

    const EditDashboardShimmerScreen = element.root.findByProps({
      testID: 'EditDashboardTiles_Shimmer_VFScreen'
    })

    const ShimmerContainer = element.root.findByProps({
      testID: 'EditDashboardTiles_Shimmer_VFScreen_Shimmer_Wrapper'
    })

    const CoreEditDashboardTiles = element.root.findAllByType(
      EditDashboardTilesScreen
    )

    expect(EditDashboardShimmerScreen).toBeDefined()
    expect(ShimmerContainer).toBeDefined()
    expect(CoreEditDashboardTiles.length).toEqual(0)
  })

  test('should show shimmering when usagesTiles status is rejected', () => {
    useSelector.mockImplementation(() => ({
      currentlyActiveSubscription: {
        id: 1234
      },
      usagesTiles: [],
      usagesTilesLoadingStatus: 'rejected'
    }))

    const element = create(<EditDashboardTiles />)

    const coreEditDashboardTilesProps = element.root.findAllByType(
      EditDashboardTilesScreen
    )[0].props

    expect(coreEditDashboardTilesProps.selectedTiles).toEqual([])
    expect(coreEditDashboardTilesProps.optionalTiles).toEqual([])
  })
})
