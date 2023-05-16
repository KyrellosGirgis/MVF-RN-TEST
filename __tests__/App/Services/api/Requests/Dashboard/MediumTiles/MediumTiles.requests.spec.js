import { useSelector } from 'react-redux'

import { ApiRoutes } from 'App/Services'

import { DXLAxios } from 'App/Services/API/Interceptors/DXL.interceptor'

import { loadMediumTiles } from 'App/Services/DataLayer/APIs/Dashboard/MediumTiles/MediumTiles.requests'

import { mockMediumTilesJson } from '__tests__/__mocks__/MockedStubbingData'
import { store } from 'App/Redux'

jest.mock('App/Services/API/Interceptors/DXL.interceptor', () => ({
  DXLAxios: {
    get: jest.fn()
  }
}))

describe('loadMediumTiles', () => {
  beforeAll(() => {
    store.getState = jest.fn(() => ({
      dashboardSkeleton: {
        _embedded: {
          mediumTiles: {
            _links: {
              self: {
                href: 'https://example-url.com'
              }
            }
          }
        }
      }
    }))
    useSelector.mockImplementation((callback) => {
      return callback({
        mediumTiles: {
          dashboardSkeleton: {
            dashboardSkeletonLoadingStatus: 'fulfilled'
          },
          mediumTiles: {
            mediumTilesLoadingStatus: 'fulfilled',
            ...mockMediumTilesJson
          }
        }
      })
    })
  })
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should return the data from the API', async () => {
    DXLAxios.get.mockResolvedValue({ data: mockMediumTilesJson })

    const result = await loadMediumTiles()
    const { apiId } = ApiRoutes.DXL.mediumTiles
    expect(DXLAxios.get).toHaveBeenCalledWith('https://example-url.com', {
      apiId
    })
    expect(result).toEqual(mockMediumTilesJson)
  })

  it('should throw an error if the API request fails', async () => {
    // Setup the mock error from the API
    const mockError = new Error('Request failed')
    DXLAxios.get.mockRejectedValue(mockError)

    // Invoke the loadMediumTiles function
    await expect(loadMediumTiles('/some/url')).rejects.toEqual(mockError)
  })
})
