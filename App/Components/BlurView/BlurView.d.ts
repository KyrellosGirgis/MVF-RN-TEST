import { ViewStyle, StyleProp, GestureResponderEvent } from 'react-native'

type unlockButton = {
  onPress?: ((event: GestureResponderEvent) => void) | null | undefined
  title?: string
}

export interface BlurViewProps {
  style?: StyleProp<ViewStyle>
  unlockButton: unlockButton
}
