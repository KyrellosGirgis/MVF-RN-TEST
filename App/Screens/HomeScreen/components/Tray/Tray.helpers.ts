import { TrayTabsConfig } from 'App/Screens/HomeScreen/components/Tray/Tray.config'

import { store, StoreType } from 'App/Redux'

import { UserDataServicesTypes } from 'App/Services/API/Requests/userData/userData.d'

import UserAuthLevels from 'App/Utils/Enums/UserAuthLevels'
import NavigationFunctions from 'App/Containers/AppNavigation/NavigationFunctions'
import Routes from 'App/Containers/AppNavigation/Routes'
import { ThunkStatus } from 'App/Redux/StoreType.d'

const mapCurrentSubscriptionsToExpandedProducts = () => {
  const productsSubscriptions =
    store.getState()?.appUserData?.userAccountVBO?.subscriptions

  return Object.keys(productsSubscriptions).reduce((result, key) => {
    productsSubscriptions[key].length &&
      result.push({
        id: TrayTabsConfig[key]?.id,
        name: TrayTabsConfig[key]?.title,
        products: productsSubscriptions[key]
      })
    return result
  }, [])
}

const getScreenNameForSubscripionType = () => {
  const { currentlyActiveSubscription } = store.getState().appUserData
  const screensNamesForSubscripionType = {
    [UserDataServicesTypes.mobile]: currentlyActiveSubscription?.hasBanAccess
      ? Routes.AddressesOverview
      : Routes.DummyTempErrorScreen,
    [UserDataServicesTypes.fixednet]: Routes.AddressesOverview,
    [UserDataServicesTypes.cable]: Routes.DummyTempErrorScreen,
    [UserDataServicesTypes.unitymedia]: Routes.DummyTempErrorScreen
  }
  return screensNamesForSubscripionType[currentlyActiveSubscription?.type]
}

const navigateToAddressesOverviewScreen = () => {
  NavigationFunctions.navigate(getScreenNameForSubscripionType())
}

const navigateToChangePasswordScreen = (authLevel: string) => {
  authLevel == UserAuthLevels.WEB
    ? NavigationFunctions.navigate(Routes.ChangePasswordScreen)
    : NavigationFunctions.navigate(Routes.DummyTempErrorScreen, {
        message: 'change_password_uneleigible_error_message'
      })
}

const selectAndMapSomeAppUserData = ({
  appUserData: { userAccountVBO, appUserDataLoadingStatus }
}: StoreType) => ({
  userAccountVBO,
  isLoading: appUserDataLoadingStatus === ThunkStatus.PENDING
})

export {
  mapCurrentSubscriptionsToExpandedProducts,
  navigateToChangePasswordScreen,
  navigateToAddressesOverviewScreen,
  selectAndMapSomeAppUserData
}
