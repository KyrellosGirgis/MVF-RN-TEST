import { TILE_ICONS } from 'App/Utils/Enums'
import { DEFAULT_TILES_COUNT } from 'App/Utils/Constants'
import { store } from 'App/Redux'
import { UsageTile } from 'App/Services/API/Requests/Dashboard/subscriptionUnbilledUsage/subscriptionUnbilledUsage.d'
import { settingsActions } from 'App/Redux/reducers/settings.reducer'

export type SettingsTile = {
  _id: string
  icon: string
  name: string
  usageType: string
}

export const getDisplayedTilesMap = (
  settingsTiles: SettingsTile[],
  currentlyActiveSubscriptionId: string
) => {
  const { persistedSubscriptionTiles } = store.getState().settings

  const persistedSubscriptionTilesIds: string[] =
    persistedSubscriptionTiles[currentlyActiveSubscriptionId]

  if (!persistedSubscriptionTilesIds) {
    return {
      selectedTiles: settingsTiles.slice(0, DEFAULT_TILES_COUNT),
      optionalTiles: settingsTiles.slice(DEFAULT_TILES_COUNT)
    }
  }

  const selected = settingsTiles.length
    ? persistedSubscriptionTilesIds.map(
        (tileId) => settingsTiles.find((tile) => tile._id === tileId)!
      )
    : []

  const optional = settingsTiles.filter(
    (tile) => !persistedSubscriptionTilesIds.includes(tile._id)
  )

  return { selectedTiles: selected, optionalTiles: optional }
}

export const mapUsagesToSettingsTiles = (usages: UsageTile[]) =>
  usages?.map(
    (usage: any) =>
      <SettingsTile>{
        _id: usage._id,
        icon: TILE_ICONS[usage.usageType],
        name: usage.title
      }
  )

export const resetSavedTiles = () => {
  const { currentlyActiveSubscription } = store.getState().appUserData

  store.dispatch(
    settingsActions.setPersistedSubscriptionTiles({
      currentlyActiveSubscriptionId: currentlyActiveSubscription?.id,
      tiles: undefined
    })
  )
}
