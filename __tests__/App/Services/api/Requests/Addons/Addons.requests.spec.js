import { addonsData } from '__tests__/App/Services/api/Requests/Addons/data'

import { loadAddonsData } from 'App/Services/API/Requests/Addons/Addons.requests'
import * as dxl from 'App/Services/API/Interceptors/DXL.interceptor'

describe('test loading Addons data ', () => {
  it('should load Addons data', async () => {
    dxl.DXLAxios.get.mockImplementation(() => ({
      data: addonsData
    }))

    const responseData = await loadAddonsData()
    expect(responseData).toMatchObject(addonsData)
  })

  it('should throw error when load Addons data api fails', async () => {
    dxl.DXLAxios.get.mockImplementation(() => {
      return Promise.reject('error')
    })
    await expect(loadAddonsData()).rejects.toEqual('error')
  })
})
