const mapSmallTilesSkeletonToCards = (tiles) => {
  const smallTiles = tiles?.smallTiles
  const mappedTiles = smallTiles?.map((tile) => ({
    _id: tile.id,
    extraInfo: {
      background: tile.backgroundImage?.href || '',
      title: tile.title || '',
      icon: tile.icon?.href || '',
      onPress: tile.action?.href || '',
      leftTitle: tile.description1 || '',
      rightTitle: tile.description2 || ''
    }
  }))
  return mappedTiles
}

const getSelectedSmallTilesForCurrentUser = (state: []) => {
  const { smallTiles, smallTilesLoadingStatus } = state?.smallTiles

  return {
    currentPresistedSelectedSmallTiles: exports.getMappedSmallTiles(smallTiles),
    smallTilesLoadingStatus
  }
}

const getMappedSmallTiles = (smallTiles) => {
  const mappedTiles = exports.mapSmallTilesSkeletonToCards(smallTiles)
  return {
    ThirdCardComponent: mappedTiles?.[0],
    FourthCardComponent: mappedTiles?.[1]
  }
}

export {
  getMappedSmallTiles,
  getSelectedSmallTilesForCurrentUser,
  mapSmallTilesSkeletonToCards
}
