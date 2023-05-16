import moment from 'moment'
import { AxiosError } from 'axios'

import { DXLBlackList } from 'App/Services/API/Interceptors/Constants/Interceptors.blackList'
import logOut from 'App/Screens/Login/Implementations/LogoutImplementation/LogoutImplementation'
import { refreshOIDC } from 'App/Services/API'
import { getPathFromUrl } from 'App/Utils/Helpers/generic.helpers'

const refreshThreshold = 60000

const isTokenValid = (expires_at: number) => {
  return expires_at > +moment().add(refreshThreshold, 'milliseconds')
}

const DXL_retryCondition = async (error: AxiosError) => {
  const { config, response: { status, config: resConfig } = {} } = error
  const retryCount = resConfig!['axios-retry']?.retryCount
  const url = getPathFromUrl(config.url!)
  const authfailureStatusList = [401]
  const shouldRefresh =
    authfailureStatusList.includes(status!) &&
    !DXLBlackList.includes(url) &&
    retryCount === 0

  if (shouldRefresh) {
    await refreshOIDC()
  } else {
    authfailureStatusList.includes(status!) &&
      retryCount >= 1 &&
      (await logOut())
    throw error
  }

  return true
}

export { isTokenValid, DXL_retryCondition }
