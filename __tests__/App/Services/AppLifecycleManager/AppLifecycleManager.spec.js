/* eslint-disable import/namespace */
import { Platform } from 'react-native'

import RNConfig from 'react-native-config'

import * as executeAppLaunchingTasksHelpers from 'App/Services/AppLifecycleManager/helpers/executeAppLaunchingTasks.helpers'
import * as UrbanAirshipManager from 'App/Services/SDKsManagment/SDKs/UrbanAirship/UrbanAirshipManager'
import * as UrbanAirshipTagsManager from 'App/Services/SDKsManagment/SDKs/UrbanAirship/TagsManager'
import { AppLifecycleManager } from 'App/Services/AppLifecycleManager/AppLifecycleManager'
import * as keysHelper from 'App/Services/Keys/Keys.helper'
import * as phoneAppSetting from 'App/Utils/Helpers/phoneAppSetting.ios'
import * as executeAppBootstrapTasksHelpers from 'App/Services/AppLifecycleManager/helpers/executeAppBootstrapTasks.helpers'
import * as SDKsManger from 'App/Services/SDKsManagment/SDKsManger'
import * as dateHelpers from 'App/Utils/Helpers/date.helpers'
import * as cmsHelper from 'App/Services/API/Requests/CMS/CMS.helper'
import * as thirdPartyPermissionsHelper from 'App/Services/API/Requests/ThirdPartyPermissions/ThirdPartyPermissions.helper'
import * as legacyHelpers from 'App/Services/API/Interceptors/Helpers/Legacy.helpers'
import * as LogoutHelper from 'App/Screens/Login/Implementations/LogoutImplementation/LogoutImplementation.helper'
import * as CookiesManagerServices from 'App/Services/CookiesManager/CookiesManager'
import { settingCoreTestIds } from 'App/Utils/testIds/settingTestIds.helpers'
import storageCacheStore from 'App/Services/StorageWrappers/StorageCacheStore/StorageCacheStore'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'
import Routes from 'App/Containers/AppNavigation/Routes'
import { store } from 'App/Redux'
import { NavigationFunctions } from 'App/Containers'
import * as CMS from 'App/Services/API/Requests/CMS/CMS'
import { appActions } from 'App/Redux/reducers/AppReducer/app.reducer'

jest.mock('App/Utils/testIds/settingTestIds.helpers', () => {
  return {
    settingCoreTestIds: jest.fn()
  }
})

describe('AppLifecycleMethods', () => {
  beforeAll(() => {
    executeAppLaunchingTasksHelpers.requestAppTrackingPermission = jest.fn()
    UrbanAirshipManager.startAirship = jest.fn()
    EncryptedStorage.setItem = jest.fn()
    UrbanAirshipManager.stopAirship = jest.fn()
    UrbanAirshipManager.setUrbanAirshipUserDetails = jest.fn()
    UrbanAirshipManager.clearUrbanAirshipUserDetails = jest.fn()
    UrbanAirshipTagsManager.setupUrbanAirshipTags = jest.fn()
    UrbanAirshipTagsManager.removeAllUrbanAirshipTags = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('executeAppLaunchingTasksHelpers', () => {
    it('should call requestAppTrackingPermission if platform is ios', () => {
      Platform.OS = 'ios'
      AppLifecycleManager.executeHomeScreenLaunchingTasks()
      expect(
        executeAppLaunchingTasksHelpers.requestAppTrackingPermission
      ).toHaveBeenCalled()
    })

    it.skip('should not call requestAppTrackingPermission if platform is not ios', () => {
      AppLifecycleManager.executeHomeScreenLaunchingTasks()
      expect(
        executeAppLaunchingTasksHelpers.requestAppTrackingPermission
      ).toHaveBeenCalled()
    })

    it('should  call setUrbanAirshipUserDetails method ', () => {
      AppLifecycleManager.executeHomeScreenLaunchingTasks()
      expect(UrbanAirshipManager.setUrbanAirshipUserDetails).toHaveBeenCalled()
    })
  })

  describe('executeAppBootstrapTasks', () => {
    keysHelper.setAppBridgeValues = jest.fn()
    phoneAppSetting.addIOSAppDataResetingListener = jest.fn()
    executeAppBootstrapTasksHelpers.setAppKey = jest.fn()
    executeAppBootstrapTasksHelpers.activateFlexShakeListenerForIOS = jest.fn()
    executeAppBootstrapTasksHelpers.activateDeveloperSettings = jest.fn()
    executeAppBootstrapTasksHelpers.initNetworkRequestsLoggger = jest.fn()
    UrbanAirshipManager.initializeUrbanAirship = jest.fn()
    SDKsManger.updateSDKsStatus = jest.fn()
    dateHelpers.setMomentLocale = jest.fn()
    executeAppBootstrapTasksHelpers.initializeDeeplinksHandling = jest.fn()
    CMS.updateCMS = jest.fn()
    const keys = '{"keyAPI_KEY": "1234", "CLIENT_ID": "1234"}'

    it('should start Bootstrap Tasks when call executeAppBootstrapTasks method in PRODUCTION env', async () => {
      RNConfig.IS_PRODUCTION = 'true'

      await AppLifecycleManager.executeAppBootstrapTasks({
        keys: keys
      })

      expect(keysHelper.setAppBridgeValues).toHaveBeenCalled()
      expect(CMS.updateCMS).toHaveBeenCalled()
      expect(phoneAppSetting.addIOSAppDataResetingListener).toHaveBeenCalled()
      expect(settingCoreTestIds).toHaveBeenCalled()
      expect(executeAppBootstrapTasksHelpers.setAppKey).toHaveBeenCalled()
      expect(UrbanAirshipManager.initializeUrbanAirship).toHaveBeenCalled()
      expect(
        executeAppBootstrapTasksHelpers.activateFlexShakeListenerForIOS
      ).toHaveBeenCalledTimes(0)
      expect(
        executeAppBootstrapTasksHelpers.activateDeveloperSettings
      ).toHaveBeenCalledTimes(0)
      expect(
        executeAppBootstrapTasksHelpers.initNetworkRequestsLoggger
      ).toHaveBeenCalledTimes(0)
      expect(SDKsManger.updateSDKsStatus).toHaveBeenCalled()
      expect(dateHelpers.setMomentLocale).toHaveBeenCalled()
      expect(
        executeAppBootstrapTasksHelpers.initializeDeeplinksHandling
      ).toHaveBeenCalled()
    })

    it('should start Bootstrap Tasks when call executeAppBootstrapTasks method in not PRODUCTION env', async () => {
      RNConfig.IS_PRODUCTION = 'false'

      await AppLifecycleManager.executeAppBootstrapTasks({
        keys: keys
      })

      expect(keysHelper.setAppBridgeValues).toHaveBeenCalled()
      expect(phoneAppSetting.addIOSAppDataResetingListener).toHaveBeenCalled()
      expect(executeAppBootstrapTasksHelpers.setAppKey).toHaveBeenCalled()
      expect(UrbanAirshipManager.initializeUrbanAirship).toHaveBeenCalled()
      expect(SDKsManger.updateSDKsStatus).toHaveBeenCalled()
      expect(
        executeAppBootstrapTasksHelpers.activateFlexShakeListenerForIOS
      ).toHaveBeenCalled()
      expect(
        executeAppBootstrapTasksHelpers.activateDeveloperSettings
      ).toHaveBeenCalled()
      expect(
        executeAppBootstrapTasksHelpers.initNetworkRequestsLoggger
      ).toHaveBeenCalled()
      expect(dateHelpers.setMomentLocale).toHaveBeenCalled()
      expect(
        executeAppBootstrapTasksHelpers.initializeDeeplinksHandling
      ).toHaveBeenCalled()
      expect(CMS.updateCMS).toHaveBeenCalled()
    })
  })

  describe('executeOnForegroundTasks', () => {
    cmsHelper.fetchAndStoreRemoteCMSIfNeeded = jest.fn()
    thirdPartyPermissionsHelper.executeThirPartyPermissionsFlow = jest.fn()
    legacyHelpers.refreshCookiesOnForegroundIfNeeded = jest.fn()
    const props = jest.fn()

    it('should start onForeground Tasks when callexecuteOnForegroundTasks method', () => {
      AppLifecycleManager.executeOnForegroundTasks(props)

      expect(cmsHelper.fetchAndStoreRemoteCMSIfNeeded).toHaveBeenCalled()
      expect(
        thirdPartyPermissionsHelper.executeThirPartyPermissionsFlow
      ).toHaveBeenCalled()
      expect(
        legacyHelpers.refreshCookiesOnForegroundIfNeeded
      ).toHaveBeenCalled()
      expect(props).toHaveBeenCalled()
    })
  })

  describe('executeOnBackgroundTasks', () => {
    const props = jest.fn()

    it('should start onBackground Tasks when callexecuteOnBackgroundTasks method', () => {
      AppLifecycleManager.executeOnBackgroundTasks(props)
      expect(props).toHaveBeenCalled()
    })
  })

  describe('executeOnSubscriptionSwitchTasks', () => {
    thirdPartyPermissionsHelper.executeThirPartyPermissionsFlow = jest.fn()

    it('should start OnProductSwitch Tasks when call executeOnSubscriptionSwitchTasks method', async () => {
      await AppLifecycleManager.executeOnSubscriptionSwitchTasks()

      expect(
        thirdPartyPermissionsHelper.executeThirPartyPermissionsFlow
      ).toHaveBeenCalled()
      expect(
        UrbanAirshipManager.clearUrbanAirshipUserDetails
      ).toHaveBeenCalled()
      expect(UrbanAirshipManager.setUrbanAirshipUserDetails).toHaveBeenCalled()
      expect(UrbanAirshipTagsManager.setupUrbanAirshipTags).toHaveBeenCalled()
    })
  })

  describe('executeOnLogoutTasks', () => {
    LogoutHelper.clearUnNeededReduxData = jest.fn()
    LogoutHelper.clearUnNeededEncryptedStorage = jest.fn()
    LogoutHelper.resetAllSDKsToDefaultState = jest.fn()
    CookiesManagerServices.clearStorageAndOSCookies = jest.fn()
    LogoutHelper.clearLoginCrendentialsAndTokens = jest.fn()
    storageCacheStore.clear = jest.fn()

    it('should start onLogout Tasks when call executeOnLogoutTasks method', async () => {
      await AppLifecycleManager.executeOnLogoutTasks()
      expect(CookiesManagerServices.clearStorageAndOSCookies).toHaveBeenCalled()
      expect(
        UrbanAirshipManager.clearUrbanAirshipUserDetails
      ).toHaveBeenCalled()
      expect(
        UrbanAirshipTagsManager.removeAllUrbanAirshipTags
      ).toHaveBeenCalled()
      expect(LogoutHelper.clearLoginCrendentialsAndTokens).toHaveBeenCalled()
      expect(storageCacheStore.clear).toHaveBeenCalled()
      expect(LogoutHelper.clearUnNeededReduxData).toHaveBeenCalled()
      expect(LogoutHelper.clearUnNeededEncryptedStorage).toHaveBeenCalled()
      expect(LogoutHelper.resetAllSDKsToDefaultState).toHaveBeenCalled()
    })
  })

  describe('executeOnBanLevelLoginTasks', () => {
    LogoutHelper.clearUnNeededReduxData = jest.fn()
    LogoutHelper.resetAllSDKsToDefaultState = jest.fn()
    storageCacheStore.clear = jest.fn()

    it('should call ban level login tasks as expected', async () => {
      await AppLifecycleManager.executeOnBanLevelLoginTasks()

      expect(EncryptedStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEYS.isBiometricsOn,
        'false'
      )
      expect(EncryptedStorage.setItem).toHaveBeenCalledWith(
        STORAGE_KEYS.isOnboardingFinished,
        'false'
      )
      expect(storageCacheStore.clear).toHaveBeenCalled()
      expect(LogoutHelper.clearUnNeededReduxData).toHaveBeenCalled()
      expect(LogoutHelper.resetAllSDKsToDefaultState).toHaveBeenCalled()
    })
  })

  describe('executeOnLoginEndTasks test', () => {
    it('should call executeOnLoginEndTasks flow successfully', async () => {
      store.dispatch = jest.fn()
      legacyHelpers.setLastCookieRefreshDate = jest.fn()
      NavigationFunctions.navigateWithResetAction = jest.fn()

      await AppLifecycleManager.executeOnLoginEndTasks(true)

      expect(legacyHelpers.setLastCookieRefreshDate).toHaveBeenCalledTimes(1)
      expect(NavigationFunctions.navigateWithResetAction).toHaveBeenCalledWith(
        Routes.OnBoarding,
        {
          animateSplash: true
        }
      )
      expect(store.dispatch).toHaveBeenCalledWith(
        appActions.setIsLoggedIn(true)
      )
    })
  })
})
