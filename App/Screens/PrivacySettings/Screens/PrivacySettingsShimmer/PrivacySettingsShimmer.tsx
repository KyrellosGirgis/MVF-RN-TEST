import React from 'react'
import { Dimensions } from 'react-native'
import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { setLoadingConfigObject } from '@vfgroup-oneplatform/foundation/Components/Shimmer/Shimmer.utils'

import styles from './PrivacySettingsShimmer.styles'

import { ShimmerScreen } from 'App/Components'

const { width } = Dimensions.get('window')

const loadingConfig = [
  {
    main: setLoadingConfigObject('line', 1, width, styles.shimmerText),
    style: styles.shimmerTextWrapper
  },
  {
    main: setLoadingConfigObject('line', 1, width, styles.shimmerText),
    style: styles.shimmerTextWrapper
  },
  {
    main: setLoadingConfigObject('line', 1, width * 0.2, styles.shimmerText)
  },

  {
    main: setLoadingConfigObject('line', 1, width * 0.7, styles.shimmerTitle),
    style: styles.shimmerTitleWrapper
  },
  {
    main: setLoadingConfigObject('line', 1, width, styles.shimmerText),
    style: styles.shimmerTextWrapper
  },
  {
    main: setLoadingConfigObject('line', 1, width, styles.shimmerText)
  },
  {
    main: setLoadingConfigObject('line', 1, width, styles.shimmerSection),
    style: styles.shimmerSectionWrapper
  },

  {
    main: setLoadingConfigObject('line', 1, width * 0.7, styles.shimmerTitle),
    style: styles.shimmerTitleWrapper
  },
  {
    main: setLoadingConfigObject('line', 1, width, styles.shimmerText),
    style: styles.shimmerTextWrapper
  },
  {
    main: setLoadingConfigObject('line', 1, width * 0.5, styles.shimmerText)
  },
  {
    main: setLoadingConfigObject('line', 1, width, styles.shimmerSection),
    style: styles.shimmerSectionWrapper
  },

  {
    main: setLoadingConfigObject('line', 1, width * 0.7, styles.shimmerTitle),
    style: styles.shimmerTitleWrapper
  },
  {
    main: setLoadingConfigObject('line', 1, width, styles.shimmerText),
    style: styles.shimmerTextWrapper
  },
  {
    main: setLoadingConfigObject('line', 1, width, styles.shimmerText),
    style: styles.shimmerTextWrapper
  },
  {
    main: setLoadingConfigObject('line', 1, width * 0.2, styles.shimmerText)
  },
  {
    main: setLoadingConfigObject('line', 1, width, styles.shimmerSection),
    style: styles.shimmerSectionWrapper
  }
]

type PrivacySettingsShimmerProps = {
  onClose: () => void
}

const PrivacySettingsShimmer = ({ onClose }: PrivacySettingsShimmerProps) => {
  const theme = useTheme()

  return (
    <ShimmerScreen
      title="privacy_settings_title"
      onClose={onClose}
      headerStyle={styles.screenHeader(theme)}
      withHeaderSpace
      testID="Privacy_Settings_Shimmer_VFScreen"
      shimmerContainerStyle={styles.shimmerContainer}
      shimmerContainerTestID="Privacy_Settings_Shimmer_Wrapper"
      loadingConfig={loadingConfig}
      clearStatusBarEntries={false}
    />
  )
}

export default PrivacySettingsShimmer
