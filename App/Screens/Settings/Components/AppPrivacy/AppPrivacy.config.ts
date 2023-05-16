import styles from './AppPrivacy.styles'

import { testID } from 'App/Utils/Helpers/testId.helpers'

const APP_PRIVACY_PERMISSION_KEYS = {
  improveNetworkStatus: 'improveNetworkStatus',
  personalizedServiceStatus: 'personalizedServiceStatus'
}

const IMPROVE_NETWORK_CONFIG = {
  key: APP_PRIVACY_PERMISSION_KEYS.improveNetworkStatus,
  title: 'settings_netperform_non_personalized_info_toggle_title',
  description: 'settings_netperform_non_personalized_info_toggle_description',
  icon: 'icNetworkMap',
  iconSize: 32,
  titleAccessibilityLabel: testID('NonPersonalizedNetperformTitle'),
  iconAccessibilityLabel: testID('NonPersonalizedNetperformIcon'),
  descriptionAccessibilityLabel: testID('NonPersonalizedNetperformDescription'),
  toggleAccessibilityLabel: testID('NonPersonalizedNetperformToggle'),
  titleStyle: styles.titleStyle
}

const PERSONALIZED_SERVICES_CONFIG = {
  key: APP_PRIVACY_PERMISSION_KEYS.personalizedServiceStatus,
  title: 'settings_netperform_personalized_info_toggle_title',
  description: 'settings_netperform_personalized_info_toggle_description',
  icon: 'ic_Users_Members_Customers',
  iconSize: 32,
  titleAccessibilityLabel: testID('PersonalizedNetperformTitle'),
  descriptionAccessibilityLabel: testID('PersonalizedNetperformDescription'),
  iconAccessibilityLabel: testID('PersonalizedNetperformIcon')!,
  toggleAccessibilityLabel: testID('PersonalizedNetperformToggle'),
  titleStyle: styles.titleStyle
}

const APP_PERMISSION_CONFIGS = [
  IMPROVE_NETWORK_CONFIG,
  PERSONALIZED_SERVICES_CONFIG
]

export { APP_PRIVACY_PERMISSION_KEYS, APP_PERMISSION_CONFIGS }
