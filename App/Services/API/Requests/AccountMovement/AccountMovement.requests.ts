import { DXLAxios } from 'App/Services/API/Interceptors/DXL.interceptor'

import { ApiRoutes } from 'App/Services'
import { getMsisdn } from 'App/Services/AppUserData/AppUserData.helpers'

const loadTopupHistory = async () => {
  try {
    const { URL, cache, apiId } = ApiRoutes.DXL.accountMovement
    const { data } = await DXLAxios.get(URL(getMsisdn()), {
      cache,
      apiId
    })
    return data
  } catch (error) {
    throw error
  }
}

export { loadTopupHistory }
