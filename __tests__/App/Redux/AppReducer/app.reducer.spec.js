import { appActions } from 'App/Redux/reducers/AppReducer/app.reducer'
import { store } from 'App/Redux'

describe('unit testing for app reducer', () => {
  it('should change deeplink url', () => {
    const expectedDeeplinkUrl = 'https://www.annything.com/home'
    store.dispatch(appActions.setDeeplinkUrl(expectedDeeplinkUrl))
    const { deeplinkUrl } = store.getState().app
    expect(deeplinkUrl).toEqual(expectedDeeplinkUrl)
  })

  it('should change isLoggedIn', () => {
    store.dispatch(appActions.setIsLoggedIn(false))
    const { isLoggedIn } = store.getState().app
    expect(isLoggedIn).toEqual(false)
  })
})
