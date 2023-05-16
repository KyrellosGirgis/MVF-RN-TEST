import { SubscriptionItem } from '@vfgroup-oneplatform/billing/Components/ExpansionPanel/ExpansionPanel.d'

import Moment from 'moment'

import styles from 'App/Screens/Billing/Billing.styles'
import { trimAfterDecimal } from 'App/Utils/Helpers/number.helpers'

import {
  RelatedEntity,
  Subscription,
  BillDetailsRelatedEntity
} from 'App/Services/API/Requests/Billing/BillDetails/BillDetails.d'

import { managePDFDownload } from 'App/Services/API/Requests/DownloadPDF/downloadPDF.helper'
import { BILL_DOCUMENT_TYPES } from 'App/Screens/Billing/BillDetails/DownloadBill.constants'

const extractMSISDNFromID = (id: string) => id.split(':').pop()

const getMSISDNFromBillDetailsSubscription = (subscription: Subscription) => {
  const { relatedParty, relatedEntity } = subscription || {}
  const relatedPartyId =
    relatedParty?.id || relatedEntity?.[0]?.relatedParty?.[0]?.id || ' '
  return extractMSISDNFromID(relatedPartyId)
}

const mapBillDetailsSubscriptionsToProps = (
  subscriptions: Subscription[],
  images: any
) =>
  subscriptions?.map((subscription: Subscription) => {
    const { name, totalBeforeVAT } = subscription || {}
    const { value, unit } = totalBeforeVAT || { value: 0, unit: 'EUR' }
    const vatValue = '0.00'
    const totalBeforeVatValue = trimAfterDecimal(value)
    const totalAfterVatValue = trimAfterDecimal(value + parseFloat(vatValue))

    return <SubscriptionItem>{
      headlineProps: {
        title: name || '',
        subtitle: getMSISDNFromBillDetailsSubscription(subscription),
        logo: images.ic_mobile,
        hasImg: true,
        arrow: false
      },
      total: {
        noVatLabel: 'billing_details_supscription_total_before_vat_label',
        noVatValue: concatAmountWithCurrency(totalBeforeVatValue, unit),
        vatLabel: 'billing_details_supscription_vat_label',
        vatValue: concatAmountWithCurrency(vatValue, unit),
        totalLabel: 'bill_details_subscription_total_label',
        totalValue: concatAmountWithCurrency(
          Math.abs(totalAfterVatValue),
          unit
        ),
        totalValueStyle: totalAfterVatValue < 0 ? styles.billAmountStyle : null
      },
      showTotalAsSummary: true
    }
  }) || []

const checkIfTotalBeforeVatExistInAllSubscriptions = (
  subscriptions: Subscription[]
) =>
  !subscriptions?.some(
    (subscription) => subscription.totalBeforeVAT?.value === undefined
  )

const checkPDFAvailability = (billDetails: any) => {
  return billDetails?.relatedEntity.some(
    (element: RelatedEntity) =>
      element.documentType === BILL_DOCUMENT_TYPES.INVOICE_PDF && !!element.href
  )
}

const concatAmountWithCurrency = (num: number | string, unit: string) => {
  if (typeof unit === 'string') {
    return new Intl.NumberFormat(Moment().locale(), {
      style: 'currency',
      currency: unit
    }).format(parseFloat(num))
  }
}

const downloadBillInvoicePDF = async (
  billDetailsRelatedEntity: BillDetailsRelatedEntity[] | undefined
) => {
  const documentLink = billDetailsRelatedEntity?.find(
    (entity) => entity.documentType === BILL_DOCUMENT_TYPES.INVOICE_PDF
  )
  if (documentLink) {
    managePDFDownload(documentLink.href)
  }
}

export {
  mapBillDetailsSubscriptionsToProps,
  getMSISDNFromBillDetailsSubscription,
  extractMSISDNFromID,
  checkIfTotalBeforeVatExistInAllSubscriptions,
  checkPDFAvailability,
  concatAmountWithCurrency,
  downloadBillInvoicePDF
}
