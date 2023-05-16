import { loadDashboardSkeleton } from 'App/Services/DataLayer/APIs/Dashboard/DashboardSkeleton/DashboardSkeleton.requests'
import { DXLAxios } from 'App/Services/API/Interceptors/DXL.interceptor'
import { replaceCountryCodeInMSISDN } from 'App/Utils/Helpers/generic.helpers'
import ApiRoutes from 'App/Services/API/ApiRoutes'

jest.mock('App/Services/API/Interceptors/DXL.interceptor', () => {
  return {
    DXLAxios: {
      get: jest.fn()
    }
  }
})

const currentlyActiveSubscriptionMobile = {
  itemTitle: 'Mobilfunk',
  itemSubTitle: '01522992786',
  itemImage: 'mobile_image',
  id: '491699022786',
  type: 'mobile',
  marketCode: 'MMC',
  ban: 1111222,
  hasBanAccess: true,
  mboId: 12746753
}

const currentlyActiveSubscriptionFixedNet = {
  itemTitle: 'Mobilfunk',
  itemSubTitle: '01522992786',
  itemImage: 'mobile_image',
  id: '491699022786',
  type: 'fixednet'
}

const dashboardSkeletonData = {
  _embedded: {},
  sections: [],
  optionalNavigation: [],
  _links: {}
}

describe('test load dashboard skeleton data ', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should loadDashboardSkeleton data successfully when mobile subscripion', async () => {
    DXLAxios.get.mockImplementation(() => ({
      data: dashboardSkeletonData
    }))

    const { id, type } = currentlyActiveSubscriptionMobile
    const { URL, apiId } = ApiRoutes.DXL.dashboardSkeleton

    const responseData = await loadDashboardSkeleton(
      currentlyActiveSubscriptionMobile
    )

    expect(DXLAxios.get).toHaveBeenCalledWith(
      URL(replaceCountryCodeInMSISDN(id), type),
      {
        apiId
      }
    )
    expect(responseData).toEqual(dashboardSkeletonData)
  })

  it('should loadDashboardSkeleton data successfully when fixed net subscripion', async () => {
    DXLAxios.get.mockImplementation(() => ({
      data: dashboardSkeletonData
    }))
    const { id, type } = currentlyActiveSubscriptionFixedNet
    const { URL, apiId } = ApiRoutes.DXL.dashboardSkeleton

    const responseData = await loadDashboardSkeleton(
      currentlyActiveSubscriptionFixedNet
    )

    expect(DXLAxios.get).toHaveBeenCalledWith(URL(id, type), {
      apiId
    })
    expect(responseData).toEqual(dashboardSkeletonData)
  })

  it('should throw error when loadDashboardSkeleton api fails', async () => {
    DXLAxios.get.mockImplementation(() => {
      return Promise.reject('error')
    })
    await expect(
      loadDashboardSkeleton(currentlyActiveSubscriptionMobile)
    ).rejects.toEqual('error')
  })
})
