import React from 'react'
import { Dimensions, View, ViewStyle } from 'react-native'
import Shimmer from '@vfgroup-oneplatform/foundation/Components/Shimmer'

import { setLoadingConfigObject } from '@vfgroup-oneplatform/foundation/Components/Shimmer/Shimmer.utils'

import styles from 'App/Screens/PrivacySettings/Components/PrivacySettingsDetails/PrivacySettingsDetailsShimmer.styles'

import { testID } from 'App/Utils/Helpers/testId.helpers'

type PrivacySettingsDetailsShimmerProps = {
  containerStyle: ViewStyle
}

const { width } = Dimensions.get('window')

const loadingConfig = [
  {
    main: setLoadingConfigObject('line', 1, width, styles.headerHeight),
    style: styles.headerSpace
  },
  {
    main: setLoadingConfigObject('line', 26, width, styles.descriptionStyle),
    style: styles.descriptionWrapperStyle
  }
]

const PrivacySettingsDetailsShimmer = (
  props: PrivacySettingsDetailsShimmerProps
) => {
  return (
    <View
      style={props.containerStyle}
      testID={testID('PrivacySettingsDetailsShimmerWrapper_view')}
    >
      <Shimmer config={loadingConfig} />
    </View>
  )
}

export default PrivacySettingsDetailsShimmer
