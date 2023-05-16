import { getMockedCMSRootURL } from './Requests/CMS/CMS.helper'

import { UserDataServicesTypes } from 'App/Services/API/Requests/userData/userData.d'

import { store } from 'App/Redux'

const constructRequestParametersForBEWPermission = (
  includeAccountId: boolean = false
) => {
  const { currentlyActiveSubscription } = store?.getState()?.appUserData
  const { type, id, marketCode, ban } = currentlyActiveSubscription
  const isMobileSubscription = type === UserDataServicesTypes.mobile
  const marketCodeParam = isMobileSubscription
    ? `?market-code=${marketCode}`
    : ''
  const accountIdParam =
    isMobileSubscription && includeAccountId ? `/${ban}` : ''
  const apiId = includeAccountId
    ? 'Vluxgate.bewPermissionPost'
    : 'Vluxgate.bewPermissionGet'

  return {
    URL: `/api/vluxgate/bew${accountIdParam}/${type}/${id}/permission${marketCodeParam}`,
    apiId
  }
}

const getCMSCacheConfigs = async ({ defaultCacheTime }) => {
  const mockedCMSRootURL = await getMockedCMSRootURL()
  return {
    maxAge: mockedCMSRootURL ? 0 : defaultCacheTime
  }
}

export { constructRequestParametersForBEWPermission, getCMSCacheConfigs }
