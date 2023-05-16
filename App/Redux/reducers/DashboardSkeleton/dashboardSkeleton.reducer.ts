import { createSlice } from '@reduxjs/toolkit'

import { fetchDashboardSkeleton } from './dashboardSkeleton.thunk'

import { ThunkStatus } from 'App/Redux/StoreType.d'

import { DashboardSkeleton } from 'App/Services/DataLayer/APIs/Dashboard/DashboardSkeleton/DashboardSkeleton'

type DashboardReducerState = {
  dashboardSkeletonLoadingStatus: string
}

const initialState: DashboardSkeleton & DashboardReducerState = {
  dashboardSkeletonLoadingStatus: ThunkStatus.PENDING,
  _embedded: undefined,
  sections: undefined,
  optionalNavigation: undefined,
  _links: undefined
}

const { actions: dashboardSkeletonActions, reducer: dashboardSkeletonReducer } =
  createSlice({
    name: 'dashboardSkeleton',
    initialState,
    reducers: {
      setDashboardSkeletonLoadingStatus: (state, { payload }) => ({
        ...state,
        dashboardSkeletonLoadingStatus: payload
      }),
      setDashboardSkeletonData: (state, { payload }) => ({
        ...state,
        ...payload
      })
    },
    extraReducers: (builder) => {
      builder.addCase(fetchDashboardSkeleton.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
        dashboardSkeletonLoadingStatus: action.meta.requestStatus
      }))

      builder.addCase(fetchDashboardSkeleton.rejected, (state, action) => {
        state.dashboardSkeletonLoadingStatus = action.meta.requestStatus
      })

      builder.addCase(fetchDashboardSkeleton.pending, (state, action) => {
        state.dashboardSkeletonLoadingStatus = action.meta.requestStatus
      })
    }
  })

export { dashboardSkeletonActions, dashboardSkeletonReducer }
