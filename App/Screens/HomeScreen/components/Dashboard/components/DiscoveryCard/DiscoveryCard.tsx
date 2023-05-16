import React, { useState } from 'react'

import { Image, TouchableOpacity, View } from 'react-native'

import { VFText } from '@vfgroup-oneplatform/foundation/Components'
import { isNil as _isNil } from 'lodash'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { Props } from './DiscoveryCard.d'
import styles from './DiscoveryCard.Styles'
import ListItems from './components/ListItems'

const DiscoveryCard = (props: Props) => {
  const [showMore, setShowMore] = useState(false)
  const theme = useTheme()

  const {
    title,
    items,
    viewAccessibilityLabel,
    listTitleAccessibilityLabel,
    itemsAccessibilityLabel,
    cardImageSource,
    moreText,
    lessText
  } = props

  const onShowMorePress = () => {
    setShowMore((prevState) => !prevState)
  }

  const itemsLength = items?.length || 0
  const ShowMoreButton = () => {
    if (_isNil(moreText) || itemsLength <= 3) {
      return null
    }
    return (
      <TouchableOpacity
        style={styles.showMoreButtonStyle}
        onPress={onShowMorePress}
        accessibilityLabel="DBbasicsShowMore"
      >
        <VFText
          style={styles.showMoreTextStyle(theme)}
          i18nKey={showMore ? lessText : moreText}
        />
      </TouchableOpacity>
    )
  }

  const Header = (
    <View style={styles.headerContainerStyle}>
      <VFText
        style={styles.headerStyle(theme)}
        i18nKey={title}
        accessibilityLabel={listTitleAccessibilityLabel}
      />
    </View>
  )

  return (
    <View
      style={styles.containerStyle}
      accessibilityLabel={viewAccessibilityLabel}
    >
      {Header}
      <View
        style={styles.itemsContainerStyle(theme)}
        accessibilityLabel={itemsAccessibilityLabel}
      >
        {!!cardImageSource && (
          <Image
            source={cardImageSource}
            style={styles.image}
            testID="card_image"
          />
        )}
        <View style={styles.listCont}>
          <ListItems items={items} showMore={showMore} />
          <ShowMoreButton />
        </View>
      </View>
    </View>
  )
}

export default DiscoveryCard
