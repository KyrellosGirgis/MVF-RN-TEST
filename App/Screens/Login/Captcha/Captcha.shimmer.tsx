import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'
import Shimmer from '@vfgroup-oneplatform/foundation/Components/Shimmer'

import styles from 'App/Screens/Login/Captcha/Captcha.styles'

type SectionType = 'line' | 'circle' | 'square'

const setLoadingConfigObject = (
  type: SectionType,
  count: number,
  dimension: number,
  style: StyleProp<ViewStyle>
) => {
  return { type, count, dimension, style }
}

const lastUpdatedLoadingConfig = (width: number, height: number) => {
  return [
    {
      main: setLoadingConfigObject('line', 1, width, {
        height,
        width,
        borderRadius: 6
      })
    }
  ]
}

const CaptchaShimmer = () => {
  return (
    <View style={styles.shimmerContainer} testID="captcha_shimmer_container">
      <Shimmer
        config={lastUpdatedLoadingConfig(138, 50)}
        testID="captcha_shimmer"
      />
    </View>
  )
}

export default CaptchaShimmer
