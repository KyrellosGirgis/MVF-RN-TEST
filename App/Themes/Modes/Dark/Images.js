import { Image } from 'react-native'
import CoreImages from '@vfgroup-oneplatform/foundation/Components/Themes/Modes/Dark/Images.js'
import DarkFrameworkImages from '@vfgroup-oneplatform/framework/Themes/Modes/Dark/Images'

import LightImages from 'App/Themes/Modes/Light/Images'

const images = {
  ...LightImages,
  ...DarkFrameworkImages,
  ...CoreImages,

  // Dashboard
  ic_store: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dashboard/ic_Vstore_white.png')
  ),
  icAdd: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dashboard/icAddWhite.png')
  ),
  icShoppingTrolley: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dashboard/icShoppingTrolleyWhite.png')
  ),
  icEngineer: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dashboard/icEngineerWhite.png')
  ),
  ic_settings: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dashboard/icSettingsWhite.png')
  ),
  ic_globe: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dashboard/icInternetGlobeCountryWhite.png')
  ),
  ic_acceleration: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dashboard/icAccelerationWhite.png')
  ),
  secondary_card2: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dark/Dashboard/secondarycard2.png')
  ),
  ic_data_sharing: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dark/Dashboard/dataSharing.png')
  ),
  ic_sms_text: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dark/Dashboard/smsText.png')
  ),
  ic_call_log: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dark/Dashboard/callLog.png')
  ),
  ic_acceleration_middle: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dark/Dashboard/IcAccelerationMiddle.png')
  ),

  // Addons
  icMenu: Image.resolveAssetSource(
    require('./../../../Assets/Images/Addons/icMenu.png')
  ),
  icActivity: Image.resolveAssetSource(
    require('./../../../Assets/Images/Addons/icActivity.png')
  ),
  roaming: Image.resolveAssetSource(
    require('./../../../Assets/Images/Dark/Addons/roaming.png')
  ),
  icBillReport: Image.resolveAssetSource(
    require('@vfgroup-oneplatform/foundation/Components/Assets/Images/Icons/icBillReportGenericTariffPlanWhite.png')
  ),
  icClock: Image.resolveAssetSource(
    require('../../../Assets/Images/Dashboard/icClockWhite.png')
  ),
  icMobile: Image.resolveAssetSource(
    require('@vfgroup-oneplatform/foundation/Components/Assets/Images/Icons/ic_mobileDark.png')
  ),
  icRefresh: Image.resolveAssetSource(
    require('../../../Assets/Images/Addons/icSyncWhite.png')
  ),
  ic_outgoing_call: Image.resolveAssetSource(
    require('../../../Assets/Images/Dark/Balance/icOutgoingCallWhite.png')
  ),
  ic_social_pass: Image.resolveAssetSource(
    require('../../../Assets/Images/Balance/icSocialPass.png')
  ),
  icMail: Image.resolveAssetSource(
    require('../../../Assets/Images/Dark/Dashboard/icMailWhite.png')
  ),
  icTopUp: Image.resolveAssetSource(
    require('../../../Assets/Images/Dark/Dashboard/icTopUpRed.png')
  ),
  my_plan_calls: Image.resolveAssetSource(
    require('../../../Assets/Images/Addons/icCallsLogWhite.png')
  ),
  my_plan_dataSharing: Image.resolveAssetSource(
    require('../../../Assets/Images/Addons/dataSharingWhite.png')
  ),
  my_plan_smsText: Image.resolveAssetSource(
    require('../../../Assets/Images/Addons/smsTextWhite.png')
  ),

  // Billing
  ic_parentalControl: Image.resolveAssetSource(
    require('../../../Assets/Images/Billing/icParentalControlRed.png')
  ),
  ic_router: Image.resolveAssetSource(
    require('../../../Assets/Images/Billing/icRouterWhite.png')
  ),
  ic_mobile: Image.resolveAssetSource(
    require('../../../Assets/Images/Billing/icMobileWhite.png')
  ),
  icLogoWithCircle: Image.resolveAssetSource(
    require('../../../Assets/Images/Logo/whiteWithCircle.png')
  ),
  ic_indicators_admin: Image.resolveAssetSource(
    require('../../../Assets/Images/Dark/SwitchAccount/icAdmin.png')
  ),
  ic_indicators_business: Image.resolveAssetSource(
    require('../../../Assets/Images/Dark/SwitchAccount/iconsIndicatorsSystemIconsBusinessFfffff.png')
  ),
  ic_indicators_home: Image.resolveAssetSource(
    require('../../../Assets/Images/Dark/SwitchAccount/icHomeWhite.png')
  ),
  ic_hardware_repaire: Image.resolveAssetSource(
    require('../../../Assets/Images/BookAnAppointment/hardware_repair_dark.png')
  ),
  ic_health_check: Image.resolveAssetSource(
    require('../../../Assets/Images/BookAnAppointment/health_check_dark.png')
  ),
  ic_product_showcase: Image.resolveAssetSource(
    require('../../../Assets/Images/BookAnAppointment/product_showcase_dark.png')
  ),

  // DeveloperSettings
  ic_car: Image.resolveAssetSource(
    require('../../../Assets/Images/DeveloperSettings/icCarDark.png')
  ),
  ic_dashboard: Image.resolveAssetSource(
    require('../../../Assets/Images/DeveloperSettings/icDashboardDark.png')
  ),
  id_document: Image.resolveAssetSource(
    require('../../../Assets/Images/DeveloperSettings/icDocumentDark.png')
  ),
  ic_family: Image.resolveAssetSource(
    require('../../../Assets/Images/DeveloperSettings/icFamilyDark.png')
  ),
  ic_chevron_down: Image.resolveAssetSource(
    require('../../../Assets/Images/DeveloperSettings/icChevronDownWhite.png')
  ),
  community_or_foundation: Image.resolveAssetSource(
    require('../../../Assets/Images/DeveloperSettings/communityOrFoundationDark.png')
  ),
  ic_password_key: Image.resolveAssetSource(
    require('../../../Assets/Images/DeveloperSettings/icPasswordKeyDark.png')
  ),

  // tobi
  ic_clock: Image.resolveAssetSource(
    require('../../../Assets/Images/tobi/ic-clock-orange.png')
  ),

  // settings
  settings_icDashboard: Image.resolveAssetSource(
    require('../../../Assets/Images/Settings/icDashboardWhite.png')
  ),
  settings_usefulInfo: Image.resolveAssetSource(
    require('../../../Assets/Images/Settings/usefulInfoWhite.png')
  ),

  //Purchase
  icSuperwifi: Image.resolveAssetSource(
    require('../../../Assets/Images/Dark/Purchase/icSuperwifi.png')
  ),
  icPrivacy: Image.resolveAssetSource(
    require('../../../Assets/Images/Dark/Purchase/icPrivacy.png')
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
  cluster: Image.resolveAssetSource(
    require('../../../Assets/Images/Dark/Dashboard/cluster.png')
  ),

  //Privacy Settings
  ic_apps: Image.resolveAssetSource(
    require('../../../Assets/Images/PrivacySettings/ic_apps_white.png')
  ),
  ic_contact_us_customer_care: Image.resolveAssetSource(
    require('../../../Assets/Images/PrivacySettings/ic_contact_us_customer_care_white.png')
  ),
  ic_location: Image.resolveAssetSource(
    require('../../../Assets/Images/PersonalPreferences/Dark/ic_location_indicator.png')
  ),
  indicatorsSystemIcons: Image.resolveAssetSource(
    require('../../../Assets/Images/PrivacySettings/indicatorsSystemIcons_dark.png')
  ),
  //edit Small Tiles cards
  icAllRewards: Image.resolveAssetSource(
    require('../../../Assets/Images/SmallTiles/icAllRewardsLight.png')
  ),
  icWifiBroadband: Image.resolveAssetSource(
    require('../../../Assets/Images/SmallTiles/icWifiBroadbandLight.png')
  ),

  networkSignal: Image.resolveAssetSource(
    require('../../../Assets/Images/SmallTiles/Network-signal-dark.png')
  ),
  errorCard: Image.resolveAssetSource(
    require('../../../Assets/Images/Error/errorCardBlack.png')
  ),
  //Topup methods
  topup_history_method_payment_ADJ: Image.resolveAssetSource(
    require('../../../Assets/Images/TopupHistory/topup_history_method_payment_ADJ/sos_credit_dark.png')
  ),
  topup_history_method_payment_ATM: Image.resolveAssetSource(
    require('../../../Assets/Images/TopupHistory/topup_history_method_payment_ATM/atm_dark.png')
  ),
  topup_history_method_payment_ATOP: Image.resolveAssetSource(
    require('../../../Assets/Images/TopupHistory/topup_history_method_payment_ATOP/sos_credit_top_up_dark.png')
  ),
  topup_history_method_payment_BTR: Image.resolveAssetSource(
    require('../../../Assets/Images/TopupHistory/topup_history_method_payment_BTR/share_your_mins_dark.png')
  ),
  topup_history_method_payment_CA: Image.resolveAssetSource(
    require('../../../Assets/Images/TopupHistory/topup_history_method_payment_CA/make_payment_dark.png')
  ),
  topup_history_method_payment_DD: Image.resolveAssetSource(
    require('../../../Assets/Images/TopupHistory/topup_history_method_payment_DD/payment_dark.png')
  ),
  topup_history_method_payment_FNTT: Image.resolveAssetSource(
    require('../../../Assets/Images/TopupHistory/topup_history_method_payment_FNTT/make_payment_dark.png')
  ),
  topup_history_method_payment_PSP: Image.resolveAssetSource(
    require('../../../Assets/Images/TopupHistory/topup_history_method_payment_PSP/top_up_dark.png')
  ),
  topup_history_method_payment_PYM: Image.resolveAssetSource(
    require('../../../Assets/Images/TopupHistory/topup_history_method_payment_PYM/make_payment_dark.png')
  ),
  topup_history_method_payment_TC: Image.resolveAssetSource(
    require('../../../Assets/Images/TopupHistory/topup_history_method_payment_TC/move_money_dark.png')
  ),
  topup_history_method_payment_VCH: Image.resolveAssetSource(
    require('../../../Assets/Images/TopupHistory/topup_history_method_payment_VCH/payment_dark.png')
  ),
  topup_history_method_payment_VCI: Image.resolveAssetSource(
    require('../../../Assets/Images/TopupHistory/topup_history_method_payment_VCI/initial_balance_dark.png')
  ),
  //Privacy settings tabs
  PrivacySettingsTermsOfUse: Image.resolveAssetSource(
    require('../../../Assets/Images/PrivacySettings/workorder-checkup-system_dark.png')
  ),
  PrivacySettingsCookiesAndTracking: Image.resolveAssetSource(
    require('../../../Assets/Images/PrivacySettings/connection_dark.png')
  ),
  PrivacySettingsAdviceAndOffers: Image.resolveAssetSource(
    require('../../../Assets/Images/PrivacySettings/offer_badge_percent_dark.png')
  ),
  PrivacySettingsPrivacyNotes: Image.resolveAssetSource(
    require('../../../Assets/Images/PrivacySettings/virus_protection_dark.png')
  ),
  PrivacySettingsImprint: Image.resolveAssetSource(
    require('../../../Assets/Images/PrivacySettings/loan_dark.png')
  ),
  ic_rewards: Image.resolveAssetSource(
    require('../../../Assets/Images/PrivacySettings/all_rewards_dark.png')
  ),
  ic_arrow_left: Image.resolveAssetSource(
    require('../../../Assets/Images/icArrowLeftWhite.png')
  ),
  icNumberOne: Image.resolveAssetSource(
    require('../../../Assets/Images/TopUp/number_1White.png')
  ),
  icNumberTwo: Image.resolveAssetSource(
    require('../../../Assets/Images/TopUp/number_2White.png')
  ),
  icNumberThree: Image.resolveAssetSource(
    require('../../../Assets/Images/TopUp/number_3White.png')
  ),
  icNumberFour: Image.resolveAssetSource(
    require('../../../Assets/Images/TopUp/number_4White.png')
  ),
  icNumberFive: Image.resolveAssetSource(
    require('../../../Assets/Images/TopUp/number_5White.png')
  ),
  icNumberSix: Image.resolveAssetSource(
    require('../../../Assets/Images/TopUp/number_6White.png')
  ),
  icNumberSeven: Image.resolveAssetSource(
    require('../../../Assets/Images/TopUp/number_7White.png')
  ),
  icNumberEight: Image.resolveAssetSource(
    require('../../../Assets/Images/TopUp/number_8White.png')
  ),
  icNumberNine: Image.resolveAssetSource(
    require('../../../Assets/Images/TopUp/number_9White.png')
  )
}

export default images
