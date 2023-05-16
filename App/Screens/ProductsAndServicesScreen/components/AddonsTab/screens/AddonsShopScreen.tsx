import React from 'react'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'
import { AddOnsShopScreen } from '@vfgroup-oneplatform/framework/AddOns'

import { Images, getThemeImages } from 'App/Themes'

import { ADDONS_ACTIONS } from 'App/Screens/ProductsAndServicesScreen/components/AddonsTab/Addons.d'

import { NavigationFunctions } from 'App/Containers'
import { useApiCall } from 'App/Hooks'
import { loadAddonsShopData } from 'App/Services/API/Requests/Addons/Addons.requests'
import Routes from 'App/Containers/AppNavigation/Routes'
import { testID } from 'App/Utils/Helpers/testId.helpers'

const AddonsShopScreen = () => {
  const { responseData, isError, isLoading, refresh } =
    useApiCall(loadAddonsShopData)
  const theme = useTheme()
  const images = { ...Images, ...getThemeImages(theme.name) }
  const handlePressAddOnItem = (item) => {
    NavigationFunctions.navigate(Routes.AddonsDetailsScreen, {
      addOnItem: item,
      actionType: ADDONS_ACTIONS.BUY
    })
  }

  return (
    <AddOnsShopScreen
      testID={testID('AddOnsShopScreen')}
      onClose={() => NavigationFunctions.goBack()}
      onBack={() => NavigationFunctions.goBack()}
      isLoading={isLoading}
      addOnsData={responseData ?? []}
      withCategories={responseData?.length > 0}
      images={images}
      onItemPress={handlePressAddOnItem}
      isError={isError}
      errorText={'shop_addons_screen_error_message'}
      onTryAgainPress={refresh}
    />
  )
}
export default AddonsShopScreen
