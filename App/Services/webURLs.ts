import { LEGACY_BASE_URL } from './API/Constants'

const webURLs = {
  registerationURL: `${LEGACY_BASE_URL}/meinvodafone/account/registrierung/registrierungsart?forApp=true&c_id=app_cad_authentication`,
  forgotPasswordURL: `${LEGACY_BASE_URL}/meinvodafone/account/login/zugangsdaten_vergessen?forApp=true&c_id=app_cad_authentication`,
  serviceURL: `${LEGACY_BASE_URL}/meinvodafone/services/`,
  topUpURL: (amount: string) =>
    `${LEGACY_BASE_URL}/meinvodafone/account/payment?product=${amount}&hideheader=1&forApp=true&c_id=app_cad_topup`,
  editTopUpUrl: `${LEGACY_BASE_URL}/meinvodafone/services/automatischeaufladung/andern`,
  paperBillURL: `${LEGACY_BASE_URL}/meinvodafone/services/ihre-rechnungen?accordion=bill-settings`,
  dunningURL: `${LEGACY_BASE_URL}/meinvodafone/services/ihre-rechnungen?accordion=kontouebersicht`,
  CALLYA_FLEX_APP_IOS_LINK:
    'https://itunes.apple.com/de/app/callya-flex/id1225229891?mt=8',
  CALLYA_FLEX_APP_ANDROID_LINK: 'market://details?id=de.vodafone.callyaflex'
}
export default webURLs
