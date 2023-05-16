import {
  billBalanceOptOutData,
  billBalanceOptInData
} from '__tests__/App/Services/api/Requests/Billing/data'
import { store } from 'App/Redux'

import { getBillBalanceData } from 'App/Services/API/Requests/Billing/BillBalance/BillBalance'
import * as dxl from 'App/Services/API/Interceptors/DXL.interceptor'

describe('test get bill balance data ', () => {
  beforeEach(() => {
    store.getState = () => ({
      appUserData: { currentlyActiveSubscription: { ban: 123456 } }
    })
  })
  it('should return true when Bill Ballance data is opt out', async () => {
    dxl.DXLAxios.get.mockImplementation(() => ({
      data: billBalanceOptOutData
    }))

    const responseData = await getBillBalanceData()
    expect(responseData).toEqual(true)
  })
  it('should return false when Bill Ballance data is opt in', async () => {
    dxl.DXLAxios.get.mockImplementation(() => ({
      data: billBalanceOptInData
    }))

    const responseData = await getBillBalanceData()
    expect(responseData).toEqual(false)
  })
  it('should throw error when bill history api fails', async () => {
    dxl.DXLAxios.get.mockImplementation(() => {
      return Promise.reject('error')
    })
    await expect(getBillBalanceData()).rejects.toEqual('error')
  })
})
