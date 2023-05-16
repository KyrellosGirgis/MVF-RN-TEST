import { fetchAppUserData } from 'App/Redux/AppUserData/appUserData.thunk'

const isLoggedInEffectConfig = {
  predicate: (_, currentState, previousState) => {
    return (
      currentState.app.isLoggedIn !== previousState.app.isLoggedIn &&
      currentState.app.isLoggedIn
    )
  },
  effect: (_, { dispatch }) => {
    dispatch(fetchAppUserData())
  }
}

export { isLoggedInEffectConfig }
