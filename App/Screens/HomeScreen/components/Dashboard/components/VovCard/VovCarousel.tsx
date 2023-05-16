import React, { useEffect, useRef, useState } from 'react'
import { Animated } from 'react-native'

import { Pagination, Card } from '@vfgroup-oneplatform/foundation/Components'
import CardCarousel from '@vfgroup-oneplatform/foundation/Components/CardCarousel'

import { withTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import styles from './VovCarousel.Styles'

import VovCard from './VovCard'
import { Props, Position } from './VovCarousel.d'

const VovCarousel = (props: Props) => {
  const vovCardsData = props.data
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [activeDotCardIndex, setActiveDotCardIndex] = useState(0)
  const activeCardPosition = useRef<any>(null)

  const { theme } = props

  useEffect(() => {
    activeCardPosition.current = new Animated.Value(0)
  }, [])

  const onSwipe = (newActiveIndex: number) => {
    setActiveCardIndex(newActiveIndex)
    setActiveDotCardIndex(newActiveIndex)
  }
  const handleCardPositionChange = (newPosition: Position) => {
    activeCardPosition.current.setValue(newPosition.x)
  }

  return (
    <>
      {vovCardsData?.length > 0 && (
        <Card
          style={styles.container}
          testID="MainCard"
          type="main"
          shimmerPlaceholderConfig={{}}
          cardAccessible={false}
        >
          <CardCarousel
            forceSwipeCapture
            onCardPositionChange={(pos) => handleCardPositionChange(pos)}
            data={vovCardsData}
            onSwipe={onSwipe}
            renderCard={(props) => <VovCard {...props?.item} />}
            duration={300}
            activeCardIndex={
              // because if activeCardIndex is latest card and this could be removed from EditDashboardTilesScreen so we need to set activeCardIndex to latest available card
              activeCardIndex > vovCardsData?.length
                ? vovCardsData?.length
                : activeCardIndex
            }
            style={styles.cardStyle}
            containerStyle={styles.cardCarouselStyle}
          />
          <Pagination
            activeColor={theme.colors.secondryColor}
            inactiveColor={theme.colors.fillColor}
            inactiveOpacity={1}
            numberOfDots={vovCardsData?.length}
            activeDotIndex={activeDotCardIndex}
            containerStyle={styles.paginationStyle}
          />
        </Card>
      )}
    </>
  )
}

export default withTheme(VovCarousel)
