import { getLoginTokens } from 'App/Screens/Login/Implementations/Login.helper'
import { legacyAxios } from 'App/Services/API/Interceptors/legacy.interceptor'
import ApiRoutes from 'App/Services/API/ApiRoutes'
import { CLIENT_ID } from 'App/Services/Keys/Keys.helper'

const LogOutAPI = async () => {
  const { access_token, refresh_token, id_token } = await getLoginTokens()

  const requestsBodies = [
    `token_type=access_token&token=${access_token}&client_id=${CLIENT_ID}`,
    `token_type=refresh_token&token=${refresh_token}&client_id=${CLIENT_ID}`,
    `token_type=id_token&token=${id_token}&client_id=${CLIENT_ID}`
  ]

  for (const body in requestsBodies) {
    const { URL, apiId } = ApiRoutes.Mint.oidcRevoke
    try {
      await legacyAxios.post(URL, requestsBodies[body], { apiId })
    } catch {}
  }

  try {
    const { URL, apiId } = ApiRoutes.Mint.sessionEnd
    await legacyAxios.post(URL, undefined, { apiId })
  } catch {}
}

export default LogOutAPI
