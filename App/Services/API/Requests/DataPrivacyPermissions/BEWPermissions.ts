import { BEWPermissionsStatus } from './DataPrivacyPermissions.d'
import { mapBEWSelectionsToRequestBody } from './DataPrivacyPermissions.helpers'

import ApiRoutes from 'App/Services/API/ApiRoutes'
import { legacyAxios } from 'App/Services/API/Interceptors/legacy.interceptor'

const loadBEWPermissions = async () => {
  const { URL, apiId } = ApiRoutes.Vluxgate.bewPermission()

  try {
    const { data } = await legacyAxios.get(URL, {
      apiId
    })
    return data
  } catch (error) {
    throw error
  }
}

const saveBEWPermissionsToBE = async (
  bewPermissionsStatus: BEWPermissionsStatus
) => {
  const { URL, apiId } = ApiRoutes.Vluxgate.bewPermission(true)
  const body = mapBEWSelectionsToRequestBody(bewPermissionsStatus)

  try {
    const { data } = await legacyAxios.post(URL, body, { apiId })
    return data
  } catch (error) {
    throw error
  }
}

export { loadBEWPermissions, saveBEWPermissionsToBE }
