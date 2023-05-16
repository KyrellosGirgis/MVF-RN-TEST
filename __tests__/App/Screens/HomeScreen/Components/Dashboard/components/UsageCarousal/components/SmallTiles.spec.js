/* eslint-disable import/namespace */
import renderer from 'react-test-renderer'

import React from 'react'
import { ImageBackground } from 'react-native'

import { useSelector } from 'react-redux'

import SmallTileCard from 'App/Screens/HomeScreen/components/Dashboard/components/SmallTilesCards/SmallTileCard'
import { ThunkStatus } from 'App/Redux/StoreType.d'
import * as smallTilesHelpers from 'App/Screens/HomeScreen/components/Dashboard/components/SmallTilesCards/SmallTileCard.helpers'

jest.mock('App/Containers/AppNavigation/NavigationFunctions', () => {
  return { navigate: jest.fn() }
})

const presistedSelectedSmallTiles = {
  presistedSelectedSmallTiles: {
    12: {
      ThirdCardComponent: {
        _id: '1_MyOffers',
        extraInfo: {
          background: 'secondary_card2',
          title: 'my_offers',
          icon: 'icAllRewards'
        }
      },
      FourthCardComponent: {
        _id: '2_Top-up',
        extraInfo: {
          title: 'top_up',
          icon: 'icTopUp',
          leftTitle: ''
        }
      }
    }
  }
}

describe('Testing Small Tiles Screen ', () => {
  beforeAll(() => {
    const state = {
      smallTiles: {
        ThirdCardComponent: {
          _id: '1_MyOffers',
          extraInfo: {
            background: 'secondary_card2',
            title: 'my_offers',
            icon: 'icAllRewards'
          }
        },
        FourthCardComponent: {
          _id: '2_Top-up',
          extraInfo: {
            title: 'top_up',
            icon: 'icTopUp',
            leftTitle: ''
          }
        },
        smallTilesLoadingStatus: ThunkStatus.FULFILLED
      },
      settings: presistedSelectedSmallTiles,
      appUserData: { loggedInUserId: '12' }
    }

    useSelector.mockImplementation((callBack) => {
      return callBack(state)
    })
  })

  test('should render SmallTileCard correctly and return backgroundImage  ', () => {
    smallTilesHelpers.getSelectedSmallTilesForCurrentUser = jest.fn(
      (state) => ({
        currentPresistedSelectedSmallTiles: state.smallTiles,
        smallTilesLoadingStatus: ThunkStatus.FULFILLED
      })
    )
    const instance = renderer.create(
      <SmallTileCard name={'ThirdCardComponent'} />
    )
    const backgroundImage = instance.root.findAllByType(ImageBackground)[0]

    expect(instance).toBeDefined()
    expect(backgroundImage).toBeDefined()
  })

  test('should render SmallTileCard correctly and return fragment because there is no backgroundImage', () => {
    const instance = renderer.create(
      <SmallTileCard name={'FourthCardComponent'} />
    )

    const backgroundImage = instance.root.findAllByType(ImageBackground)

    expect(backgroundImage.length).toEqual(0)
  })

  test('should return the default value of title and icon', () => {
    const presistedSelectedSmallTiles = {
      presistedSelectedSmallTiles: {
        12: {
          ThirdCardComponent: {
            _id: '1_MyOffers',
            extraInfo: {
              background: 'secondary_card2',
              title: 'my_offers',
              icon: 'icAllRewards'
            }
          },
          FourthCardComponent: {
            _id: '2_Top-up',
            extraInfo: {
              leftTitle: 'top up'
            }
          }
        }
      }
    }

    const state = {
      appUserData: { loggedInUserId: '12' },
      smallTiles: {
        smallTiles: [{}, {}],
        smallTilesLoadingStatus: ThunkStatus.FULFILLED
      },
      settings: presistedSelectedSmallTiles
    }
    useSelector.mockImplementation((callBack) => {
      return callBack(state)
    })
    const instance = renderer.create(
      <SmallTileCard name={'FourthCardComponent'} />
    )
    const titleValue = instance.root.findByProps({
      testID: 'FourthCardComponent_title'
    }).props.i18nKey

    expect(titleValue).toEqual('')
  })
})
