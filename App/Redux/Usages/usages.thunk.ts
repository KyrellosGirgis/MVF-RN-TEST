import { createAsyncThunk } from '@reduxjs/toolkit'

import { loadUnbilledUsagesTiles } from 'App/Services/API/Requests/Dashboard/subscriptionUnbilledUsage/subscriptionUnbilledUsage'

const fetchUnbilledUsages = createAsyncThunk(
  'usages/fetchUbilledUsages',
  async () => {
    return await loadUnbilledUsagesTiles()
  }
)

export { fetchUnbilledUsages }
