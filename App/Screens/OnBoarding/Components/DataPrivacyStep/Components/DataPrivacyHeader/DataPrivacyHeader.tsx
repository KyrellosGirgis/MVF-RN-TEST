import React from 'react'
import { VFText } from '@vfgroup-oneplatform/foundation/Components'

import styles from 'App/Screens/OnBoarding/Components/DataPrivacyStep/Components/DataPrivacyHeader/DataPrivacyHeader.styles'

import { testID } from 'App/Utils/Helpers/testId.helpers'

const DataPrivacyHeader = () => {
  return (
    <>
      <VFText
        type="primary"
        style={styles.headerTitle}
        i18nKey="onboarding_bew_permissions_step_subtitle"
        testID={testID('OnboardingBEWStepHeaderTitle_txt')}
      />

      <VFText
        type="primary"
        style={styles.headerContent}
        i18nKey="onboarding_bew_permissions_step_description"
        testID={testID('OnboardingBEWStepHeaderContent_txt')}
      />
    </>
  )
}

export default DataPrivacyHeader
