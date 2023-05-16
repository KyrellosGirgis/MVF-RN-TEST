import React from 'react'
import renderer from 'react-test-renderer'

import { useDispatch, useSelector } from 'react-redux'

import { EditTertiaryTilesScreen } from '@vfgroup-oneplatform/framework/EditTertiaryTiles'

import EditSmallTilesScreen from 'App/Screens/Settings/Screens/EditSmallTilesScreen/EditSmallTilesScreen'
import { NavigationFunctions } from 'App/Containers'

jest.mock('react-native-reanimated', () => ({
  ...require('react-native-reanimated/mock'),
  call: jest.fn()
}))

jest.mock('App/Containers/AppNavigation/NavigationFunctions', () => {
  return { goBack: jest.fn(), navigate: jest.fn(), popToTop: jest.fn() }
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

describe('testing Edit Small Tiles Screen ', () => {
  beforeAll(() => {
    const state = {
      settings: presistedSelectedSmallTiles,
      appUserData: { loggedInUserId: '12' }
    }
    useSelector.mockImplementation((callBack) => {
      return callBack(state)
    })
  })
  test('should render Edit Small Tiles correctly ', () => {
    const instance = renderer.create(<EditSmallTilesScreen />)
    const coreInstance = instance.root.findAllByType(EditTertiaryTilesScreen)[0]

    expect(instance).toBeDefined()
    expect(coreInstance).toBeDefined()
  })

  test('should call the right functions when excute on confirm ', async () => {
    useDispatch.mockReturnValue(jest.fn)

    const instance = renderer.create(<EditSmallTilesScreen />)
    const coreInstance = instance.root.findAllByType(EditTertiaryTilesScreen)[0]
    await coreInstance.props.onConfirm([])

    expect(useDispatch).toHaveBeenCalled()
    expect(NavigationFunctions.popToTop).toHaveBeenCalled()
  })
  test('should call the right functions when excute on Back ', async () => {
    const instance = renderer.create(<EditSmallTilesScreen />)
    const coreInstance = instance.root.findAllByType(EditTertiaryTilesScreen)[0]
    await coreInstance.props.onBack()

    expect(NavigationFunctions.goBack).toHaveBeenCalled()
  })
})
