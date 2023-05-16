import * as legacy from 'App/Services/API/Interceptors/legacy.interceptor'

import {
  loadInfo,
  saveInfoToBE
} from 'App/Services/API/Requests/ThirdPartyPermissions/info/info'
import { infoData, infoPayload } from '__tests__/App/APIsDataMocks/info'

const umdid =
  'NzBkMTg1MTEtYjE4Yy00NTExLFQBYTItNDc2MWY2MWM1NjetfGRmZjE2NGUxLWM1MzUtNDc2NS1iMmU5LWQ0NjifuyeIwOWM5MXwx'

describe('test loadInfo api', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return correct data from loadInfo', async () => {
    legacy.legacyAxios.get.mockImplementation(() => {
      return {
        data: infoData
      }
    })

    const result = await loadInfo(umdid)
    expect(result).toEqual(infoData)
  })

  it('should throw error from loadInfo when api fails', async () => {
    const error = {
      config: {
        apiId: 'FunnelConnect.info'
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
    await expect(loadInfo(umdid)).rejects.toEqual(expectedOutput)
  })

  it('should save 3rd party permissions of the user', async () => {
    legacy.legacyAxios.post.mockImplementation(() => {
      return {
        data: infoData
      }
    })

    const result = await saveInfoToBE(umdid, infoPayload)
    expect(result).toEqual(infoData)
  })

  it('should throw error from saveInfoToBE when api fails', async () => {
    const error = {
      config: {
        apiId: 'FunnelConnect.info'
      },
      response: {
        status: '404'
      }
    }

    const expectedOutput = {
      config: {
        apiId: 'FunnelConnect.info'
      },
      response: {
        status: '404'
      }
    }
    legacy.legacyAxios.post.mockImplementation(() => {
      return Promise.reject(error)
    })
    await expect(saveInfoToBE(umdid, infoPayload)).rejects.toEqual(
      expectedOutput
    )
  })
})
