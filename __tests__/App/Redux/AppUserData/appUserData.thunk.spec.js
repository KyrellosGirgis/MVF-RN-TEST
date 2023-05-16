/* eslint-disable import/namespace */

import { store } from 'App/Redux'
import { fetchAppUserData } from 'App/Redux/AppUserData/appUserData.thunk'
import * as UserDataAPI from 'App/Services/API/Requests/userData/userData'
import * as AppUserDataThunkHelper from 'App/Redux/AppUserData/appUserData.thunk.helper'
import * as appUserDataHelpers from 'App/Services/AppUserData/AppUserData.helpers'
import * as DashboardSkeletonThunk from 'App/Redux/reducers/DashboardSkeleton/dashboardSkeleton.thunk'
import * as userDataHelpers from 'App/Services/API/Requests/userData/userData.helpers'

describe('unit testing for appUserData thunk', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('fetchAppUserData should complete all flow when loadUserData succeeds', async () => {
    const result = {
      userAccountVBO: 'anything'
    }
    UserDataAPI.loadUserData = jest.fn(() => Promise.resolve(result))
    userDataHelpers.mapBEUserDataToAppUserData = jest.fn()
    AppUserDataThunkHelper.getAndSaveCurrentlyActiveSubscriptionIfNeeded =
      jest.fn(() => 'subsc')
    DashboardSkeletonThunk.fetchDashboardSkeleton = jest.fn()
    await store.dispatch(fetchAppUserData())
    expect(UserDataAPI.loadUserData).toHaveBeenCalled()
    expect(userDataHelpers.mapBEUserDataToAppUserData).toHaveBeenCalledWith(
      result
    )
  })

  it('should call handleUserDataApiErrorsIfNeeded function  when recieve error ', async () => {
    appUserDataHelpers.handleUserDataApiErrorsIfNeeded = jest.fn()
    UserDataAPI.loadUserData = jest.fn(() => Promise.reject())
    await store.dispatch(fetchAppUserData())
    expect(
      appUserDataHelpers.handleUserDataApiErrorsIfNeeded
    ).toHaveBeenCalled()
  })
})
