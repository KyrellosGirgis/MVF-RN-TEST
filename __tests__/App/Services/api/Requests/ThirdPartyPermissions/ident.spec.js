import * as legacy from 'App/Services/API/Interceptors/legacy.interceptor'

import { getIdent } from 'App/Services/API/Requests/ThirdPartyPermissions/ident/ident'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

const umdid =
  'NzBkMTg1MTEtYjE4Yy00NTExLFQBYTItNDc2MWY2MWM1NjetfGRmZjE2NGUxLWM1MzUtNDc2NS1iMmU5LWQ0NjifuyeIwOWM5MXwx'

describe('test ident api', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return correct data from getIdent', async () => {
    EncryptedStorage.setItem = jest.fn(() => umdid)
    const expectedResponse = {
      headers: {
        ['set_cookie']: ['umdid=MTg1MTEtYjE4Yy00NTExLFQBYTItNDc2MWY2MWM1Nj']
      }
    }
    legacy.legacyAxios.get.mockImplementation(() => {
      return expectedResponse
    })

    const result = await getIdent('mobile', 'h4k5b2k4n2l3n2h4mnk3')
    expect(result).toEqual(expectedResponse)
  })

  it('should throw error from loadInfo when api fails', async () => {
    const error = {
      config: {
        apiId: 'FunnelConnect.ident'
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
    await expect(getIdent('mobile', 'h4k5b2k4n2l3n2h4mnk3')).rejects.toEqual(
      expectedOutput
    )
  })
})
