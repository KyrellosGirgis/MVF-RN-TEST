import { TextSection, SectionItem } from './PrivacySettings.d'

import { translate } from 'App/Utils/Helpers/generic.helpers'

const thirdPartyTrackingTextSection: TextSection = {
  content: {
    paragraphs: [translate('thirdPartyTrackingContentFirstParagraph')]
  },
  moreContent: {
    breakdown: [
      {
        title: translate('thirdPartyTrackingMoreContentFirstBreakdownTitle'),
        description: translate(
          'thirdPartyTrackingMoreContentFirstBreakdownDescription'
        ),
        items: [
          {
            title: translate(
              'thirdPartyTrackingMoreContentFirstBreakdownFirstItemTitle'
            ),
            description: translate(
              'thirdPartyTrackingMoreContentFirstBreakdownFirstItemDescription'
            )
          },
          {
            title: translate(
              'thirdPartyTrackingMoreContentFirstBreakdownSecondItemTitle'
            ),
            description: translate(
              'thirdPartyTrackingMoreContentFirstBreakdownSecondItemDescription'
            )
          },
          {
            title: translate(
              'thirdPartyTrackingMoreContentFirstBreakdownThirdItemTitle'
            ),
            description: translate(
              'thirdPartyTrackingMoreContentFirstBreakdownThirdItemDescription'
            )
          },
          {
            title: translate(
              'thirdPartyTrackingMoreContentFirstBreakdownFourthItemTitle'
            ),
            description: translate(
              'thirdPartyTrackingMoreContentFirstBreakdownFourthItemDescription'
            )
          }
        ]
      },
      {
        title: translate('thirdPartyTrackingMoreContentSecondBreakdownTitle'),
        description: translate(
          'thirdPartyTrackingMoreContentSecondBreakdownDescription'
        ),
        items: [
          {
            title: translate(
              'thirdPartyTrackingMoreContentFirstBreakdownFirstItemTitle'
            ),
            description: translate(
              'thirdPartyTrackingMoreContentFirstBreakdownFirstItemDescription'
            )
          },
          {
            title: translate(
              'thirdPartyTrackingMoreContentFirstBreakdownSecondItemTitle'
            ),
            description: translate(
              'thirdPartyTrackingMoreContentFirstBreakdownSecondItemDescription'
            )
          },
          {
            title: translate(
              'thirdPartyTrackingMoreContentFirstBreakdownThirdItemTitle'
            ),
            description: translate(
              'thirdPartyTrackingMoreContentFirstBreakdownThirdItemDescription'
            )
          },
          {
            title: translate(
              'thirdPartyTrackingMoreContentFirstBreakdownFourthItemTitle'
            ),
            description: translate(
              'thirdPartyTrackingMoreContentFirstBreakdownFourthItemDescription'
            )
          }
        ]
      },
      {
        title: translate('thirdPartyTrackingMoreContentThirdBreakdownTitle'),
        description: translate(
          'thirdPartyTrackingMoreContentThirdBreakdownDescription'
        ),
        items: [
          {
            title: translate(
              'thirdPartyTrackingMoreContentFirstBreakdownFirstItemTitle'
            ),
            description: translate(
              'thirdPartyTrackingMoreContentThirdBreakdownFirstItemDescription'
            )
          },
          {
            title: translate(
              'thirdPartyTrackingMoreContentFirstBreakdownSecondItemTitle'
            ),
            description: translate(
              'thirdPartyTrackingMoreContentFirstBreakdownSecondItemDescription'
            )
          },
          {
            title: translate(
              'thirdPartyTrackingMoreContentFirstBreakdownThirdItemTitle'
            ),
            description: translate(
              'thirdPartyTrackingMoreContentFirstBreakdownThirdItemDescription'
            )
          },
          {
            title: translate(
              'thirdPartyTrackingMoreContentFirstBreakdownFourthItemTitle'
            ),
            description: translate(
              'thirdPartyTrackingMoreContentThirdBreakdownFourthItemDescription'
            )
          }
        ]
      }
    ]
  }
}

const thirdPartyTrackingTrackers: SectionItem[][] = [
  [
    {
      icon: 'ic_acceleration_middle',
      title: 'third_party_tracking_performance',
      description: 'third_party_tracking_performance_description'
    },
    {
      icon: 'indicatorsSystemIcons',
      title: 'third_party_tracking_advertising',
      description: 'third_party_tracking_advertising_description'
    },
    {
      icon: 'ic_globe',
      title: 'Demo',
      description: 'Demo description'
    }
  ],
  [
    {
      icon: 'ic_globe',
      title: 'Demo1',
      description: 'Demo description'
    },
    {
      icon: 'ic_globe',
      title: 'Demo2',
      description: 'Demo description'
    }
  ]
]

export { thirdPartyTrackingTextSection, thirdPartyTrackingTrackers }
