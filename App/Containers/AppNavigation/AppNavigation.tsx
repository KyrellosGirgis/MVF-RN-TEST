import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { LoginScreens } from '@vfgroup-oneplatform/login'
import { withSplash } from '@vfgroup-oneplatform/foundation/Splash'
import _pick from 'lodash/pick'

import Config from 'react-native-config'

import Routes from './Routes'

import { preventScreenShotsIfNeeded } from 'App/Containers/AppNavigation/AppNavigation.helpers'

import {
  EditDashboardTiles,
  HomeScreen,
  SettingsScreen,
  PreOnBoarding,
  OnBoarding,
  PrivacySettings,
  PersonalPreferences,
  ContactPreferences,
  ThirdPartyTracking,
  EmptyScreen,
  DevicePermissionsScreen,
  EditSmallTilesScreen,
  DeveloperSettings,
  BillLanding,
  DummyTempErrorScreen,
  BillDetails,
  MessageCenterScreen,
  MessageDetailsScreen,
  ChangePasswordScreen,
  AddressesOverviewScreen,
  ChangingAddressScreen,
  LoginPlaceholder,
  BalanceHistoryFilterCalendarScreen,
  AddonsShopScreen,
  AddonDetailsScreen,
  ImprintDetailsScreen,
  TermsOfUseScreen,
  WebViewScreen,
  SpeedCheckerScreen,
  ProductsAndServicesScreen,
  TopUpMethodsScreen
} from 'App/Screens'

import DeveloperSettingsEntryPoint from 'App/Screens/DeveloperSettings/components/DeveloperSettingsEntryPoint/DeveloperSettingsEntryPoint'
import EncryptedStorageLogs from 'App/Screens/DeveloperSettings/Screens/EncryptedStorageLogs/EncryptedStorageLogs'
import NetworkRequestsLoggerScreen from 'App/Screens/DeveloperSettings/Screens/NetworkRequestsLogger/NetworkRequestsLoggerScreen'

import {
  androidBackHandler,
  getCurrentScreenName
} from 'App/Utils/Helpers/generic.helpers'
import { useInitialScreenName, useBackHandler } from 'App/Hooks'
import { SplashProps } from 'App/types'

const Stack = createNativeStackNavigator()

interface AppProps extends SplashProps {}

function AppNavigation(appProps: AppProps) {
  const splashProps = _pick(appProps, [
    'setSplashLogoPosition',
    'setSplashColor',
    'startSplashEndingAnimation',
    'setSplashMode',
    'dismissSplash',
    'endingDuration'
  ])

  const [isDefaultLoginScreen, setIsDefaultLoginScreen] =
    useState<Boolean>(true)

  useBackHandler(() => androidBackHandler())

  const [initialScreenName, initialScreenParams] = useInitialScreenName()

  const onStateChange = async () => {
    const screenName = await getCurrentScreenName()

    setIsDefaultLoginScreen(screenName !== Routes.PhoneLoginScreen)

    preventScreenShotsIfNeeded(screenName)
  }

  return initialScreenName ? (
    <NavigationContainer
      ref={(navRef) => {
        AppNavRef = navRef
      }}
      theme={{ colors: { background: 'transparent' } }}
    >
      {Config.IS_PRODUCTION === 'false' && <DeveloperSettingsEntryPoint />}

      <Stack.Navigator
        initialRouteName={initialScreenName}
        screenOptions={{ headerShown: false, animation: 'none' }}
        screenListeners={{ state: onStateChange }}
      >
        {isDefaultLoginScreen && (
          <Stack.Screen
            name={Routes.LoginPlaceholder}
            initialParams={
              initialScreenParams || {
                enableSeamless: true,
                enableSplashAnimation: true
              }
            }
          >
            {() => <LoginPlaceholder splashProps={splashProps} />}
          </Stack.Screen>
        )}

        <Stack.Screen
          name={Routes.HomeScreen}
          options={{ gestureEnabled: false }}
          initialParams={{ animateSplash: true }}
        >
          {(props) => <HomeScreen {...props} splashProps={splashProps} />}
        </Stack.Screen>

        <Stack.Screen name={Routes.EditDashboardTiles}>
          {() => <EditDashboardTiles />}
        </Stack.Screen>

        <Stack.Screen name={Routes.EditSmallTilesScreen}>
          {() => <EditSmallTilesScreen />}
        </Stack.Screen>

        <Stack.Screen name={Routes.Settings}>
          {() => <SettingsScreen />}
        </Stack.Screen>

        <Stack.Screen name={Routes.WebViewScreen}>
          {(props) => <WebViewScreen {...props} />}
        </Stack.Screen>

        <Stack.Screen
          name={Routes.OnBoarding}
          initialParams={{ animateSplash: true }}
        >
          {(props) => <OnBoarding {...props} splashProps={splashProps} />}
        </Stack.Screen>

        <Stack.Screen
          name={Routes.PreOnBoarding}
          initialParams={{ animateSplash: true }}
        >
          {() => <PreOnBoarding splashProps={splashProps} />}
        </Stack.Screen>

        <Stack.Screen name={Routes.PrivacySettings}>
          {() => <PrivacySettings />}
        </Stack.Screen>

        <Stack.Screen name={Routes.PersonalPreferences}>
          {() => <PersonalPreferences />}
        </Stack.Screen>

        <Stack.Screen name={Routes.ContactPreferences}>
          {() => <ContactPreferences />}
        </Stack.Screen>

        <Stack.Screen name={Routes.ThirdPartyTracking}>
          {() => <ThirdPartyTracking />}
        </Stack.Screen>

        <Stack.Screen name={Routes.EmptyScreen}>
          {() => <EmptyScreen />}
        </Stack.Screen>

        <Stack.Screen name={Routes.DevicePermissionsScreen}>
          {() => <DevicePermissionsScreen />}
        </Stack.Screen>

        <Stack.Screen name={Routes.EncryptedStorageLogs}>
          {() => <EncryptedStorageLogs />}
        </Stack.Screen>

        <Stack.Screen name={Routes.BillLanding}>
          {() => <BillLanding />}
        </Stack.Screen>

        <Stack.Screen name={Routes.DummyTempErrorScreen}>
          {(props) => <DummyTempErrorScreen {...props} />}
        </Stack.Screen>

        <Stack.Screen name={Routes.BillDetails}>
          {() => <BillDetails />}
        </Stack.Screen>

        <Stack.Screen name={Routes.MessageCenterScreen}>
          {() => <MessageCenterScreen />}
        </Stack.Screen>

        <Stack.Screen name={Routes.MessageDetailsScreen}>
          {() => <MessageDetailsScreen />}
        </Stack.Screen>

        <Stack.Screen name={Routes.SpeedCheckerScreen}>
          {() => <SpeedCheckerScreen />}
        </Stack.Screen>

        <Stack.Screen name={Routes.DeveloperSettingsScreen}>
          {() => <DeveloperSettings />}
        </Stack.Screen>

        <Stack.Screen name={Routes.NetworkRequestsLoggerScreen}>
          {() => <NetworkRequestsLoggerScreen />}
        </Stack.Screen>

        <Stack.Screen name={Routes.AddressesOverview}>
          {() => <AddressesOverviewScreen />}
        </Stack.Screen>

        <Stack.Screen name={Routes.ChangingAddressScreen}>
          {() => <ChangingAddressScreen />}
        </Stack.Screen>

        {Object.keys(LoginScreens).map((path) => {
          const LoginScreen = LoginScreens[path].screen
          return (
            <Stack.Screen name={path}>
              {(props) => <LoginScreen {...props} screenProps={splashProps} />}
            </Stack.Screen>
          )
        })}

        <Stack.Screen name={Routes.ProductsAndServicesScreen}>
          {() => <ProductsAndServicesScreen />}
        </Stack.Screen>

        <Stack.Screen name={Routes.ChangePasswordScreen}>
          {() => <ChangePasswordScreen />}
        </Stack.Screen>

        <Stack.Screen name={Routes.BalanceHistoryFilterCalendarScreen}>
          {() => <BalanceHistoryFilterCalendarScreen />}
        </Stack.Screen>

        <Stack.Screen name={Routes.AddOnsShopScreen}>
          {() => <AddonsShopScreen />}
        </Stack.Screen>

        <Stack.Screen name={Routes.AddonsDetailsScreen}>
          {() => <AddonDetailsScreen />}
        </Stack.Screen>

        <Stack.Screen
          name={Routes.TopUpMethodsScreen}
          options={{ presentation: 'transparentModal' }}
        >
          {() => <TopUpMethodsScreen />}
        </Stack.Screen>

        <Stack.Screen name={Routes.ImprintDetailsScreen}>
          {() => <ImprintDetailsScreen />}
        </Stack.Screen>

        <Stack.Screen name={Routes.TermsOfUseScreen}>
          {() => <TermsOfUseScreen />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  ) : null
}
export let AppNavRef = {}

export default withSplash(AppNavigation, { logoSize: 32 })
