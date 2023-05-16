import {
  Toggle,
  VFScreen,
  VFText
} from '@vfgroup-oneplatform/foundation/Components'

import React, { useEffect, useState } from 'react'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { ScrollView, View } from 'react-native'

import JSONTree from 'react-native-json-tree'

import styles from './EncryptedStorageLogs.styles'

import SearchLogsViewComponent from 'App/Screens/DeveloperSettings/components/SearchLogsViewComponent/SearchLogsViewComponent'

import { NavigationFunctions } from 'App/Containers'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

import { testID } from 'App/Utils/Helpers/testId.helpers'

const EncryptedStorageLogs = () => {
  const theme = useTheme()
  const [logs, setLogs] = useState(Object)
  const [isJsonViewer, setIsJsonViewer] = useState(false)

  const readAllStoredEncryptedData = async () => {
    const encrypedStroedData = await EncryptedStorage.getAllItems()
    setLogs(encrypedStroedData)
  }

  const onToggleChange = (value) => {
    setIsJsonViewer(value)
  }

  useEffect(() => {
    readAllStoredEncryptedData()
  }, [])

  const JsonTreeView = (
    <JSONTree
      data={logs}
      theme={{
        ...styles.jsonViewrTheme,
        nestedNode: ({ style }) => ({
          style: {
            ...style,
            width: '70%'
          }
        })
      }}
    />
  )

  return (
    <VFScreen
      title="Encrypted Storage Logs"
      onClose={NavigationFunctions.goBack}
      closeButtonTestID={testID('EScloseIcon')}
      titleTextHeaderAccessibilityLabel={testID('ESmainTitle')}
      clearStatusBarEntries={false}
    >
      <ScrollView
        style={styles.container(theme)}
        contentContainerStyle={styles.contentContainerStyle}
        testID={testID('EncryptedStorageScroll')}
      >
        <View style={styles.toggleContainer}>
          <VFText
            style={styles.toggleTitle}
            i18nKey={'SHOW JSON VIEWER'}
            selectable
          />
          <Toggle
            initialValue={isJsonViewer}
            onChange={(value) => onToggleChange(value)}
            testID={testID('EncryptedStorageToggle')}
          />
        </View>
        {isJsonViewer ? (
          JsonTreeView
        ) : (
          <SearchLogsViewComponent initialData={logs} />
        )}
      </ScrollView>
    </VFScreen>
  )
}

export default EncryptedStorageLogs
