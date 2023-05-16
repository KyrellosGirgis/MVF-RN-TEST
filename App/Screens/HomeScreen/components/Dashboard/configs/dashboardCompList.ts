/* eslint-disable import/no-anonymous-default-export */
import VovCarousel from 'App/Screens/HomeScreen/components/Dashboard/components/VovCard/VovCarousel'

import {
  DiscoveryCard,
  UsagesCarousel
} from 'App/Screens/HomeScreen/components/Dashboard/components/index'
import SmallTileCard from 'App/Screens/HomeScreen/components/Dashboard/components/SmallTilesCards/SmallTileCard'
import SecondaryCard from 'App/Screens/HomeScreen/components/Dashboard/components/SecondaryCard/SecondaryCard'

export default {
  MainCardComponent: UsagesCarousel,
  SecondaryCardComponent: SecondaryCard,
  ThirdCardComponent: SmallTileCard,
  FourthCardComponent: SmallTileCard,
  discoverComponentCard: DiscoveryCard,
  VovCard: VovCarousel
}
