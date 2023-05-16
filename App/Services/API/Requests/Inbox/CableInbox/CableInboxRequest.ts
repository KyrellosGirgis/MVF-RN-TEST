import { getCableURN } from './CableInbox.helper'

import { DXLAxios } from 'App/Services/API/Interceptors/DXL.interceptor'

import { ApiRoutes } from 'App/Services'

const loadCableInboxMessages = async () => {
  try {
    const { URL, cache, apiId } = ApiRoutes.DXL.documents
    const { data } = await DXLAxios.get(URL(getCableURN()), {
      cache,
      apiId
    })
    return data
  } catch (error) {
    throw error
  }
}

export { loadCableInboxMessages }
