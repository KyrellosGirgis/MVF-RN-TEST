import DisplayOptions from '@vfgroup-oneplatform/framework/Settings/DisplayOptions'

import { excludeSettingItem } from 'App/Screens/Settings/SettingsScreen.helpers'
import Configuration from 'App/Screens/Settings/Configuration'

jest.mock('App/Utils/Helpers/generic.helpers', () => {
  return {
    translate: (str) => str
  }
})

describe('render Settings feature sucessfully', () => {
  test('should render Settings feature screen successfully', async () => {
    const result = excludeSettingItem(Configuration, 'BiometricSettings')
    const expected = [
      {
        description: 'settings_general_settings_subtitle',
        items: [
          {
            component: DisplayOptions
          }
        ],
        title: 'settings_general_settings_title',
        withCard: true
      },
      {
        description: 'settings_dashboard_settings_subtitle',
        illustrationImage: 'settings_dashboard_illustration',
        items: [
          {
            props: {
              icon: 'dashboard_options_number1',
              title: 'settings_dashboard_settings_customise_main_tile'
            }
          },
          {
            props: {
              icon: 'dashboard_options_number2',
              title: 'settings_dashboard_settings_customise_small_tile'
            }
          }
        ],
        title: 'settings_dashboard_settings_title',
        withCard: true
      },
      {
        title: 'settings_permissions_title',
        description: 'settings_permissions_subtitle',
        items: [
          {
            props: {
              icon: 'icPadlockClose',
              title: 'settings_device_permissions_title',
              description: 'settings_device_permissions_subtitle'
            }
          }
        ]
      },
      {
        description: 'settings_language_settings_subtitle',
        title: 'settings_language_settings_title',
        withCard: true
      },
      {
        title: 'settings_netperform_privacy_section_title',
        items: [{ component: {} }]
      }
    ]
    expect(result).toMatchObject(expected)
  })
})
