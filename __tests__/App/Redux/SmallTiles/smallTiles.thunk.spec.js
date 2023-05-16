/* eslint-disable import/namespace */
import { store } from 'App/Redux'
import * as DashboardThunk from 'App/Redux/reducers/DashboardSkeleton/dashboardSkeleton.thunk'
import * as SmallTilesRequests from 'App/Services/DataLayer/APIs/Dashboard/smallTiles/SmallTiles'
import * as UsagesThunk from 'App/Redux/Usages/usages.thunk'
import * as UsagesReducer from 'App/Redux/Usages/usages.reducer'
import * as UserDataThunk from 'App/Redux/AppUserData/appUserData.thunk'
import { fetchSmallTiles } from 'App/Redux/reducers/SmallTiles/smallTiles.Thunk'

describe('unit testing for dashboardSkeleton thunk', () => {
  beforeAll(() => {
    UsagesThunk.fetchUnbilledUsages = jest.fn()
    UserDataThunk.fetchAppUserData = jest.fn()
    UsagesReducer.usagesActions.setUsagesTilesLoadingStatus = jest.fn()
    DashboardThunk.fetchDashboardSkeleton = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('fetchSmallTiles should call getSmallTileList', async () => {
    SmallTilesRequests.getSmallTileList = jest.fn(() => {})

    const dispatch = jest.fn()

    const fetchSmallTilesAction = await fetchSmallTiles()(dispatch)
    store.dispatch(fetchSmallTilesAction)

    expect(SmallTilesRequests.getSmallTileList).toHaveBeenCalled()
  })
})
