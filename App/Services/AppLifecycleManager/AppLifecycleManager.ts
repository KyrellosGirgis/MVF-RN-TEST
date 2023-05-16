/* eslint-disable import/prefer-default-export */
import { LogBox } from 'react-native'
import RNConfig from 'react-native-config'

import { showPrivacyPermissionsOverlayIfNeeded } from './helpers/executeEndSplashAnimationTasks.helpers'

import { updateCMS } from 'App/Services/API/Requests/CMS/CMS'

import {
  removeAllUrbanAirshipTags,
  setupUrbanAirshipTags
} from 'App/Services/SDKsManagment/SDKs/UrbanAirship/TagsManager'

import {
  clearUnNeededEncryptedStorage,
  clearUnNeededReduxData,
  resetAllSDKsToDefaultState,
  clearLoginCrendentialsAndTokens
} from 'App/Screens/Login/Implementations/LogoutImplementation/LogoutImplementation.helper'
import { clearStorageAndOSCookies } from 'App/Services/CookiesManager/CookiesManager'
import { requestAppTrackingPermission } from 'App/Services/AppLifecycleManager/helpers/executeAppLaunchingTasks.helpers'

import { isIOS } from 'App/Utils/Helpers/generic.helpers'
import {
  setUrbanAirshipUserDetails,
  initializeUrbanAirship,
  clearUrbanAirshipUserDetails
} from 'App/Services/SDKsManagment/SDKs/UrbanAirship/UrbanAirshipManager'

import {
  addAirShipDeepLinksListener,
  addAirShipShowInboxListener
} from 'App/Services/SDKsManagment/SDKs/UrbanAirship/UrbanAirship.helpers'
import { executeThirPartyPermissionsFlow } from 'App/Services/API/Requests/ThirdPartyPermissions/ThirdPartyPermissions.helper'

import Config from 'App/Config'

import { setAppBridgeValues } from 'App/Services/Keys/Keys.helper'
import { updateSDKsStatus } from 'App/Services/SDKsManagment/SDKsManger'
import { store } from 'App/Redux'

import { addIOSAppDataResetingListener } from 'App/Utils/Helpers/phoneAppSetting.ios'
import {
  activateDeveloperSettings,
  activateFlexShakeListenerForIOS,
  initializeDeeplinksHandling,
  initNetworkRequestsLoggger,
  setAppKey
} from 'App/Services/AppLifecycleManager/helpers/executeAppBootstrapTasks.helpers'

import {
  refreshCookiesOnForegroundIfNeeded,
  setLastCookieRefreshDate
} from 'App/Services/API/Interceptors/Helpers/Legacy.helpers'
import { fetchAndStoreRemoteCMSIfNeeded } from 'App/Services/API/Requests/CMS/CMS.helper'
import { setMomentLocale } from 'App/Utils/Helpers/date.helpers'
import { settingCoreTestIds } from 'App/Utils/testIds/settingTestIds.helpers'
import StorageCacheStore from 'App/Services/StorageWrappers/StorageCacheStore/StorageCacheStore'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'
import NavigationFunctions from 'App/Containers/AppNavigation/NavigationFunctions'
import Routes from 'App/Containers/AppNavigation/Routes'
import { appActions } from 'App/Redux/reducers/AppReducer/app.reducer'
import { fetchDashboardSkeleton } from 'App/Redux/reducers/DashboardSkeleton/dashboardSkeleton.thunk'

async function executeHomeScreenLaunchingTasks() {
  isIOS && requestAppTrackingPermission()
  await setUrbanAirshipUserDetails()
  await setupUrbanAirshipTags()
  addAirShipShowInboxListener()
  addAirShipDeepLinksListener()
  executeThirPartyPermissionsFlow({ ignoreCache: true })
}

const executeAppBootstrapTasks = async ({ keys }: any) => {
  setAppBridgeValues(JSON.parse(keys))
  settingCoreTestIds()
  await addIOSAppDataResetingListener()
  LogBox.ignoreAllLogs(Config.disableYellowBox)
  await setAppKey()
  await updateCMS()
  if (RNConfig.IS_PRODUCTION === 'false') {
    activateFlexShakeListenerForIOS()
    activateDeveloperSettings()
    initNetworkRequestsLoggger()
  }
  await initializeUrbanAirship()
  updateSDKsStatus(
    store.getState().userThirdPartyPermissions.userThirdPartyPermissions
  )
  await setMomentLocale()
  await initializeDeeplinksHandling()
}

const executeEndSplashAnimationTasks = () => {
  showPrivacyPermissionsOverlayIfNeeded()
}

const executeOnForegroundTasks = (onForgroundCallback: Function) => {
  fetchAndStoreRemoteCMSIfNeeded()
  executeThirPartyPermissionsFlow({ ignoreCache: false })
  refreshCookiesOnForegroundIfNeeded()
  onForgroundCallback()
}

const executeOnBackgroundTasks = (onBackgroundCallback: Function) => {
  onBackgroundCallback()
}

const executeOnSubscriptionSwitchTasks = async () => {
  await executeThirPartyPermissionsFlow({ ignoreCache: true })
  await clearUrbanAirshipUserDetails()
  await setUrbanAirshipUserDetails()
  await setupUrbanAirshipTags()
  store.dispatch(fetchDashboardSkeleton())
}

const executeOnBanLevelLoginTasks = async () => {
  await EncryptedStorage.setItem(STORAGE_KEYS.isBiometricsOn, 'false')
  await EncryptedStorage.setItem(STORAGE_KEYS.isOnboardingFinished, 'false')
  await EncryptedStorage.removeItem(STORAGE_KEYS.hashing)
  await StorageCacheStore.clear()
  clearUnNeededReduxData()
  resetAllSDKsToDefaultState()
}

const executeOnLogoutTasks = async () => {
  try {
    await clearUrbanAirshipUserDetails()
    await removeAllUrbanAirshipTags()
    await clearStorageAndOSCookies()
    await clearLoginCrendentialsAndTokens()
    await StorageCacheStore.clear()
    await clearUnNeededEncryptedStorage()
    clearUnNeededReduxData()
    resetAllSDKsToDefaultState()
  } catch (error) {}
}

const executeOnLoginEndTasks = async (animateSplash: boolean) => {
  store.dispatch(appActions.setIsLoggedIn(true))
  await setLastCookieRefreshDate()
  NavigationFunctions.navigateWithResetAction(Routes.OnBoarding, {
    animateSplash: animateSplash
  })
}

export const AppLifecycleManager = {
  executeAppBootstrapTasks,
  executeHomeScreenLaunchingTasks,
  executeEndSplashAnimationTasks,
  executeOnForegroundTasks,
  executeOnBackgroundTasks,
  executeOnSubscriptionSwitchTasks,
  executeOnLogoutTasks,
  executeOnBanLevelLoginTasks,
  executeOnLoginEndTasks
}
