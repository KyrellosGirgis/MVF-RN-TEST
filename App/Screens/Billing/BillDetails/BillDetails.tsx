import React from 'react'

import { MonthlyBilling } from '@vfgroup-oneplatform/billing'

import Shimmer from '@vfgroup-oneplatform/foundation/Components/Shimmer'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { headerLoadingConfig } from './BillDetailsLoadingConfig'

import { getThemeImages } from 'App/Themes'

import styles from 'App/Screens/Billing/Billing.styles'

import { DATE_FORMATS } from 'App/Utils/Enums/index'

import { NavigationFunctions } from 'App/Containers'
import { loadBillDetails } from 'App/Services/API/Requests/Billing/BillDetails/BillDetails'
import { dateFormat } from 'App/Utils/Helpers/date.helpers'
import { useApiCall } from 'App/Hooks'
import {
  checkIfTotalBeforeVatExistInAllSubscriptions,
  checkPDFAvailability,
  concatAmountWithCurrency,
  downloadBillInvoicePDF,
  mapBillDetailsSubscriptionsToProps
} from 'App/Screens/Billing/BillDetails/BillDetails.helper'
import { navigateToDashboardScreen } from 'App/Screens/Helpers'
import { trimAfterDecimal } from 'App/Utils/Helpers/number.helpers'
import { negativeBillQuickActionsProps } from 'App/Screens/Billing/Billing.constants'

const BillDetails = () => {
  const theme = useTheme()
  const Images = getThemeImages(theme.name)

  const {
    responseData: billDetails,
    isError,
    isLoading,
    refresh
  } = useApiCall(loadBillDetails)

  const {
    amountDue,
    billDate,
    relatedEntity,
    paymentDueDate,
    subscription: subscriptions
  } = billDetails || {}

  const isBillDetailsAmountNegative = amountDue?.value < 0
  const shouldShowBreakdownSection =
    isLoading ||
    isError ||
    (subscriptions?.length &&
      checkIfTotalBeforeVatExistInAllSubscriptions(subscriptions))

  const header = !isError && {
    subTitle: concatAmountWithCurrency(
      amountDue && trimAfterDecimal(Math.abs(amountDue?.value)),
      amountDue?.unit
    ),
    title:
      billDetails &&
      dateFormat(
        billDetails.billingPeriod.startDateTime,
        DATE_FORMATS.SHORTddmmyy
      ) +
        ' - ' +
        dateFormat(
          billDetails.billingPeriod.endDateTime,
          DATE_FORMATS.SHORTddmmyy
        ),
    loader: <Shimmer config={headerLoadingConfig} />
  }

  return (
    <MonthlyBilling
      vfScreen={{
        title: 'billing_landing_title',
        onClose: navigateToDashboardScreen,
        onBack: () => NavigationFunctions.goBack(),
        showBack: true,
        clearStatusBarEntries: false
      }}
      header={header}
      payment={{
        isLoading: isLoading,
        isError: isError,
        onTryAgainPress: refresh,
        isPrimaryButtonDisabled: true,
        primaryButtonTitle: 'DEMO',
        withTertiaryButton: checkPDFAvailability(billDetails),
        tertiaryButtonTitle: 'billing_download_pdf_button',
        onTertiaryButtonPress: () => {
          downloadBillInvoicePDF(relatedEntity)
        },
        codeLabel: 'bill_date',
        codeValue: dateFormat(billDate, DATE_FORMATS.LOCALE_FULL_SHORT),
        billNumberLabel: 'bill_due_date',
        billNumberValue: dateFormat(
          paymentDueDate,
          DATE_FORMATS.LOCALE_FULL_SHORT
        )
      }}
      subscriptions={
        shouldShowBreakdownSection && {
          data: mapBillDetailsSubscriptionsToProps(subscriptions, Images),
          isLoading: isLoading,
          isError: isError,
          onTryAgainPress: refresh
        }
      }
      withSubHeaderAfterSubtitle={true}
      billAmountStyle={isBillDetailsAmountNegative && styles.billAmountStyle}
      withBillNegativeAmount={false}
      negativeBillQuickActionsProps={{
        ...negativeBillQuickActionsProps,
        withBillNegativeAlertIcon: isBillDetailsAmountNegative
      }}
    />
  )
}

export default BillDetails
