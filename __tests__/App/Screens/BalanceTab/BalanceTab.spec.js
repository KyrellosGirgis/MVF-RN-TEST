/* eslint-disable import/namespace */
import React from 'react'
import { create, act } from 'react-test-renderer'

import { VFBanner } from '@vfgroup-oneplatform/foundation/Components'

import { Balance } from '@vfgroup-oneplatform/framework/Balance'

import { useDispatch, useSelector } from 'react-redux'

import { Images } from 'App/Themes'

import BalanceTab from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/BalanceTab'

import * as balanceTabHelpers from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/BalanceTab.helpers'
import { openWebView } from 'App/Screens/WebViewScreen/WebViewScreen.helper'
import { updateAutoTopupStatus } from 'App/Services/API/Requests/AutoTopUp/AutoTopUp.requests'
import { AUTO_TOPUP_STATUS } from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/BalanceTab.constants'
import * as balanceHelpers from 'App/Redux/Balance/balance.thunk'
import * as calendarLocale from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/screens/BalanceHistoryFilterCalendar/BalanceHistoryFilterCalendar.locales'

jest.mock('App/Screens/WebViewScreen/WebViewScreen.helper', () => {
  return {
    openWebView: jest.fn()
  }
})
jest.mock('App/Services/API/Requests/AutoTopUp/AutoTopUp.requests', () => {
  return {
    updateAutoTopupStatus: jest.fn()
  }
})
jest.mock('react-redux', () => {
  return {
    useDispatch: jest.fn(),
    useSelector: jest.fn(() => ({
      dataLoadingStatus: 'FULFILLED',
      history: {}
    }))
  }
})

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useEffect: jest.fn()
}))

describe('Render balance tab', () => {
  it('should render balance component successfully', () => {
    const element = create(<BalanceTab />)
    const balanceTab = element.root.findByProps({ testID: 'balanceTabId' })
    expect(balanceTab).toBeDefined()
  })

  it('should show error view when service fails', async () => {
    let element
    useSelector.mockImplementation(() => ({
      dataLoadingStatus: 'rejected'
    }))
    await act(async () => {
      element = create(<BalanceTab />)
    })
    expect(
      element.root.findByProps({
        isError: true
      })
    ).toBeDefined()
  })
  it('should show loading view when service still loading', async () => {
    let element
    useSelector.mockImplementation(() => ({
      dataLoadingStatus: 'pending'
    }))
    await act(async () => {
      element = create(<BalanceTab />)
    })
    expect(
      element.root.findByProps({
        isLoading: true
      })
    ).toBeDefined()
  })

  test('should setCalendarLocale when calendar is rendered', () => {
    calendarLocale.setCalendarLocale = jest.fn()
    create(<BalanceTab />)
    expect(calendarLocale.setCalendarLocale).toHaveBeenCalled()
  })
})

describe('auto topup test', () => {
  balanceHelpers.fetchBalance = jest.fn()
  useDispatch.mockReturnValue(jest.fn)
  it('should Show Auto TopUp Banner when shouldShowAutoTopUpBanner is true ', async () => {
    let element
    balanceTabHelpers.shouldShowAutoTopUpBanner = jest.fn(() => true)
    await act(async () => {
      element = create(<BalanceTab />)
      jest.runAllTimers()
    })
    const vfBannerComponent = element.root.findAllByType(VFBanner)[0]
    expect(vfBannerComponent).toBeDefined()
  })
  it('should not Show Auto TopUp Banner when shouldShowAutoTopUpBanner is false ', async () => {
    let element
    balanceTabHelpers.shouldShowAutoTopUpBanner = jest.fn(() => false)
    await act(async () => {
      element = create(<BalanceTab />)
      jest.runAllTimers()
    })
    const vfBannerComponent = element.root.findAllByType(VFBanner)[0]
    expect(vfBannerComponent).toBe(undefined)
  })
  it('should render VfBanner component with certain props when Auto TopUp status is NotRegistered ', async () => {
    let element
    balanceTabHelpers.shouldShowAutoTopUpBanner = jest.fn(() => true)
    await act(async () => {
      element = create(<BalanceTab />)
      jest.runAllTimers()
    })
    const vfBannerProps = element.root.findAllByType(VFBanner)[0].props
    expect(vfBannerProps.title).toEqual('cvm_auto_top_up_notRegistered_title')
    expect(vfBannerProps.description).toEqual(
      'cvm_auto_top_up_notRegistered_description'
    )
    expect(vfBannerProps.primaryButtonTitle).toEqual(
      'cvm_auto_top_up_notRegistered_button_title'
    )
    expect(vfBannerProps.withPrimaryButton).toEqual(true)
    expect(vfBannerProps.withCloseButton).toEqual(true)
    expect(vfBannerProps.type).toEqual('gradient')
    expect(vfBannerProps.leftIcon).toEqual(Images.autoTopupWhite_icon)
    expect(vfBannerProps.leftIconSize).toEqual(25)
    expect(vfBannerProps.closeIconSize).toEqual(25)
    expect(vfBannerProps.leftIconType).toEqual('image')
    expect(vfBannerProps.closeIconTestID).toEqual('notRegisteredAutoTopup_Xbtn')
    expect(vfBannerProps.renderRightComponent).toBeDefined()

    vfBannerProps.onPrimaryButtonPress()
    expect(openWebView).toHaveBeenCalled()
  })
  it('should render autoTopup card with certain props when shouldShowAutoTopUpCard and isAutoTopUpActivated are true', async () => {
    let element
    balanceTabHelpers.shouldShowAutoTopUpCard = jest.fn(() => true)
    balanceTabHelpers.isAutoTopUpActivated = jest.fn(() => true)
    await act(async () => {
      element = create(<BalanceTab />)
      jest.runAllTimers()
    })
    const balanceProps = element.root.findAllByType(Balance)[0].props
    expect(balanceProps.withAutoTopUpCard).toEqual(true)

    expect(balanceProps.autoTopUpCardProps.title).toEqual(
      'cvm_auto_top_up_active_title'
    )
    expect(balanceProps.autoTopUpCardProps.description).toEqual(
      'cvm_auto_top_up_active_description'
    )
    expect(balanceProps.autoTopUpCardProps.buttonTitle).toEqual(
      'cvm_auto_top_up_active_button_title'
    )
    expect(balanceProps.autoTopUpCardProps.isAutoTopUpActivated).toEqual(true)
    balanceProps.autoTopUpCardProps.onToggleActiveStatus()
    expect(updateAutoTopupStatus).toHaveBeenCalledWith(
      AUTO_TOPUP_STATUS.DEACTIVATE
    )
    balanceProps.autoTopUpCardProps.onButtonPress()
    expect(openWebView).toHaveBeenCalled()
  })
  it('should render autoTopup card with certain props when shouldShowAutoTopUpCard is true and issAutoTopUpActivated is false', async () => {
    let element
    balanceTabHelpers.shouldShowAutoTopUpCard = jest.fn(() => true)
    balanceTabHelpers.isAutoTopUpActivated = jest.fn(() => false)
    await act(async () => {
      element = create(<BalanceTab />)
      jest.runAllTimers()
    })
    const balanceProps = element.root.findAllByType(Balance)[0].props
    expect(balanceProps.withAutoTopUpCard).toEqual(true)

    expect(balanceProps.autoTopUpCardProps.title).toEqual(
      'cvm_auto_top_up_inactive_title'
    )
    expect(balanceProps.autoTopUpCardProps.description).toEqual(
      'cvm_auto_top_up_inactive_description'
    )
    expect(balanceProps.autoTopUpCardProps.buttonTitle).toEqual(
      'cvm_auto_top_up_inactive_button_title'
    )
    expect(balanceProps.autoTopUpCardProps.isAutoTopUpActivated).toEqual(false)
    balanceProps.autoTopUpCardProps.onToggleActiveStatus()
    expect(updateAutoTopupStatus).toHaveBeenCalledWith(
      AUTO_TOPUP_STATUS.ACTIVATE
    )
  })
})
