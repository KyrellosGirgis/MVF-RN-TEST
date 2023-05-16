import { StyleProp, TextStyle, ViewStyle } from 'react-native'

import { IconTypesValues } from '@vfgroup-oneplatform/foundation/Components'

export type itemType = {
  extraInfo: {
    title: string
    icon: string
  }
  onPress: Function
  containerStyle: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  leftIconType: typeof IconTypesValues
  leftIconSize: number
  leftIconColor: string
  leftIconStyle: StyleProp<ViewStyle>
  showRightIcon: boolean
  rightIconType: typeof IconTypesValues
  rightIconName: string
  rightIconSize: number
  rightIconColor: string
  rightIconStyle: StyleProp<ViewStyle>
  isClickable: boolean
  buttonText: string
  buttonStyle: StyleProp<ViewStyle>
}

export interface ListProps {
  items: itemType[]
  showMore: boolean
}
export interface Props {
  title: string
  cardImageSource: string
  items: itemType[]
  onRefreshConnectedApps: Function
  viewAccessibilityLabel: string
  listTitleAccessibilityLabel: string
  itemsAccessibilityLabel: string
  itemName: string
  moreText: string
  lessText: string
  style?: StyleProp<ViewStyle>
  headerContainerStyle?: StyleProp<ViewStyle>
  headerStyle?: StyleProp<ViewStyle>
  itemsContainerStyle?: StyleProp<ViewStyle>
}
