import { store } from 'App/Redux'
import { dashboardSkeletonActions } from 'App/Redux/reducers/DashboardSkeleton/dashboardSkeleton.reducer'

describe('unit testing dashboard skeleton reducer', () => {
  it('should set dashboardSkeletonLoadingStatus succesfully', () => {
    const expectedDashboardSkeletonLoadingStatus = 'fulfilled'
    store.dispatch(
      dashboardSkeletonActions.setDashboardSkeletonLoadingStatus(
        expectedDashboardSkeletonLoadingStatus
      )
    )
    const { dashboardSkeletonLoadingStatus } =
      store.getState().dashboardSkeleton
    expect(dashboardSkeletonLoadingStatus).toEqual(
      expectedDashboardSkeletonLoadingStatus
    )
  })
})
