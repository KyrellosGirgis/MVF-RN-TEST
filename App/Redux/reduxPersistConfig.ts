import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

const settingsReducerPersistConfig = {
  key: 'settings',
  version: 1,
  storage: EncryptedStorage,
  whitelist: ['persistedSubscriptionTiles', 'presistedSelectedSmallTiles'],
  blacklist: []
}

const onboardingReducerPersistConfig = {
  key: 'onboarding',
  version: 1,
  storage: EncryptedStorage,
  whitelist: ['checkedSteps', 'isOnboardingStarted'],
  blacklist: []
}

const userThirdPartyPermissionsReducerPersistConfig = {
  key: 'userThirdPartyPermissions',
  version: 1,
  storage: EncryptedStorage,
  whitelist: ['userThirdPartyPermissions'],
  blacklist: []
}

const appUseDataReducerPersistConfig = {
  key: 'appUserData',
  version: 1,
  storage: EncryptedStorage,
  whitelist: ['currentlyActiveSubscription'],
  blacklist: []
}

const appReducerPersistConfig = {
  key: 'app',
  version: 1,
  storage: EncryptedStorage,
  whitelist: ['isLoggedIn'],
  blacklist: []
}

export {
  settingsReducerPersistConfig,
  appUseDataReducerPersistConfig,
  onboardingReducerPersistConfig,
  userThirdPartyPermissionsReducerPersistConfig,
  appReducerPersistConfig
}
