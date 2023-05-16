import { Addon } from '@vfgroup-oneplatform/framework/Services'

import { store } from 'App/Redux'
import { fetchAddons } from 'App/Redux/Addons/addons.thunk'
import { loadAddonsData } from 'App/Services/API/Requests/Addons/Addons.requests'
import { addonsData } from '__tests__/App/Services/api/Requests/Addons/data'

jest.mock('App/Services/API/Requests/Addons/Addons.requests', () => {
  return {
    loadAddonsData: jest.fn()
  }
})
jest.mock('@vfgroup-oneplatform/framework/Services', () => {
  return {
    Addon: {
      mapActiveAddOnsResponse: jest.fn()
    }
  }
})

describe('test addons thunk', () => {
  it('fetchAddons should return the correct data when when loadAddonsData success', async () => {
    Addon.mapActiveAddOnsResponse.mockImplementation(
      () => addonsData.digitalProductOffering
    )
    loadAddonsData.mockImplementation(() => addonsData)
    const payload = {
      addonsData: addonsData.digitalProductOffering,
      inlineContentData: addonsData.inlineContentData,
      addOnsCurrentPlan: addonsData.addOnsCurrentPlan,
      isInlineContentEnabled: addonsData.isInlineContentEnabled
    }
    const data = await store.dispatch(fetchAddons())
    expect(loadAddonsData).toHaveBeenCalled()
    expect(data.payload).toEqual(payload)
  })

  it('fetchAddons should throw error when loadAddonsData failed', async () => {
    loadAddonsData.mockImplementation(() => Promise.reject('error'))
    const data = await store.dispatch(fetchAddons())
    expect(loadAddonsData).toHaveBeenCalled()
    expect(data.error.message).toEqual('error')
  })
})
