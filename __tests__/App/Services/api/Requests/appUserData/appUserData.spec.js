import {
  userDataWithAllProducts,
  smsLoginUserData
} from '__tests__/App/Services/api/Requests/Dashboard/data'

import * as legacy from 'App/Services/API/Interceptors/legacy.interceptor'
import { loadUserData } from 'App/Services/API/Requests/userData/userData'

describe('testing loading user data ', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should load userData correctly when upfront login', async () => {
    legacy.legacyAxios.get.mockImplementation(() => {
      return {
        data: userDataWithAllProducts
      }
    })

    const { loggedInUserId, lastLoadTimeStamp, ...userData } =
      await loadUserData()
    expect(loggedInUserId).toEqual(789)
    expect(userData).toEqual(userDataWithAllProducts)
  })

  it('should load userData correctly when sms or seamless login', async () => {
    legacy.legacyAxios.get.mockImplementation(() => {
      return {
        data: smsLoginUserData
      }
    })

    const { loggedInUserId, lastLoadTimeStamp, ...userData } =
      await loadUserData()
    expect(loggedInUserId).toEqual(123456789123)
    expect(userData).toEqual(smsLoginUserData)
  })

  it('should throw error when api call fails', async () => {
    const error = {
      config: {
        apiId: 'Nil.userData'
      },
      response: {
        status: '404'
      }
    }
    legacy.legacyAxios.get.mockImplementation(() => {
      return new Promise((resolve, reject) => {
        reject(error)
      })
    })
    await expect(loadUserData()).rejects.toEqual(error)
  })
})
