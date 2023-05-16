import { AxiosError } from 'axios'

import { userDataType } from './userData.d'

import { ApiRoutes } from 'App/Services'

import { legacyAxios } from 'App/Services/API/Interceptors/legacy.interceptor'

const loadUserData = async () => {
  try {
    const { URL, cache, apiId } = ApiRoutes.Nil.userData
    let newUserData: userDataType = { userAccountVBO: undefined }

    const { data } = await legacyAxios.get(URL, { cache, apiId })

    if (data) {
      const userID =
        data?.userAccountVBO?.onlineUser.onlineUserID ||
        data?.userAccountVBO?.mobile[0].contract.subscription[0].msisdn

      newUserData = {
        ...data,
        loggedInUserId: userID
      }
    }
    return newUserData
  } catch (error) {
    throw error as AxiosError
  }
}

export { loadUserData }
