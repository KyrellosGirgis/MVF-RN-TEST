import { billDetailsData, billInvoiceData } from './data'

import { loadBillDetails } from 'App/Services/API/Requests/Billing/BillDetails/BillDetails'
import { store } from 'App/Redux'

import { DXLAxios } from 'App/Services/API/Interceptors/DXL.interceptor'
import { ApiRoutes } from 'App/Services'
import { loadPDF } from 'App/Services/API/Requests/DownloadPDF/downloadPDF'

jest.mock('App/Services/API/Interceptors/DXL.interceptor', () => {
  return {
    DXLAxios: {
      get: jest.fn()
    }
  }
})
const ban = 12345678910
describe('test loading bill details data ', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    store.getState = () => ({
      appUserData: { currentlyActiveSubscription: { ban } }
    })
  })

  it('should load bill details data', async () => {
    DXLAxios.get.mockImplementation(() => ({
      data: billDetailsData
    }))

    const responseData = await loadBillDetails()
    expect(responseData).toEqual(billDetailsData)
  })

  it('should throw error when bill details api fails', async () => {
    DXLAxios.get.mockImplementation(() => {
      return Promise.reject('error')
    })
    await expect(loadBillDetails()).rejects.toEqual('error')
  })

  it('should load bill invoice data', async () => {
    DXLAxios.get.mockImplementation(() => ({
      data: billInvoiceData
    }))

    const responseData = await loadPDF(billDetailsData.relatedEntity[0].href)
    expect(responseData).toEqual(billInvoiceData)
  })

  it('should throw error when bill invoice api fails', async () => {
    DXLAxios.get.mockImplementation(() => {
      return Promise.reject('error')
    })
    await expect(loadPDF()).rejects.toEqual('error')
  })
})
describe('test bill details caching time', () => {
  it('caching time should be 15 min', async () => {
    const maxAge = 15 * 60 * 1000
    expect(ApiRoutes.DXL.billDetails.cache.maxAge).toEqual(maxAge)
  })
})
