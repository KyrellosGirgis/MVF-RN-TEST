/* eslint-disable import/namespace */
import { ThunkStatus } from 'App/Redux/StoreType.d'
import * as SmallTilesHelpers from 'App/Screens/HomeScreen/components/Dashboard/components/SmallTilesCards/SmallTileCard.helpers'

const state = {
  smallTiles: {
    smallTiles: {
      smallTiles: [
        {
          id: 'id0',
          parent: 'urn:vf-de-dxl-tmf:vf:mobile:msisdn:01622022786',
          rank: 0,
          type: 'static',
          subType: 'happy',
          title: 'subscription_small_tile_PAYM+I_title',
          description1: 'View all',
          description2: 'Try it!',
          backgroundImage: {
            href: 'background image'
          },
          icon: {
            href: 'icon0 url'
          },
          action: {
            href: 'action0 url'
          }
        },
        {
          id: 'id1',
          parent: 'urn:vf-de-dxl-tmf:vf:mobile:msisdn:01622022786',
          rank: 1,
          type: 'static',
          subType: 'standard',
          title: 'Top Up',
          description2: 'Open',
          icon: {
            href: 'icon url'
          },
          action: {
            href: 'action url'
          }
        }
      ],
      smallTilesLoadingStatus: ThunkStatus.FULFILLED
    }
  }
}

const mappedTiles = [
  {
    _id: 'id0',
    extraInfo: {
      title: 'subscription_small_tile_PAYM+I_title',
      background: 'background image',
      icon: 'icon0 url',
      leftTitle: 'View all',
      onPress: 'action0 url',
      rightTitle: 'Try it!'
    }
  },
  {
    _id: 'id1',
    extraInfo: {
      background: '',
      title: 'Top Up',
      icon: 'icon url',
      leftTitle: '',
      onPress: 'action url',
      rightTitle: 'Open'
    }
  }
]

describe('Test Small Tiles helpers', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return correct list of mapped tiles', () => {
    const mappedSmallTiles = SmallTilesHelpers.mapSmallTilesSkeletonToCards(
      state.smallTiles.smallTiles
    )
    expect(mappedSmallTiles).toEqual(mappedTiles)
  })

  it('should call mapSmallTilesSkeletonToCards with proper smallTiles and return correct mapped small tiles', async () => {
    SmallTilesHelpers.mapSmallTilesSkeletonToCards = jest.fn()
    SmallTilesHelpers.getMappedSmallTiles(state.smallTiles.smallTiles)
    expect(SmallTilesHelpers.mapSmallTilesSkeletonToCards).toHaveBeenCalledWith(
      state.smallTiles.smallTiles
    )
  })

  it('should call getMappedSmallTiles with proper smallTiles and return correct response', async () => {
    SmallTilesHelpers.getMappedSmallTiles = jest.fn()
    SmallTilesHelpers.getSelectedSmallTilesForCurrentUser(state)
    expect(SmallTilesHelpers.getMappedSmallTiles).toHaveBeenCalledWith(
      state.smallTiles.smallTiles
    )
  })
})
