import React, { FunctionComponent } from 'react'

import { useSelector } from 'react-redux'

import { View, Image } from 'react-native'

import { Card, VFText } from '@vfgroup-oneplatform/foundation/Components'

import DashboardErrorCard from '@vfgroup-oneplatform/framework/Dashboard/Dashboard/DashboardErrorCard/DashboardErrorCard'
import { dashboardLoadingConfig } from '@vfgroup-oneplatform/framework/Dashboard/Dashboard/Config/LoadingConfig'

import Styles from './SecondaryCard.Styles'

import LockedCard from './components/LockedCard/LockedCard'

import { testID } from 'App/Utils/Helpers/testId.helpers'

import { StoreType, ThunkStatus } from 'App/Redux/StoreType.d'
import { startBanLevelLoginFlow } from 'App/Services/LoginFlowManager/LoginFlowManager'

import { NavigationFunctions } from 'App/Containers'
import Routes from 'App/Containers/AppNavigation/Routes'
import { isMobilePostpaidSubscription } from 'App/Services/AppUserData/AppUserData.helpers'
import { concateAmountWithCurrency } from 'App/Utils/Helpers/currencySymbol.helpers'
import { store } from 'App/Redux'
import { fetchMediumTiles } from 'App/Redux/reducers/MediumTiles/MediumTiles.thunk'
import { MediumTile } from 'App/Services/DataLayer/APIs/Dashboard/MediumTiles/MediumTiles'
import { handleDeeplinkingWhenAppIsOpened } from 'App/Services/Deeplinks/Deeplinks.helper'

const SecondaryCard: FunctionComponent = () => {
  const mediumTilesState = useSelector(({ mediumTiles }) => mediumTiles)
  const mediumTilesLoadingStatus: string =
    mediumTilesState.mediumTilesLoadingStatus

  const mediumTiles: MediumTile[] = mediumTilesState.mediumTiles
  const { currentlyActiveSubscription } = useSelector(
    ({ appUserData: { currentlyActiveSubscription } }: StoreType) => ({
      currentlyActiveSubscription: currentlyActiveSubscription
    })
  )

  const onPress = () => {
    currentlyActiveSubscription?.hasBanAccess
      ? isMobilePostpaidSubscription()
        ? mediumTiles[0]?.action?.href &&
          handleDeeplinkingWhenAppIsOpened(mediumTiles[0]?.action?.href)
        : // TODO: Remove prepaid workaround after DXL service is fixed.
          NavigationFunctions.navigate(Routes.ProductsAndServicesScreen, {
            isMobilePostpaidSubscription: false
          })
      : startBanLevelLoginFlow()
  }

  const CardValue = () => {
    const { billingInformation } = mediumTiles[0] || {}

    if (!billingInformation) {
      return null
    }
    const { amount, currency } = billingInformation
    const amountWithCurrency = concateAmountWithCurrency(amount, currency)
    return (
      <View style={Styles.billAmountContainer}>
        <VFText
          numberOfLines={1}
          i18nKey={amountWithCurrency}
          style={Styles.billAmount}
          testKey={testID('SecondaryCardBillAmount_txt')}
        />
      </View>
    )
  }

  const CardHeader = () => (
    <View
      style={Styles.iconAndTitleContainer}
      testID={testID('SecondaryCardHeaderContainer')}
    >
      <Image
        source={{
          uri: mediumTiles[0]?.icon?.href
        }}
        style={Styles.icon}
        testID={testID('SecondaryCardIcon_image')}
      />
      <VFText
        i18nKey={mediumTiles[0]?.title}
        style={Styles.title}
        type={'primary'}
        testID={testID('SecondaryCardTitle_txt')}
        numberOfLines={1}
      />
    </View>
  )

  const CardBody = () => (
    <View style={Styles.cardBody}>
      <VFText
        i18nKey={mediumTiles[0]?.description}
        style={Styles.subtitle}
        testID={testID('SecondaryCardSubTitle_txt')}
        numberOfLines={2}
      />
      <CardValue />
    </View>
  )

  const MediumTileErrorCard = () => (
    <View testID={testID('Dashboard_error_container')} style={Styles.errorCard}>
      <DashboardErrorCard
        accessibilityID=""
        errorText="error"
        errorHandler={() => {
          store.dispatch(fetchMediumTiles())
        }}
      />
    </View>
  )

  return mediumTilesLoadingStatus === ThunkStatus.REJECTED ? (
    <MediumTileErrorCard />
  ) : (
    <Card
      style={Styles.container}
      testID={testID('DashboardSecondaryTile')}
      type="sec"
      loadingConfig={dashboardLoadingConfig.secCardsLoadingConfig}
      isLoading={mediumTilesLoadingStatus === ThunkStatus.PENDING}
      shimmerPlaceholderConfig={{}}
      cardAccessible={false}
      onPressCard={() => {
        mediumTilesLoadingStatus === ThunkStatus.FULFILLED && onPress()
      }}
    >
      <View
        style={Styles.containerWrapper}
        testID={testID('SecondaryCardContentWrapper')}
      >
        <CardHeader />
        {currentlyActiveSubscription?.hasBanAccess ? (
          <CardBody />
        ) : (
          <LockedCard />
        )}
      </View>
    </Card>
  )
}

export default SecondaryCard
