import { handleOnBoardingApisErrors } from 'App/Screens/OnBoarding/OnBoardingErrorTypes'
import ApiRoutes from 'App/Services/API/ApiRoutes'

import { legacyAxios } from 'App/Services/API/Interceptors/legacy.interceptor'

const getHashing = async () => {
  try {
    const { URL, apiId } = ApiRoutes.Vluxgate.hashing
    const { data } = await legacyAxios.get(URL, { apiId })
    return data
  } catch (error) {
    throw handleOnBoardingApisErrors(error)
  }
}

export { getHashing }
