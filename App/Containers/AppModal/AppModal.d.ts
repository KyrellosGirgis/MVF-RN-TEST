import { ReactNode } from 'react'
import { StyleProp, ViewStyle, TextStyle } from 'react-native'

export interface ShowModalProps {
  modalContainerStyle?: StyleProp<ViewStyle>
  modalBody: ReactNode
  isNativeIOSModal?: boolean
  title?: string
  titleStyle?: StyleProp<TextStyle>
  withHeaderCloseButton?: boolean
  onHeaderCloseButtonPress?: () => void
  closeBtnStyle?: StyleProp<ViewStyle>
  headerStyle?: StyleProp<ViewStyle>
  isFullScreen?: boolean
}

export interface AppModalProps {
  showEventName?: string
  hideEventName?: string
}
