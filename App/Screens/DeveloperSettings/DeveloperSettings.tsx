import React, { useRef } from 'react'
import { ScrollView } from 'react-native'

import { VFScreen } from '@vfgroup-oneplatform/foundation/Components'
import {
  LightThemeColors,
  useTheme
} from '@vfgroup-oneplatform/foundation/Components/Themes'

import AppVersionCard from './components/AppVersionCard/AppVersionCard'
import UserInfoCard from './components/UserInfoCard/UserInfoCard'
import MockingConfigsCard from './components/MockingConfigsCard/MockingConfigsCard'
import CMSConfigsCard from './components/CMSConfigsCard/CMSConfigsCard'
import AdobeTestTargetCard from './components/AdobeTestTargetCard/AdobeTestTargetCard'

import EncryptedStorageLogsCard from './components/EncryptedStorageLogsCard/EncryptedStorageLogsCard'
import NetworkRequestsLoggerCard from './components/NetworkRequestsLoggerCard/NetworkRequestsLoggerCard'

import { CaptchaToggleCard } from './components/CaptchaToggleCard/CaptchaToggleCard'

import DeveloperSettingsSections from './DeveloperSettingsSections.enum'

import TealiumCDPConfigurations from './components/TealiumSettings/TealiumCDPConfigurations'

import CrashlyticsCard from './components/CrashlyticsCard/CrashlyticsCard'

import WebCookieSwitcher from './components/WebCookieSwitcher/WebCookieSwitcher'

import WebViewDebugToggleCard from './components/WebViewDebugToggleCard/WebViewDebugToggleCard'

import CurrentScreenCard from 'App/Screens/DeveloperSettings/components/CurrentScreenCard/CurrentScreenCard'

import styles from 'App/Screens/DeveloperSettings/DeveloperSettings.styles'

import DeveloperSettingsActions from 'App/Screens/DeveloperSettings/components/DeveloperSettingActions/DeveloperSettingsActions'
import { NavigationFunctions } from 'App/Containers'
import { testID } from 'App/Utils/Helpers/testId.helpers'
import useKeyboardHandler from 'App/Hooks/useKeyboardHandler'

const DeveloperSettings = () => {
  const theme = useTheme()
  const keyboardHeight = useKeyboardHandler()
  const developerSettingsSectionsRefs = {
    [DeveloperSettingsSections.CaptchaToggleCard]: useRef(),
    [DeveloperSettingsSections.TealiumCDPConfigurations]: useRef(),
    [DeveloperSettingsSections.CMSConfigsCard]: useRef(),
    [DeveloperSettingsSections.WebCookieSwitcher]: useRef(),
    [DeveloperSettingsSections.AdobeTestTargetCard]: useRef(),
    [DeveloperSettingsSections.WebViewDebugCard]: useRef()
  }

  const persistAllDeveloperSettingsSections = async () => {
    for (const section of Object.keys(developerSettingsSectionsRefs)) {
      await developerSettingsSectionsRefs[section].current?.save()
    }
  }

  return (
    <VFScreen
      testID="DeveloperSettingsID"
      title="Developer Settings"
      onClose={() => {
        NavigationFunctions.pop()
      }}
      closeButtonAccessibilityLabel="DScloseIcon"
      closeButtonTestID={testID('DScloseIcon')}
      titleTextHeaderAccessibilityLabel="DSmainTitle"
      clearStatusBarEntries={false}
    >
      <ScrollView
        style={styles.container(theme, keyboardHeight)}
        contentContainerStyle={styles.contentContainerStyle}
        testID={testID('developerSettingsScroll')}
      >
        <AppVersionCard />
        <CurrentScreenCard />
        <UserInfoCard />
        <CMSConfigsCard
          ref={
            developerSettingsSectionsRefs[
              DeveloperSettingsSections.CMSConfigsCard
            ]
          }
        />
        <MockingConfigsCard />
        <WebCookieSwitcher
          ref={
            developerSettingsSectionsRefs[
              DeveloperSettingsSections.WebCookieSwitcher
            ]
          }
        />
        <WebViewDebugToggleCard
          ref={
            developerSettingsSectionsRefs[
              DeveloperSettingsSections.WebViewDebugCard
            ]
          }
        />
        <NetworkRequestsLoggerCard />
        <EncryptedStorageLogsCard />
        <TealiumCDPConfigurations
          ref={
            developerSettingsSectionsRefs[
              DeveloperSettingsSections.TealiumCDPConfigurations
            ]
          }
        />
        <CaptchaToggleCard
          ref={
            developerSettingsSectionsRefs[
              DeveloperSettingsSections.CaptchaToggleCard
            ]
          }
        />
        <CrashlyticsCard />
        <AdobeTestTargetCard
          ref={
            developerSettingsSectionsRefs[
              DeveloperSettingsSections.AdobeTestTargetCard
            ]
          }
        />
        <DeveloperSettingsActions
          persistAllDeveloperSettingsSections={
            persistAllDeveloperSettingsSections
          }
        />
      </ScrollView>
    </VFScreen>
  )
}

DeveloperSettings.defaultProps = {
  theme: LightThemeColors
}

export default DeveloperSettings
