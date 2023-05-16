import { createAsyncThunk } from '@reduxjs/toolkit'

import { loadDashboardSkeleton } from 'App/Services/DataLayer/APIs/Dashboard/DashboardSkeleton/DashboardSkeleton.requests'
import store from 'App/Redux/store'

const fetchDashboardSkeleton = createAsyncThunk(
  'dashboardSkeleton/fetchDashboardSkeleton',
  async () => {
    const { currentlyActiveSubscription } = store.getState().appUserData
    try {
      const dashboardSkeletonData = await loadDashboardSkeleton(
        currentlyActiveSubscription
      )
      return dashboardSkeletonData
      //todo : data cleaning should be done here
    } catch (error) {
      throw error
    }
  }
)

export { fetchDashboardSkeleton }
