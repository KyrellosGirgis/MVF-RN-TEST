import { SectionEnums } from '@vfgroup-oneplatform/framework/CommonUI/PrivacyPermissionsOverlay'
// eslint-disable-next-line import/named
import { PrivacyPermissionsSection } from '@vfgroup-oneplatform/framework/CommonUI/PrivacyPermissionsOverlay/PrivacyPermissionsOverlay'

import {
  PrivacySettingsToggelsProps,
  OnToggleChange
} from './PrivacyPermissionsOverlay.d'

import { PRIVACY_SETTINGS_PERMISSIONS } from './PrivacyPermissionsOverlay.constants'

import { translate } from 'App/Utils/Helpers/generic.helpers'

export const INTRO_SECTIONS = [
  {
    title: translate('privacy_permissions_intro_title'),
    content: {
      paragraphs: [translate('privacy_permissions_intro_content_paragraphs1')]
    },
    actions: {
      type: SectionEnums.CHECK,
      items: [
        {
          title: 'privacy_permissions_intro_action_title1'
        },
        {
          title: 'privacy_permissions_intro_action_title_two'
        },
        {
          title: 'privacy_permissions_intro_action_title3'
        }
      ]
    }
  }
]

export const PRIVACY_POLICY_SECTIONS = [
  {
    title: translate('privacy_permissions_privacy_title'),
    content: {
      paragraphs: [
        translate('privacy_permissions_privacy_paragraphOne'),
        translate('privacy_permissions_privacy_paragraphTwo')
      ]
    }
  }
]

export const getPrivacySettingsSections = (
  privacySettingsToggelsValues: PrivacySettingsToggelsProps,
  onToggleChange: OnToggleChange
): PrivacyPermissionsSection[] => [
  {
    title: translate('privacy_permissions_privacy_policy_section1_title'),
    content: {
      paragraphs: [
        translate('privacySettingsHeader'),
        translate('privacy_permissions_privacy_section1_content_paragraphs2')
      ]
    }
  },
  {
    title: translate('privacy_permissions_privacy_policy_section2_title'),
    content: {
      paragraphs: [
        translate('personalisedRecommendationsItemDescription'),
        translate('personalPreferencesMoreContentFirstParagraph')
      ]
    },
    moreContent: {
      paragraphs: [
        translate('personalPreferencesMoreContentSecondParagraph'),
        translate('personalPreferencesMoreContentThirdParagraph')
      ],
      bullets: [
        translate('personalPreferencesMoreContentFirstBullet'),
        translate('personalPreferencesMoreContentSecondBullet'),
        translate('personalPreferencesMoreContentThirdBullet')
      ],
      info: [
        [
          translate('personalPreferencesMoreContentFirstInfoFirstPart'),
          translate('personalPreferencesMoreContentFirstInfoSecondPart')
        ],
        [
          translate('personalPreferencesMoreContentSecondInfoFirstPart'),
          translate('personalPreferencesMoreContentSecondInfoSecondPart')
        ]
      ]
    },
    actions: {
      items: [
        {
          title: 'basic_profile',
          icon: 'ic_indicators_admin',
          description: 'personal_preferences_basic_description',
          initialValue:
            privacySettingsToggelsValues[
              PRIVACY_SETTINGS_PERMISSIONS.PRIVACY_BASIC_PROFILE
            ],
          onToggle: () =>
            onToggleChange(PRIVACY_SETTINGS_PERMISSIONS.PRIVACY_BASIC_PROFILE)
        },
        {
          title: 'advanced_profile',
          key: 'isAdvancedProfile',
          icon: 'ic_indicators_business',
          description: 'personal_preferences_advanced_description',
          initialValue:
            privacySettingsToggelsValues[
              PRIVACY_SETTINGS_PERMISSIONS.PRIVACY_ADVANCED_PROFILE
            ],
          onToggle: () =>
            onToggleChange(
              PRIVACY_SETTINGS_PERMISSIONS.PRIVACY_ADVANCED_PROFILE
            )
        }
      ]
    }
  },
  {
    title: translate('contact_preferences_title'),
    content: {
      paragraphs: [translate('contactPreferencesContentFirstParagraph')]
    },
    moreContent: {
      info: [
        [
          translate('personalPreferencesMoreContentFirstInfoFirstPart'),
          translate('contactPreferencesMoreContentFirstParagraph')
        ],
        [
          translate('personalPreferencesMoreContentSecondInfoFirstPart'),
          translate('contactPreferencesMoreContentSecondParagraph')
        ]
      ]
    },
    actions: {
      items: [
        {
          title: 'post',
          initialValue:
            privacySettingsToggelsValues[
              PRIVACY_SETTINGS_PERMISSIONS.PRIVACY_POST
            ],
          onToggle: () =>
            onToggleChange(PRIVACY_SETTINGS_PERMISSIONS.PRIVACY_POST)
        },
        {
          title: 'messaging',
          initialValue:
            privacySettingsToggelsValues[
              PRIVACY_SETTINGS_PERMISSIONS.PRIVACY_MESSAGING
            ],
          onToggle: () =>
            onToggleChange(PRIVACY_SETTINGS_PERMISSIONS.PRIVACY_MESSAGING)
        },
        {
          title: 'phoneCalls',
          initialValue:
            privacySettingsToggelsValues[
              PRIVACY_SETTINGS_PERMISSIONS.PRIVACY_PHONE_CALLS
            ],
          onToggle: () =>
            onToggleChange(PRIVACY_SETTINGS_PERMISSIONS.PRIVACY_PHONE_CALLS)
        },
        {
          title: 'email',
          initialValue:
            privacySettingsToggelsValues[
              PRIVACY_SETTINGS_PERMISSIONS.PRIVACY_EMAIL
            ],
          onToggle: () =>
            onToggleChange(PRIVACY_SETTINGS_PERMISSIONS.PRIVACY_EMAIL)
        }
      ]
    }
  }
]
