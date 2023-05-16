import React from 'react'

import { StatusBar, View } from 'react-native'
import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'
import { BackgroundView } from '@vfgroup-oneplatform/onboarding/Components'

import styles from './OnboardingErrorScreen.styles'

import ErrorComponent from 'App/Components/ErrorComponent/ErrorComponent'
import { testID } from 'App/Utils/Helpers/testId.helpers'

type OnboardingErrorScreenProps = {
  errorText: string
  getLogoRef(): void
  onTryAgain(): void
}

const OnboardingErrorScreen = ({
  errorText,
  getLogoRef,
  onTryAgain
}: OnboardingErrorScreenProps) => {
  const theme = useTheme()
  return (
    <>
      <StatusBar backgroundColor="transparent" translucent />
      <BackgroundView
        imageStyle={styles.backgroundImage}
        getLogoRef={getLogoRef}
      >
        <View
          style={styles.contentWrapper(theme)}
          testID={testID('OnboardingErrorScreenErrorWrapper')}
        >
          <ErrorComponent
            description={errorText}
            descriptionTestId="OnboardingErrorScreen_txt"
            iconTestId="OnboardingErrorScreen_icon"
            iconName="ic_WarningHiLight_Theme"
            withTryAgainButton
            descriptionStyle={styles.errorText(theme)}
            tryAgainButtonTestId="OnboardingErrorScreenTryAgain"
            onTryAgainPress={onTryAgain}
          />
        </View>
      </BackgroundView>
    </>
  )
}

export default OnboardingErrorScreen
