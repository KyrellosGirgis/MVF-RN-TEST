import { itemType } from './DiscoveryCard.d'
import styles from './DiscoveryCard.Styles'

const listItemMapper = (item: itemType) => {
  const { extraInfo, buttonStyle, ...rest } = item
  return {
    title: extraInfo.title,
    leftIconName: extraInfo.icon,
    buttonStyle: [styles.buttonStyle, buttonStyle],
    ...rest
  }
}

export default listItemMapper
