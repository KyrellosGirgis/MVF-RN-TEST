import {
  getPresistedOptinalTiles,
  getSelectedSmallTilesForCurrentUser
} from 'App/Screens/Settings/Screens/EditSmallTilesScreen/EditSmallTilesScreen.helper'
import { showTopUpMethodsModal } from 'App/Screens/TopUpScreens/TopUpMethodsScreen/TopUpMethodsScreen.helpers'
import { openServiceWebview } from 'App/Screens/WebViewScreen/WebViewScreen.helper'

describe('test Edit Small Tiles helper function', () => {
  const array = [
    {
      _id: '3_NetworkSignal',
      extraInfo: {
        title: 'network_signal',
        icon: 'networkSignal',
        leftTitle: '120K '
      }
    },
    {
      _id: '4_WifiControl',
      extraInfo: {
        title: 'wifi_control',
        icon: 'icWifiBroadband',
        leftTitle: 'wifi_left_title'
      }
    },
    {
      _id: '5_Demo',
      extraInfo: {
        title: 'demo',
        icon: 'icWifiBroadband',
        leftTitle: 'demo',
        rightTitle: 'demo'
      }
    }
  ]
  const expectedResult = [
    {
      _id: '1_MyOffers',
      extraInfo: {
        background: 'secondary_card2',
        title: 'My Offers',
        icon: 'icAllRewards',
        onPress: openServiceWebview
      }
    },
    {
      _id: '2_Top-up',
      extraInfo: {
        title: 'Top-up',
        icon: 'icTopUp',
        leftTitle: '',
        onPress: showTopUpMethodsModal
      }
    }
  ]

  test('should return the expected result ', () => {
    const result = getPresistedOptinalTiles(array)
    expect(result).toEqual(expectedResult)
  })

  test('Ensure that getSelectedSmallTilesForCurrentUser returned expected object', () => {
    const presistedSelectedSmallTiles = {
      12: {
        ThirdCardComponent: {
          _id: '1_MyOffers',
          extraInfo: {
            background: 'secondary_card2',
            title: 'my_offers',
            icon: 'icAllRewards',
            onPress: openServiceWebview
          }
        },
        FourthCardComponent: {
          _id: '2_Top-up',
          extraInfo: {
            title: 'top_up',
            icon: 'icTopUp',
            leftTitle: '',
            onPress: showTopUpMethodsModal
          }
        }
      },
      13: {
        ThirdCardComponent: {
          _id: '3_NetworkSignal',
          extraInfo: {
            title: 'Network Signal',
            icon: 'networkSignal',
            leftTitle: '120K '
          }
        },
        FourthCardComponent: {
          _id: '4_WifiControl',
          extraInfo: {
            title: 'Wifi Control',
            icon: 'icWifiBroadband',
            leftTitle: 'wifi_left_title'
          }
        }
      }
    }

    const expectedResult = {
      currentPresistedSelectedSmallTiles: {
        FourthCardComponent: {
          _id: '4_WifiControl',
          extraInfo: {
            icon: 'icWifiBroadband',
            leftTitle: 'wifi_left_title',
            title: 'Wifi Control'
          }
        },
        ThirdCardComponent: {
          _id: '3_NetworkSignal',
          extraInfo: {
            icon: 'networkSignal',
            leftTitle: '120K ',
            title: 'Network Signal'
          }
        }
      },
      loggedInUserId: '13'
    }

    const state = {
      settings: { presistedSelectedSmallTiles },
      appUserData: { loggedInUserId: '13' }
    }

    const currentSelectedSmallTiles = getSelectedSmallTilesForCurrentUser(state)

    expect(currentSelectedSmallTiles).toEqual(expectedResult)
  })

  test('Ensure that getSelectedSmallTilesForCurrentUser returned expected object when there no object in redux ', () => {
    const presistedSelectedSmallTiles = {}

    const expectedResult = {
      currentPresistedSelectedSmallTiles: {
        FourthCardComponent: {
          _id: '2_Top-up',
          extraInfo: {
            icon: 'icTopUp',
            leftTitle: '',
            title: 'Top-up',
            onPress: showTopUpMethodsModal
          }
        },
        ThirdCardComponent: {
          _id: '1_MyOffers',
          extraInfo: {
            background: 'secondary_card2',
            icon: 'icAllRewards',
            title: 'My Offers',
            onPress: openServiceWebview
          }
        }
      },
      loggedInUserId: '12'
    }
    const state = {
      settings: { presistedSelectedSmallTiles },
      appUserData: { loggedInUserId: '12' }
    }

    const currentSelectedSmallTiles = getSelectedSmallTilesForCurrentUser(state)

    expect(currentSelectedSmallTiles).toEqual(expectedResult)
  })
})
