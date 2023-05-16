import React from 'react'

import PaymentWrapper from '@vfgroup-oneplatform/framework/Payment/PaymentWrapper'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { getThemeImages } from '@vfgroup-oneplatform/framework/Themes'

import {
  MAPPED_ONLINE_RECHARGE,
  getTopupMethods
} from './TopUpMethodsScreen.constants'

import {
  getDirectTopupProps,
  getVoucherTopupProps,
  closeModal,
  getErrorMessage
} from './TopUpMethodsScreen.helpers'

import { testID } from 'App/Utils/Helpers/testId.helpers'
import { openWebView } from 'App/Screens/WebViewScreen/WebViewScreen.helper'
import webURLs from 'App/Services/webURLs'

const TopUpMethodsScreen = () => {
  const theme = useTheme()
  const Images = getThemeImages(theme.name)

  const handlePressConfirmSelection = (selectedValue: string) => {
    const amount = MAPPED_ONLINE_RECHARGE[selectedValue] ?? ''
    const topUpURL = webURLs.topUpURL(amount)
    closeModal()
    openWebView(topUpURL, true)
  }

  return (
    <PaymentWrapper
      isVisible={true}
      closeModal={closeModal}
      paymentMethodOptions={getTopupMethods(Images)}
      loadingError={getErrorMessage()}
      onPressConfirmSelection={(param: any) => {
        return new Promise(() => {
          handlePressConfirmSelection(param.selectedValue?.value)
        })
      }}
      paymentDefaultTitleID={testID('directTopupTray_subTitle')}
      subTitleID={testID('directTopUp_errorMessage')}
      paymentDefaultOKBtnID={testID('directTopupTray_toppNowBtn')}
      wheelSelectorCurrencyAccessibilityLabel={
        testID('directTopupTray_topupCurrency') ?? ''
      }
      quickActionTitleAccessibilityLabel={testID('paymentOptions_tray_title')}
      isPaymentMethod={false}
      {...getVoucherTopupProps(theme)}
      {...getDirectTopupProps()}
    />
  )
}

export default TopUpMethodsScreen
