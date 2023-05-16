import { createSlice } from '@reduxjs/toolkit'

import { fetchUnbilledUsages } from './usages.thunk'

import { ThunkStatus } from 'App/Redux/StoreType.d'

const { actions: usagesActions, reducer: usagesReducer } = createSlice({
  name: 'usages',
  initialState: {
    usagesTiles: [],
    usagesTilesLoadingStatus: ThunkStatus.PENDING
  },
  reducers: {
    setUsagesTiles: (state, { payload }) => ({
      ...state,
      usagesTiles: payload
    }),
    setUsagesTilesLoadingStatus: (state, { payload }) => ({
      ...state,
      usagesTilesLoadingStatus: payload
    })
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUnbilledUsages.fulfilled, (state, action) => ({
      ...state,
      usagesTiles: action.payload,
      usagesTilesLoadingStatus: action.meta.requestStatus
    }))

    builder.addCase(fetchUnbilledUsages.rejected, (state, action) => {
      state.usagesTilesLoadingStatus = action.meta.requestStatus
    })

    builder.addCase(fetchUnbilledUsages.pending, (state, action) => {
      state.usagesTilesLoadingStatus = action.meta.requestStatus
    })
  }
})

export { usagesActions, usagesReducer }
