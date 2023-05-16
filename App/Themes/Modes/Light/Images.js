import { Image } from 'react-native'
import LightFrameworkImages from '@vfgroup-oneplatform/framework/Themes/Modes/Light/Images'
import CoreImages from '@vfgroup-oneplatform/foundation/Components/Themes/Modes/Light/Images.js'

import { Images } from 'App/Themes'

const images = {
  ...LightFrameworkImages,
  ...Images,
  ...CoreImages,

  // Dashboard
  ic_store: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dashboard/icVstore.png')
  ),
  icAdd: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dashboard/icAdd.png')
  ),
  icShoppingTrolley: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dashboard/icShoppingTrolley.png')
  ),
  icEngineer: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dashboard/icEngineer.png')
  ),
  ic_settings: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dashboard/icSettings.png')
  ),
  ic_globe: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dashboard/icInternetGlobeCountry.png')
  ),
  ic_acceleration: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dashboard/icAcceleration.png')
  ),
  secondary_card2: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dashboard/secondarycard2.png')
  ),
  ic_data_sharing: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dashboard/dataSharing.png')
  ),
  ic_sms_text: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dashboard/smsText.png')
  ),
  ic_call_log: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dashboard/callLog.png')
  ),
  cluster: Image.resolveAssetSource(
    require('../../../Assets/Images/cluster.png')
  ),
  ic_acceleration_middle: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dashboard/icAcceleration.png')
  ),

  // Addons
  icMenu: Image.resolveAssetSource(
    require('./../../../Assets/Images/Addons/icMenuRed.png')
  ),
  icActivity: Image.resolveAssetSource(
    require('./../../../Assets/Images/Addons/icActivityRed.png')
  ),
  videoPass: Image.resolveAssetSource(
    require('./../../../Assets/Images/Addons/videoPass.png')
  ),
  socialPass: Image.resolveAssetSource(
    require('./../../../Assets/Images/Addons/socialPass.png')
  ),
  maps: Image.resolveAssetSource(
    require('./../../../Assets/Images/Addons/maps.png')
  ),
  roaming: Image.resolveAssetSource(
    require('./../../../Assets/Images/Addons/roaming.png')
  ),
  gamingPass: Image.resolveAssetSource(
    require('./../../../Assets/Images/Addons/gamingPass.png')
  ),
  addOnHeader: Image.resolveAssetSource(
    require('./../../../Assets/Images/Addons/header.png')
  ),
  visa: Image.resolveAssetSource(require('./../../../Assets/Images/visa.png')),
  roamingPassIcon: Image.resolveAssetSource(
    require('./../../../Assets/Images/Addons/roamingPassIcon.png')
  ),
  roamingPassImage: Image.resolveAssetSource(
    require('./../../../Assets/Images/Addons/roamingPassImage.png')
  ),
  icBillReport: Image.resolveAssetSource(
    require('@vfgroup-oneplatform/foundation/Components/Assets/Images/Icons/icBillReportGenericTariffPlan.png')
  ),
  icClock: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dashboard/icClockMid.png')
  ),
  icMobile: Image.resolveAssetSource(
    require('@vfgroup-oneplatform/foundation/Components/Assets/Images/Icons/ic_mobile.png')
  ),
  icRefresh: Image.resolveAssetSource(
    require('./../../../Assets/Images/Addons/icSync.png')
  ),
  ic_outgoing_call: Image.resolveAssetSource(
    require('../../../Assets/Images/Balance/icOutgoingCall.png')
  ),
  ic_social_pass: Image.resolveAssetSource(
    require('../../../Assets/Images/Balance/icSocialPass.png')
  ),
  icMail: Image.resolveAssetSource(
    require('../../../Assets/Images/Dashboard/icMail.png')
  ),
  icTopUp: Image.resolveAssetSource(
    require('../../../Assets/Images/Dashboard/icTopUp.png')
  ),
  my_plan_calls: Image.resolveAssetSource(
    require('../../../Assets/Images/Addons/calls.png')
  ),
  my_plan_dataSharing: Image.resolveAssetSource(
    require('../../../Assets/Images/Addons/dataSharing.png')
  ),
  my_plan_smsText: Image.resolveAssetSource(
    require('../../../Assets/Images/Addons/smsText.png')
  ),

  // Billing
  ic_parentalControl: Image.resolveAssetSource(
    require('../../../Assets/Images/Billing/icParentalControl.png')
  ),
  ic_router: Image.resolveAssetSource(
    require('../../../Assets/Images/Billing/icRouter.png')
  ),
  ic_mobile: Image.resolveAssetSource(
    require('../../../Assets/Images/Billing/mobileDark.png')
  ),
  icLogoWithCircle: Image.resolveAssetSource(
    require('../../../Assets/Images/Logo/redWithCircle.png')
  ),
  ic_indicators_admin: Image.resolveAssetSource(
    require('../../../Assets/Images/SwitchAccount/iconsIndicatorsSystemIconsAdmin333333.png')
  ),
  ic_indicators_business: Image.resolveAssetSource(
    require('../../../Assets/Images/SwitchAccount/iconsIndicatorsSystemIconsBusiness333333.png')
  ),
  ic_indicators_home: Image.resolveAssetSource(
    require('../../../Assets/Images/SwitchAccount/iconsIndicatorsSystemIconsHome333333.png')
  ),
  ic_hardware_repaire: Image.resolveAssetSource(
    require('../../../Assets/Images/BookAnAppointment/hardware_repair.png')
  ),
  ic_health_check: Image.resolveAssetSource(
    require('../../../Assets/Images/BookAnAppointment/health_check.png')
  ),
  ic_product_showcase: Image.resolveAssetSource(
    require('../../../Assets/Images/BookAnAppointment/product_showcase.png')
  ),

  // DeveloperSettings
  ic_car: Image.resolveAssetSource(
    require('../../../Assets/Images/DeveloperSettings/icCar.png')
  ),
  ic_dashboard: Image.resolveAssetSource(
    require('../../../Assets/Images/DeveloperSettings/icDashboard.png')
  ),
  id_document: Image.resolveAssetSource(
    require('../../../Assets/Images/DeveloperSettings/icDocument.png')
  ),
  ic_family: Image.resolveAssetSource(
    require('../../../Assets/Images/DeveloperSettings/icFamily.png')
  ),
  ic_chevron_down: Image.resolveAssetSource(
    require('../../../Assets/Images/DeveloperSettings/icChevronDown.png')
  ),
  community_or_foundation: Image.resolveAssetSource(
    require('../../../Assets/Images/DeveloperSettings/communityOrFoundation.png')
  ),
  ic_password_key: Image.resolveAssetSource(
    require('../../../Assets/Images/DeveloperSettings/icPasswordKey.png')
  ),

  // tobi
  ic_clock: Image.resolveAssetSource(
    require('../../../Assets/Images/tobi/ic-clock-red.png')
  ),

  // settings
  settings_icDashboard: Image.resolveAssetSource(
    require('../../../Assets/Images/DeveloperSettings/icDashboard.png')
  ),
  settings_usefulInfo: Image.resolveAssetSource(
    require('../../../Assets/Images/Settings/usefulInfo.png')
  ),

  // Soho Business overview
  icLandlineOrCallMinutes: Image.resolveAssetSource(
    require('../../../Assets/Images/Soho/BusinessOverview/Plans/icLandlineOrCallMinutes.png')
  ),

  // Languages
  icBritishFlag: Image.resolveAssetSource(
    require('../../../Assets/Images/icons_indicators_flags_britain.png')
  ),
  icHungaryFlag: Image.resolveAssetSource(
    require('../../../Assets/Images/iconsIndicatorsFlagsHungary.png')
  ),

  //Privacy Settings
  ic_apps: Image.resolveAssetSource(
    require('../../../Assets/Images/PrivacySettings/ic_apps_black.png')
  ),
  ic_contact_us_customer_care: Image.resolveAssetSource(
    require('../../../Assets/Images/PrivacySettings/ic_contact_us_customer_care_black.png')
  ),
  ic_location: Image.resolveAssetSource(
    require('../../../Assets/Images/PersonalPreferences/ic_location_indicator.png')
  ),
  indicatorsSystemIcons: Image.resolveAssetSource(
    require('../../../Assets/Images/PrivacySettings/indicatorsSystemIcons.png')
  ),
  //edit Small Tiles cards
  icAllRewards: Image.resolveAssetSource(
    require('../../../Assets/Images/SmallTiles/icAllRewards.png')
  ),
  icWifiBroadband: Image.resolveAssetSource(
    require('../../../Assets/Images/SmallTiles/icWifiBroadband.png')
  ),
  networkSignal: Image.resolveAssetSource(
    require('../../../Assets/Images/SmallTiles/Network-signal.png')
  ),
  errorCard: Image.resolveAssetSource(
    require('../../../Assets/Images/Error/errorCardWhite.png')
  ),
  //Topup methods
  topup_history_method_payment_ADJ: Image.resolveAssetSource(
    require('../../../Assets/Images/TopupHistory/topup_history_method_payment_ADJ/sos_credit.png')
  ),
  topup_history_method_payment_ATM: Image.resolveAssetSource(
    require('../../../Assets/Images/TopupHistory/topup_history_method_payment_ATM/atm.png')
  ),
  topup_history_method_payment_ATOP: Image.resolveAssetSource(
    require('../../../Assets/Images/TopupHistory/topup_history_method_payment_ATOP/sos_credit_top_up.png')
  ),
  topup_history_method_payment_BTR: Image.resolveAssetSource(
    require('../../../Assets/Images/TopupHistory/topup_history_method_payment_BTR/share_your_mins.png')
  ),
  topup_history_method_payment_CA: Image.resolveAssetSource(
    require('../../../Assets/Images/TopupHistory/topup_history_method_payment_CA/make_payment.png')
  ),
  topup_history_method_payment_DD: Image.resolveAssetSource(
    require('../../../Assets/Images/TopupHistory/topup_history_method_payment_DD/payment.png')
  ),
  topup_history_method_payment_FNTT: Image.resolveAssetSource(
    require('../../../Assets/Images/TopupHistory/topup_history_method_payment_FNTT/make_payment.png')
  ),
  topup_history_method_payment_PSP: Image.resolveAssetSource(
    require('../../../Assets/Images/TopupHistory/topup_history_method_payment_PSP/top_up.png')
  ),
  topup_history_method_payment_PYM: Image.resolveAssetSource(
    require('../../../Assets/Images/TopupHistory/topup_history_method_payment_PYM/make_payment.png')
  ),
  topup_history_method_payment_TC: Image.resolveAssetSource(
    require('../../../Assets/Images/TopupHistory/topup_history_method_payment_TC/move_money.png')
  ),
  topup_history_method_payment_VCH: Image.resolveAssetSource(
    require('../../../Assets/Images/TopupHistory/topup_history_method_payment_VCH/payment.png')
  ),
  topup_history_method_payment_VCI: Image.resolveAssetSource(
    require('../../../Assets/Images/TopupHistory/topup_history_method_payment_VCI/initial_balance.png')
  ),
  //Privacy settings tabs
  PrivacySettingsTermsOfUse: Image.resolveAssetSource(
    require('../../../Assets/Images/PrivacySettings/workorder-checkup-system.png')
  ),
  PrivacySettingsCookiesAndTracking: Image.resolveAssetSource(
    require('../../../Assets/Images/PrivacySettings/connection.png')
  ),
  PrivacySettingsAdviceAndOffers: Image.resolveAssetSource(
    require('../../../Assets/Images/PrivacySettings/offer_badge_percent.png')
  ),
  PrivacySettingsPrivacyNotes: Image.resolveAssetSource(
    require('../../../Assets/Images/PrivacySettings/virus_protection.png')
  ),
  PrivacySettingsImprint: Image.resolveAssetSource(
    require('../../../Assets/Images/PrivacySettings/loan.png')
  ),
  ic_rewards: Image.resolveAssetSource(
    require('../../../Assets/Images/PrivacySettings/all_rewards.png')
  ),
  ic_arrow_left: Image.resolveAssetSource(
    require('../../../Assets/Images/icArrowLeft.png')
  ),
  icNumberOne: Image.resolveAssetSource(
    require('../../../Assets/Images/TopUp/number_1.png')
  ),
  icNumberTwo: Image.resolveAssetSource(
    require('../../../Assets/Images/TopUp/number_2.png')
  ),
  icNumberThree: Image.resolveAssetSource(
    require('../../../Assets/Images/TopUp/number_3.png')
  ),
  icNumberFour: Image.resolveAssetSource(
    require('../../../Assets/Images/TopUp/number_4.png')
  ),
  icNumberFive: Image.resolveAssetSource(
    require('../../../Assets/Images/TopUp/number_5.png')
  ),
  icNumberSix: Image.resolveAssetSource(
    require('../../../Assets/Images/TopUp/number_6.png')
  ),
  icNumberSeven: Image.resolveAssetSource(
    require('../../../Assets/Images/TopUp/number_7.png')
  ),
  icNumberEight: Image.resolveAssetSource(
    require('../../../Assets/Images/TopUp/number_8.png')
  ),
  icNumberNine: Image.resolveAssetSource(
    require('../../../Assets/Images/TopUp/number_9.png')
  )
}

export default images
