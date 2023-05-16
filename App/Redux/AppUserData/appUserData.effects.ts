import { saveCurrentlyActiveSubscriptionIfNeeded } from './appUserData.thunk.helper'

import { showErrorIfUserIsBlocked } from 'App/Services/AppUserData/BlockedUsers/BlockedUsers'

import { fetchDashboardSkeleton } from 'App/Redux/reducers/DashboardSkeleton/dashboardSkeleton.thunk'
import { handleNoSubscriptionsErrorIfNeeded } from 'App/Services/AppUserData/AppUserData.helpers'

const appUserDataEffectConfig = {
  predicate: (_, currentState, previousState) => {
    return (
      currentState.appUserData.userAccountVBO !==
      previousState.appUserData.userAccountVBO
    )
  },
  effect: async (_, { dispatch }) => {
    try {
      handleNoSubscriptionsErrorIfNeeded()
      saveCurrentlyActiveSubscriptionIfNeeded()
      const isUserBlockedErrorShown = await showErrorIfUserIsBlocked()
      !isUserBlockedErrorShown && dispatch(fetchDashboardSkeleton())
    } catch (error) {}
  }
}

export { appUserDataEffectConfig }
