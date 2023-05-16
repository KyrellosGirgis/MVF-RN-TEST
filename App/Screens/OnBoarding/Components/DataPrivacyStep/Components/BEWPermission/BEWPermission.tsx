import React from 'react'

import { View } from 'react-native'

import { Toggle } from '@vfgroup-oneplatform/foundation/Components'

import styles from 'App/Screens/OnBoarding/Components/DataPrivacyStep/Components/BEWPermission/BEWPermission.styles'

import { HtmlRenderer } from 'App/Components'
import { testID } from 'App/Utils/Helpers/testId.helpers'
import { translate } from 'App/Utils'

type BEWPremissionProps = {
  permissionType: string
  onToggleChange: Function
}

const BEWPermission = ({
  permissionType,
  onToggleChange
}: BEWPremissionProps) => (
  <View
    style={styles.bewHtmlComponentWrapper}
    testID={testID(`OnboardingBEWStepBEWSection${permissionType}Wrapper_view`)}
  >
    <HtmlRenderer
      source={translate(
        `onboarding_bew_permissions_${permissionType}_description`
      )}
      tooltipModalTitle={'onboarding_bew_permissions_step_title'}
      containerTestID={testID(
        `OnboardingBEWStepBEWSection${permissionType}HtmlText_view`
      )}
      testID={testID(`OnboardingBEWStepBEWSection${permissionType}Html_text`)}
      containerStyle={styles.bewHtmlContainerStyle}
    />
    <Toggle
      testID={testID(
        `OnboardingBEWStepBEWSection${permissionType}Switch_toggle`
      )}
      initialValue={false}
      onChange={(value) => onToggleChange(value, permissionType)}
    />
  </View>
)

export default BEWPermission
