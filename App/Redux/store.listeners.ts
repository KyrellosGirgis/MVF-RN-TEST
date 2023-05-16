import { listenerMiddleware } from './store'
import { isLoggedInEffectConfig } from './reducers/AppReducer/app.effects'
import { appUserDataEffectConfig } from './AppUserData/appUserData.effects'
import {
  dashboardSkeletonFulfilledEffectConfig,
  dashboardSkeletonRejectedEffectConfig
} from './reducers/DashboardSkeleton/dashboardSkeleton.effects'

const activateEffectListeners = () => {
  listenerMiddleware.startListening(isLoggedInEffectConfig)
  listenerMiddleware.startListening(appUserDataEffectConfig)
  listenerMiddleware.startListening(dashboardSkeletonFulfilledEffectConfig)
  listenerMiddleware.startListening(dashboardSkeletonRejectedEffectConfig)
}

export default activateEffectListeners
