import { store, StoreType } from 'App/Redux'
import { DEFAULT_TILES_COUNT } from 'App/Utils/Constants'

import { mapUsageTilesToTilesIds } from 'App/Screens/Helpers'
import { settingsActions } from 'App/Redux/reducers/settings.reducer'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

const getDisplayedUsages = () => {
  const {
    appUserData: { currentlyActiveSubscription },
    usages: { usagesTiles: usagesLoaded },
    settings: { persistedSubscriptionTiles }
  }: StoreType = store.getState()

  if (!usagesLoaded) {
    return []
  }

  const persistedTilesIds =
    persistedSubscriptionTiles[currentlyActiveSubscription?.id]

  if (!persistedTilesIds) {
    return [...usagesLoaded].slice(0, DEFAULT_TILES_COUNT)
  }

  return persistedTilesIds.map(
    (tileId) => usagesLoaded.find((usage) => usage._id === tileId)!
  )
}

const getPreviousUsagesTilesIds = async () => {
  const previousUsagesTilesIds = await EncryptedStorage.getItemParsedToJSON(
    STORAGE_KEYS.previousUsagesTilesIds
  )
  return previousUsagesTilesIds || {}
}

const getPreviousUsagesTilesIdsOfSubscription = async (
  currentlyActiveSubscriptionId: string
) => {
  const previousUsagesTilesIds = await getPreviousUsagesTilesIds()
  return previousUsagesTilesIds[currentlyActiveSubscriptionId] || []
}

const updatePreviousUsagesTilesIds = async (
  currentUsagesTilesIds: string[]
) => {
  const {
    appUserData: { currentlyActiveSubscription }
  }: StoreType = store.getState()

  const previousUsagesTilesIds = await getPreviousUsagesTilesIds()

  await EncryptedStorage.setItem(
    STORAGE_KEYS.previousUsagesTilesIds,
    JSON.stringify({
      ...previousUsagesTilesIds,
      [currentlyActiveSubscription?.id]: currentUsagesTilesIds
    })
  )
}

const updatePersistedSubscriptionTilesIds = (
  currentlyActiveSubscriptionId: string,
  newUsagesTilesIds: string[],
  filteredPersistedSubscriptionTilesIds: string[]
) => {
  store.dispatch(
    settingsActions.setPersistedSubscriptionTiles({
      currentlyActiveSubscriptionId: currentlyActiveSubscriptionId,
      tiles: [...newUsagesTilesIds, ...filteredPersistedSubscriptionTilesIds]
    })
  )
}

const prepareDisplayedTiles = async () => {
  const {
    appUserData: { currentlyActiveSubscription },
    usages: { usagesTiles: usagesLoaded },
    settings: { persistedSubscriptionTiles }
  }: StoreType = store.getState()

  const persistedSubscriptionTilesIds =
    persistedSubscriptionTiles[currentlyActiveSubscription?.id]

  if (!usagesLoaded || !persistedSubscriptionTilesIds) {
    return
  }

  const currentUsagesTilesIds: string[] = mapUsageTilesToTilesIds(usagesLoaded)

  const previousUsagesTilesIds = await getPreviousUsagesTilesIdsOfSubscription(
    currentlyActiveSubscription?.id
  )

  // clean persistedSubscriptionTilesIds if some are deleted from the backend side
  const filteredPersistedSubscriptionTilesIds: string[] =
    persistedSubscriptionTilesIds.filter((usageId: string) =>
      currentUsagesTilesIds.includes(usageId)
    )

  // get the new usages added from the backend if they exist
  const newUsagesTilesIds = previousUsagesTilesIds.length
    ? currentUsagesTilesIds.filter(
        (usageTileId) => !previousUsagesTilesIds.includes(usageTileId)
      )
    : []

  // save persistedSubscriptionTilesIds with the new usages (if exists) + the cleaned persistedSubscriptionTilesIds
  updatePersistedSubscriptionTilesIds(
    currentlyActiveSubscription?.id,
    newUsagesTilesIds,
    filteredPersistedSubscriptionTilesIds
  )

  // update previousUsagesTilesIds with the current usages
  await updatePreviousUsagesTilesIds(currentUsagesTilesIds)
}

export {
  getDisplayedUsages,
  prepareDisplayedTiles,
  updatePreviousUsagesTilesIds
}
