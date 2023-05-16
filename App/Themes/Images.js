import { Image } from 'react-native'

const Images = {
  logout_icon: Image.resolveAssetSource(
    require('./../Assets/Images/Tray/logout.png')
  ),
  icChevronRightWhite: Image.resolveAssetSource(
    require('./../Assets/Images/icChevronRightWhite.png')
  ),
  cluster: Image.resolveAssetSource(require('./../Assets/Images/cluster.png')),

  mobile_image: Image.resolveAssetSource(
    require('./../Assets/Images/Tray/mobile.png')
  ),
  router_image: Image.resolveAssetSource(
    require('./../Assets/Images/Tray/router.png')
  ),
  unityMedia_image: Image.resolveAssetSource(
    require('./../Assets/Images/Tray/productUnityMedia.png')
  ),
  privacy_settings: Image.resolveAssetSource(
    require('./../Assets/Images/Tray/PrivacySettings.png')
  ),
  appsettings_icon: Image.resolveAssetSource(
    require('./../Assets/Images/Tray/AppSettings.png')
  ),
  message_icon: Image.resolveAssetSource(
    require('./../Assets/Images/Tray/mailNewHiDark.png')
  ),
  autoTopupWhite_icon: Image.resolveAssetSource(
    require('./../Assets/Images/TopUp/icAutoTopUpWhite.png')
  ),
  change_password_icon: Image.resolveAssetSource(
    require('./../Assets/Images/Tray/icChangePassword.png')
  ),
  address_icon: Image.resolveAssetSource(
    require('./../Assets/Images/Tray/address.png')
  ),
  bill_report_icon: Image.resolveAssetSource(
    require('./../Assets/Images/Billing/icBillReportGenericTariffPlan.png')
  ),
  warning_icon: Image.resolveAssetSource(
    require('./../Assets/Images/Billing/icWarningNotification.png')
  ),
  icPadlockOpenMid: Image.resolveAssetSource(
    require('./../Assets/Images/Dashboard/icPadlockOpenMid.png')
  ),
  icInfoCircleWhite: Image.resolveAssetSource(
    require('./../Assets/Images/TopUp/icInfoCircleWhite.png')
  )
}

export default Images
