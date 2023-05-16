import { createSlice } from '@reduxjs/toolkit'

import { fetchAppUserData } from './appUserData.thunk'

import { ThunkStatus } from 'App/Redux/StoreType.d'

const { actions: appUserDataActions, reducer: appUserDataReducer } =
  createSlice({
    name: 'appUserData',
    initialState: {
      loggedInUserId: '',
      appUserDataLoadingStatus: ThunkStatus.PENDING,
      currentlyActiveSubscription: undefined,
      userAccountVBO: {}
    },
    reducers: {
      setAppUserData: (state, { payload }) => ({
        ...state,
        ...payload
      }),
      setCurrentlyActiveSubscription: (state, { payload }) => ({
        ...state,
        currentlyActiveSubscription: payload?.currentlyActiveSubscription
      })
    },
    extraReducers: (builder) => {
      builder.addCase(fetchAppUserData.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
        appUserDataLoadingStatus: action.meta.requestStatus
      }))

      builder.addCase(fetchAppUserData.rejected, (state, action) => {
        state.appUserDataLoadingStatus = action.meta.requestStatus
      })

      builder.addCase(fetchAppUserData.pending, (state, action) => {
        state.appUserDataLoadingStatus = action.meta.requestStatus
      })
    }
  })

export { appUserDataActions, appUserDataReducer }
