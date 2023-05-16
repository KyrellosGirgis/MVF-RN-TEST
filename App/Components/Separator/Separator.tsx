import React from 'react'
import { View, ViewStyle } from 'react-native'

import styles from './Separator.styles'

type SeparatorProps = {
  style?: ViewStyle
  testID?: string
}

const Separator = ({ style, testID }: SeparatorProps) => {
  return <View style={[styles.horizontalLine, style]} testID={testID} />
}

Separator.defaultProps = {}

export default Separator
