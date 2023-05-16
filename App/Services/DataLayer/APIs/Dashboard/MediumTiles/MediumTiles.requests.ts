import { MediumTiles } from './MediumTiles.d'

import { ApiRoutes } from 'App/Services'

import { DXLAxios } from 'App/Services/API/Interceptors/DXL.interceptor'

import { store } from 'App/Redux'

const loadMediumTiles = async () => {
  const { apiId } = ApiRoutes.DXL.mediumTiles

  try {
    const { data } = await DXLAxios.get(
      store.getState().dashboardSkeleton._embedded?.mediumTiles._links.self
        .href,
      {
        apiId
      }
    )
    return data as MediumTiles
  } catch (error) {
    throw error
  }
}

export { loadMediumTiles }
