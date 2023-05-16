import { store } from 'App/Redux'

const getCableURN = () => {
  const { currentlyActiveSubscription } = store.getState().appUserData
  return `vf-de:cable:can:${currentlyActiveSubscription?.id}`
}
export { getCableURN }
