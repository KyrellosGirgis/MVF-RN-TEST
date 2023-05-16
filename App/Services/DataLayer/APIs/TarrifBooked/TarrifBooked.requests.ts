import { legacyAxios } from 'App/Services/API/Interceptors/legacy.interceptor'

import { store } from 'App/Redux'

import { ApiRoutes } from 'App/Services'

import { TarrifBooked } from 'App/Services/DataLayer/APIs/TarrifBooked/TarrifBooked.requests.d'

const getTarrifBooked = async () => {
  const { URL, apiId } = ApiRoutes.Vluxgate.tariffBooked
  const { id, type, marketCode } =
    store?.getState()?.appUserData?.currentlyActiveSubscription
  try {
    const { data } = await legacyAxios.get(URL(id, type, marketCode), {
      apiId
    })
    return data as TarrifBooked
  } catch (error) {
    throw error
  }
}

export { getTarrifBooked }
