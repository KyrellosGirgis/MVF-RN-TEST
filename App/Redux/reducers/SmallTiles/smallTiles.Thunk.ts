import { createAsyncThunk } from '@reduxjs/toolkit'

import { getSmallTileList } from 'App/Services/DataLayer/APIs/Dashboard/smallTiles/SmallTiles'

const fetchSmallTiles = createAsyncThunk('smallTiles/smallTiles', async () => {
  return await getSmallTileList()
})

export { fetchSmallTiles }
