import React from 'react'

import ListItem from '@vfgroup-oneplatform/framework/Dashboard/Dashboard/components/ListItem'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { getThemeImages } from 'App/Themes'

import listItemMapper from 'App/Screens/HomeScreen/components/Dashboard/components/DiscoveryCard/DiscoveryCard.helper'

import { ListProps } from 'App/Screens/HomeScreen/components/Dashboard/components/DiscoveryCard/DiscoveryCard.d'

import styles from 'App/Screens/HomeScreen/components/Dashboard/dashboard.styles'

const ListItems = ({ items, showMore }: ListProps) => {
  const theme = useTheme()
  const listItems = showMore ? items : items.slice(0, 3)
  const images = getThemeImages(theme.name)

  if (!listItems) {
    return null
  }

  return listItems.map((item, index: number) => {
    const itemProps = listItemMapper(item)
    return (
      <ListItem
        index={index}
        key={index}
        images={images}
        containerStyle={[
          index === 0 && styles.firstItemContainerStyle,
          item.containerStyle
        ]}
        {...itemProps}
      />
    )
  })
}

export default ListItems
