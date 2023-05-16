import React, { useEffect, useState } from 'react'

import { Billing } from '@vfgroup-oneplatform/billing'

// eslint-disable-next-line import/named
import { RouteProp, useRoute } from '@react-navigation/native'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { getThemeImages } from 'App/Themes/Modes/Helpers'

import styles from 'App/Screens/Billing/Billing.styles'

import { DATE_FORMATS } from 'App/Utils/Enums/index'
import { dateFormat } from 'App/Utils/Helpers/date.helpers'

import { ApiRoutes, webURLs } from 'App/Services'
import {
  getDunningBannerProps,
  getPaperBillBannerProps
} from 'App/Screens/Billing/BillLanding/BillLanding.helpers'

import { BillData } from 'App/Services/API/Requests/Billing/BillHistory/BillHistoryMapper.d'

import { loadBillingHistory } from 'App/Services/API/Requests/Billing/BillHistory/BillHistory'
import { NavigationFunctions } from 'App/Containers'
import { useApiCall } from 'App/Hooks'
import Routes, { DEEPLINKS_SCREENS } from 'App/Containers/AppNavigation/Routes'
import { isDE, nameOfObjectKey } from 'App/Utils/Helpers/generic.helpers'
import { openWebView } from 'App/Screens/WebViewScreen/WebViewScreen.helper'
import { getBillDunningData } from 'App/Services/API/Requests/Billing/BillDunning/BillDunning'
import { getBillBalanceData } from 'App/Services/API/Requests/Billing/BillBalance/BillBalance'

import { BillLandingRouteProps } from 'App/Screens/Billing/BillLanding/BillLanding.d'
import { negativeBillQuickActionsProps } from 'App/Screens/Billing/Billing.constants'

const BillLanding = () => {
  const { deeplinkParams } =
    useRoute<RouteProp<BillLandingRouteProps, 'params'>>().params

  const theme = useTheme()
  const images = getThemeImages(theme.name)
  const [billsHistoryItems, setBillsHistoryItems] = useState<BillData[]>([])
  const { responseData, isError, isLoading, refresh, callNextApi } =
    useApiCall(loadBillingHistory)

  const {
    responseData: dunningData,
    isLoading: isDunningDataLoading,
    isError: isDunningDataError,
    refresh: refreshDunningData
  } = useApiCall(getBillDunningData)

  const {
    responseData: shouldShowPaperBill,
    isLoading: isPaperBillLoading,
    isError: isPaperBillError,
    refresh: refreshPaperBill
  } = useApiCall(getBillBalanceData)

  const appendNextNewBillsToPreviousBill = () => {
    const nextBills = responseData?.billHistoryItems
    billsHistoryItems.splice(billsHistoryItems.length - 3, 3)
    setBillsHistoryItems(billsHistoryItems.concat(nextBills))
  }

  const removeLoadingCards = () => {
    billsHistoryItems.splice(billsHistoryItems.length - 3, 3)
  }

  const appendLoadingCards = () => {
    const loadingCards = []
    for (var i = 0; i < 3; i++) {
      const item = {
        id: `${i}`,
        isLoading: true
      }
      loadingCards.push(item)
    }
    setBillsHistoryItems(billsHistoryItems.concat(loadingCards))
  }

  const loadMoreBills = () => {
    appendLoadingCards()
    callNextApi(() => loadBillingHistory(responseData?.nextBillsLink?.href))
  }

  const navigateToDunningWebViewFromDeepLink = () => {
    openWebView(webURLs.dunningURL, true, refreshDunningData)
    NavigationFunctions.setParams({ deeplinkParams: '' })
  }

  const getTimePeriod = (startDate: Date, endDate: Date) => {
    const shortStartDate = dateFormat(startDate, DATE_FORMATS.SHORTddmm)
    const shortEndDate = dateFormat(endDate, DATE_FORMATS.SHORTddmm)
    return `${shortStartDate} - ${shortEndDate}`
  }

  useEffect(() => {
    const dunninngScreenID = nameOfObjectKey(
      DEEPLINKS_SCREENS,
      (x) => x.dunning_internal_browser
    )
    dunningData?.inDunning &&
      deeplinkParams?.deepLinkScreenName === dunninngScreenID &&
      navigateToDunningWebViewFromDeepLink()
  }, [dunningData])

  useEffect(() => {
    if (responseData) {
      appendNextNewBillsToPreviousBill()
    }
  }, [responseData])

  useEffect(() => {
    if (isError) {
      removeLoadingCards()
    }
  }, [isError])

  const onClose = () => NavigationFunctions.goBack()
  const navigateToBillDetails = (bill: any) => {
    ApiRoutes.DXL.billDetails.URL = bill?.billDetailsLink?.href
    NavigationFunctions.navigate(Routes.BillDetails)
  }

  const isNotFromPagination = !billsHistoryItems?.length

  const billsCards = {
    negativeBillProps: {
      billingNegativeValueNote:
        'billing_negative_prev_bill_negative_value_note',
      billingNegativeValueNoteStyle: styles.billingNegativeValueNoteStyle
    },
    billAmountStyle: {
      ...styles.billAmountStyle,
      ...styles.prevBillAmountStyle
    }, // bill style while Credit.
    data: billsHistoryItems?.slice(1).map((item: BillData) => {
      return {
        ...item,
        imageListProp: {
          images: [images.id_document]
        }
      }
    }),
    isLoading: isLoading && isNotFromPagination,
    withTimePeriodDisplayed: true,
    withShowMoreLoader: isLoading && !isNotFromPagination,
    showMoreButton: Boolean(responseData?.nextBillsLink?.href) && !isLoading,
    onShowMorePress: () => {
      !isLoading && loadMoreBills()
    },
    isErrorShowMore: isError,
    onShowMoreTryAgainPress: billsHistoryItems.length ? loadMoreBills : refresh,
    onBillPress: (bill: any) => {
      navigateToBillDetails(bill)
    }
  }

  const latestBillItem = billsHistoryItems?.slice()?.shift()
  const isLatestBillAmountNegative = latestBillItem?.value < 0
  const latestBill = billsHistoryItems?.length
    ? {
        currentBillAmountStyle:
          isLatestBillAmountNegative && styles.billAmountStyle,
        negativeBillProps: {
          billingNegativeValueNote:
            isLatestBillAmountNegative &&
            'billing_negative_bill_quick_action_header'
        },
        ...latestBillItem,
        isError: isError && isNotFromPagination,
        isLoading: isLoading && isNotFromPagination,
        onPress: (bill: any) => {
          navigateToBillDetails(bill)
        },
        withTimePeriodDisplayed: true,
        imageListProp: {
          showTitle: false,
          images: [images.id_document]
        },
        extraChargesText: ''
      }
    : isError
    ? {
        isLoading: isLoading,
        isError: isError && isNotFromPagination,
        onTryAgainPress: refresh
      }
    : { isLoading: isLoading }

  const getExtraBannersProps = () => {
    const extraBannersProps = []
    if (
      isDunningDataLoading ||
      (dunningData?.inDunning && !isDunningDataError)
    ) {
      extraBannersProps.push({
        ...getDunningBannerProps(
          dunningData?.billingInformation?.dunningLetterAmount
            ? dunningData?.billingInformation?.dunningLetterAmount / 100
            : 0
        ),
        onPrimaryButtonPress: () => {
          openWebView(webURLs.dunningURL, true, refreshDunningData)
        },
        isLoading: isDunningDataLoading
      })
    }
    if (isPaperBillLoading || (shouldShowPaperBill && !isPaperBillError)) {
      extraBannersProps.push({
        ...getPaperBillBannerProps(!dunningData?.inDunning),
        onPrimaryButtonPress: () => {
          openWebView(webURLs.paperBillURL, false, refreshPaperBill)
        },
        isLoading: isPaperBillLoading
      })
    }
    return extraBannersProps
  }

  return (
    <Billing
      vfScreen={{
        title: 'billing_landing_title',
        onClose: onClose,
        closeButtonTestID: 'BIcloseBtn'
      }}
      currentBillCard={latestBill}
      billsCards={billsCards}
      billsDisplayedPerPage={responseData?.totalCount || 24}
      withAutoPaymentCard={false}
      internalPagination={false}
      isCurrencyFirst={!isDE()}
      extraBannersProps={getExtraBannersProps()}
      clearStatusBarEntries={false}
      withBillNegativeAmount={false}
      negativeBillQuickActionsProps={negativeBillQuickActionsProps}
      getTimePeriod={getTimePeriod}
      previousBillSubTitle={'billing_previous_bill_subTitle'}
      isError={isError && isNotFromPagination}
      onTryAgainPress={refresh}
      errorScreenProps={{ backgroundStyle: {} }}
    />
  )
}
export default BillLanding
