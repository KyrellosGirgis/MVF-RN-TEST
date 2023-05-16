import Config from 'react-native-config'
import {
  ENVIRONMENTS,
  createInstance,
  stop,
  isOptedIn,
  start,
  startPersonalized,
  stopPersonalized,
  isPersonalized
} from '@vfgroup-oneplatform/netperform-sdk'

import { store } from 'App/Redux'

const startNetperform = () => {
  initializeNetpreform()
  start()
}

const initializeNetpreform = () => {
  const netPerformEnvironment =
    Config.IS_PRODUCTION === 'true' ? ENVIRONMENTS.PROD : ENVIRONMENTS.PRE_PROD
  createInstance(netPerformEnvironment)
}

const stopNetperform = async () => {
  /// to check if the opt-in state is active
  if (await isOptedIn()) {
    await stop()
  }
}

const startPersonalizedNetperform = () => {
  const { id } = store.getState().appUserData.currentlyActiveSubscription

  initializeNetpreform()
  startPersonalized(id)
}

const stopPersonalizedNetperform = () => {
  //In Android, We have to pass this boolean to make it work.
  //Because the native function in android accepts boolean parameter.

  stopPersonalized(true)
}

const isPersonalizedEnabled = async (): Promise<boolean> => {
  let isPersonalizedValue = false
  try {
    isPersonalizedValue = await isPersonalized()
  } catch (err) {}
  return isPersonalizedValue
}

export {
  stopNetperform,
  startNetperform,
  startPersonalizedNetperform,
  stopPersonalizedNetperform,
  isPersonalizedEnabled,
  initializeNetpreform
}
