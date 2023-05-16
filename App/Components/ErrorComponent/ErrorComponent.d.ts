import { ViewStyle } from 'react-native'

export type ErrorScreenProps = {
  backgroundStyle?: ViewStyle
  iconName?: any
  iconStyle?: ViewStyle
  description: string
  descriptionStyle?: ViewStyle
  placeholders?: string
  iconTestId: string
  descriptionTestId: string
  images?: []
  withTryAgainButton?: boolean
  tryAgainButtonTestId?: string
  withHeader?: boolean
  header?: string
  headerTestId?: string
  onTryAgainPress?: Function
}
