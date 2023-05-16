import { createSlice } from '@reduxjs/toolkit'

import { fetchAddons } from './addons.thunk'

import { ThunkStatus } from 'App/Redux/StoreType.d'

const { actions: addonsActions, reducer: addonsReducer } = createSlice({
  name: 'addons',
  initialState: {
    addonsLoadingStatus: ThunkStatus.PENDING
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAddons.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
      addonsLoadingStatus: action.meta.requestStatus
    }))
    builder.addCase(fetchAddons.rejected, (state, action) => {
      state.addonsLoadingStatus = action.meta.requestStatus
    })
    builder.addCase(fetchAddons.pending, (state, action) => {
      state.addonsLoadingStatus = action.meta.requestStatus
    })
  }
})
export { addonsActions, addonsReducer }
