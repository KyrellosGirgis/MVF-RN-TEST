import { Theme } from '@vfgroup-oneplatform/foundation/Components/Themes/Provider/index.d'

import styles from './TopupMethodsScreen.styles'

import { defaultWheelValue, wheelValues } from './TopUpMethodsScreen.constants'

import { NavigationFunctions } from 'App/Containers'
import Routes from 'App/Containers/AppNavigation/Routes'
import { topupWithVoucherCode } from 'App/Services/API/Requests/VoucherTopup/VoucherTopup.requests'
import { testID } from 'App/Utils/Helpers/testId.helpers'
import { store } from 'App/Redux'
import { MarketCode } from 'App/Services/API/Requests/userData/userData.d'
import { translate } from 'App/Utils/Helpers/generic.helpers'

import { CURRENCY_CODE_SYMBOL } from 'App/Utils/Enums/currencySymbols'

const showTopUpMethodsModal = () => {
  NavigationFunctions.navigate(Routes.TopUpMethodsScreen)
}

const getVoucherTopupProps = (theme: Theme) => {
  return {
    voucherTopupQrScannerFooterBtnContainerStyle:
      styles.voucherTopupQrScannerFooterBtnContainerStyle,
    voucherTopupQrScannerFooterBtnStyle:
      !theme.isDark && styles.voucherTopupQrScannerFooterBtnStyle,
    btnSuccessStyle:
      !theme.isDark && styles.voucherTopupQrScannerFooterBtnStyle,
    mainTitleID: testID('mainTitleID'),
    titleID: testID('titleID'),
    lottieID: testID('lottieID'),
    successBtnID: testID('paymentOptions_tray_button'),
    quickActionCloseIconAccessibilityLabel: testID('CloseIconTestID'),
    voucherTopupQrScannerBtnType: theme.isDark ? 'primary' : 'secondary',
    voucherBtnContainerStyle: styles.voucherButtonContainer,
    successBtnDisabledStyle: styles.successBtnDisabledStyle,
    onPressConfirmVoucherCode: async (voucherCode: any) => {
      return await topupWithVoucherCode(voucherCode)
    }
  }
}

const getDirectTopupProps = () => {
  return {
    wheelValues: wheelValues,
    defaultWheelValue: defaultWheelValue,
    currency: CURRENCY_CODE_SYMBOL.EUR
  }
}

const closeModal = () => {
  NavigationFunctions.goBack()
}

const getErrorMessage = () => {
  const { currentlyActiveSubscription } = store.getState().appUserData
  const marketCode = currentlyActiveSubscription?.marketCode
  return marketCode !== MarketCode.Mmo
    ? {
        message: translate('topUpErrorMessage')
      }
    : ''
}

export {
  showTopUpMethodsModal,
  getVoucherTopupProps,
  getDirectTopupProps,
  closeModal,
  getErrorMessage
}
