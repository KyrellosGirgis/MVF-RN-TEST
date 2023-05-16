/* eslint-disable import/namespace */
import { store } from 'App/Redux'
import { ApiRoutes } from 'App/Services'
import { DXLAxios } from 'App/Services/API/Interceptors/DXL.interceptor'
import { getSmallTileList } from 'App/Services/DataLayer/APIs/Dashboard/smallTiles/SmallTiles'

jest.mock('App/Services/API/Interceptors/DXL.interceptor', () => {
  return {
    DXLAxios: {
      get: jest.fn(() => ({
        data: 'data'
      }))
    }
  }
})

describe('Calling small tiles DXL service', () => {
  it('should call DXL service with proper url and return correct response', async () => {
    store.getState = jest.fn(() => ({
      dashboardSkeleton: {
        _embedded: {
          smallTiles: {
            _links: {
              self: {
                href: 'url'
              }
            }
          }
        }
      }
    }))
    const data = await getSmallTileList()
    expect(DXLAxios.get).toHaveBeenCalledWith('url', {
      apiId: ApiRoutes.DXL.smallTiles.apiId
    })
    expect(data).toEqual('data')
  })
})
