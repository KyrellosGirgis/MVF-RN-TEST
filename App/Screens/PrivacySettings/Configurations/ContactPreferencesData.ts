import { ContactPreferencesSection, TextSection } from './PrivacySettings.d'

import { translate } from 'App/Utils/Helpers/generic.helpers'

const contactPreferencesTextSection: TextSection = {
  content: {
    paragraphs: [translate('contactPreferencesContentFirstParagraph')]
  },
  moreContent: {
    paragraphs: [
      translate('contactPreferencesMoreContentFirstParagraph'),
      translate('contactPreferencesMoreContentSecondParagraph')
    ]
  }
}

const contactPreferencesSections: ContactPreferencesSection[] = [
  {
    hasParentPermission: false,
    parentPermissionTitle: '',
    items: [
      {
        icon: 'id_document',
        title: 'directMail'
      },
      {
        icon: 'ic_sms_text',
        title: 'messaging'
      },
      {
        icon: 'icMail',
        title: 'email'
      },
      {
        icon: 'ic_globe',
        title: 'Demo1'
      }
    ]
  },
  {
    hasParentPermission: true,
    parentPermissionTitle: 'phoneCalls',
    items: [
      {
        icon: 'ic_call_log',
        title: 'phoneCalls'
      },
      {
        title: 'fromVodafone'
      },
      {
        title: 'fromThirdParty'
      },
      {
        title: 'Demo2'
      }
    ]
  },
  {
    hasParentPermission: true,
    parentPermissionTitle: 'Demo3',
    items: [
      {
        icon: 'ic_globe',
        title: 'Demo3'
      },
      {
        title: 'Demo4'
      }
    ]
  }
]

export { contactPreferencesTextSection, contactPreferencesSections }
