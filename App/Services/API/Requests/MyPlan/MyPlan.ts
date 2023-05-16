import { DXLAxios } from 'App/Services/API/Interceptors/DXL.interceptor'

import { ApiRoutes } from 'App/Services'

const loadMyPlan = async () => {
  try {
    const { URL, cache, apiId } = ApiRoutes.DXL.myPlan
    const { data } = await DXLAxios.get(URL, {
      apiId,
      cache
    })
    return data
  } catch (error) {
    throw error
  }
}

export { loadMyPlan }
