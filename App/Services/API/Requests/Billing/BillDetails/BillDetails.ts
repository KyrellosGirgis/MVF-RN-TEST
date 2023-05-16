import { DXLAxios } from 'App/Services/API/Interceptors/DXL.interceptor'

import { ApiRoutes } from 'App/Services'

const loadBillDetails = async () => {
  try {
    const { URL, cache, apiId } = ApiRoutes.DXL.billDetails
    const { data } = await DXLAxios.get(URL, {
      cache,
      apiId
    })
    return data
  } catch (error) {
    throw error
  }
}

export { loadBillDetails }
