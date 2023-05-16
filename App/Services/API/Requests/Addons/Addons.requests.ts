import { Addon } from '@vfgroup-oneplatform/framework/Services'

import { ApiRoutes } from 'App/Services/'
import { DXLAxios } from 'App/Services/API/Interceptors/DXL.interceptor'

const loadAddonsData = async () => {
  try {
    const { URL, apiId } = ApiRoutes.DXL.addons
    const { data } = await DXLAxios.get(URL, {
      apiId
    })
    return data
  } catch (error) {
    throw error
  }
}
const loadAddonsShopData = async () => {
  try {
    const { URL, apiId } = ApiRoutes.DXL.addonsShop
    const { data } = await DXLAxios.get(URL, {
      apiId
    })
    const addons = Addon.mapAddonsDataResponse(data)
    return addons.allAddOnData
  } catch (error) {
    throw error
  }
}

export { loadAddonsData, loadAddonsShopData }
