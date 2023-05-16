import I18n from 'i18n-js'
import { Platform } from 'react-native'

const BIOMETRICS_STATUS = {
  AVAILABLE: 'AVAILABLE',
  NOT_AVAILABLE: 'NOT_AVAILABLE',
  NOT_SUPPORTED: 'NOT_SUPPORTED',
  CANCELLED: 'CANCELLED',
  AUTHENTICATED: 'AUTHENTICATED'
}

const BIOMETRICS_ROUTE_PARAM_STATUS: { [key: string]: boolean } = {
  ON: true,
  OFF: false
}

const biometricsAuthConfig = Platform.select({
  ios: {
    description: I18n.t('biometricsDescriptionIOS'),
    fallbackEnabled: false
  },
  android: {
    title: I18n.t('biometricsDescriptionANDROID')
  }
})

const BiometricsErrors = {
  FingerprintScannerNotEnrolled: 'FingerprintScannerNotEnrolled',
  FingerprintScannerNotAvailable: 'FingerprintScannerNotAvailable'
}

const FingeprintAvailabilityErrors = [
  BiometricsErrors.FingerprintScannerNotAvailable,
  BiometricsErrors.FingerprintScannerNotEnrolled
]

export {
  BIOMETRICS_STATUS,
  biometricsAuthConfig,
  BiometricsErrors,
  FingeprintAvailabilityErrors,
  BIOMETRICS_ROUTE_PARAM_STATUS
}
