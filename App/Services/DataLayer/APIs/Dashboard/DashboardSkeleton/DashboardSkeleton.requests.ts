import { DashboardSkeleton } from './DashboardSkeleton.d'

import { DXLAxios } from 'App/Services/API/Interceptors/DXL.interceptor'

import {
  ActiveSubscription,
  UserDataServicesTypes
} from 'App/Services/API/Requests/userData/userData.d'
import {
  isDeviceConnectedToNetwork,
  replaceCountryCodeInMSISDN
} from 'App/Utils/Helpers/generic.helpers'
import ApiRoutes from 'App/Services/API/ApiRoutes'

const loadDashboardSkeleton = async (
  currentlyActiveSubscription: ActiveSubscription
) => {
  try {
    const { URL, apiId } = ApiRoutes.DXL.dashboardSkeleton
    const { id, type, region } = currentlyActiveSubscription
    const subscriptionID =
      type === UserDataServicesTypes.mobile
        ? replaceCountryCodeInMSISDN(id)
        : id

    let newData: DashboardSkeleton = {}
    const { data } = await DXLAxios.get(URL(subscriptionID!, type!, region), {
      apiId
    })

    const isConnected = await isDeviceConnectedToNetwork()
    newData = {
      ...data,
      ...(isConnected && { lastLoadTimeStamp: new Date() }) // not adding lastLoadTimeStamp to data case will be valid when adding cache to DashboardSkeleton api call
    }

    return newData as DashboardSkeleton
  } catch (error) {
    throw error
  }
}

export { loadDashboardSkeleton }
