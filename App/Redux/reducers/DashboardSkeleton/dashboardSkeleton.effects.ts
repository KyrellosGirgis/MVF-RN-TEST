import { fetchDashboardSkeleton } from './dashboardSkeleton.thunk'

import { fetchMediumTiles } from 'App/Redux/reducers/MediumTiles/MediumTiles.thunk'

import { fetchSmallTiles } from 'App/Redux/reducers/SmallTiles/smallTiles.Thunk'

import { fetchUnbilledUsages } from 'App/Redux/Usages/usages.thunk'
import { mediumTilesActions } from 'App/Redux/reducers/MediumTiles/MediumTiles.reducer'

import { smallTilesActions } from 'App/Redux/reducers/SmallTiles/smallTiles.reducer'

import { ThunkStatus } from 'App/Redux/StoreType.d'

import { usagesActions } from 'App/Redux/Usages/usages.reducer'

const dashboardSkeletonFulfilledEffectConfig = {
  actionCreator: fetchDashboardSkeleton.fulfilled,
  effect: (_, { dispatch }) => {
    dispatch(fetchUnbilledUsages())
    dispatch(fetchSmallTiles())
    dispatch(fetchMediumTiles())
  }
}

const dashboardSkeletonRejectedEffectConfig = {
  actionCreator: fetchDashboardSkeleton.rejected,
  effect: (_, { dispatch }) => {
    dispatch(usagesActions.setUsagesTilesLoadingStatus(ThunkStatus.REJECTED))
    dispatch(
      mediumTilesActions.setMediumTilesLoadingStatus(ThunkStatus.REJECTED)
    )
    dispatch(smallTilesActions.setSmallTilesLoadingStatus(ThunkStatus.REJECTED))
  }
}

export {
  dashboardSkeletonFulfilledEffectConfig,
  dashboardSkeletonRejectedEffectConfig
}
