import React from 'react'
import { create, act } from 'react-test-renderer'

import { AddOns } from '@vfgroup-oneplatform/framework/AddOns'

import { useDispatch, useSelector } from 'react-redux'

import AddonsTab from 'App/Screens/ProductsAndServicesScreen/components/AddonsTab/AddonsTab'
import * as addonsThunk from 'App/Redux/Addons/addons.thunk'
import Routes from 'App/Containers/AppNavigation/Routes'
import * as NavigationFunctions from 'App/Containers'

jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
    useSelector: jest.fn(() => ({
      dataLoadingStatus: 'FULFILLED',
      addOnsCurrentPlan: addOnsCurrentPlan,
      inlineContentData: inlineContentData,
      addonsData: [addon],
      isInlineContentEnabled: true
    }))
  }
})

const addOnsCurrentPlan = {
  name: 'My Plan',
  startDate: '2022-11-01',
  endDate: '2022-12-01',
  isRenewable: true,
  value: 110.33,
  currency: '€',
  iconName: 'icMobile'
}

const inlineContentData = {
  id: '1595418318650',
  name: 'Roaming pass',
  price: '5.00',
  duration: 'month',
  unit: '€',
  title: 'Roaming Pass',
  subtitle: '5.00€ per month',
  description:
    'Traveling ? Add the roaming pass and stay in touch with everyone.',
  buttonTitle: 'Add',
  leftIcon: {
    uri: 'test-file-stub'
  },
  rightIcon: {
    uri: 'test-file-stub'
  }
}

const addon = {
  id: '1',
  name: 'name',
  price: '4.00',
  icon: 'maps',
  duration: 'month',
  expirationDate: '26/11/2020',
  title: 'title',
  description: 'description',
  unit: 'unit'
}

describe('render Addons tap ', () => {
  NavigationFunctions.NavigationFunctions.navigate = jest.fn()
  const fetchAddonsSpy = jest.spyOn(addonsThunk, 'fetchAddons')
  useDispatch.mockReturnValue(jest.fn)

  it('should render AddOns overview successfully', async () => {
    let element
    await act(async () => {
      element = create(<AddonsTab />)
      jest.runAllTimers()
    })
    const AddOnsOverviewComponent = element.root.findAllByType(AddOns)[0]
    expect(AddOnsOverviewComponent).toBeDefined()
  })

  it('should render AddOns overview props when data retrieved successfully', async () => {
    let element
    await act(async () => {
      element = create(<AddonsTab />)
      jest.runAllTimers()
    })
    const AddOnsOverviewComponent = element.root.findAllByType(AddOns)[0]
    const AddOnsOverviewComponentProps = AddOnsOverviewComponent.props
    expect(AddOnsOverviewComponentProps.currentPlan).toEqual(addOnsCurrentPlan)
    expect(AddOnsOverviewComponentProps.isError).toEqual(false)
    expect(AddOnsOverviewComponentProps.isLoading).toEqual(false)
    expect(AddOnsOverviewComponentProps.data).toEqual([addon])
    expect(AddOnsOverviewComponentProps.inlineContentData).toEqual(
      inlineContentData
    )
    expect(AddOnsOverviewComponentProps.isInlineContentEnabled).toEqual(true)
    expect(AddOnsOverviewComponentProps.isTimeLineRefreshed).toEqual(false)
    AddOnsOverviewComponentProps.onTryAgainPress()
    expect(fetchAddonsSpy).toHaveBeenCalled()
  })

  it('should disable InlineContent in AddOns overview when isInlineContentEnabled is false', async () => {
    let element
    useSelector.mockImplementation(() => ({
      isInlineContentEnabled: false
    }))
    await act(async () => {
      element = create(<AddonsTab />)
      jest.runAllTimers()
    })
    const AddOnsOverviewComponent = element.root.findAllByType(AddOns)[0]
    const AddOnsOverviewComponentProps = AddOnsOverviewComponent.props
    expect(AddOnsOverviewComponentProps.isInlineContentEnabled).toEqual(false)
  })

  it('should render AddOns overview props in rejected state', async () => {
    let element
    useSelector.mockImplementation(() => ({
      addonsLoadingStatus: 'rejected'
    }))
    await act(async () => {
      element = create(<AddonsTab />)
      jest.runAllTimers()
    })
    const AddOnsOverviewComponent = element.root.findAllByType(AddOns)[0]
    const AddOnsOverviewComponentProps = AddOnsOverviewComponent.props
    expect(AddOnsOverviewComponentProps.errorText).toEqual('addons_error_text')
    expect(AddOnsOverviewComponentProps.isError).toEqual(true)
    expect(AddOnsOverviewComponentProps.isLoading).toEqual(false)
  })

  it('should render AddOns overview props in pending state', async () => {
    let element
    useSelector.mockImplementation(() => ({
      addonsLoadingStatus: 'pending'
    }))
    await act(async () => {
      element = create(<AddonsTab />)
      jest.runAllTimers()
    })
    const AddOnsOverviewComponent = element.root.findAllByType(AddOns)[0]
    const AddOnsOverviewComponentProps = AddOnsOverviewComponent.props
    expect(AddOnsOverviewComponentProps.isError).toEqual(false)
    expect(AddOnsOverviewComponentProps.isLoading).toEqual(true)
  })
  it('should navigate to Addons Shop screen', async () => {
    let element
    await act(async () => {
      element = create(<AddonsTab />)
      jest.runAllTimers()
    })
    const AddOnsOverviewComponent = element.root.findAllByType(AddOns)[0]
    const AddOnsOverviewComponentProps = AddOnsOverviewComponent.props
    AddOnsOverviewComponentProps.handleNavigateToAddonsShop()
    expect(
      NavigationFunctions.NavigationFunctions.navigate
    ).toHaveBeenCalledWith(Routes.AddOnsShopScreen)
  })
  it('Should navigate to Addons Details Screen when the addon Item Presed', async () => {
    let element
    await act(async () => {
      element = create(<AddonsTab />)
    })
    const AddOnsOverviewComponent = element.root.findAllByType(AddOns)[0]
    const AddOnsOverviewComponentProps = AddOnsOverviewComponent.props
    AddOnsOverviewComponentProps.onItemPress(addon)
    expect(
      NavigationFunctions.NavigationFunctions.navigate
    ).toHaveBeenCalledWith(Routes.AddonsDetailsScreen, {
      addOnItem: addon,
      actionType: 'Remove'
    })
  })
  it('Should navigate to Addons Details Screen when In line Content Presed', async () => {
    let element
    await act(async () => {
      element = create(<AddonsTab />)
    })
    const AddOnsOverviewComponent = element.root.findAllByType(AddOns)[0]
    const AddOnsOverviewComponentProps = AddOnsOverviewComponent.props
    AddOnsOverviewComponentProps.onInlineContentPress(addon)
    expect(
      NavigationFunctions.NavigationFunctions.navigate
    ).toHaveBeenCalledWith(Routes.AddonsDetailsScreen, {
      addOnItem: addon,
      actionType: 'buy',
      isOpenedThrowInLineContent: true
    })
  })
})
