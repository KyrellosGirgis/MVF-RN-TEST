import { createSlice } from '@reduxjs/toolkit'

import { fetchMediumTiles } from './MediumTiles.thunk'

import { ThunkStatus } from 'App/Redux/StoreType.d'
import { MediumTile } from 'App/Services/DataLayer/APIs/Dashboard/MediumTiles/MediumTiles'

const initialState: {
  mediumTilesLoadingStatus: string
  mediumTiles: MediumTile[]
} = {
  mediumTilesLoadingStatus: ThunkStatus.PENDING,
  mediumTiles: []
}
const { actions: mediumTilesActions, reducer: mediumTilesReducer } =
  createSlice({
    name: 'mediumTiles',
    initialState,
    reducers: {
      setMediumTilesLoadingStatus: (state, { payload }) => ({
        ...state,
        mediumTilesLoadingStatus: payload
      })
    },
    extraReducers: (builder) => {
      builder.addCase(fetchMediumTiles.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
        mediumTilesLoadingStatus: action.meta.requestStatus
      }))

      builder.addCase(fetchMediumTiles.rejected, (state, action) => {
        state.mediumTilesLoadingStatus = action.meta.requestStatus
      })

      builder.addCase(fetchMediumTiles.pending, (state, action) => {
        state.mediumTilesLoadingStatus = action.meta.requestStatus
      })
    }
  })

export { mediumTilesActions, mediumTilesReducer }
