import { Alert } from 'react-native'

import { translate } from 'App/Utils'

const showPermissionWarningAlert = (
  title: string,
  message: string,
  onSettingsButtonPress: Function
) => {
  const buttons = [
    {
      text: translate('cancel')
    },
    {
      text: translate('permissions_settings_hypertext'),
      onPress: () => onSettingsButtonPress()
    }
  ]
  Alert.alert(title, message, buttons)
}

export { showPermissionWarningAlert }
