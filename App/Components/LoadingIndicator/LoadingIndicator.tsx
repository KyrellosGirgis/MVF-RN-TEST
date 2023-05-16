import React from 'react'
import { StyleProp, View, ViewStyle } from 'react-native'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'
import LoadingAnimation from '@vfgroup-oneplatform/login/Components/LoadingAnimation/LoadingAnimation'

type LoadingIndicatorProps = {
  containerStyle: StyleProp<ViewStyle>
  testID: string
  loadingText: string
}

const LoadingIndicator = ({
  containerStyle,
  testID,
  loadingText
}: LoadingIndicatorProps) => {
  const theme = useTheme()

  return (
    <View style={containerStyle} testID={testID}>
      <LoadingAnimation loadingText={loadingText} theme={theme} />
    </View>
  )
}

LoadingIndicator.defaultProps = {
  loadingText: ''
}

export default LoadingIndicator
