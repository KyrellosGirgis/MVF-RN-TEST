import React from 'react'

import { EditDashboardTilesScreen } from '@vfgroup-oneplatform/framework/EditDashboardTiles'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'
import { useSelector, useDispatch } from 'react-redux'

import { useRoute } from '@react-navigation/native'

import styles from './EdittDashboardTiles.styles'

import { getThemeImages } from 'App/Themes'

import {
  mapUsagesToSettingsTiles,
  getDisplayedTilesMap,
  SettingsTile
} from './EditDashboardTiles.helper'

import loadingConfig from './EditDashboardTilesLoadingConfig'

import { settingsActions } from 'App/Redux/reducers/settings.reducer'
import { NavigationFunctions } from 'App/Containers'
import {
  mapUsageTilesToTilesIds,
  navigateToDashboardScreen
} from 'App/Screens/Helpers'
import { updatePreviousUsagesTilesIds } from 'App/Screens/HomeScreen/components/Dashboard/components/UsagesCarousel/UsagesCarousel.helpers'
import { ThunkStatus } from 'App/Redux/StoreType.d'
import { ShimmerScreen } from 'App/Components'
import { testID } from 'App/Utils/Helpers/testId.helpers'

const EditDashboardTiles = () => {
  const { currentlyActiveSubscription } = useSelector(
    (state: any) => state.appUserData
  )
  const { usagesTiles, usagesTilesLoadingStatus } = useSelector(
    (state: any) => state.usages
  )

  const dispatch = useDispatch()
  const {
    params: { showBackButton }
  } = useRoute()

  const theme = useTheme()
  const Images = getThemeImages(theme.name)
  const settingsTiles: SettingsTile[] = mapUsagesToSettingsTiles(usagesTiles)
  const { selectedTiles, optionalTiles } = getDisplayedTilesMap(
    settingsTiles,
    currentlyActiveSubscription?.id
  )

  const onBack = () => {
    NavigationFunctions.goBack()
  }

  const onConfirm = (newSelectedTiles: SettingsTile[]) => {
    dispatch(
      settingsActions.setPersistedSubscriptionTiles({
        currentlyActiveSubscriptionId: currentlyActiveSubscription?.id,
        tiles: mapUsageTilesToTilesIds(newSelectedTiles)
      })
    )
    updatePreviousUsagesTilesIds(mapUsageTilesToTilesIds(usagesTiles))
    navigateToDashboardScreen()
  }

  const vfScreenProps = {
    closeButtonTestID: 'closeBTNtest',
    backButtonTestID: 'backBTNtest',
    showBack: showBackButton,
    onBack,
    onClose: navigateToDashboardScreen,
    titleTextHeaderAccessibilityLabel: testID(
      'EditDashboardTilesScreen_Header_Title'
    )!,
    clearStatusBarEntries: false
  }

  return usagesTilesLoadingStatus === ThunkStatus.PENDING ? (
    <ShimmerScreen
      title="edit_usage_cards_screen_title"
      withHeaderSpace
      testID="EditDashboardTiles_Shimmer_VFScreen"
      shimmerContainerStyle={styles.shimmerContainerStyle}
      shimmerContainerTestID="EditDashboardTiles_Shimmer_VFScreen_Shimmer_Wrapper"
      loadingConfig={loadingConfig}
      {...vfScreenProps}
    />
  ) : (
    <EditDashboardTilesScreen
      selectedTiles={selectedTiles}
      optionalTiles={optionalTiles}
      onConfirm={onConfirm}
      vfScreen={vfScreenProps}
      images={Images}
      minimumSelectedTiles={1}
    />
  )
}

export default EditDashboardTiles
