import { Settings } from 'react-native'

import { clearAllData } from 'App/Screens/Login/Implementations/LogoutImplementation/LogoutImplementation.helper'

const SHOULD_RESET_APP_DATA_KEY = 'shouldDeleteAppData'

const resetAppDataIfNeeded = async () => {
  const shouldDeleteAppData = Settings.get(SHOULD_RESET_APP_DATA_KEY)
  if (shouldDeleteAppData === 1) {
    await clearAllData()
    Settings.set({ shouldDeleteAppData: 0 })
  }
}

const addIOSAppDataResetingListener = async () => {
  Settings.watchKeys(SHOULD_RESET_APP_DATA_KEY, async () => {
    await resetAppDataIfNeeded()
  })
  await resetAppDataIfNeeded()
}

export { addIOSAppDataResetingListener }
