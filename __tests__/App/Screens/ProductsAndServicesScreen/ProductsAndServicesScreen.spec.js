import React from 'react'
import { shallow } from 'enzyme'

import { useRoute } from '@react-navigation/native'

import { useDispatch } from 'react-redux'

import * as NavigationFunctions from 'App/Containers'
import ProductsAndServicesScreen from 'App/Screens/ProductsAndServicesScreen/ProductsAndServicesScreen'
import {
  ProductsAndServicesMobilePostpaidTabs,
  ProductsAndServicesMobilePrepaidTabs
} from 'App/Screens/ProductsAndServicesScreen/ProductsAndServicesScreen.configs'
import * as myPlanThunk from 'App/Redux/myplan/myPlan.thunk'
import * as balanceThunk from 'App/Redux/Balance/balance.thunk'
import * as addonsThunk from 'App/Redux/Addons/addons.thunk'

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useRoute: jest.fn(() => ({
      params: {
        isMobilePostpaidSubscription: true
      }
    }))
  }
})

describe('render ProductsAndServics component ', () => {
  NavigationFunctions.NavigationFunctions.navigate = jest.fn()
  NavigationFunctions.NavigationFunctions.popToTop = jest.fn()
  useDispatch.mockReturnValue(jest.fn)
  const fetchMyPlanSpy = jest.spyOn(myPlanThunk, 'fetchMyPlan')
  const fetchBalanceSpy = jest.spyOn(balanceThunk, 'fetchBalance')
  const fetchAddonsSpy = jest.spyOn(addonsThunk, 'fetchAddons')

  const element = shallow(<ProductsAndServicesScreen />)
  const productsAndServices = element.find({
    testID: 'productsAndServicesScreen'
  })

  test('should render ProductsAndServics component successfully', () => {
    expect(productsAndServices).toBeDefined()
  })

  test('should popToTop called when close function is called', () => {
    productsAndServices.props().vfScreenProps.onClose()
    expect(NavigationFunctions.NavigationFunctions.popToTop).toHaveBeenCalled()
  })
  test('should render ProductsAndServics component with paym props when the Subscription is Postpaid ', () => {
    const productsAndServicesprops = productsAndServices.props()
    expect(productsAndServicesprops.userType).toEqual('payM')
    expect(productsAndServicesprops.vfScreenProps.subHeaderTitle).toEqual(
      'products_and_services_sub_header_title_paym'
    )
    expect(
      productsAndServicesprops.vfScreenProps.subHeaderAfterSubTitle
    ).toEqual('products_and_services_sub_header_after_subtitle_paym')
    expect(productsAndServicesprops.tabs).toEqual(
      Object.values(ProductsAndServicesMobilePostpaidTabs)
    )
    productsAndServicesprops.onRefresh()
    expect(fetchMyPlanSpy).toHaveBeenCalled()
  })
  test('should render ProductsAndServics component with payg props when the Subscription is Prepaid ', async () => {
    useRoute.mockImplementation(() => ({
      params: {
        isMobilePostpaidSubscription: false
      }
    }))
    const element = shallow(<ProductsAndServicesScreen />)
    const productsAndServices = element.find({
      testID: 'productsAndServicesScreen'
    })
    const productsAndServicesprops = productsAndServices.props()
    expect(productsAndServicesprops.userType).toEqual('payG')
    expect(productsAndServicesprops.vfScreenProps.subHeaderTitle).toEqual(
      'products_and_services_sub_header_title_payg'
    )
    expect(
      productsAndServicesprops.vfScreenProps.subHeaderAfterSubTitle
    ).toEqual('products_and_services_sub_header_after_subtitle_payg')
    expect(productsAndServicesprops.tabs).toEqual(
      Object.values(ProductsAndServicesMobilePrepaidTabs)
    )
    await productsAndServicesprops.onRefresh()
    expect(fetchAddonsSpy).toHaveBeenCalled()
    expect(fetchBalanceSpy).toHaveBeenCalled()
  })
})
