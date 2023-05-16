import { createAsyncThunk } from '@reduxjs/toolkit'

import { loadMediumTiles } from 'App/Services/DataLayer/APIs/Dashboard/MediumTiles/MediumTiles.requests'

const fetchMediumTiles = createAsyncThunk(
  'dashboardSkeleton/fetchMediumTiles',
  async () => {
    const mediumTilesData = await loadMediumTiles()
    return mediumTilesData
  }
)

export { fetchMediumTiles }
