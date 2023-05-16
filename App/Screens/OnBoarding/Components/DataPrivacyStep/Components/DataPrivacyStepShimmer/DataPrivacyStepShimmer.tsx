import React from 'react'
import { Dimensions, View, ViewStyle } from 'react-native'
import Shimmer from '@vfgroup-oneplatform/foundation/Components/Shimmer'

import { setLoadingConfigObject } from '@vfgroup-oneplatform/foundation/Components/Shimmer/Shimmer.utils'

import styles from './DataPrivacyStepShimmer.styles'

import { testID } from 'App/Utils/Helpers/testId.helpers'

type DataPrivacyStepShimmerProps = {
  containerStyle: ViewStyle
}

const { width } = Dimensions.get('window')

const loadingConfig = [
  {
    main: setLoadingConfigObject('line', 1, width * 0.62, styles.headerHeight),
    style: styles.headerSpace
  },
  {
    main: setLoadingConfigObject('line', 1, width * 0.42, styles.headerHeight),
    style: styles.headerStyle
  },
  {
    main: setLoadingConfigObject(
      'line',
      6,
      width * 0.6,
      styles.descriptionStyle
    ),
    style: styles.descriptionWrapperStyle
  },
  {
    main: setLoadingConfigObject(
      'line',
      1,
      width * 0.17,
      styles.descriptionStyle
    ),
    style: {}
  },

  {
    main: setLoadingConfigObject('line', 1, width * 0.6, styles.separatorStyle),
    style: styles.separatorWrapperStyle
  },

  {
    left: setLoadingConfigObject(
      'circle',
      1,
      width * 0.07,
      styles.titleIconStyle
    ),
    main: setLoadingConfigObject('line', 2, width * 0.4, styles.titleMainStyle),
    right: setLoadingConfigObject(
      'circle',
      1,
      width * 0.1,
      styles.titleSwitchStyle
    ),
    style: styles.titleStyle
  },

  {
    main: setLoadingConfigObject(
      'line',
      6,
      width * 0.6,
      styles.descriptionStyle
    ),
    style: styles.contentStyle
  },
  {
    main: setLoadingConfigObject(
      'line',
      1,
      width * 0.17,
      styles.descriptionStyle
    ),
    style: {}
  },

  {
    main: setLoadingConfigObject(
      'line',
      6,
      width * 0.6,
      styles.descriptionStyle
    ),
    style: styles.titleStyle
  },
  {
    main: setLoadingConfigObject(
      'line',
      1,
      width * 0.17,
      styles.descriptionStyle
    ),
    style: styles.bottomMargin
  }
]

const DataPrivacyStepShimmer = (props: DataPrivacyStepShimmerProps) => {
  return (
    <View
      style={props.containerStyle}
      testID={testID('OnboardingDataPrivacyStepShimmerWrapper_view')}
    >
      <Shimmer config={loadingConfig} />
    </View>
  )
}

export default DataPrivacyStepShimmer
