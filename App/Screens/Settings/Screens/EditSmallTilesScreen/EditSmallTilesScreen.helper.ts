import { differenceBy } from 'lodash'

import {
  DEFAULT_SELECTED_SMALL_TILES,
  SMALL_TILES
} from 'App/Screens/HomeScreen/components/Dashboard/components/SmallTilesCards/SmallTilesCards.constants'
import { SmallTile } from 'App/Screens/HomeScreen/components/Dashboard/components/SmallTilesCards/SmallTilesCards.d'

const getPresistedOptinalTiles = (selectedTiles: SmallTile[]) =>
  differenceBy(SMALL_TILES, selectedTiles, '_id')

const getSelectedSmallTilesForCurrentUser = (state: []) => {
  const { presistedSelectedSmallTiles } = state?.settings
  const { loggedInUserId } = state?.appUserData
  return {
    loggedInUserId,
    currentPresistedSelectedSmallTiles:
      presistedSelectedSmallTiles[loggedInUserId] ||
      DEFAULT_SELECTED_SMALL_TILES
  }
}
export { getPresistedOptinalTiles, getSelectedSmallTilesForCurrentUser }
