import { VFButton } from '@vfgroup-oneplatform/foundation/Components'

import React, { useEffect, useState } from 'react'

import { View } from 'react-native'

import styles from './NetworkRequestsLoggerScreen.styles'

import {
  setSDKsNetworkLogsInEncryptedStorage,
  loadSDKsNewLogs
} from './SDKsRequestsLogger.helpers'

import SearchLogsViewComponent from 'App/Screens/DeveloperSettings/components/SearchLogsViewComponent/SearchLogsViewComponent'

import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

import { testID } from 'App/Utils/Helpers/testId.helpers'
import { clearNetworkLogs } from 'App/Utils/RNNativeModules/networkLogs.RNNativeModules'

const SDKsRequestsLoggerScreen = () => {
  const [logs, setLogs] = useState([''])

  const getLogs = async () => {
    setLogs(await loadSDKsNewLogs())
    //Remove requests from native module after saving it in EncryptedStorage.
    clearNetworkLogs()
  }

  const clearLogs = async () => {
    clearNetworkLogs()
    setSDKsNetworkLogsInEncryptedStorage(STORAGE_KEYS.networkLogs, '')
    setLogs([])
  }

  useEffect(() => {
    getLogs()
  }, [])

  return (
    <View>
      <VFButton
        title="clear logs"
        style={styles.clearButton}
        onPress={clearLogs}
        testID={testID('ClearSDKsRequestsLogs')}
      />

      <SearchLogsViewComponent initialData={logs} />
    </View>
  )
}

export default SDKsRequestsLoggerScreen
