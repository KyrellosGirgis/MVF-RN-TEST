import {
  configureStore,
  combineReducers,
  createListenerMiddleware
} from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'

import { appReducer } from './reducers/AppReducer/app.reducer'
import { usagesReducer } from './Usages/usages.reducer'
import { appUserDataReducer } from './AppUserData/appUserData.reducer'
import {
  onboardingReducerPersistConfig,
  userThirdPartyPermissionsReducerPersistConfig,
  settingsReducerPersistConfig,
  appUseDataReducerPersistConfig,
  appReducerPersistConfig
} from './reduxPersistConfig'
import { settingsReducer } from './reducers/settings.reducer'
import { webViewOpenedReducer } from './reducers/WebView.reducer'
import { onboardingReducer } from './reducers/onboarding.reducer'
import { developerSettingsReducer } from './reducers/DeveloperSettings.reducer'
import { cmsReducer } from './reducers/cms.reducer'
import { userThirdPartyPermissionsReducer } from './UserThirdPartyPermissions/userThirdPartyPermissions.reducer'
import { myPlanReducer } from './myplan/myPlan.reducer'
import { balanceReducer } from './Balance/balance.reducer'
import { addonsReducer } from './Addons/addons.reducer'
import { dashboardSkeletonReducer } from './reducers/DashboardSkeleton/dashboardSkeleton.reducer'
import { smallTilesReducer } from './reducers/SmallTiles/smallTiles.reducer'
import { mediumTilesReducer } from './reducers/MediumTiles/MediumTiles.reducer'
import activateEffectListeners from './store.listeners'

const reducers = combineReducers({
  app: persistReducer(appReducerPersistConfig, appReducer),
  appUserData: persistReducer(
    appUseDataReducerPersistConfig,
    appUserDataReducer
  ),
  settings: persistReducer(settingsReducerPersistConfig, settingsReducer),
  usages: usagesReducer,
  myPlan: myPlanReducer,
  webViewOpened: webViewOpenedReducer,
  onboarding: persistReducer(onboardingReducerPersistConfig, onboardingReducer),
  developerSettings: developerSettingsReducer,
  cms: cmsReducer,
  userThirdPartyPermissions: persistReducer(
    userThirdPartyPermissionsReducerPersistConfig,
    userThirdPartyPermissionsReducer
  ),
  balance: balanceReducer,
  addons: addonsReducer,
  dashboardSkeleton: dashboardSkeletonReducer,
  smallTiles: smallTilesReducer,
  mediumTiles: mediumTilesReducer
})

const listenerMiddleware = createListenerMiddleware()
activateEffectListeners()

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).prepend(listenerMiddleware.middleware)
})

const persistor = persistStore(store)

export const _persistor = persistor
export default store
export { listenerMiddleware }
