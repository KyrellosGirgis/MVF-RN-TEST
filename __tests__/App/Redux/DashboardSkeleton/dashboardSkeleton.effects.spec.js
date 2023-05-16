/* eslint-disable import/namespace */
import 'App/Redux/store'
import {
  dashboardSkeletonFulfilledEffectConfig,
  dashboardSkeletonRejectedEffectConfig
} from 'App/Redux/reducers/DashboardSkeleton/dashboardSkeleton.effects'
import * as mediumTiles from 'App/Redux/reducers/MediumTiles/MediumTiles.thunk'
import * as smallTiles from 'App/Redux/reducers/SmallTiles/smallTiles.Thunk'
import * as usages from 'App/Redux/Usages/usages.thunk'
import { usagesActions } from 'App/Redux/Usages/usages.reducer'
import { ThunkStatus } from 'App/Redux/StoreType.d'
import { mediumTilesActions } from 'App/Redux/reducers/MediumTiles/MediumTiles.reducer'
import { smallTilesActions } from 'App/Redux/reducers/SmallTiles/smallTiles.reducer'

describe('unit testing for appUserData effects', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should set appUserData effects succesfully when fulfilled', () => {
    const dispatch = jest.fn()
    usages.fetchUnbilledUsages = jest.fn()
    smallTiles.fetchSmallTiles = jest.fn()
    mediumTiles.fetchMediumTiles = jest.fn()
    dashboardSkeletonFulfilledEffectConfig.effect(null, { dispatch })
    expect(dispatch).toHaveBeenCalledWith(usages.fetchUnbilledUsages())
    expect(dispatch).toHaveBeenCalledWith(smallTiles.fetchSmallTiles())
    expect(dispatch).toHaveBeenCalledWith(mediumTiles.fetchMediumTiles())
  })

  it('should set appUserData effects succesfully when rejected', () => {
    const dispatch = jest.fn()

    dashboardSkeletonRejectedEffectConfig.effect(null, { dispatch })

    expect(dispatch).toHaveBeenCalledWith(
      usagesActions.setUsagesTilesLoadingStatus(ThunkStatus.REJECTED)
    )
    expect(dispatch).toHaveBeenCalledWith(
      mediumTilesActions.setMediumTilesLoadingStatus(ThunkStatus.REJECTED)
    )
    expect(dispatch).toHaveBeenCalledWith(
      smallTilesActions.setSmallTilesLoadingStatus(ThunkStatus.REJECTED)
    )
  })
})
