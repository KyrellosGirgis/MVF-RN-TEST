import React, { Fragment, FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import { dashboardLoadingConfig } from '@vfgroup-oneplatform/framework/Dashboard/Dashboard/Config/LoadingConfig'

import { ImageBackground, View } from 'react-native'

import { Card, VFText, Icon } from '@vfgroup-oneplatform/foundation/Components'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import DashboardErrorCard from '@vfgroup-oneplatform/framework/Dashboard/Dashboard/DashboardErrorCard/DashboardErrorCard'

import Styles from './SmallTileCard.Styles'

import { getThemeImages } from 'App/Themes'

import { getSelectedSmallTilesForCurrentUser } from './SmallTileCard.helpers'

import { testID } from 'App/Utils/Helpers/testId.helpers'
import { ThunkStatus } from 'App/Redux/StoreType.d'
import { store } from 'App/Redux'
import { fetchSmallTiles } from 'App/Redux/reducers/SmallTiles/smallTiles.Thunk'
import { handleDeeplinkingWhenAppIsOpened } from 'App/Services/Deeplinks/Deeplinks.helper'

interface SmallTileCardsProps {
  name: string
}
const SmallTileCard: FunctionComponent<SmallTileCardsProps> = ({ name }) => {
  const theme = useTheme()
  const images = getThemeImages(theme.name)

  const { currentPresistedSelectedSmallTiles, smallTilesLoadingStatus } =
    useSelector(getSelectedSmallTilesForCurrentUser)

  const {
    background = '',
    icon = '',
    title = '',
    leftTitle = '',
    rightTitle = '',
    onPress = () => {}
  } = currentPresistedSelectedSmallTiles[name]?.extraInfo || {}

  const renderCardBody = () => (
    <>
      <View style={Styles.mainContainer}>
        <View
          style={Styles.iconAndTitleContainer}
          testID={testID(`${name}_iconAndTitleContainer`)}
        >
          <Icon
            name={{
              uri: icon
            }}
            type="image"
            style={Styles.icon}
            size={26}
            testID={testID(`${name}_icon`)}
          />
          <VFText
            i18nKey={title}
            style={Styles.title}
            testID={testID(`${name}_title`)}
            numberOfLines={2}
          />
        </View>

        <View
          style={Styles.subtitleConatier}
          testID={testID(`${name}_subtitleConatier`)}
        >
          <VFText
            i18nKey={leftTitle}
            style={Styles.subtitle}
            testID={testID(`${name}_leftTitle`)}
          />
          <VFText
            i18nKey={rightTitle}
            style={Styles.rightSubtitle(theme)}
            testID={testID(`${name}_rightTitle`)}
          />
        </View>
      </View>
    </>
  )

  const ErrorCard = (
    <View
      testID={`${name}_DashboardErrorCardId`}
      style={Styles.DashboardErrorCardContainer}
    >
      <DashboardErrorCard
        accessibilityID={`${name}_DashboardErrorCard`}
        errorText="small_tile_error" //should be added in localisations
        isHorizontalLayout={true}
        isVerticalLayout={false}
        errorHandler={() => {
          store.dispatch(fetchSmallTiles())
        }}
      />
    </View>
  )

  const BackgroundWrapper = background ? ImageBackground : Fragment

  const backgroundWrapperProps = background
    ? {
        style: Styles.imageMyOffer,
        source: images[background],
        resizeMode: 'contain'
      }
    : {}

  return smallTilesLoadingStatus === ThunkStatus.REJECTED ? (
    ErrorCard
  ) : (
    <Card
      type="addMore"
      isLoading={smallTilesLoadingStatus === ThunkStatus.PENDING}
      loadingConfig={dashboardLoadingConfig.adCardsLoadingConfig}
      shimmerPlaceholderConfig={{}}
      onPressCard={() => {
        handleDeeplinkingWhenAppIsOpened(onPress)
      }}
      testID={testID(`${name}_Card`)}
    >
      <View style={Styles.continer} testID={testID(`${name}_ViewContainer`)}>
        <BackgroundWrapper
          {...backgroundWrapperProps}
          source
          testID={testID(name + BackgroundWrapper.toString())}
        >
          {renderCardBody()}
        </BackgroundWrapper>
      </View>
    </Card>
  )
}

export default SmallTileCard
