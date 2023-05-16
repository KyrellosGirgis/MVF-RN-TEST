/* eslint-disable import/namespace */

import * as AdjustHelper from 'App/Services/SDKsManagment/SDKs/Adjust/AdjustManager'
import * as AppDynamicsHelper from 'App/Services/SDKsManagment/SDKs/AppDynamics/appDynamics'
import * as CrashlyticsHelper from 'App/Services/SDKsManagment/SDKs/Crashlytics/Crashlytics'
import * as UrbanAirshipHelper from 'App/Services/SDKsManagment/SDKs/UrbanAirship/UrbanAirship.helpers'
import * as NetperformHelper from 'App/Services/SDKsManagment/SDKs/NetPerform/NetperformInitializer'
import * as TealiumAnalyticsHelper from 'App/Services/SDKsManagment/SDKs/TealiumAnalyticsManager/TealiumAnalyticsManager'
import * as AdobeAnalyticsTracking from 'App/Services/SDKsManagment/SDKs/Adobe/AdobeAnalyticsTracking/AdobeAnalyticsTracking'
import * as AdobeAudienceManager from 'App/Services/SDKsManagment/SDKs/Adobe/AdobeAudienceManager/AdobeAudienceManager'
import * as AdobeTargetOffers from 'App/Services/SDKsManagment/SDKs/Adobe/AdobeTargetOffers/AdobeTargetOffers'
import { updateSDKsStatus } from 'App/Services/SDKsManagment/SDKsManger'

describe('Testing SDKs Manger with different permissions', () => {
  CrashlyticsHelper.startCrashlytics = jest.fn()
  UrbanAirshipHelper.enableAirshipTags = jest.fn()
  NetperformHelper.startNetperform = jest.fn()
  NetperformHelper.startPersonalizedNetperform = jest.fn()
  TealiumAnalyticsHelper.startTealium = jest.fn()
  AdjustHelper.startAdjust = jest.fn()
  AppDynamicsHelper.startAppDynamics = jest.fn()
  AdobeAnalyticsTracking.startAdobeAnalyticsTracking = jest.fn()
  AdobeAudienceManager.startAdobeAudienceManager = jest.fn()
  AdobeTargetOffers.startAdobeTargetOffers = jest.fn()
  CrashlyticsHelper.stopCrashlytics = jest.fn()
  UrbanAirshipHelper.disableAirshipTags = jest.fn()
  NetperformHelper.stopNetperform = jest.fn()
  NetperformHelper.stopPersonalizedNetperform = jest.fn()
  TealiumAnalyticsHelper.stopTealium = jest.fn()
  AdjustHelper.stopAdjust = jest.fn()
  AppDynamicsHelper.stopAppDynamics = jest.fn()
  AdobeAnalyticsTracking.stopAdobeAnalyticsTracking = jest.fn()
  AdobeAudienceManager.stopAdobeAudienceManager = jest.fn()
  AdobeTargetOffers.stopAdobeTargetOffers = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('Invoke netPerform SDK start method when calling updateSDKsStatus with granted network permission', () => {
    const userThirdPartyPermissions = {
      NetperformPermissions: {
        NetworkOptimizationPermission: true
      }
    }
    updateSDKsStatus(userThirdPartyPermissions)
    expect(NetperformHelper.startNetperform).toHaveBeenCalledTimes(1)
  })

  test('Invoke netPerform SDK stop method when calling updateSDKsStatus with denied network permission', () => {
    const userThirdPartyPermissions = {
      NetperformPermissions: {
        NetworkOptimizationPermission: false
      }
    }
    updateSDKsStatus(userThirdPartyPermissions)
    expect(NetperformHelper.stopNetperform).toHaveBeenCalledTimes(1)
  })

  test('Invoke default SDKs methods when calling updateSDKsStatus', () => {
    updateSDKsStatus()
    expect(CrashlyticsHelper.startCrashlytics).toHaveBeenCalledTimes(1)
    expect(UrbanAirshipHelper.enableAirshipTags).toHaveBeenCalledTimes(1)
    expect(AppDynamicsHelper.startAppDynamics).toHaveBeenCalledTimes(1)
    expect(
      AdobeAnalyticsTracking.startAdobeAnalyticsTracking
    ).toHaveBeenCalledTimes(1)
    expect(TealiumAnalyticsHelper.stopTealium).toHaveBeenCalledTimes(1)
    expect(AdjustHelper.stopAdjust).toHaveBeenCalledTimes(1)
    expect(AdobeAudienceManager.stopAdobeAudienceManager).toHaveBeenCalledTimes(
      1
    )
    expect(AdobeTargetOffers.stopAdobeTargetOffers).toHaveBeenCalledTimes(1)
  })

  test('Invoke specified SDKs methods when calling updateSDKsStatus with all true permissionsObj', () => {
    const userThirdPartyPermissions = {
      LIOM: true,
      LINBA: true,
      LIOPT: true
    }
    updateSDKsStatus(userThirdPartyPermissions)
    expect(CrashlyticsHelper.startCrashlytics).toHaveBeenCalledTimes(1)
    expect(UrbanAirshipHelper.enableAirshipTags).toHaveBeenCalledTimes(1)
    expect(TealiumAnalyticsHelper.startTealium).toHaveBeenCalledTimes(1)
    expect(AdjustHelper.startAdjust).toHaveBeenCalledTimes(1)
    expect(AppDynamicsHelper.startAppDynamics).toHaveBeenCalledTimes(1)
    expect(
      AdobeAnalyticsTracking.startAdobeAnalyticsTracking
    ).toHaveBeenCalledTimes(1)
    expect(
      AdobeAudienceManager.startAdobeAudienceManager
    ).toHaveBeenCalledTimes(1)
    expect(AdobeTargetOffers.startAdobeTargetOffers).toHaveBeenCalledTimes(1)
  })

  test('Invoke specified SDKs methods when calling updateSDKsStatus with all false permissionsObj', () => {
    const userThirdPartyPermissions = {
      LIOM: false,
      LINBA: false,
      LIOPT: false
    }
    updateSDKsStatus(userThirdPartyPermissions)
    expect(CrashlyticsHelper.stopCrashlytics).toHaveBeenCalledTimes(1)
    expect(UrbanAirshipHelper.disableAirshipTags).toHaveBeenCalledTimes(1)
    expect(TealiumAnalyticsHelper.stopTealium).toHaveBeenCalledTimes(1)
    expect(AdjustHelper.stopAdjust).toHaveBeenCalledTimes(1)
    expect(AppDynamicsHelper.stopAppDynamics).toHaveBeenCalledTimes(1)
    expect(
      AdobeAnalyticsTracking.stopAdobeAnalyticsTracking
    ).toHaveBeenCalledTimes(1)
    expect(AdobeAudienceManager.stopAdobeAudienceManager).toHaveBeenCalledTimes(
      1
    )
    expect(AdobeTargetOffers.stopAdobeTargetOffers).toHaveBeenCalledTimes(1)
  })

  test('Invoke specified SDKs methods when calling updateSDKsStatus with LIOM=on/LINBA=on/LIOPT=off permissionsObj', () => {
    const userThirdPartyPermissions = {
      LIOM: true,
      LINBA: true,
      LIOPT: false
    }
    updateSDKsStatus(userThirdPartyPermissions)
    expect(UrbanAirshipHelper.enableAirshipTags).toHaveBeenCalledTimes(1)
    expect(AdjustHelper.startAdjust).toHaveBeenCalledTimes(1)
    expect(
      AdobeAudienceManager.startAdobeAudienceManager
    ).toHaveBeenCalledTimes(1)
    expect(AdobeTargetOffers.startAdobeTargetOffers).toHaveBeenCalledTimes(1)
    expect(CrashlyticsHelper.stopCrashlytics).toHaveBeenCalledTimes(1)
    expect(TealiumAnalyticsHelper.stopTealium).toHaveBeenCalledTimes(1)
    expect(AppDynamicsHelper.stopAppDynamics).toHaveBeenCalledTimes(1)
    expect(
      AdobeAnalyticsTracking.stopAdobeAnalyticsTracking
    ).toHaveBeenCalledTimes(1)
  })

  test('Invoke specified SDKs methods when calling updateSDKsStatus with LIOM=on/LINBA=off/LIOPT=on permissionsObj', () => {
    const userThirdPartyPermissions = {
      LIOM: true,
      LINBA: false,
      LIOPT: true
    }
    updateSDKsStatus(userThirdPartyPermissions)
    expect(CrashlyticsHelper.startCrashlytics).toHaveBeenCalledTimes(1)
    expect(UrbanAirshipHelper.enableAirshipTags).toHaveBeenCalledTimes(1)
    expect(TealiumAnalyticsHelper.startTealium).toHaveBeenCalledTimes(1)
    expect(AdjustHelper.startAdjust).toHaveBeenCalledTimes(1)
    expect(AppDynamicsHelper.startAppDynamics).toHaveBeenCalledTimes(1)
    expect(
      AdobeAnalyticsTracking.startAdobeAnalyticsTracking
    ).toHaveBeenCalledTimes(1)
    expect(
      AdobeAudienceManager.startAdobeAudienceManager
    ).toHaveBeenCalledTimes(1)
    expect(AdobeTargetOffers.startAdobeTargetOffers).toHaveBeenCalledTimes(1)
  })

  test('Invoke specified SDKs methods when calling updateSDKsStatus with LIOM=on/LINBA=off/LIOPT=off permissionsObj', () => {
    const userThirdPartyPermissions = {
      LIOM: true,
      LINBA: false,
      LIOPT: false
    }
    updateSDKsStatus(userThirdPartyPermissions)
    expect(AdjustHelper.startAdjust).toHaveBeenCalledTimes(1)
    expect(
      AdobeAudienceManager.startAdobeAudienceManager
    ).toHaveBeenCalledTimes(1)
    expect(AdobeTargetOffers.startAdobeTargetOffers).toHaveBeenCalledTimes(1)
    expect(CrashlyticsHelper.stopCrashlytics).toHaveBeenCalledTimes(1)
    expect(UrbanAirshipHelper.disableAirshipTags).toHaveBeenCalledTimes(1)
    expect(TealiumAnalyticsHelper.stopTealium).toHaveBeenCalledTimes(1)
    expect(AppDynamicsHelper.stopAppDynamics).toHaveBeenCalledTimes(1)
    expect(
      AdobeAnalyticsTracking.stopAdobeAnalyticsTracking
    ).toHaveBeenCalledTimes(1)
  })

  test('Invoke specified SDKs methods when calling updateSDKsStatus with LIOM=off/LINBA=on/LIOPT=on permissionsObj', () => {
    const userThirdPartyPermissions = {
      LIOM: false,
      LINBA: true,
      LIOPT: true
    }
    updateSDKsStatus(userThirdPartyPermissions)
    expect(CrashlyticsHelper.startCrashlytics).toHaveBeenCalledTimes(1)
    expect(TealiumAnalyticsHelper.startTealium).toHaveBeenCalledTimes(1)
    expect(AppDynamicsHelper.startAppDynamics).toHaveBeenCalledTimes(1)
    expect(
      AdobeAnalyticsTracking.startAdobeAnalyticsTracking
    ).toHaveBeenCalledTimes(1)
    expect(AdobeTargetOffers.startAdobeTargetOffers).toHaveBeenCalledTimes(1)
    expect(UrbanAirshipHelper.disableAirshipTags).toHaveBeenCalledTimes(1)
    expect(AdjustHelper.stopAdjust).toHaveBeenCalledTimes(1)
    expect(AdobeAudienceManager.stopAdobeAudienceManager).toHaveBeenCalledTimes(
      1
    )
  })

  test('Invoke specified SDKs methods when calling updateSDKsStatus with LIOM=off/LINBA=off/LIOPT=on permissionsObj', () => {
    const userThirdPartyPermissions = {
      LIOM: false,
      LINBA: false,
      LIOPT: true
    }
    updateSDKsStatus(userThirdPartyPermissions)
    expect(CrashlyticsHelper.startCrashlytics).toHaveBeenCalledTimes(1)
    expect(TealiumAnalyticsHelper.startTealium).toHaveBeenCalledTimes(1)
    expect(AppDynamicsHelper.startAppDynamics).toHaveBeenCalledTimes(1)
    expect(
      AdobeAnalyticsTracking.startAdobeAnalyticsTracking
    ).toHaveBeenCalledTimes(1)
    expect(AdobeTargetOffers.startAdobeTargetOffers).toHaveBeenCalledTimes(1)
    expect(UrbanAirshipHelper.disableAirshipTags).toHaveBeenCalledTimes(1)
    expect(AdjustHelper.stopAdjust).toHaveBeenCalledTimes(1)
    expect(AdobeAudienceManager.stopAdobeAudienceManager).toHaveBeenCalledTimes(
      1
    )
  })

  test('Invoke specified SDKs methods when calling updateSDKsStatus with LIOM=off/LINBA=on/LIOPT=off permissionsObj', () => {
    const userThirdPartyPermissions = {
      LIOM: false,
      LINBA: true,
      LIOPT: false
    }
    updateSDKsStatus(userThirdPartyPermissions)
    expect(AdobeTargetOffers.startAdobeTargetOffers).toHaveBeenCalledTimes(1)
    expect(CrashlyticsHelper.stopCrashlytics).toHaveBeenCalledTimes(1)
    expect(UrbanAirshipHelper.disableAirshipTags).toHaveBeenCalledTimes(1)
    expect(TealiumAnalyticsHelper.stopTealium).toHaveBeenCalledTimes(1)
    expect(AdjustHelper.stopAdjust).toHaveBeenCalledTimes(1)
    expect(AppDynamicsHelper.stopAppDynamics).toHaveBeenCalledTimes(1)
    expect(
      AdobeAnalyticsTracking.stopAdobeAnalyticsTracking
    ).toHaveBeenCalledTimes(1)
    expect(AdobeAudienceManager.stopAdobeAudienceManager).toHaveBeenCalledTimes(
      1
    )
  })
})
