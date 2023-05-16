/* eslint-disable import/namespace */
import 'App/Redux/store'
import * as appUserDataHelpers from 'App/Redux/AppUserData/appUserData.thunk'
import { isLoggedInEffectConfig } from 'App/Redux/reducers/AppReducer/app.effects'

describe('unit testing for appUserData effects', () => {
  it('should set appUserData effects succesfully', () => {
    const dispatch = jest.fn()
    appUserDataHelpers.fetchAppUserData = jest.fn()
    isLoggedInEffectConfig.effect(null, { dispatch })

    expect(dispatch).toHaveBeenCalledWith(appUserDataHelpers.fetchAppUserData())
  })
})
