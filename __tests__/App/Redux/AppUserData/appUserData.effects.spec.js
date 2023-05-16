/* eslint-disable import/namespace */
import * as appUserDataThunkHelpersfrom from 'App/Redux/AppUserData/appUserData.thunk.helper'
import * as dashboardSkeletonHelpers from 'App/Redux/reducers/DashboardSkeleton/dashboardSkeleton.thunk'
import * as appUserDataHelpers from 'App/Services/AppUserData/AppUserData.helpers'
import * as blockedUser from 'App/Services/AppUserData/BlockedUsers/BlockedUsers'
import { appUserDataEffectConfig } from 'App/Redux/AppUserData/appUserData.effects'

describe('unit testing for appUserData effects', () => {
  it('should set appUserData effects succesfully', async () => {
    const dispatch = jest.fn()
    appUserDataHelpers.handleNoSubscriptionsErrorIfNeeded = jest.fn()
    appUserDataThunkHelpersfrom.saveCurrentlyActiveSubscriptionIfNeeded =
      jest.fn()
    dashboardSkeletonHelpers.fetchDashboardSkeleton = jest.fn()
    blockedUser.showErrorIfUserIsBlocked = jest.fn()
    await appUserDataEffectConfig.effect(null, { dispatch })
    expect(
      appUserDataHelpers.handleNoSubscriptionsErrorIfNeeded
    ).toHaveBeenCalled()
    expect(
      appUserDataThunkHelpersfrom.saveCurrentlyActiveSubscriptionIfNeeded
    ).toHaveBeenCalled()
    expect(blockedUser.showErrorIfUserIsBlocked).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith(
      dashboardSkeletonHelpers.fetchDashboardSkeleton()
    )
  })
})
