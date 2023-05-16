import AnalyticsManager from '@vfgroup-oneplatform/foundation/AnalyticsManager'

const commonData = {}

const addToTrackingCommonData = (key: string, value: string) => {
  commonData[key] = value
}

const removeFromTrackingCommonData = (key: string) => {
  delete commonData[key]
}

const trackEvent = (eventName: string, additionalData = {}) => {
  AnalyticsManager.trackEvent(eventName, {
    ...commonData,
    ...additionalData
  })
}
const trackView = (viewName: string, additionalData = {}) => {
  AnalyticsManager.trackView(viewName, {
    ...commonData,
    ...additionalData
  })
}

export {
  trackView,
  trackEvent,
  addToTrackingCommonData,
  removeFromTrackingCommonData
}
