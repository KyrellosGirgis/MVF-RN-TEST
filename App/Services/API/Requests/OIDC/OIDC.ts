import { NativeModules, Platform } from 'react-native'
import jwt_decode from 'jwt-decode'

import moment from 'moment'

import OIDC_config from './OIDC.config'

import { TOKEN_DEFAULT_EXP_TIME } from 'App/Services/API/Requests/OIDC/OIDC.constants'
import { handleOIDCError } from 'App/Services/API/Requests/Login/LoginErrorHandlers'

import { LEGACY_BASE_URL } from 'App/Services/API'

import {
  getLoginTokens,
  getParamsFromUrl,
  setLoginTokens
} from 'App/Screens/Login/Implementations/Login.helper'

import logOut from 'App/Screens/Login/Implementations/LogoutImplementation/LogoutImplementation'
import { legacyAxios } from 'App/Services/API/Interceptors/legacy.interceptor'
import { ApiRoutes } from 'App/Services'
import { getStorageCookiesAsString } from 'App/Services/CookiesManager/CookiesManager.helpers'
import { CLIENT_ID } from 'App/Services/Keys/Keys.helper'

const loadOIDCToken = async () => {
  const { URL: oidcTokenURL, apiId: oidcTokenApiId } = ApiRoutes.Mint.oidcToken
  const { URL: oidcAuthorizeURL, apiId: oidcAuthorizeApiId } =
    ApiRoutes.Mint.oidcAuthorize
  try {
    const locationParams = await authorize_OIDC()
    validateLocationParams(locationParams)

    const body = `grant_type=${OIDC_config.grant_type}&code=${locationParams.code}&code_verifier=${OIDC_config.code_verifier}&client_id=${CLIENT_ID}&redirect_uri=${OIDC_config.redirect_uri}`
    const { data } = await legacyAxios.post(oidcTokenURL, body, {
      apiId: oidcTokenApiId
    })

    validateToken(data)
    addTokenExpirationTime(data)
    await setLoginTokens(data)
  } catch (error) {
    const errorObj = {
      response: {
        config: {
          url: oidcAuthorizeURL,
          apiId: oidcAuthorizeApiId
        }
      }
    }
    throw await handleOIDCError(errorObj)
  }
}

const authorize_OIDC = async () => {
  const { URL, apiId } = ApiRoutes.Mint.oidcAuthorize

  if (Platform.OS === 'ios') {
    try {
      const location =
        await NativeModules.CustomApiCallModule.getRequestNoRedirectionsWithUrl(
          `${LEGACY_BASE_URL}${URL}`,
          await getStorageCookiesAsString()
        )
      return getParamsFromUrl(location)
    } catch (error) {
      throw new Error('authorize get failed')
    }
  } else {
    try {
      await legacyAxios.get(URL, {
        maxRedirects: 0,
        apiId
      })
    } catch (err) {
      return getParamsFromUrl(err?.response?.headers?.location)
    }
  }
}

const refreshToken = async () => {
  const { URL, apiId } = ApiRoutes.Mint.oidcToken
  const { refresh_token } = await getLoginTokens()
  const body = `grant_type=refresh_token&refresh_token=${refresh_token}&client_id=${CLIENT_ID}`
  const { data } = await legacyAxios.post(URL, body, { apiId })
  return data
}

let isRefreshTokensOngoing = false
let resolversOfDXLRequestsAwaitingRefresh: Array<any> = []

const refreshOIDC = async () => {
  try {
    if (isRefreshTokensOngoing) {
      await new Promise((resolve) => {
        resolversOfDXLRequestsAwaitingRefresh.push(resolve)
      })
    } else {
      isRefreshTokensOngoing = true
      const newToken = await refreshToken()
      addTokenExpirationTime(newToken)
      await setLoginTokens(newToken)
      resolversOfDXLRequestsAwaitingRefresh.forEach((resolver) => resolver())
      resolversOfDXLRequestsAwaitingRefresh = []
      isRefreshTokensOngoing = false
      return newToken
    }
    return await getLoginTokens()
  } catch (err) {
    await logOut()
    throw err
  }
}

const validateLocationParams = (locationParams) => {
  if (locationParams?.state !== OIDC_config.state) {
    throw new Error('state not matching error')
  } else if (locationParams.error) {
    throw new Error('authenticate request error')
  } else if (!locationParams.code) {
    throw new Error('code is undefined')
  }
}

const validateToken = (token) => {
  const decoded = jwt_decode(token.id_token)
  if (decoded.nonce !== OIDC_config.nonce) {
    throw new Error('token is invalid')
  }
}

const addTokenExpirationTime = (token) => {
  token.expires_at = +moment().add(
    token.expires_in ? token.expires_in : TOKEN_DEFAULT_EXP_TIME,
    'seconds'
  )
}

export { loadOIDCToken, refreshOIDC, addTokenExpirationTime }
