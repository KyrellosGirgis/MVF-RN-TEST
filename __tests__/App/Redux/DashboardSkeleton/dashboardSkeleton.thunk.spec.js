/* eslint-disable import/namespace */
import { store } from 'App/Redux'
import { fetchDashboardSkeleton } from 'App/Redux/reducers/DashboardSkeleton/dashboardSkeleton.thunk'
import * as DashboardSkeletonRequests from 'App/Services/DataLayer/APIs/Dashboard/DashboardSkeleton/DashboardSkeleton.requests'
import * as UsagesThunk from 'App/Redux/Usages/usages.thunk'
import * as UsagesReducer from 'App/Redux/Usages/usages.reducer'
import * as appUserDataThunk from 'App/Redux/AppUserData/appUserData.thunk'

describe('unit testing for dashboardSkeleton thunk', () => {
  beforeAll(() => {
    UsagesThunk.fetchUnbilledUsages = jest.fn()
    appUserDataThunk.fetchAppUserData = jest.fn()
    UsagesReducer.usagesActions.setUsagesTilesLoadingStatus = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('fetchDashboardSkeleton should call loadDashboardSkeleton when fulfilled', async () => {
    DashboardSkeletonRequests.loadDashboardSkeleton = jest.fn(() => {})

    const dispatch = jest.fn()

    const fetchDashboardSkeletonAction = await fetchDashboardSkeleton()(
      dispatch
    )
    store.dispatch(fetchDashboardSkeletonAction)

    expect(DashboardSkeletonRequests.loadDashboardSkeleton).toHaveBeenCalled()
  })

  it('fetchDashboardSkeleton should dispatch setUsagesTilesLoadingStatus when loadDashboardSkeleton fails', async () => {
    DashboardSkeletonRequests.loadDashboardSkeleton = jest.fn(() =>
      Promise.reject()
    )

    const dispatch = jest.fn()

    const fetchDashboardSkeletonAction = await fetchDashboardSkeleton()(
      dispatch
    )
    store.dispatch(fetchDashboardSkeletonAction)

    expect(DashboardSkeletonRequests.loadDashboardSkeleton).toHaveBeenCalled()
    expect(UsagesThunk.fetchUnbilledUsages).not.toHaveBeenCalled()
    expect(appUserDataThunk.fetchAppUserData).not.toHaveBeenCalledTimes(1)
  })
})
