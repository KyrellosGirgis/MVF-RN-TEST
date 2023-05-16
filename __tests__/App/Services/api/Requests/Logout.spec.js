/* eslint-disable import/namespace */

import * as legacy from 'App/Services/API/Interceptors/legacy.interceptor'

import ApiRoutes from 'App/Services/API/ApiRoutes'

import { LogOutAPI } from 'App/Services/API'

import * as LoginHelper from 'App/Screens/Login/Implementations/Login.helper'

import { CLIENT_ID } from 'App/Services/Keys/Keys.helper'

describe('testing logout method ', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('assert legacyAxios post is called 4 times with the expected values', async () => {
    const access_token = 'access_token'
    const refresh_token = 'refresh_token'
    const id_token = 'id_token'

    const requestsBodies = [
      `token_type=access_token&token=${access_token}&client_id=${CLIENT_ID}`,
      `token_type=refresh_token&token=${refresh_token}&client_id=${CLIENT_ID}`,
      `token_type=id_token&token=${id_token}&client_id=${CLIENT_ID}`
    ]

    LoginHelper.getLoginTokens = jest.fn(() => {
      return {
        access_token,
        refresh_token,
        id_token
      }
    })

    legacy.legacyAxios.post = jest.fn()
    await LogOutAPI()
    expect(legacy.legacyAxios.post).toHaveBeenCalledWith(
      ApiRoutes.Mint.oidcRevoke.URL,
      requestsBodies[0],
      { apiId: ApiRoutes.Mint.oidcRevoke.apiId }
    )
    expect(legacy.legacyAxios.post).toHaveBeenCalledWith(
      ApiRoutes.Mint.oidcRevoke.URL,
      requestsBodies[1],
      { apiId: ApiRoutes.Mint.oidcRevoke.apiId }
    )
    expect(legacy.legacyAxios.post).toHaveBeenCalledWith(
      ApiRoutes.Mint.oidcRevoke.URL,
      requestsBodies[2],
      { apiId: ApiRoutes.Mint.oidcRevoke.apiId }
    )
    expect(legacy.legacyAxios.post).toHaveBeenCalledWith(
      ApiRoutes.Mint.sessionEnd.URL,
      undefined,
      { apiId: ApiRoutes.Mint.sessionEnd.apiId }
    )
  })
})
