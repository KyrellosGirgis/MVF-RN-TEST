import React from 'react'
import { create, act } from 'react-test-renderer'

import Payment from '@vfgroup-oneplatform/framework/Payment/Payment'

import {
  defaultWheelValue,
  wheelValues
} from 'App/Screens/TopUpScreens/TopUpMethodsScreen/TopUpMethodsScreen.constants'
import { store } from 'App/Redux'
import TopUpMethodsScreen from 'App/Screens/TopUpScreens/TopUpMethodsScreen/TopUpMethodsScreen'
import { openWebView } from 'App/Screens/WebViewScreen/WebViewScreen.helper'
import { topupWithVoucherCode } from 'App/Services/API/Requests/VoucherTopup/VoucherTopup.requests'

jest.mock('react-native-infy-qrcode-scanner', () => jest.fn())

jest.mock('App/Screens/WebViewScreen/WebViewScreen.helper', () => {
  return {
    openWebView: jest.fn()
  }
})
jest.mock('App/Containers/AppModal/AppModal.helpers', () => {
  return {
    closeModal: jest.fn()
  }
})
jest.mock('App/Containers/AppNavigation/NavigationFunctions', () => ({
  goBack: jest.fn()
}))
jest.mock(
  'App/Services/API/Requests/VoucherTopup/VoucherTopup.requests',
  () => ({
    topupWithVoucherCode: jest.fn()
  })
)
describe('Direct TopUp Screen test', () => {
  let element
  beforeEach(async () => {
    store.getState = () => ({
      appUserData: { currentlyActiveSubscription: { marketCode: 'MMO' } }
    })
    await act(async () => {
      element = create(<TopUpMethodsScreen />)
      jest.runAllTimers()
    })
  })
  it('should render Payment selector when currentlyActiveSubscription is perpaid', async () => {
    const paymentComponent = element.root.findAllByType(Payment)[0]
    const paymentComponentProps = paymentComponent.props
    expect(paymentComponent).toBeDefined()
    expect(paymentComponentProps.wheelValues).toEqual(wheelValues)
    expect(paymentComponentProps.defaultWheelValue).toEqual(defaultWheelValue)
    expect(paymentComponentProps.loadingError).toEqual('')
    paymentComponentProps.onPressConfirmSelection({})
  })
  it('should render error state when currentlyActiveSubscription is not perpaid', async () => {
    let element
    store.getState = () => ({
      appUserData: { currentlyActiveSubscription: { marketCode: 'MMC' } }
    })
    await act(async () => {
      element = create(<TopUpMethodsScreen />)
      jest.runAllTimers()
    })
    const paymentComponent = element.root.findAllByType(Payment)[0]
    const paymentComponentProps = paymentComponent.props
    expect(paymentComponent).toBeDefined()
    expect(paymentComponentProps.loadingError).toEqual({
      message: 'topUpErrorMessage'
    })
  })
  it('should invoke handlePressConfirmSelection when press on ConfirmSelection ', async () => {
    const paymentWrapperComponentProps =
      element.root.findAllByType(Payment)[0].props
    paymentWrapperComponentProps.onPressConfirmSelection({
      selectedValue: { value: '15' }
    })
    expect(openWebView).toHaveBeenCalled()
  })

  it('should invoke topupWithVoucher when press on onPressConfirmVoucherCode ', async () => {
    const paymentWrapperComponentProps =
      element.root.findAllByType(Payment)[0].props
    paymentWrapperComponentProps.onPressConfirmVoucherCode('0192927363518261')
    expect(topupWithVoucherCode).toHaveBeenCalled()
  })
})
