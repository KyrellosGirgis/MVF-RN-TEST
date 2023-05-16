import { Alert } from 'react-native'

import { NavigationFunctions } from 'App/Containers'
import { exitApp } from 'App/Utils/RNNativeModules/generic.RNNativeModules'
import { clearAllData } from 'App/Screens/Login/Implementations/LogoutImplementation/LogoutImplementation.helper'
import { saveAndApplyMockingConfigs } from 'App/Screens/DeveloperSettings/components/MockingConfigsCard/MockingConfigsCard.helpers'

import { DeveloperSettingsActionsProps } from 'App/Screens/DeveloperSettings/components/DeveloperSettingActions/DeveloperSettingsActions.d'
import {
  hideBlurView,
  showBlurView
} from 'App/Containers/AppNavigation/AppNavigation.helpers'
import { delay } from 'App/Utils/Helpers/generic.helpers'

const showPopUp = (errorDescription: string) =>
  Alert.alert('Error', errorDescription, [{ text: 'OK', style: 'cancel' }])

const dismiss = () => NavigationFunctions.pop()

// ###################################### Saving ######################################
const saveAllDevSettingSections = async () => {
  await saveAndApplyMockingConfigs()
}

const saveDeveloperSettings = async ({
  shouldLogoutAndClose,
  persistAllDeveloperSettingsSections
}: DeveloperSettingsActionsProps) => {
  showBlurView({ showSpinner: true, opacity: 0.8 })
  try {
    await persistAllDeveloperSettingsSections()
    await saveAllDevSettingSections()
    if (shouldLogoutAndClose) {
      await clearAllData()
      await delay(3000)
      exitApp()
    } else {
      dismiss()
    }
  } catch (error) {
    showPopUp(error.message)
  }
  hideBlurView()
}
var RNFS = require('react-native-fs')

const saveLogsToFile = async (data, fileName) => {
  var path = RNFS.ExternalDirectoryPath + fileName
  await RNFS.writeFile(path, `${JSON.stringify(data)}`, 'utf8')
  return path
}
export { saveDeveloperSettings, dismiss, saveLogsToFile }
