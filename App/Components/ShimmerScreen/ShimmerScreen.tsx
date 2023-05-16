import React from 'react'
import { View, ViewStyle } from 'react-native'
import Shimmer from '@vfgroup-oneplatform/foundation/Components/Shimmer'

import { VFScreen } from '@vfgroup-oneplatform/foundation/Components'

type ShimmerScreenProps = {
  title: string
  headerStyle?: ViewStyle
  withHeaderSpace?: boolean
  testID: string
  shimmerContainerStyle?: ViewStyle
  shimmerContainerTestID: string
  loadingConfig: any[]
  onClose: () => void
  showBack?: boolean
  onBack?: () => void
  titleTextHeaderAccessibilityLabel?: string
  clearStatusBarEntries: boolean
}

const ShimmerScreen = (props: ShimmerScreenProps) => {
  const { shimmerContainerStyle, shimmerContainerTestID, loadingConfig } = props
  return (
    <VFScreen {...props}>
      <View style={shimmerContainerStyle} testID={shimmerContainerTestID}>
        <Shimmer config={loadingConfig} />
      </View>
    </VFScreen>
  )
}

export default ShimmerScreen
