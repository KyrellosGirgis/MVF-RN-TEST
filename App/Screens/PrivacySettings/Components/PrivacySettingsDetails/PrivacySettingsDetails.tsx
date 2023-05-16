import React from 'react'
import { ScrollView } from 'react-native'

import { VFScreen, VFText } from '@vfgroup-oneplatform/foundation/Components'
import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import PrivacySettingsDetailsShimmer from './PrivacySettingsDetailsShimmer'

import styles from 'App/Screens/PrivacySettings/Components/PrivacySettingsDetails/PrivacySettingsDetails.styles'

import { HtmlRenderer } from 'App/Components'
import { NavigationFunctions } from 'App/Containers'
import { testID } from 'App/Utils/Helpers/testId.helpers'
import { useApiCall } from 'App/Hooks'
import { fetchPrivacySettingsDetails } from 'App/Services/API/Requests/PrivacySettingsDetails/PrivacySettingsDetails'
import ErrorComponent from 'App/Components/ErrorComponent/ErrorComponent'
import { translate } from 'App/Utils'

type PrivacySettingsDetailsProps = {
  screenTitle: string
  apiRoute: unknown
  testId: string
}

const PrivacySettingsDetails = ({
  screenTitle,
  apiRoute,
  testId
}: PrivacySettingsDetailsProps) => {
  const theme = useTheme()
  const { responseData, isLoading, isError, refresh } = useApiCall(
    fetchPrivacySettingsDetails,
    apiRoute
  )

  const onTryAgainPress = async () => {
    await refresh(apiRoute)
  }

  return (
    <VFScreen
      title={screenTitle}
      onClose={() => {
        NavigationFunctions.popToTop()
      }}
      showBack
      testID={testID(`${testId}_screen`)}
      onBack={() => {
        NavigationFunctions.goBack()
      }}
      closeButtonTestID={testID(`${testId}_closeIcon`)}
      backButtonTestID={testID(`${testId}_backIcon`)}
      titleTextHeaderAccessibilityLabel={testID(`${testId}_screenTitle`)}
      clearStatusBarEntries={false}
    >
      {isError ? (
        <ErrorComponent
          description={translate('privacy_settings_details_error_text')}
          descriptionStyle={styles.text}
          iconName="ic_WarningHiLight_Theme"
          onTryAgainPress={onTryAgainPress}
          withTryAgainButton={true}
        />
      ) : isLoading ? (
        <PrivacySettingsDetailsShimmer
          containerStyle={styles.contentContainerStyle}
        />
      ) : (
        <ScrollView
          style={styles.container(theme)}
          contentContainerStyle={styles.contentContainerStyle}
          testID={testID(`${testId}_scroll`)}
        >
          <VFText
            i18nKey={responseData?.headline}
            style={styles.headline(theme)}
            testID={testID(`${testId}_headline`)}
          />
          <HtmlRenderer
            source={responseData?.text}
            containerTestID={testID(`${testId}_htmlView`)}
            testID={testID(`${testId}_htmlText`)}
            baseTextStyle={styles.text(theme)}
          />
        </ScrollView>
      )}
    </VFScreen>
  )
}

export default PrivacySettingsDetails
