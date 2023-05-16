import { createSlice } from '@reduxjs/toolkit'

import { fetchBalance } from './balance.thunk'

import { ThunkStatus } from 'App/Redux/StoreType.d'

const { actions: balanceActions, reducer: balanceReducer } = createSlice({
  name: 'balance',
  initialState: {
    dataLoadingStatus: ThunkStatus.PENDING
  },
  reducers: {
    setBalance: (state, { payload }) => ({
      ...state,
      payload
    })
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBalance.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
      dataLoadingStatus: action.meta.requestStatus
    }))
    builder.addCase(fetchBalance.rejected, (state, action) => {
      state.dataLoadingStatus = action.meta.requestStatus
    })
    builder.addCase(fetchBalance.pending, (state, action) => {
      state.dataLoadingStatus = action.meta.requestStatus
    })
  }
})
export { balanceActions, balanceReducer }
