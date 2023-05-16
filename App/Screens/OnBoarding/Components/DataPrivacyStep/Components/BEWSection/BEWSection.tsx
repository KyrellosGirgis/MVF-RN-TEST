import React from 'react'
import { View } from 'react-native'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { getThemeImages } from 'App/Themes'

import { testID } from 'App/Utils/Helpers/testId.helpers'
import Separator from 'App/Components/Separator/Separator'

import styles from 'App/Screens/OnBoarding/Components/DataPrivacyStep/Components/BEWSection/BEWSection.styles'

import TextWithIconView from 'App/Components/TextWithIconView/TextWithIconView'

import BEWPermission from 'App/Screens/OnBoarding/Components/DataPrivacyStep/Components/BEWPermission/BEWPermission'
import { DATA_PRIVACY_PERMISSIONS } from 'App/Services/API/Requests/DataPrivacyPermissions/DataPrivacyPermissions.constants'

type BEWSectionProps = {
  shouldShowBEWDEV: boolean
  shouldShowBEWADV: boolean
  onToggleChange: Function
}

const BEWSection = ({
  shouldShowBEWDEV,
  shouldShowBEWADV,
  onToggleChange
}: BEWSectionProps) => {
  const theme = useTheme()
  const images = getThemeImages(theme.name)

  return (
    <>
      <Separator
        style={styles.bewSeparator}
        testID={testID('OnboardingBEWStepBEWSectionSeparator_view')}
      />
      <TextWithIconView
        title="onboarding_bew_adv_dev_step_title"
        icon={images.ic_contact_us_customer_care}
        iconStyle={styles.bewHeaderIcon}
        containerStyle={styles.bewHeaderContainer}
        testId="OnboardingBEWStepBEWSectionHeaderWithIcon"
      />

      {shouldShowBEWDEV && (
        <>
          <BEWPermission
            permissionType={DATA_PRIVACY_PERMISSIONS.DEV}
            onToggleChange={onToggleChange}
          />
          <View style={styles.separatorView} />
        </>
      )}

      {shouldShowBEWADV && (
        <BEWPermission
          permissionType={DATA_PRIVACY_PERMISSIONS.ADV}
          onToggleChange={onToggleChange}
        />
      )}
    </>
  )
}
export default BEWSection
