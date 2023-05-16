import { SmallTile } from './SmallTilesCards'

import { showTopUpMethodsModal } from 'App/Screens/TopUpScreens/TopUpMethodsScreen/TopUpMethodsScreen.helpers'
import { openServiceWebview } from 'App/Screens/WebViewScreen/WebViewScreen.helper'

const SMALL_TILES: SmallTile[] = [
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
  },
  {
    _id: '3_NetworkSignal',
    extraInfo: {
      title: 'Network Signal',
      icon: 'networkSignal',
      leftTitle: '120K '
    }
  },
  {
    _id: '4_WifiControl',
    extraInfo: {
      title: 'Wifi Control',
      icon: 'icWifiBroadband',
      leftTitle: 'wifi_left_title'
    }
  },
  {
    _id: '5_Demo',
    extraInfo: {
      title: 'Demo',
      icon: 'icWifiBroadband',
      leftTitle: 'demo',
      rightTitle: 'demo'
    }
  }
]

const DEFAULT_SELECTED_SMALL_TILES = {
  ThirdCardComponent: SMALL_TILES[0],
  FourthCardComponent: SMALL_TILES[1]
}

export { SMALL_TILES, DEFAULT_SELECTED_SMALL_TILES }
