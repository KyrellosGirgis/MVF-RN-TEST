import {
  startAdobeAnalyticsTracking,
  stopAdobeAnalyticsTracking
} from './SDKs/Adobe/AdobeAnalyticsTracking/AdobeAnalyticsTracking'

import {
  startAdobeAudienceManager,
  stopAdobeAudienceManager
} from './SDKs/Adobe/AdobeAudienceManager/AdobeAudienceManager'

import {
  startAdobeTargetOffers,
  stopAdobeTargetOffers
} from './SDKs/Adobe/AdobeTargetOffers/AdobeTargetOffers'

import {
  disableAirshipTags,
  enableAirshipTags
} from './SDKs/UrbanAirship/UrbanAirship.helpers'

import {
  startTealium,
  stopTealium
} from 'App/Services/SDKsManagment/SDKs/TealiumAnalyticsManager/TealiumAnalyticsManager'

import {
  startCrashlytics,
  stopCrashlytics
} from 'App/Services/SDKsManagment/SDKs/Crashlytics/Crashlytics'

import {
  startAppDynamics,
  stopAppDynamics
} from 'App/Services/SDKsManagment/SDKs/AppDynamics/appDynamics'

import {
  startNetperform,
  startPersonalizedNetperform,
  stopNetperform,
  stopPersonalizedNetperform
} from 'App/Services/SDKsManagment/SDKs/NetPerform/NetperformInitializer'

import {
  startAdjust,
  stopAdjust
} from 'App/Services/SDKsManagment/SDKs/Adjust/AdjustManager'

const startOrStopSdk = (isEnabled: boolean, start: Function, stop: Function) =>
  isEnabled ? start : stop

const startOrStopSDKsTable: { [key: string]: Function } = {
  AdobeAnalyticsTracking: (isEnabled: boolean) =>
    startOrStopSdk(
      isEnabled,
      startAdobeAnalyticsTracking,
      stopAdobeAnalyticsTracking
    ),
  AdobeAudienceManager: (isEnabled: boolean) =>
    startOrStopSdk(
      isEnabled,
      startAdobeAudienceManager,
      stopAdobeAudienceManager
    ),
  AdobeTargetOffers: (isEnabled: boolean) =>
    startOrStopSdk(isEnabled, startAdobeTargetOffers, stopAdobeTargetOffers),
  Tealium: (isEnabled: boolean) =>
    startOrStopSdk(isEnabled, startTealium, stopTealium),
  Crashlytics: (isEnabled: boolean) =>
    startOrStopSdk(isEnabled, startCrashlytics, stopCrashlytics),
  AppDynamics: (isEnabled: boolean) =>
    startOrStopSdk(isEnabled, startAppDynamics, stopAppDynamics),
  AirshipTags: (isEnabled: boolean) =>
    startOrStopSdk(isEnabled, enableAirshipTags, disableAirshipTags),
  Netperform: (isEnabled: boolean) =>
    startOrStopSdk(isEnabled, startNetperform, stopNetperform),
  PersonalizedNetperform: (isEnabled: boolean) =>
    startOrStopSdk(
      isEnabled,
      startPersonalizedNetperform,
      stopPersonalizedNetperform
    ),
  Adjust: (isEnabled: boolean) =>
    startOrStopSdk(isEnabled, startAdjust, stopAdjust)
}

export { startOrStopSDKsTable }
