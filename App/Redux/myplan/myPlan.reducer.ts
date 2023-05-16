import { createSlice } from '@reduxjs/toolkit'

import { fetchMyPlan } from './myPlan.thunk'

import { ThunkStatus } from 'App/Redux/StoreType.d'

const { actions: myPlanActions, reducer: myPlanReducer } = createSlice({
  name: 'myplan',
  initialState: {
    dataLoadingStatus: ThunkStatus.PENDING
  },
  reducers: {
    setMyPlan: (state, { payload }) => ({
      ...state,
      payload
    })
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMyPlan.fulfilled, (state, action) => ({
      ...state,
      ...action.payload,
      dataLoadingStatus: action.meta.requestStatus
    }))

    builder.addCase(fetchMyPlan.rejected, (state, action) => {
      state.dataLoadingStatus = action.meta.requestStatus
    })

    builder.addCase(fetchMyPlan.pending, (state, action) => {
      state.dataLoadingStatus = action.meta.requestStatus
    })
  }
})

export { myPlanActions, myPlanReducer }
