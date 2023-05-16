import { store } from 'App/Redux'
import { appUserDataActions } from 'App/Redux/AppUserData/appUserData.reducer'

describe('unit testing for appUserData reducer', () => {
  it('should set appUserData succesfully', () => {
    const expectedAppUserData = {
      loggedInUserId: '12345',
      lastLoadTimeStamp: 'anytimeStamp',
      appUserDataLoadingStatus: 'fulfilled'
    }
    store.dispatch(appUserDataActions.setAppUserData(expectedAppUserData))
    const appUserData = store.getState().appUserData
    expect(appUserData).toMatchObject(expectedAppUserData)
  })
})
