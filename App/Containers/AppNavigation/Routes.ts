import { GenericObject } from 'App/types'

const Routes = {
  HomeScreen: 'HomeScreen',
  WebViewScreen: 'WebViewScreen',
  PhoneLoginScreen: 'PhoneLoginScreen',
  EditDashboardTiles: 'EditDashboardTiles',
  Settings: 'Settings',
  OnBoarding: 'OnBoarding',
  PreOnBoarding: 'PreOnBoarding',
  PrivacySettings: 'PrivacySettings',
  PersonalPreferences: 'PersonalPreferences',
  ContactPreferences: 'ContactPreferences',
  ThirdPartyTracking: 'ThirdPartyTracking',
  EmptyScreen: 'EmptyScreen',
  DevicePermissionsScreen: 'DevicePermissionsScreen',
  EditSmallTilesScreen: 'EditSmallTilesScreen',
  DeveloperSettingsScreen: 'DeveloperSettingsScreen',
  BillDetails: 'BillDetails',
  MessageCenterScreen: 'MessageCenterScreen',
  BillLanding: 'BillLanding',
  DummyTempErrorScreen: 'DummyTempErrorScreen',
  SpeedCheckerScreen: 'SpeedCheckerScreen',
  NetworkRequestsLoggerScreen: 'NetworkRequestsLoggerScreen',
  MessageDetailsScreen: 'MessageDetailsScreen',
  EncryptedStorageLogs: 'EncryptedStorageLogs',
  ProductsAndServicesScreen: 'ProductsAndServicesScreen',
  ChangePasswordScreen: 'ChangePasswordScreen',
  AddressesOverview: 'AddressesOverview',
  ChangingAddressScreen: 'ChangingAddressScreen',
  LoginPlaceholder: 'LoginPlaceholder',
  BalanceHistoryFilterCalendarScreen: 'BalanceHistoryFilterCalendarScreen',
  AddOnsShopScreen: 'AddOnsShopScreen',
  AddonsDetailsScreen: 'AddonsDetailsScreen',
  ImprintDetailsScreen: 'ImprintDetailsScreen',
  TermsOfUseScreen: 'TermsOfUseScreen',
  TopUpMethodsScreen: 'TopUpMethodsScreen'
}

export const DEEPLINKS_SCREENS: GenericObject = {
  home: Routes.HomeScreen,
  consumption_tile_customization: Routes.EditDashboardTiles,
  app_settings: Routes.Settings,
  dunning_internal_browser: Routes.BillLanding,
  bill_landing: Routes.BillLanding
}

export const closeAppOnBackRoutes = [Routes.HomeScreen, Routes.PhoneLoginScreen]

export const SplashTransitionAnimationRoutes = [
  Routes.HomeScreen,
  Routes.OnBoarding
]

export default Routes
