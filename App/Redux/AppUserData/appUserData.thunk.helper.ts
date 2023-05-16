import { store } from 'App/Redux'

import { appUserDataActions } from 'App/Redux/AppUserData/appUserData.reducer'

const saveCurrentlyActiveSubscriptionIfNeeded = () => {
  const storedCurrentlyActiveSubscription =
    store.getState().appUserData.currentlyActiveSubscription
  if (storedCurrentlyActiveSubscription) {
    return
  }

  const currentlyActiveSubscription = Object.values(
    store.getState()?.appUserData?.userAccountVBO?.subscriptions
  ).flat(1)[0]

  //if not , select a default one
  store.dispatch(
    appUserDataActions.setCurrentlyActiveSubscription({
      currentlyActiveSubscription: currentlyActiveSubscription
    })
  )
}

export { saveCurrentlyActiveSubscriptionIfNeeded }
