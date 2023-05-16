import { Colors } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { Images } from 'App/Themes'

import { translate } from 'App/Utils/Helpers/generic.helpers'

import styles from 'App/Screens/Billing/BillLanding/BillLanding.styles'

const getPaperBillBannerProps = (isTopBaner: boolean) => ({
  title: 'paper_bill_banner_title',
  description: 'paper_bill_banner_description',
  primaryButtonTitle: 'paper_bill_banner_button_title',
  withLeftIcon: true,
  leftIconSize: 24,
  withCloseButton: false,
  leftIconType: 'image',
  leftIcon: Images.bill_report_icon,
  withPrimaryButton: true,
  containerViewStyle: isTopBaner
    ? styles.topBannerContainerStyle
    : styles.bannerContainerStyle,
  descriptionStyle: styles.bannerDescStyle,
  backgroundColors: [Colors.blue_two, Colors.blue_two],
  primaryButtonViewStyle: styles.bannerPrimaryButtonStyle,
  titleStyle: styles.bannerTitleStyle,
  textPrimaryButtonStyle: styles.bannerPrimaryButtonTextStyle
})

const getDunningBannerProps = (dunningAmount: number) => ({
  title: 'dunning_banner_title',
  description: translate('dunning_banner_description', { dunningAmount }),
  primaryButtonTitle: 'dunning_banner_button_title',
  withLeftIcon: true,
  leftIconSize: 24,
  withCloseButton: false,
  leftIconType: 'image',
  leftIcon: Images.warning_icon,
  withPrimaryButton: true,
  containerViewStyle: styles.topBannerContainerStyle,
  descriptionStyle: styles.bannerDescStyle,
  primaryButtonViewStyle: styles.bannerPrimaryButtonStyle,
  titleStyle: styles.bannerTitleStyle,
  textPrimaryButtonStyle: styles.bannerPrimaryButtonTextStyle
})

export { getPaperBillBannerProps, getDunningBannerProps }
