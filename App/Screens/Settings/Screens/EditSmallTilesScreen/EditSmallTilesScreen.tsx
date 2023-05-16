import React, { FunctionComponent } from 'react'

import { EditTertiaryTilesScreen as CoreEditSmallTilesScreen } from '@vfgroup-oneplatform/framework/EditTertiaryTiles'

import { useDispatch, useSelector } from 'react-redux'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { getThemeImages } from 'App/Themes'

import {
  getPresistedOptinalTiles,
  getSelectedSmallTilesForCurrentUser
} from './EditSmallTilesScreen.helper'

import { NavigationFunctions } from 'App/Containers'

import { navigateToDashboardScreen } from 'App/Screens/Helpers'
import { settingsActions } from 'App/Redux/reducers/settings.reducer'
import { SmallTile } from 'App/Screens/HomeScreen/components/Dashboard/components/SmallTilesCards/SmallTilesCards'

const EditSmallTilesScreen: FunctionComponent = () => {
  const theme = useTheme()
  const images = getThemeImages(theme.name)
  const dispatch = useDispatch()

  const { loggedInUserId, currentPresistedSelectedSmallTiles } = useSelector(
    getSelectedSmallTilesForCurrentUser
  )

  const selectedSmallTiles: SmallTile[] = Object.values(
    currentPresistedSelectedSmallTiles
  )
  const optionalSmallTiles = getPresistedOptinalTiles(selectedSmallTiles)

  const onConfirm = (newSelectedSmallTiles: SmallTile[]) => {
    const newSelectedSmallTilesObject = {
      [loggedInUserId]: {
        ThirdCardComponent: newSelectedSmallTiles[0],
        FourthCardComponent: newSelectedSmallTiles[1]
      }
    }

    dispatch(
      settingsActions.setPresistedSelectedSmallTiles(
        newSelectedSmallTilesObject
      )
    )
    navigateToDashboardScreen()
  }

  return (
    <CoreEditSmallTilesScreen
      onBack={NavigationFunctions.goBack}
      selectedTiles={selectedSmallTiles}
      optionalTiles={optionalSmallTiles}
      onConfirm={onConfirm}
      vfScreen={{
        onClose: navigateToDashboardScreen,
        clearStatusBarEntries: false
      }}
      images={images}
    />
  )
}

export default EditSmallTilesScreen
