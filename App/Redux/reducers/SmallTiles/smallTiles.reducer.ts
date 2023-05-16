import { createSlice } from '@reduxjs/toolkit'

import { fetchSmallTiles } from './smallTiles.Thunk'

import { ThunkStatus } from 'App/Redux/StoreType.d'

const { actions: smallTilesActions, reducer: smallTilesReducer } = createSlice({
  name: 'smallTiles',
  initialState: {
    smallTiles: [],
    smallTilesLoadingStatus: ThunkStatus.PENDING
  },
  reducers: {
    setSmallTiles: (state, { payload }) => ({
      ...state,
      smallTiles: payload
    }),
    setSmallTilesLoadingStatus: (state, { payload }) => ({
      ...state,
      smallTilesLoadingStatus: payload
    })
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSmallTiles.fulfilled, (state, action) => ({
      ...state,
      smallTiles: action.payload,
      smallTilesLoadingStatus: action.meta.requestStatus
    }))

    builder.addCase(fetchSmallTiles.rejected, (state, action) => {
      state.smallTilesLoadingStatus = action.meta.requestStatus
    })

    builder.addCase(fetchSmallTiles.pending, (state, action) => {
      state.smallTilesLoadingStatus = action.meta.requestStatus
    })
  }
})

export { smallTilesActions, smallTilesReducer }
