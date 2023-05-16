import { store } from 'App/Redux'
import { ApiRoutes } from 'App/Services'
import { DXLAxios } from 'App/Services/API/Interceptors/DXL.interceptor'

const getSmallTileList = async () => {
  const { apiId } = ApiRoutes.DXL.smallTiles
  const smallTilesURL =
    store.getState().dashboardSkeleton._embedded?.smallTiles._links.self.href
  const { data } = await DXLAxios.get(smallTilesURL, {
    apiId
  })
  return data
}

export { getSmallTileList }
