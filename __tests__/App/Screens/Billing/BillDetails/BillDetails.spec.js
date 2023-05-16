/* eslint-disable import/namespace */
import React from 'react'
import { MonthlyBilling } from '@vfgroup-oneplatform/billing'
import { create, act } from 'react-test-renderer'

import PaymentInfo from '@vfgroup-oneplatform/billing/Components/PaymentInfo/PaymentInfo'
import Moment from 'moment'

import { store } from 'App/Redux'

import { billDetailsData } from '__tests__/App/Services/api/Requests/Billing/data'

import * as BillDetailsHelper from 'App/Screens/Billing/BillDetails/BillDetails.helper'

import * as dxl from 'App/Services/API/Interceptors/DXL.interceptor'

import * as NavigationFunctions from 'App/Containers'

import * as BillDetailsApi from 'App/Services/API/Requests/Billing/BillDetails/BillDetails'

import BillDetails from 'App/Screens/Billing/BillDetails/BillDetails'

const monetarySpace = String.fromCharCode(160)

jest.mock('App/Utils/Helpers/date.helpers', () => {
  return {
    getMonthName: () => 'February',
    dateFormat: () => '11/07/22',
    minutesToMilliSeconds: () => 900000
  }
})

const ban = 12345678910

const monthlyBillingComponentProps = (element) =>
  element.root.findAllByType(MonthlyBilling)[0].props

const paymentObj = {
  isLoading: false,
  isError: false,
  isPrimaryButtonDisabled: true,
  primaryButtonTitle: 'DEMO',
  withTertiaryButton: true,
  tertiaryButtonTitle: 'billing_download_pdf_button',
  codeLabel: 'bill_date',
  codeValue: '11/07/22',
  billNumberLabel: 'bill_due_date',
  billNumberValue: '11/07/22'
}

const mockDXLService = (shouldSuccess = true, extBillDetails = undefined) => {
  dxl.DXLAxios.get.mockImplementation(() =>
    shouldSuccess
      ? {
          data: extBillDetails || billDetailsData
        }
      : Promise.reject('error')
  )
}

describe('BillDetails screen test when success', () => {
  let element

  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(async () => {
    store.getState = () => ({
      appUserData: { currentlyActiveSubscription: { ban } }
    })

    //mock dxl service
    mockDXLService()

    await act(async () => {
      element = create(<BillDetails />)
      jest.runAllTimers()
    })
  })

  test('should render BillDetails screen successfully', async () => {
    NavigationFunctions.NavigationFunctions.popToTop = jest.fn()
    NavigationFunctions.NavigationFunctions.goBack = jest.fn()

    const MonthlyBillingComponent =
      element.root.findAllByType(MonthlyBilling)[0]
    const PaymentInfoComponent = element.root.findAllByType(PaymentInfo)[0]

    expect(MonthlyBillingComponent).toBeDefined()

    expect(PaymentInfoComponent).toBeDefined()

    monthlyBillingComponentProps(element).vfScreen.onClose()
    expect(
      NavigationFunctions.NavigationFunctions.popToTop
    ).toHaveBeenCalledTimes(1)

    monthlyBillingComponentProps(element).vfScreen.onBack()
    expect(
      NavigationFunctions.NavigationFunctions.goBack
    ).toHaveBeenCalledTimes(1)
  })

  describe('while locale is DE', () => {
    beforeAll(() => {
      Moment.locale('de')
    })

    test('should render BillDetails props successfully and call downloadBillInvoicePDF', async () => {
      BillDetailsHelper.downloadBillInvoicePDF = jest.fn()
      expect(monthlyBillingComponentProps(element).header).toMatchObject({
        subTitle: `276,56${monetarySpace}€`,
        title: paymentObj.codeValue + ' - ' + paymentObj.codeValue
      })
      expect(monthlyBillingComponentProps(element).payment).toMatchObject(
        paymentObj
      )

      monthlyBillingComponentProps(element).payment.onTertiaryButtonPress()
      expect(BillDetailsHelper.downloadBillInvoicePDF).toHaveBeenCalledWith(
        billDetailsData.relatedEntity
      )
    })

    test('should render the correct subscriptions', async () => {
      const subscriptions = {
        data: [
          {
            headlineProps: {
              title: 'Red 2019 M mit Basic Smartph.',
              subtitle: '01621373286',
              logo: {
                uri: 'test-file-stub'
              },
              hasImg: true,
              arrow: false
            },
            total: {
              noVatLabel: 'billing_details_supscription_total_before_vat_label',
              noVatValue: `5,00${monetarySpace}€`,
              vatLabel: 'billing_details_supscription_vat_label',
              vatValue: `0,00${monetarySpace}€`,
              totalLabel: 'bill_details_subscription_total_label',
              totalValue: `5,00${monetarySpace}€`,
              totalValueStyle: null
            },
            showTotalAsSummary: true
          },
          {
            headlineProps: {
              title: 'Smart2 XS Sub5',
              subtitle: '01622006409',
              logo: {
                uri: 'test-file-stub'
              },
              hasImg: true,
              arrow: false
            },
            total: {
              noVatLabel: 'billing_details_supscription_total_before_vat_label',
              noVatValue: `21,00${monetarySpace}€`,
              vatLabel: 'billing_details_supscription_vat_label',
              vatValue: `0,00${monetarySpace}€`,
              totalLabel: 'bill_details_subscription_total_label',
              totalValue: `21,00${monetarySpace}€`,
              totalValueStyle: null
            },
            showTotalAsSummary: true
          },
          {
            headlineProps: {
              title: 'Smart2 XS Sub544',
              subtitle: ' ',
              logo: {
                uri: 'test-file-stub'
              },
              hasImg: true,
              arrow: false
            },
            total: {
              noVatLabel: 'billing_details_supscription_total_before_vat_label',
              noVatValue: `15,00${monetarySpace}€`,
              vatLabel: 'billing_details_supscription_vat_label',
              vatValue: `0,00${monetarySpace}€`,
              totalLabel: 'bill_details_subscription_total_label',
              totalValue: `15,00${monetarySpace}€`,
              totalValueStyle: null
            },
            showTotalAsSummary: true
          }
        ],
        isLoading: false,
        isError: false
      }

      expect(monthlyBillingComponentProps(element).subscriptions).toMatchObject(
        subscriptions
      )
      expect(
        monthlyBillingComponentProps(element).subscriptions.data.length
      ).toEqual(3)
      expect(monthlyBillingComponentProps(element).subscriptions.data).toEqual(
        subscriptions.data
      )
    })
  })

  describe('while locale is EN', () => {
    beforeAll(() => {
      Moment.locale('en')
    })

    test('should render BillDetails props successfully and call downloadBillInvoicePDF', async () => {
      BillDetailsHelper.downloadBillInvoicePDF = jest.fn()
      expect(monthlyBillingComponentProps(element).header).toMatchObject({
        subTitle: `€276.56`,
        title: paymentObj.codeValue + ' - ' + paymentObj.codeValue
      })
      expect(monthlyBillingComponentProps(element).payment).toMatchObject(
        paymentObj
      )

      monthlyBillingComponentProps(element).payment.onTertiaryButtonPress()
      expect(BillDetailsHelper.downloadBillInvoicePDF).toHaveBeenCalledWith(
        billDetailsData.relatedEntity
      )
    })

    test('should render the correct subscriptions', async () => {
      const subscriptions = {
        data: [
          {
            headlineProps: {
              title: 'Red 2019 M mit Basic Smartph.',
              subtitle: '01621373286',
              logo: {
                uri: 'test-file-stub'
              },
              hasImg: true,
              arrow: false
            },
            total: {
              noVatLabel: 'billing_details_supscription_total_before_vat_label',
              noVatValue: `€5.00`,
              vatLabel: 'billing_details_supscription_vat_label',
              vatValue: `€0.00`,
              totalLabel: 'bill_details_subscription_total_label',
              totalValue: `€5.00`,
              totalValueStyle: null
            },
            showTotalAsSummary: true
          },
          {
            headlineProps: {
              title: 'Smart2 XS Sub5',
              subtitle: '01622006409',
              logo: {
                uri: 'test-file-stub'
              },
              hasImg: true,
              arrow: false
            },
            total: {
              noVatLabel: 'billing_details_supscription_total_before_vat_label',
              noVatValue: `€21.00`,
              vatLabel: 'billing_details_supscription_vat_label',
              vatValue: `€0.00`,
              totalLabel: 'bill_details_subscription_total_label',
              totalValue: `€21.00`,
              totalValueStyle: null
            },
            showTotalAsSummary: true
          },
          {
            headlineProps: {
              title: 'Smart2 XS Sub544',
              subtitle: ' ',
              logo: {
                uri: 'test-file-stub'
              },
              hasImg: true,
              arrow: false
            },
            total: {
              noVatLabel: 'billing_details_supscription_total_before_vat_label',
              noVatValue: `€15.00`,
              vatLabel: 'billing_details_supscription_vat_label',
              vatValue: `€0.00`,
              totalLabel: 'bill_details_subscription_total_label',
              totalValue: `€15.00`,
              totalValueStyle: null
            },
            showTotalAsSummary: true
          }
        ],
        isLoading: false,
        isError: false
      }

      expect(monthlyBillingComponentProps(element).subscriptions).toMatchObject(
        subscriptions
      )
      expect(
        monthlyBillingComponentProps(element).subscriptions.data.length
      ).toEqual(3)
      expect(monthlyBillingComponentProps(element).subscriptions.data).toEqual(
        subscriptions.data
      )
    })
  })
})

describe('BillDetails screen test when success but without totalBeforVat prop', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test("bill breakdown section should not be shown if one subscription doesn't contain totalBeforeVat", async () => {
    store.getState = () => ({
      appUserData: { currentlyActiveSubscription: { ban } }
    })
    const newBillDetalsData = {
      ...billDetailsData,
      subscription: [
        ...billDetailsData.subscription,
        { ...billDetailsData.subscription[0], totalBeforeVAT: undefined }
      ]
    }

    mockDXLService(true, newBillDetalsData)

    let component
    await act(async () => {
      component = create(<BillDetails />)
      jest.runAllTimers()
    })

    expect(monthlyBillingComponentProps(component).subscriptions).toEqual(false)
  })
})

describe('BillDetails screen credit case [negative bill]', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should render BillDetails screen with credit case [negative bill] successfully', async () => {
    const megativeBillDetalsData = {
      ...billDetailsData,
      amountDue: {
        value: -276.56,
        unit: 'EUR'
      }
    }

    mockDXLService(true, megativeBillDetalsData)

    let element
    await act(async () => {
      element = create(<BillDetails />)
      jest.runAllTimers()
    })
    const monthlyBillingComponent = monthlyBillingComponentProps(element)
    expect(monthlyBillingComponent.withSubHeaderAfterSubtitle).toEqual(true)
    expect(monthlyBillingComponent.withBillNegativeAmount).toEqual(false)
    expect(monthlyBillingComponent.billAmountStyle).toEqual({
      color: '#008a00'
    })
    expect(
      monthlyBillingComponent.negativeBillQuickActionsProps
        .withBillNegativeAlertIcon
    ).toEqual(true)
    expect(monthlyBillingComponent.negativeBillQuickActionsProps.QAtitle).toBe(
      'billing_negative_bill_quick_action_header'
    )
    expect(monthlyBillingComponent.negativeBillQuickActionsProps.title).toBe(
      'billing_negative_bill_quick_action_title'
    )
    expect(
      monthlyBillingComponent.negativeBillQuickActionsProps.description
    ).toBe('billing_negative_bill_quick_action_description')
    expect(
      monthlyBillingComponent.negativeBillQuickActionsProps.buttonTitle
    ).toBe('billing_negative_bill_quick_action_button_text')
    expect(
      monthlyBillingComponent.negativeBillQuickActionsProps.withCloseButton
    ).toBe(false)
    expect(
      monthlyBillingComponent.negativeBillQuickActionsProps
        .descriptionContainerStyle
    ).toEqual({
      borderBottomColor: '#BEBEBE',
      borderBottomWidth: 0.2,
      marginBottom: 24
    })
  })

  test('should not render BillDetails screen with credit case [negative bill] if the Amount value is positive', async () => {
    mockDXLService(true, billDetailsData)

    let element
    await act(async () => {
      element = create(<BillDetails />)
      jest.runAllTimers()
    })
    const monthlyBillingComponent = monthlyBillingComponentProps(element)
    expect(monthlyBillingComponent.billAmountStyle).toEqual(false)
    expect(
      monthlyBillingComponent.negativeBillQuickActionsProps
        .withBillNegativeAlertIcon
    ).toEqual(false)
  })
})

describe('BillDetails screen test when failure', () => {
  let element

  beforeEach(async () => {
    mockDXLService(false)

    store.getState = () => ({
      appUserData: { currentlyActiveSubscription: { ban } }
    })
    await act(async () => {
      element = create(<BillDetails />)
      jest.runAllTimers()
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should render BillDetails props correctly when api fails', async () => {
    expect(monthlyBillingComponentProps(element).header).toBe(false)

    expect(monthlyBillingComponentProps(element).payment).toMatchObject({
      isLoading: false,
      isError: true
    })
  })

  test('should recall the api when press on refresh', async () => {
    BillDetailsApi.loadBillDetails = jest.fn()

    await act(async () => {
      element = create(<BillDetails />)
      jest.runAllTimers()
    })

    jest.clearAllMocks()
    monthlyBillingComponentProps(element).payment.onTryAgainPress()
    expect(BillDetailsApi.loadBillDetails).toHaveBeenCalledTimes(1)
  })

  test('bill breakdown section should not be shown if subscriptions list is Empty or undefined', async () => {
    billDetailsData.subscription = []
    expect(monthlyBillingComponentProps(element).subscriptions).toEqual(
      undefined
    )

    billDetailsData.subscription = undefined
    expect(monthlyBillingComponentProps(element).subscriptions).toEqual(
      undefined
    )
  })
})
