/* eslint-disable import/namespace */
import React from 'react'

import { create, act } from 'react-test-renderer'

import { Billing } from '@vfgroup-oneplatform/billing'

import BillLanding from 'App/Screens/Billing/BillLanding/BillLanding'

import * as NavigationFunctions from 'App/Containers'
import { openWebView } from 'App/Screens/WebViewScreen/WebViewScreen.helper'

import { useApiCall } from 'App/Hooks'
import Routes from 'App/Containers/AppNavigation/Routes'

jest.mock('App/Utils/Helpers/generic.helpers', () => {
  const actualHelper = jest.requireActual('App/Utils/Helpers/generic.helpers')
  return {
    ...actualHelper,
    translate: (str) => str,
    testID: (str) => str,
    isDE: jest.fn()
  }
})
jest.mock('App/Screens/WebViewScreen/WebViewScreen.helper', () => {
  return {
    openWebView: jest.fn()
  }
})

jest.mock('App/Hooks', () => ({
  ...jest.requireActual('App/Hooks'),
  useApiCall: jest.fn()
}))

const billHistoryDataWithoutNextLink = {
  billHistoryItems: [
    {
      billDate: '18 May 22',
      billIssuancePrice: 0,
      billIssuanceValue: 0,
      currency: '€',
      endDate: '12 May 22',
      id: 'urn:vf-de-dxl-tmf:vf:mobile:ban-billdoc:112515450-5500-0118888067303',
      imageListProp: { images: [Array] },
      paymentInfo: ['27 May'],
      price: 'EUR 0 ',
      startDate: '13 Apr 22',
      value: 0,
      nextBillsLink:
        'https://api.vodafone.de/mva/v1/bill?relatedParty.id=urn:vf-de-dxl-tmf:vf:mobile:ban:123456789&bill.id=urn:vf-de-dxl-tmf:vf:mobile:ban-billdoc:123456789-5500-0118888067303'
    },
    {
      billDate: '20 Apr 22',
      billIssuancePrice: 276.56,
      billIssuanceValue: 276.56,
      currency: '€',
      endDate: '12 Apr 22',
      id: 'urn:vf-de-dxl-tmf:vf:mobile:ban-billdoc:112515450-5500-0118815753504',
      imageListProp: { images: [Array] },
      paymentInfo: ['28 Apr'],
      price: 'EUR 276.56 ',
      startDate: '13 Mar 22',
      value: 276.56,
      nextBillsLink:
        'https://api.vodafone.de/mva/v1/bill?relatedParty.id=urn:vf-de-dxl-tmf:vf:mobile:ban:123456789&bill.id=urn:vf-de-dxl-tmf:vf:mobile:ban-billdoc:112515450-5500-0118815753504'
    },
    {
      billDate: '16 Mar 22',
      billIssuancePrice: -125.78,
      billIssuanceValue: -125.78,
      currency: '€',
      endDate: '12 Mar 22',
      id: 'urn:vf-de-dxl-tmf:vf:mobile:ban-billdoc:112515450-5500-0118743157133',
      imageListProp: { images: [Array] },
      paymentInfo: ['24 Mar'],
      price: 'EUR -125.78 ',
      startDate: '13 Feb 22',
      value: -125.78,
      nextBillsLink:
        'https://api.vodafone.de/mva/v1/bill?relatedParty.id=urn:vf-de-dxl-tmf:vf:mobile:ban:123456789&bill.id=urn:vf-de-dxl-tmf:vf:mobile:ban-billdoc:112515450-5500-0118743157133'
    }
  ],
  totalCount: 24,
  resultCount: 3
}
const billHistoryDataWithNextLink = {
  nextBillsLink: {
    href: 'https://api.vodafone.de/mva/v1/history?relatedParty.id=urn:vf-de-dxl-tmf:vf:mobile:ban:123456789&offset=3&limit=3'
  },
  billHistoryItems: [
    {
      billDate: '18 May 22',
      billIssuancePrice: 0,
      billIssuanceValue: 0,
      currency: '€',
      endDate: '12 May 22',
      id: 'urn:vf-de-dxl-tmf:vf:mobile:ban-billdoc:112515450-5500-0118888067303',
      imageListProp: { images: [Array] },
      paymentInfo: ['27 May'],
      price: 'EUR 0 ',
      startDate: '13 Apr 22',
      value: 0,
      nextBillsLink:
        'https://api.vodafone.de/mva/v1/bill?relatedParty.id=urn:vf-de-dxl-tmf:vf:mobile:ban:123456789&bill.id=urn:vf-de-dxl-tmf:vf:mobile:ban-billdoc:123456789-5500-0118888067303'
    }
  ],
  totalCount: 24,
  resultCount: 3
}
const billHistoryDataWithCredit = {
  billHistoryItems: [
    {
      billDate: '18 May 22',
      billIssuancePrice: 0,
      billIssuanceValue: 0,
      currency: '€',
      endDate: '12 May 22',
      id: 'urn:vf-de-dxl-tmf:vf:mobile:ban-billdoc:112515450-5500-0118888067303',
      imageListProp: { images: [Array] },
      paymentInfo: ['27 May'],
      price: 'EUR 0 ',
      startDate: '13 Apr 22',
      value: -80,
      nextBillsLink:
        'https://api.vodafone.de/mva/v1/bill?relatedParty.id=urn:vf-de-dxl-tmf:vf:mobile:ban:123456789&bill.id=urn:vf-de-dxl-tmf:vf:mobile:ban-billdoc:123456789-5500-0118888067303'
    },
    {
      billDate: '16 Mar 22',
      billIssuancePrice: -125.78,
      billIssuanceValue: -125.78,
      currency: '€',
      endDate: '12 Mar 22',
      id: 'urn:vf-de-dxl-tmf:vf:mobile:ban-billdoc:112515450-5500-0118743157133',
      imageListProp: { images: [Array] },
      paymentInfo: ['24 Mar'],
      price: 'EUR -125.78 ',
      startDate: '13 Feb 22',
      value: -125.78,
      nextBillsLink:
        'https://api.vodafone.de/mva/v1/bill?relatedParty.id=urn:vf-de-dxl-tmf:vf:mobile:ban:123456789&bill.id=urn:vf-de-dxl-tmf:vf:mobile:ban-billdoc:112515450-5500-0118743157133'
    }
  ],
  totalCount: 24,
  resultCount: 2
}

describe('BillLanding screen test', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  beforeAll(() => {
    useApiCall.mockImplementation(() => {
      return {
        responseData: billHistoryDataWithoutNextLink,
        isError: false,
        isLoading: false,
        refresh: jest.fn(),
        callNextApi: jest.fn()
      }
    })
  })

  test('should render BillLanding screen successfully', async () => {
    NavigationFunctions.NavigationFunctions.goBack = jest.fn()
    let element

    await act(async () => {
      element = create(<BillLanding />)
      jest.runAllTimers()
    })
    const BillingComponent = element.root.findAllByType(Billing)[0]
    expect(BillingComponent).toBeDefined()
    BillingComponent.props.vfScreen.onClose()
    expect(
      NavigationFunctions.NavigationFunctions.goBack
    ).toHaveBeenCalledTimes(1)
  })

  test('should not render the chart', async () => {
    let element
    await act(async () => {
      element = create(<BillLanding />)
    })
    const BillingComponentProps = element.root.findAllByType(Billing)[0].props
    expect(BillingComponentProps.chart).toEqual(undefined)
  })

  test('should not render showMoreButton when there are not next bills', async () => {
    let element
    await act(async () => {
      element = create(<BillLanding />)
    })
    const BillingComponentProps = element.root.findAllByType(Billing)[0].props
    expect(BillingComponentProps.billsCards.showMoreButton).toEqual(false)
  })

  test('should render only two elements in billsCards list if there are 3 bills', async () => {
    let element
    await act(async () => {
      element = create(<BillLanding />)
    })
    const BillingComponentProps = element.root.findAllByType(Billing)[0].props
    expect(BillingComponentProps.billsCards.data.length).toEqual(2)
  })

  test('should render showMoreButton when there are next bills', async () => {
    useApiCall.mockReturnValue({
      responseData: {
        ...billHistoryDataWithNextLink,
        nextBillsLink: {
          href: 'https://api.vodafone.de/mva/v1/history?relatedParty.id=urn:vf-de-dxl-tmf:vf:mobile:ban:123456789&offset=3&limit=3'
        }
      },
      isError: false,
      isLoading: false,
      refresh: jest.fn(),
      callNextApi: jest.fn()
    })
    let element
    await act(async () => {
      element = create(<BillLanding />)
    })
    const BillingComponentProps = element.root.findAllByType(Billing)[0].props
    expect(BillingComponentProps.billsCards.showMoreButton).toEqual(true)
  })

  test('should not render showMoreButton when isLoading is true', async () => {
    useApiCall.mockImplementation(() => {
      return {
        responseData: billHistoryDataWithNextLink,
        isLoading: true
      }
    })
    let element
    await act(async () => {
      element = create(<BillLanding />)
    })
    const BillingComponentProps = element.root.findAllByType(Billing)[0].props
    expect(BillingComponentProps.billsCards.showMoreButton).toEqual(false)
  })

  test('should render ShowMoreLoader when click on showMore button', async () => {
    useApiCall.mockImplementation(() => {
      return {
        responseData: billHistoryDataWithNextLink,
        isLoading: true
      }
    })
    let element
    await act(async () => {
      element = create(<BillLanding />)
    })
    const BillingComponentProps = element.root.findAllByType(Billing)[0].props
    BillingComponentProps.billsCards.onShowMorePress()
    expect(BillingComponentProps.billsCards.withShowMoreLoader).toEqual(true)
  })

  test('should show error when api fail', async () => {
    useApiCall.mockImplementation(() => {
      return {
        isError: true,
        isLoading: false
      }
    })
    let element
    await act(async () => {
      element = create(<BillLanding />)
    })
    const BillingComponentProps = element.root.findAllByType(Billing)[0].props
    expect(BillingComponentProps.isError).toEqual(true)
  })

  test('should recalling the api when press on show more', async () => {
    let element
    useApiCall.mockReturnValue({
      responseData: billHistoryDataWithoutNextLink,
      isError: false,
      isLoading: false,
      refresh: jest.fn(),
      callNextApi: jest.fn()
    })
    await act(async () => {
      element = create(<BillLanding />)
    })
    const BillingComponentProps = element.root.findAllByType(Billing)[0].props
    BillingComponentProps.billsCards.onShowMorePress()
    expect(useApiCall().callNextApi).toHaveBeenCalled()
  })

  test('should recalling the api when press on try again', async () => {
    let element
    useApiCall.mockReturnValue({
      responseData: billHistoryDataWithoutNextLink,
      isError: false,
      isLoading: false,
      refresh: jest.fn(),
      callNextApi: jest.fn()
    })
    await act(async () => {
      element = create(<BillLanding />)
    })
    const BillingComponentProps = element.root.findAllByType(Billing)[0].props
    BillingComponentProps.billsCards.onShowMoreTryAgainPress()
    expect(useApiCall().callNextApi).toHaveBeenCalled()
  })

  test('should navigate to Bill Details screen when clicking on onBillPress', async () => {
    NavigationFunctions.NavigationFunctions.navigate = jest.fn()
    let element

    await act(async () => {
      element = create(<BillLanding />)
    })
    const BillingComponentProps = element.root.findAllByType(Billing)[0].props
    BillingComponentProps.billsCards.onBillPress()
    expect(
      NavigationFunctions.NavigationFunctions.navigate
    ).toHaveBeenCalledWith(Routes.BillDetails)
  })

  test('should navigate to Bill Details screen when clicking latestBill.onPress', async () => {
    NavigationFunctions.NavigationFunctions.navigate = jest.fn()
    let element

    await act(async () => {
      element = create(<BillLanding />)
    })
    const BillingComponentProps = element.root.findAllByType(Billing)[0].props
    BillingComponentProps.currentBillCard.onPress()
    expect(
      NavigationFunctions.NavigationFunctions.navigate
    ).toHaveBeenCalledWith(Routes.BillDetails)
  })

  test('should render paper Bill Banner successfuly when withPaperBillBanner is true', async () => {
    const useApiCallObject = {
      responseData: true,
      isError: false,
      isLoading: false,
      refresh: jest.fn()
    }
    useApiCall.mockImplementation(() => {
      return useApiCallObject
    })
    let element
    await act(async () => {
      element = create(<BillLanding />)
    })
    const BillingComponentProps = element.root.findAllByType(Billing)[0].props
    expect(BillingComponentProps.extraBannersProps.length).toEqual(1)
    expect(BillingComponentProps.extraBannersProps[0].title).toEqual(
      'paper_bill_banner_title'
    )
    expect(BillingComponentProps.extraBannersProps[0].description).toEqual(
      'paper_bill_banner_description'
    )
    expect(
      BillingComponentProps.extraBannersProps[0].primaryButtonTitle
    ).toEqual('paper_bill_banner_button_title')
    expect(BillingComponentProps.extraBannersProps[0].withCloseButton).toEqual(
      false
    )
    expect(BillingComponentProps.extraBannersProps[0].withLeftIcon).toEqual(
      true
    )
    expect(
      BillingComponentProps.extraBannersProps[0].withPrimaryButton
    ).toEqual(true)
    expect(BillingComponentProps.extraBannersProps[0].backgroundColors).toEqual(
      ['#007c92', '#007c92']
    )
    expect(BillingComponentProps.extraBannersProps[0].leftIconType).toEqual(
      'image'
    )
    expect(BillingComponentProps.extraBannersProps[0].leftIconSize).toEqual(24)
    expect(BillingComponentProps.extraBannersProps[0].isLoading).toEqual(false)
    BillingComponentProps.extraBannersProps[0].onPrimaryButtonPress()
    expect(openWebView).toHaveBeenCalled()
  })

  test('should not render paper Bill Banner when withPaperBillBanner is fasle', async () => {
    const useApiCallObject = {
      responseData: false,
      isError: false,
      isLoading: false,
      refresh: jest.fn()
    }
    useApiCall.mockImplementation(() => {
      return useApiCallObject
    })

    let element
    await act(async () => {
      element = create(<BillLanding />)
    })
    const BillingComponentProps = element.root.findAllByType(Billing)[0].props
    expect(BillingComponentProps.extraBannersProps.length).toEqual(0)
  })

  test('should shimmer paper Bill Banner when isLoading is true', async () => {
    const useApiCallObject = {
      responseData: false,
      isError: false,
      isLoading: true,
      refresh: jest.fn()
    }
    useApiCall.mockImplementation(() => {
      return useApiCallObject
    })

    let element
    await act(async () => {
      element = create(<BillLanding />)
    })
    const BillingComponentProps = element.root.findAllByType(Billing)[0].props
    expect(BillingComponentProps.extraBannersProps[0].isLoading).toEqual(true)
  })

  test('should render dunning Banner successfuly', async () => {
    const dunningApiCall = {
      responseData: {
        inDunning: true
      },
      isError: false,
      isLoading: false,
      refresh: jest.fn()
    }
    useApiCall.mockImplementation(() => {
      return dunningApiCall
    })
    let element
    await act(async () => {
      element = create(<BillLanding />)
    })
    const BillingComponentProps = element.root.findAllByType(Billing)[0].props
    expect(BillingComponentProps.extraBannersProps[0].title).toEqual(
      'dunning_banner_title'
    )
    expect(BillingComponentProps.extraBannersProps[0].description).toEqual(
      'dunning_banner_description'
    )
    expect(
      BillingComponentProps.extraBannersProps[0].primaryButtonTitle
    ).toEqual('dunning_banner_button_title')
    expect(BillingComponentProps.extraBannersProps[0].withCloseButton).toEqual(
      false
    )
    expect(BillingComponentProps.extraBannersProps[0].withLeftIcon).toEqual(
      true
    )
    expect(
      BillingComponentProps.extraBannersProps[0].withPrimaryButton
    ).toEqual(true)
    expect(BillingComponentProps.extraBannersProps[0].leftIconType).toEqual(
      'image'
    )
    expect(BillingComponentProps.extraBannersProps[0].leftIconSize).toEqual(24)
    expect(BillingComponentProps.extraBannersProps[0].isLoading).toEqual(false)
    BillingComponentProps.extraBannersProps[0].onPrimaryButtonPress()
    expect(openWebView).toHaveBeenCalled()
  })

  test('should render latest bills credit case [negative bill] successfully', async () => {
    let element
    useApiCall.mockReturnValue({
      responseData: billHistoryDataWithCredit,
      isError: false,
      isLoading: false,
      refresh: jest.fn(),
      callNextApi: jest.fn()
    })
    await act(async () => {
      element = create(<BillLanding />)
    })
    const BillingComponent = element.root.findAllByType(Billing)[0].props

    expect(BillingComponent.currentBillCard.value < 0).toBe(true)
    expect(BillingComponent.withBillNegativeAmount < 0).toBe(false)
    expect(
      BillingComponent.currentBillCard.negativeBillProps
        .billingNegativeValueNote
    ).toEqual('billing_negative_bill_quick_action_header')
    expect(BillingComponent.currentBillCard.currentBillAmountStyle).toEqual({
      color: '#008a00'
    })
    expect(BillingComponent.negativeBillQuickActionsProps.QAtitle).toBe(
      'billing_negative_bill_quick_action_header'
    )
    expect(BillingComponent.negativeBillQuickActionsProps.title).toBe(
      'billing_negative_bill_quick_action_title'
    )
    expect(BillingComponent.negativeBillQuickActionsProps.description).toBe(
      'billing_negative_bill_quick_action_description'
    )
    expect(BillingComponent.negativeBillQuickActionsProps.buttonTitle).toBe(
      'billing_negative_bill_quick_action_button_text'
    )
    expect(BillingComponent.negativeBillQuickActionsProps.withCloseButton).toBe(
      false
    )
    expect(
      BillingComponent.negativeBillQuickActionsProps.descriptionContainerStyle
    ).toEqual({
      borderBottomColor: '#BEBEBE',
      borderBottomWidth: 0.2,
      marginBottom: 24
    })
  })

  test('should render previous bills credit case [negative bill] successfully', async () => {
    let element
    useApiCall.mockReturnValue({
      responseData: billHistoryDataWithCredit,
      isError: false,
      isLoading: false,
      refresh: jest.fn(),
      callNextApi: jest.fn()
    })
    await act(async () => {
      element = create(<BillLanding />)
    })
    const BillingComponent = element.root.findAllByType(Billing)[0].props

    expect(BillingComponent.withBillNegativeAmount < 0).toBe(false)
    expect(
      BillingComponent.billsCards.negativeBillProps.billingNegativeValueNote
    ).toEqual('billing_negative_prev_bill_negative_value_note')

    expect(
      BillingComponent.billsCards.negativeBillProps
        .billingNegativeValueNoteStyle
    ).toEqual({
      color: '#666666',
      textAlign: 'right'
    })

    expect(BillingComponent.billsCards.billAmountStyle).toEqual({
      color: '#008a00',
      padding: 3
    })

    expect(BillingComponent.negativeBillQuickActionsProps.QAtitle).toBe(
      'billing_negative_bill_quick_action_header'
    )
    expect(BillingComponent.negativeBillQuickActionsProps.title).toBe(
      'billing_negative_bill_quick_action_title'
    )
    expect(BillingComponent.negativeBillQuickActionsProps.description).toBe(
      'billing_negative_bill_quick_action_description'
    )
    expect(BillingComponent.negativeBillQuickActionsProps.buttonTitle).toBe(
      'billing_negative_bill_quick_action_button_text'
    )
    expect(BillingComponent.negativeBillQuickActionsProps.withCloseButton).toBe(
      false
    )
    expect(
      BillingComponent.negativeBillQuickActionsProps.descriptionContainerStyle
    ).toEqual({
      borderBottomColor: '#BEBEBE',
      borderBottomWidth: 0.2,
      marginBottom: 24
    })
  })

  test('should not render latest bills credit case [negative bill] if the bill value is positive one', async () => {
    let element
    useApiCall.mockReturnValue({
      responseData: billHistoryDataWithNextLink,
      isError: false,
      isLoading: false,
      refresh: jest.fn(),
      callNextApi: jest.fn()
    })
    await act(async () => {
      element = create(<BillLanding />)
    })
    const BillingComponent = element.root.findAllByType(Billing)[0].props

    expect(
      BillingComponent.currentBillCard.negativeBillProps
        .billingNegativeValueNote
    ).toEqual(false)
    expect(BillingComponent.currentBillCard.currentBillAmountStyle).toEqual(
      false
    )
  })

  test('should shimmer dunning Banner when isLoading is true', async () => {
    const dunningApiCall = {
      responseData: {
        inDunning: false
      },
      isError: false,
      isLoading: true,
      refresh: jest.fn()
    }
    useApiCall.mockImplementation(() => {
      return dunningApiCall
    })
    let element
    await act(async () => {
      element = create(<BillLanding />)
    })
    const BillingComponentProps = element.root.findAllByType(Billing)[0].props
    expect(BillingComponentProps.extraBannersProps[0].isLoading).toEqual(true)
  })
})
