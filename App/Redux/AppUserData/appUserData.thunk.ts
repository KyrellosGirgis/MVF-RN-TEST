import { createAsyncThunk } from '@reduxjs/toolkit'

import { appUserDataActions } from './appUserData.reducer'

import { mapBEUserDataToAppUserData } from 'App/Services/API/Requests/userData/userData.helpers'

import { loadUserData } from 'App/Services'

import { AppLifecycleManager } from 'App/Services/AppLifecycleManager/AppLifecycleManager'
import { ActiveSubscription } from 'App/Services/API/Requests/userData/userData.d'

import { handleUserDataApiErrorsIfNeeded } from 'App/Services/AppUserData/AppUserData.helpers'

const fetchAppUserData = createAsyncThunk(
  'appUserData/fetchAppUserData',
  async (_, { rejectWithValue }) => {
    try {
      const userData = await loadUserData()
      mapBEUserDataToAppUserData({
        userAccountVBO: userData.userAccountVBO
      })
      return userData
    } catch (err) {
      //401 is already handled in interceptor
      handleUserDataApiErrorsIfNeeded(err)
      rejectWithValue(null)
    }
  }
)

const switchUserProductData = createAsyncThunk(
  'appUserData/switchUserProductData',
  async (subscription: ActiveSubscription, { dispatch }) => {
    try {
      dispatch(
        appUserDataActions.setCurrentlyActiveSubscription({
          currentlyActiveSubscription: subscription
        })
      )
      subscription &&
        (await AppLifecycleManager.executeOnSubscriptionSwitchTasks())
    } catch (err) {
      return Promise.reject()
    }
  }
)

export { fetchAppUserData, switchUserProductData }
