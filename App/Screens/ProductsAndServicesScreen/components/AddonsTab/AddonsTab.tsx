import React, { useEffect } from 'react'
import { AddOns } from '@vfgroup-oneplatform/framework/AddOns'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { useDispatch, useSelector } from 'react-redux'

import { Images, getThemeImages } from 'App/Themes'

import { ADDONS_ACTIONS } from 'App/Screens/ProductsAndServicesScreen/components/AddonsTab/Addons.d'

import { NavigationFunctions } from 'App/Containers'
import Routes from 'App/Containers/AppNavigation/Routes'
import { ThunkStatus } from 'App/Redux/StoreType.d'
import { fetchAddons } from 'App/Redux/Addons/addons.thunk'

const AddonsTab = () => {
  const theme = useTheme()
  const images = { ...Images, ...getThemeImages(theme.name) }

  const dispatch = useDispatch()
  const {
    addOnsCurrentPlan,
    inlineContentData,
    addonsData,
    isInlineContentEnabled,
    addonsLoadingStatus
  } = useSelector((state: any) => state.addons)

  const getAddons = () => {
    dispatch(fetchAddons())
  }
  useEffect(() => {
    getAddons()
  }, [])

  return (
    <AddOns
      currentPlan={addOnsCurrentPlan}
      errorText={'addons_error_text'}
      onTryAgainPress={getAddons}
      handleNavigateToAddonsShop={() => {
        NavigationFunctions.navigate(Routes.AddOnsShopScreen)
      }}
      isError={addonsLoadingStatus === ThunkStatus.REJECTED}
      isLoading={addonsLoadingStatus === ThunkStatus.PENDING}
      data={addonsData ?? [{}]}
      inlineContentData={{
        ...inlineContentData,
        leftIcon: images.roaming,
        rightIcon: images.roamingPassImage
      }}
      isInlineContentEnabled={isInlineContentEnabled}
      images={images}
      addOnsListIcon={images.icMenu}
      addOnsTimelineIcon={images.icActivity}
      onItemPress={(item) => {
        NavigationFunctions.navigate(Routes.AddonsDetailsScreen, {
          addOnItem: item,
          actionType: ADDONS_ACTIONS.REMOVE
        })
      }}
      onInlineContentPress={(addOnData) => {
        NavigationFunctions.navigate(Routes.AddonsDetailsScreen, {
          addOnItem: addOnData,
          actionType: ADDONS_ACTIONS.BUY,
          isOpenedThrowInLineContent: true
        })
      }}
      isTimeLineRefreshed={addonsLoadingStatus === ThunkStatus.PENDING}
    />
  )
}
export default AddonsTab
