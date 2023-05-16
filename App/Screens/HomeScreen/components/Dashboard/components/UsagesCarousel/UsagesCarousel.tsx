import React, { memo, useEffect, useRef, useState } from 'react'
import { Animated } from 'react-native'

import { Pagination, Card } from '@vfgroup-oneplatform/foundation/Components'
import CardCarousel from '@vfgroup-oneplatform/foundation/Components/CardCarousel'

import { withTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { useDispatch, useSelector } from 'react-redux'

import { dashboardLoadingConfig } from '@vfgroup-oneplatform/framework/Dashboard/Dashboard/Config/LoadingConfig'
import DashboardErrorCard from '@vfgroup-oneplatform/framework/Dashboard/Dashboard/DashboardErrorCard/DashboardErrorCard'

import styles from './UsagesCarousel.Styles'
import { UsageInfoTile } from './components'
import {
  swipeOpacityInterpolateInputRange,
  swipeOpacityInterpolateOutputRange
} from './UsagesCarousel.constants'
import {
  getDisplayedUsages,
  prepareDisplayedTiles
} from './UsagesCarousel.helpers'

import { ThunkStatus } from 'App/Redux/StoreType.d'
import { fetchUnbilledUsages } from 'App/Redux/Usages/usages.thunk'

type Props = {
  onSwipeMainCard: Function
  userType: string
  theme: { [key: string]: any }
}

type Position = {
  x: number
  y: number
}

const UsagesCarousel = (props: Props) => {
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [activeDotCardIndex, setActiveDotCardIndex] = useState(0)
  const activeCardPosition = useRef<any>(null)
  const dispatch = useDispatch()
  const { usagesTilesLoadingStatus } = useSelector((state: any) => state.usages)

  const swipeOpacity = useRef(null)

  const { theme } = props

  const displayedUsages = getDisplayedUsages()

  useEffect(() => {
    activeCardPosition.current = new Animated.Value(0)
    swipeOpacity.current = activeCardPosition.current.interpolate({
      inputRange: swipeOpacityInterpolateInputRange,
      outputRange: swipeOpacityInterpolateOutputRange
    })
  }, [])

  useEffect(() => {
    usagesTilesLoadingStatus === ThunkStatus.FULFILLED &&
      prepareDisplayedTiles()
  }, [usagesTilesLoadingStatus])

  const onSwipe = (newActiveIndex: number) => {
    setActiveCardIndex(newActiveIndex)
    setActiveDotCardIndex(newActiveIndex)
  }

  const handleCardPositionChange = (newPosition: Position) => {
    activeCardPosition.current.setValue(newPosition.x)
  }

  const onTryAgain = () => {
    dispatch(fetchUnbilledUsages())
  }

  return usagesTilesLoadingStatus === ThunkStatus.REJECTED ? (
    <DashboardErrorCard
      accessibilityID="UsagesCarousel_DashboardErrorCard"
      errorText="error"
      errorHandler={onTryAgain}
    />
  ) : (
    <Card
      style={styles.container}
      testID="MainCard"
      type="main"
      loadingConfig={dashboardLoadingConfig.mainCardsLoadingConfig}
      isLoading={usagesTilesLoadingStatus === ThunkStatus.PENDING}
      shimmerPlaceholderConfig={{}}
      cardAccessible={false}
    >
      <Pagination
        activeColor={theme.colors.secondryColor}
        inactiveColor={theme.colors.fillColor}
        inactiveOpacity={1}
        numberOfDots={displayedUsages?.length + 1}
        activeDotIndex={activeDotCardIndex}
        containerStyle={styles.paginationStyle}
      />

      <CardCarousel
        onCardPositionChange={(pos) => handleCardPositionChange(pos)}
        data={[...displayedUsages, { usageType: 'edit' }]}
        onSwipe={onSwipe}
        renderCard={(props) => (
          <UsageInfoTile {...props} swipeOpacity={swipeOpacity} />
        )}
        duration={300}
        activeCardIndex={
          // because if activeCardIndex is latest card and this could be removed from EditDashboardTilesScreen so we need to set activeCardIndex to latest available card
          activeCardIndex > displayedUsages?.length
            ? displayedUsages?.length
            : activeCardIndex
        }
        style={styles.cardStyle}
        containerStyle={styles.cardCarouselStyle}
      />
    </Card>
  )
}

const _UsagesCarousel = memo(UsagesCarousel)
export default withTheme(_UsagesCarousel)
