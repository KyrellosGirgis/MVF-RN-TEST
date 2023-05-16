/* eslint-disable no-unused-vars */

import { Colors } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { Images } from 'App/Themes'

import styles from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/BalanceTab.styles'
import { testID } from 'App/Utils/Helpers/testId.helpers'

enum AUTO_TOPUP_STATUS {
  ACTIVE_COMFORT_CHARGE = 'ActiveWithComfortCharge',
  NOT_REGISTERED = 'NotRegistered',
  NOT_AVAILABLE = 'NotAvailable',
  ASK_ACTIVATE = 'autoTopUpAskActivate',
  NOT_BOOKABLE = 'autoTopUpNotBookable',
  ACTIVATE = 'activate',
  DEACTIVATE = 'deactivate',
  ERROR = 'error'
}

const activateAutoTopUpCardProps = {
  title: 'cvm_auto_top_up_active_title',
  description: 'cvm_auto_top_up_active_description',
  buttonTitle: 'cvm_auto_top_up_active_button_title',
  isAutoTopUpActivated: true
}

const inactivateAutoTopUpCardProps = {
  title: 'cvm_auto_top_up_inactive_title',
  description: 'cvm_auto_top_up_inactive_description',
  buttonTitle: 'cvm_auto_top_up_inactive_button_title',
  isAutoTopUpActivated: false
}

const notRegisteredAutoTopUpBannerProps = {
  title: 'cvm_auto_top_up_notRegistered_title',
  description: 'cvm_auto_top_up_notRegistered_description',
  primaryButtonTitle: 'cvm_auto_top_up_notRegistered_button_title',
  leftIconSize: 25,
  closeIconSize: 25,
  leftIconType: 'image',
  withLeftIcon: true,
  type: 'gradient',
  withPrimaryButton: true,
  withCloseButton: true,
  leftIcon: Images.autoTopupWhite_icon,
  descriptionStyle: [styles.descriptionStyle],
  backgroundColors: [Colors.darkCyan, Colors.turquoise],
  closeIconTestID: testID('notRegisteredAutoTopup_Xbtn')
}

const preSelectedAmountForSetupAutoTopup = '1500'

export {
  AUTO_TOPUP_STATUS,
  activateAutoTopUpCardProps,
  inactivateAutoTopUpCardProps,
  notRegisteredAutoTopUpBannerProps,
  preSelectedAmountForSetupAutoTopup
}
