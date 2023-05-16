import { VFScreen } from '@vfgroup-oneplatform/foundation/Components'

import React, { useState } from 'react'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { ScrollView } from 'react-native'

import styles from './NetworkRequestsLoggerScreen.styles'

import APIsRequestsLoggerScreen from './APIsRequestsLogger'

import SDKsRequestsLoggerScreen from './SDKsRequestsLogger'

import { NavigationFunctions } from 'App/Containers'

import { testID } from 'App/Utils/Helpers/testId.helpers'

const NetworkRequestsLogger = () => {
  const TabEnum = {
    SDK_REQUESTS: 0,
    API_REQUESTS: 1
  }
  const theme = useTheme()
  const [activeTab, setTab] = useState(TabEnum.SDK_REQUESTS)

  const handleRenderTabs = () => {
    switch (activeTab) {
      case TabEnum.SDK_REQUESTS:
        return <SDKsRequestsLoggerScreen />
      case TabEnum.API_REQUESTS:
        return <APIsRequestsLoggerScreen />
    }
  }

  return (
    <VFScreen
      title="Network Requests Logger"
      onClose={NavigationFunctions.goBack}
      closeButtonTestID={testID('RLcloseIcon')}
      titleTextHeaderAccessibilityLabel={testID('RLmainTitle')}
      clearStatusBarEntries={false}
      subHeaderMaxHeight={4}
      configureHeaderTabs={{
        setActiveTab(tabIndex) {
          setTab(tabIndex)
        },
        activeTab: activeTab,
        scrollEnabled: true,
        tabs: [
          {
            index: TabEnum.SDK_REQUESTS,
            tab_key: 'SDKs',
            placeHolders: ['SDKs'],
            accessibilityLabel: testID('SDKs')!
          },
          {
            index: TabEnum.API_REQUESTS,
            placeHolders: ['App APIs'],
            tab_key: 'AppAPIs',
            accessibilityLabel: testID('AppAPIs')!
          }
        ]
      }}
    >
      <ScrollView
        style={styles.container(theme)}
        contentContainerStyle={styles.contentContainerStyle}
        testID={testID('RequestLogsScroll')}
      >
        {handleRenderTabs()}
      </ScrollView>
    </VFScreen>
  )
}
export default NetworkRequestsLogger
