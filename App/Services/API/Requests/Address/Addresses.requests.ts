import { REQUEST_METHODS } from 'App/Services/API/Constants'

import { AddressUIType } from 'App/Services/API/Requests/Address/Addresses.d'

import { legacyAxios } from 'App/Services/API/Interceptors/legacy.interceptor'
import { ApiRoutes } from 'App/Services'
import {
  mapPostalContactPointApiResponseToAddressUIModel,
  getAccountId,
  mapChangedAddressDataToRequestBody
} from 'App/Services/API/Requests/Address/Addresses.helpers'
import { store } from 'App/Redux'

const fetchUserAddresses = async () => {
  const { currentlyActiveSubscription } = store?.getState()?.appUserData

  try {
    const { URL, apiId } = ApiRoutes.Nil.PostalContactPointAddresses
    const updatedApiId = apiId(REQUEST_METHODS.GET)
    const url = URL(
      currentlyActiveSubscription.type,
      getAccountId(currentlyActiveSubscription),
      currentlyActiveSubscription.marketCode
    )
    const { data } = await legacyAxios.get(url, {
      apiId: updatedApiId
    })
    return mapPostalContactPointApiResponseToAddressUIModel(data)
  } catch (error) {
    throw error
  }
}
const changeAddress = async (changedAddress: AddressUIType) => {
  const { currentlyActiveSubscription } = store?.getState()?.appUserData

  const body = mapChangedAddressDataToRequestBody(
    changedAddress,
    currentlyActiveSubscription
  )
  try {
    const { URL, apiId } = ApiRoutes.Nil.PostalContactPointAddresses
    const updatedApiId = apiId(REQUEST_METHODS.PUT)
    const url = URL(
      currentlyActiveSubscription.type,
      getAccountId(currentlyActiveSubscription),
      currentlyActiveSubscription.marketCode
    )
    await legacyAxios.put(url, body, {
      apiId: updatedApiId
    })
  } catch (error) {
    throw error
  }
}

export { fetchUserAddresses, changeAddress }
