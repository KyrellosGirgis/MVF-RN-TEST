import { createAsyncThunk } from '@reduxjs/toolkit'

import { Addon } from '@vfgroup-oneplatform/framework/Services'

import { loadAddonsData } from 'App/Services/API/Requests/Addons/Addons.requests'

const fetchAddons = createAsyncThunk('addons/fetchAddons', async () => {
  try {
    const addons = await loadAddonsData()
    const addonsData = Addon.mapActiveAddOnsResponse(addons)
    return {
      addonsData: addonsData,
      inlineContentData: addons.inlineContentData,
      addOnsCurrentPlan: addons.addOnsCurrentPlan,
      isInlineContentEnabled: addons.isInlineContentEnabled
    }
  } catch (err) {
    throw err
  }
})
export { fetchAddons }
