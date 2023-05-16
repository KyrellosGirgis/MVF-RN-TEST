import React, { useEffect, useState } from 'react'

import { Toggle, VFButton } from '@vfgroup-oneplatform/foundation/Components'

import {
  getThemeImages,
  useTheme
} from '@vfgroup-oneplatform/foundation/Components/Themes'

import {
  getShouldLogNetworkRequests,
  onNetworkLoggingToggleChange
} from './NetworkRequestsLoggerCard.helpers'

import DeveloperSettingsCardSection from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCardSection/DeveloperSettingsCardSection'

import DeveloperSettingsCard from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCard/DeveloperSettingsCard'

import styles from 'App/Screens/DeveloperSettings/DeveloperSettings.styles'

import { NavigationFunctions } from 'App/Containers'
import Routes from 'App/Containers/AppNavigation/Routes'
import { testID } from 'App/Utils/Helpers/testId.helpers'

const NetworkRequestsLoggerCard = () => {
  const theme = useTheme()
  const Images = getThemeImages(theme.name)
  const [shouldLogNetworkRequests, setShouldLogNetworkRequests] =
    useState(false)

  useEffect(() => {
    setTimeout(async () => {
      setShouldLogNetworkRequests(await getShouldLogNetworkRequests())
    }, 0)
  }, [])

  const onToggleShouldLogHandler = async () => {
    onNetworkLoggingToggleChange(!shouldLogNetworkRequests)
    setShouldLogNetworkRequests(!shouldLogNetworkRequests)
  }

  const renderLogRequestsToggle = () => {
    return (
      <>
        <Toggle
          initialValue={shouldLogNetworkRequests}
          inactiveContainerStyle={styles.inactiveContainerStyle}
          selected={shouldLogNetworkRequests}
          onChange={onToggleShouldLogHandler}
          size="small"
          testID={testID('LogToggle')}
        />
      </>
    )
  }

  const renderLogsBtn = () => {
    return (
      <VFButton
        testID={testID('OpenRequestLogs')}
        title="Open Logs"
        disabled={!shouldLogNetworkRequests}
        onPress={() => {
          NavigationFunctions.navigate(Routes.NetworkRequestsLoggerScreen)
        }}
        style={styles.button}
      />
    )
  }

  return (
    <DeveloperSettingsCard
      title="Requests Logger"
      icon={Images.settings_usefulInfo}
    >
      <DeveloperSettingsCardSection
        title="Should log requests"
        description=""
        renderRightElement={renderLogRequestsToggle}
      />

      <DeveloperSettingsCardSection
        title={''}
        description=""
        renderRightElement={renderLogsBtn}
      />
    </DeveloperSettingsCard>
  )
}

export default NetworkRequestsLoggerCard
