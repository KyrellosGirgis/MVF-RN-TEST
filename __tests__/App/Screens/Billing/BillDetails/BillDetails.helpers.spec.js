/* eslint-disable import/namespace */
import Moment from 'moment'

import { billDetailsData } from '__tests__/App/Services/api/Requests/Billing/data'
import { managePDFDownload } from 'App/Services/API/Requests/DownloadPDF/downloadPDF.helper'

import {
  mapBillDetailsSubscriptionsToProps,
  getMSISDNFromBillDetailsSubscription,
  extractMSISDNFromID,
  checkIfTotalBeforeVatExistInAllSubscriptions,
  checkPDFAvailability,
  concatAmountWithCurrency,
  downloadBillInvoicePDF
} from 'App/Screens/Billing/BillDetails/BillDetails.helper'

const monetarySpace = String.fromCharCode(160)

jest.mock('App/Services/API/Requests/DownloadPDF/downloadPDF.helper', () => {
  return {
    managePDFDownload: jest.fn()
  }
})
describe('BillDetails helper test', () => {
  describe('while locale is DE', () => {
    beforeAll(() => {
      Moment.locale('de')
    })
    test('test mapping details subscription to props function', async () => {
      const images = {
        ic_mobile: {
          uri: 'test-file-stub'
        }
      }
      const mappedSubscriptions = {
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
        ]
      }

      expect(
        mapBillDetailsSubscriptionsToProps(billDetailsData.subscription, images)
      ).toEqual(mappedSubscriptions.data)

      expect(
        mapBillDetailsSubscriptionsToProps(
          [{ ...billDetailsData.subscription[0], name: '' }],
          images
        )
      ).toEqual([
        {
          ...mappedSubscriptions.data[0],
          headlineProps: {
            ...mappedSubscriptions.data[0].headlineProps,
            title: ''
          }
        }
      ])

      expect(
        mapBillDetailsSubscriptionsToProps(
          [
            {
              ...billDetailsData.subscription[0],
              totalBeforeVAT: { value: 5.0, unit: 'EUR' }
            }
          ],
          images
        )
      ).toEqual([
        {
          ...mappedSubscriptions.data[0],
          total: {
            ...mappedSubscriptions.data[0].total
          }
        }
      ])

      expect(mapBillDetailsSubscriptionsToProps(null, images)).toEqual([])
    })
  })

  describe('while locale is EN', () => {
    beforeAll(() => {
      Moment.locale('en')
    })
    test('test mapping details subscription to props function', async () => {
      const images = {
        ic_mobile: {
          uri: 'test-file-stub'
        }
      }
      const mappedSubscriptions = {
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
        ]
      }

      expect(
        mapBillDetailsSubscriptionsToProps(billDetailsData.subscription, images)
      ).toEqual(mappedSubscriptions.data)

      expect(
        mapBillDetailsSubscriptionsToProps(
          [{ ...billDetailsData.subscription[0], name: '' }],
          images
        )
      ).toEqual([
        {
          ...mappedSubscriptions.data[0],
          headlineProps: {
            ...mappedSubscriptions.data[0].headlineProps,
            title: ''
          }
        }
      ])

      expect(
        mapBillDetailsSubscriptionsToProps(
          [
            {
              ...billDetailsData.subscription[0],
              totalBeforeVAT: { value: 5.0, unit: 'EUR' }
            }
          ],
          images
        )
      ).toEqual([
        {
          ...mappedSubscriptions.data[0],
          total: {
            ...mappedSubscriptions.data[0].total
          }
        }
      ])

      expect(mapBillDetailsSubscriptionsToProps(null, images)).toEqual([])
    })
  })

  test('should retrun MSISD from subscription data correctly', async () => {
    const output = billDetailsData.subscription.map((subscription) => {
      return getMSISDNFromBillDetailsSubscription(subscription)
    })
    const expectedOutput = ['01621373286', '01622006409', ' ']
    expect(output).toEqual(expectedOutput)
  })

  test('should extract MSISDN from id correctly', async () => {
    const output = extractMSISDNFromID(
      billDetailsData.subscription[0].relatedParty.id
    )
    const expectedOutput = '01621373286'
    expect(output).toEqual(expectedOutput)
  })

  test('should return complete related-party if it doesnot include ":" ', async () => {
    const output = extractMSISDNFromID(
      'urnvf-de-dxl-tmfvfmobilemsisdn01622006409'
    )
    const expectedOutput = 'urnvf-de-dxl-tmfvfmobilemsisdn01622006409'
    expect(output).toEqual(expectedOutput)
  })

  test('should return true if all subscriptions have total before vat', async () => {
    const subscriptions = billDetailsData.subscription
    expect(checkIfTotalBeforeVatExistInAllSubscriptions(subscriptions)).toEqual(
      true
    )
  })

  test('should return false if one subscription doesnt have total before vat', async () => {
    const subscriptions = [
      ...billDetailsData.subscription,
      { ...billDetailsData.subscription[0], totalBeforeVAT: undefined }
    ]
    expect(checkIfTotalBeforeVatExistInAllSubscriptions(subscriptions)).toEqual(
      false
    )
  })
})

describe('checkPDFAvailability functionality', () => {
  test('should return true when Href is available', async () => {
    const billDetails = {
      relatedEntity: [
        {
          documentType: 'INVOICE_PDF',
          href: 'https://api.vodafone.de'
        }
      ]
    }
    const result = checkPDFAvailability(billDetails)
    expect(result).toBeTruthy()
  })

  test('should return false when Href equals null', async () => {
    const billDetails = {
      relatedEntity: [
        {
          documentType: 'INVOICE_PDF',
          href: null
        }
      ]
    }
    const result = checkPDFAvailability(billDetails)
    expect(result).not.toBeTruthy()
  })

  test('should return false when Href equals empty string', async () => {
    const billDetails = {
      relatedEntity: [
        {
          documentType: 'INVOICE_PDF',
          href: ''
        }
      ]
    }
    const result = checkPDFAvailability(billDetails)
    expect(result).not.toBeTruthy()
  })

  describe('while locale is DE', () => {
    beforeAll(() => {
      Moment.locale('de')
    })
    test('should return amount with currency in correct format', async () => {
      const input = '25.34'
      const expectedOutput = `25,34${monetarySpace}€`
      const output = concatAmountWithCurrency(input, 'EUR')
      expect(output).toEqual(expectedOutput)
    })
  })

  describe('while locale is EN', () => {
    beforeAll(() => {
      Moment.locale('en')
    })
    test('should return amount with currency in correct format', async () => {
      const input = '25.34'
      const expectedOutput = `€25.34`
      const output = concatAmountWithCurrency(input, 'EUR')
      expect(output).toEqual(expectedOutput)
    })
  })

  describe('test download Bill Invoice PDF functionality', () => {
    test('should not call managePDFDownload  if there is no INVOICE_PDF', async () => {
      const billDetailsRelatedEntity = billDetailsData.relatedEntity.slice(1)
      await downloadBillInvoicePDF(billDetailsRelatedEntity)
      expect(managePDFDownload).not.toHaveBeenCalled()
    })
    test('should call managePDFDownload  if there is INVOICE_PDF', async () => {
      const billDetailsRelatedEntity = billDetailsData.relatedEntity
      await downloadBillInvoicePDF(billDetailsRelatedEntity)
      expect(managePDFDownload).toHaveBeenCalled()
    })
  })
})
