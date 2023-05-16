import React from 'react'

import { PrivacyOverview } from './PrivacySettings'

import HTMLDescription from 'App/Screens/PrivacySettings/Components/HTMLDescription/HTMLDescription'

import { translate } from 'App/Utils/Helpers/generic.helpers'

const personalPreferencesData: PrivacyOverview = {
  subTitle: 'personalPreferencesSubTitle',
  descriptionSection: {
    content: {
      paragraphs: [translate('personalPreferencesDescriptionSectionParagraph')]
    },
    moreContent: {
      paragraphs: [
        translate('personalPreferencesMoreContentFirstParagraph'),
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
    }
  },
  advancedPermissionChildren: [
    {
      title: 'advancedPermissionFirstChildTitle',
      description: 'advancedPermissionFirstChildDescription',
      renderDescription: () => (
        <HTMLDescription description="advancedPermissionFirstChildDescription" />
      )
    },
    {
      title: 'advancedPermissionSecondChildTitle',
      description: 'advancedPermissionSecondChildDescription',
      renderDescription: () => (
        <HTMLDescription description="advancedPermissionSecondChildDescription" />
      )
    }
  ],
  singlePermissionsList: [
    {
      title: 'singlePermissionsListFirstChildTitle',
      description: 'singlePermissionsListFirstChildDescription',
      icon: 'ic_location'
    }
  ]
}
export default personalPreferencesData
