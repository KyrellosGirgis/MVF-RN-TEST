import DisplayOptions from '@vfgroup-oneplatform/framework/Settings/DisplayOptions'

import OptionItem from '@vfgroup-oneplatform/framework/Settings/components/OptionItem'
import { OptionCard } from '@vfgroup-oneplatform/framework/Settings/components'

import BiometricSettings from './Components/BiometricSettings'

import AppPrivacy from './Components/AppPrivacy/AppPrivacy'

import LanguageSettings from 'App/Screens/Settings/Components/LanguageSettings/LanguageSettings'

import { NavigationFunctions } from 'App/Containers'
import Routes from 'App/Containers/AppNavigation/Routes'

const GeneralSettings = {
  title: 'settings_general_settings_title',
  description: 'settings_general_settings_subtitle',
  withCard: true,
  items: [
    { component: BiometricSettings, id: 'BiometricSettings' },
    { component: DisplayOptions }
  ]
}

const DashboardSettings = {
  title: 'settings_dashboard_settings_title',
  description: 'settings_dashboard_settings_subtitle',
  illustrationImage: 'settings_dashboard_illustration',
  withCard: true,
  items: [
    {
      component: OptionItem,
      props: {
        icon: 'dashboard_options_number1',
        title: 'settings_dashboard_settings_customise_main_tile',
        onPress: () => {
          NavigationFunctions.navigate(Routes.EditDashboardTiles, {
            showBackButton: true
          })
        }
      }
    },
    {
      component: OptionItem,
      props: {
        icon: 'dashboard_options_number2',
        title: 'settings_dashboard_settings_customise_small_tile',
        onPress: () => {
          NavigationFunctions.navigate(Routes.EditSmallTilesScreen, {
            showBackButton: true
          })
        }
      }
    }
  ]
}

const Language = {
  title: 'settings_language_settings_title',
  description: 'settings_language_settings_subtitle',
  withCard: true,
  items: [{ component: LanguageSettings }]
}

const settingsPermissions = {
  title: 'settings_permissions_title',
  description: 'settings_permissions_subtitle',
  items: [
    {
      component: OptionCard,
      props: {
        icon: 'icPadlockClose',
        title: 'settings_device_permissions_title',
        description: 'settings_device_permissions_subtitle',
        onPress: () => {
          NavigationFunctions.navigate(Routes.DevicePermissionsScreen)
        }
      }
    }
  ]
}

const AppPrivacySettings = {
  title: 'settings_netperform_privacy_section_title',
  items: [{ component: AppPrivacy }]
}

const config = [
  GeneralSettings,
  DashboardSettings,
  settingsPermissions,
  Language,
  AppPrivacySettings
]
export default config
