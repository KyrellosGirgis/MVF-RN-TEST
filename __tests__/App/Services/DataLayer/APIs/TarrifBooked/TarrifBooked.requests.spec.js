import { store } from 'App/Redux'
import ApiRoutes from 'App/Services/API/ApiRoutes'
import { legacyAxios } from 'App/Services/API/Interceptors/legacy.interceptor'
import { getTarrifBooked } from 'App/Services/DataLayer/APIs/TarrifBooked/TarrifBooked.requests'

jest.mock('App/Services/API/Interceptors/legacy.interceptor', () => {
  return {
    legacyAxios: {
      get: jest.fn()
    }
  }
})

const currentlyActiveSubscription = {
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

const TarrifBookedData = {
  subscriptionVBO: [
    {
      type: '',
      subscriptions: [
        {
          details: {},
          customerProduct: {
            tariffDetails: {}
          },
          contractDetails: {}
        }
      ]
    }
  ]
}

describe('test load dashboard skeleton data ', () => {
  beforeEach(() => {
    store.getState = jest.fn(() => ({
      appUserData: {
        currentlyActiveSubscription
      }
    }))
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should loadTarrifBooked data successfully when mobile subscripion', async () => {
    legacyAxios.get.mockImplementation(() => ({
      data: TarrifBookedData
    }))

    const { id, type, marketCode } =
      store?.getState()?.appUserData?.currentlyActiveSubscription

    const { URL, apiId } = ApiRoutes.Vluxgate.tariffBooked

    const responseData = await getTarrifBooked(currentlyActiveSubscription)

    expect(legacyAxios.get).toHaveBeenCalledWith(URL(id, type, marketCode), {
      apiId
    })
    expect(responseData).toEqual(TarrifBookedData)
  })

  it('should throw error when loadDashboardSkeleton api fails', async () => {
    legacyAxios.get.mockImplementation(() => {
      return Promise.reject('error')
    })
    await expect(getTarrifBooked()).rejects.toEqual('error')
  })
})
