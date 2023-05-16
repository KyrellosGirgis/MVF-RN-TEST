import { createSlice } from '@reduxjs/toolkit'

const { actions: settingsActions, reducer: settingsReducer } = createSlice({
  name: 'settings',
  initialState: {
    persistedSubscriptionTiles: {},
    presistedSelectedSmallTiles: {}
  },
  reducers: {
    setPersistedSubscriptionTiles: (state, { payload }) => ({
      ...state,
      persistedSubscriptionTiles: {
        ...state.persistedSubscriptionTiles,
        [payload.currentlyActiveSubscriptionId]: payload.tiles
      }
    }),
    setPresistedSelectedSmallTiles: (state, { payload }) => ({
      ...state,
      presistedSelectedSmallTiles: {
        ...state.presistedSelectedSmallTiles,
        ...payload
      }
    })
  }
})

export { settingsActions, settingsReducer }
