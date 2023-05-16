import { createAsyncThunk } from '@reduxjs/toolkit'

import { loadMyPlan } from 'App/Services/API/Requests/MyPlan/MyPlan'

const fetchMyPlan = createAsyncThunk('myplan/fetchMyPlan', async () => {
  try {
    const myPlan = await loadMyPlan()
    return { myPlan }
  } catch (err) {
    return Promise.reject()
  }
})

export { fetchMyPlan }
