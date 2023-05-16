import React from 'react'
import { VFButton, VFText } from '@vfgroup-oneplatform/foundation/Components'

import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

import styles from 'App/Screens/OnBoarding/Components/DataPrivacyStep/Components/DataPrivacyFooter/DataPrivacyFooter.styles'

import { testID } from 'App/Utils/Helpers/testId.helpers'
import { openWebView } from 'App/Screens/WebViewScreen/WebViewScreen.helper'
import { store, StoreType } from 'App/Redux'

type DataPrivacyFooterProps = {
  onConsentPress: () => void
}

const DataPrivacyFooter = ({ onConsentPress }: DataPrivacyFooterProps) => {
  const onDataPrivacyLinkPress = () => {
    const {
      cms: { dataPrivacyUrl }
    }: StoreType = store.getState()
    openWebView(dataPrivacyUrl, true)
  }

  return (
    <>
      <VFButton
        title="onboarding_bew_consent_button"
        style={styles.consentButton}
        onPress={onConsentPress}
        testID={testID('OnboardingBEWStepConsentText')}
      />

      <TouchableWithoutFeedback
        onPress={onDataPrivacyLinkPress}
        testID={testID('OnboardingBEWStepDataPrivacy_btn')}
      >
        <VFText
          type="primary"
          style={styles.dataPrivacyPressableText}
          i18nKey="onboarding_bew_dataprivacy_pressable_text"
          testID={testID('OnboardingBEWStepDataPrivacyButton_txt')}
        />
      </TouchableWithoutFeedback>
    </>
  )
}

export default DataPrivacyFooter
