import * as legacy from 'App/Services/API/Interceptors/legacy.interceptor'

import { getHashing } from 'App/Services/API/Requests/ThirdPartyPermissions/hashing/hashing'
import { hashingData } from '__tests__/App/APIsDataMocks/hashing'

describe('test hashing api', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return correct data from getHashing', async () => {
    legacy.legacyAxios.get.mockImplementation(() => {
      return {
        data: hashingData
      }
    })

    const result = await getHashing()
    expect(result).toEqual(hashingData)
  })

  it('should throw error from loadInfo when api fails', async () => {
    const error = {
      config: {
        apiId: 'Vluxgate.hashing'
      },
      response: {
        status: '404'
      }
    }

    const expectedOutput = {
      content: {
        body: 'onboarding_error_inline_body'
      },
      type: 'inline-error'
    }
    legacy.legacyAxios.get.mockImplementation(() => {
      return Promise.reject(error)
    })
    await expect(getHashing()).rejects.toEqual(expectedOutput)
  })
})
