import React, { useEffect, useState } from 'react'
import {
  Toggle,
  VFText,
  VFButton
} from '@vfgroup-oneplatform/foundation/Components'
import JSONTree from 'react-native-json-tree'

import { View } from 'react-native'

import styles from './NetworkRequestsLoggerScreen.styles'

import SearchLogsViewComponent from 'App/Screens/DeveloperSettings/components/SearchLogsViewComponent/SearchLogsViewComponent'

import { testID } from 'App/Utils/Helpers/testId.helpers'

import { store } from 'App/Redux'
import { developerSettingsActions } from 'App/Redux/reducers/DeveloperSettings.reducer'

const APIsRequestsLoggerScreen = () => {
  const [isJsonViewer, setIsJsonViewer] = useState(false)
  const [apisRequests, setAPIsRequests] = useState([])

  const onToggleChange = (value) => {
    setIsJsonViewer(value)
  }

  const clearLogs = async () => {
    setAPIsRequests([])
    store.dispatch(developerSettingsActions.clearAPIsRequestsLogs())
  }

  useEffect(() => {
    setAPIsRequests(
      store.getState().developerSettings.APIsRequestsLogs.requests
    )
  }, [])

  return (
    <>
      <VFButton
        title="clear logs"
        style={styles.clearButton}
        onPress={clearLogs}
        testID={testID('ClearAPIRequestsLogs')}
      />
      <View style={styles.toggleContainer}>
        <VFText style={styles.toggleTitle} i18nKey={'SHOW JSON VIEWER'} />
        <Toggle
          initialValue={isJsonViewer}
          onChange={(value) => onToggleChange(value)}
          testID={testID('ApiRequestsLoggerToggle')}
        />
      </View>
      {!isJsonViewer ? (
        <View>
          <SearchLogsViewComponent initialData={apisRequests} />
        </View>
      ) : (
        <View>
          <JSONTree data={apisRequests} theme={styles.jsonViewrTheme} />
        </View>
      )}
    </>
  )
}

export default APIsRequestsLoggerScreen
