import { billHistoryData } from '__tests__/App/Services/api/Requests/Billing/data'

import { loadBillingHistory } from 'App/Services/API/Requests/Billing/BillHistory/BillHistory'
import * as dxl from 'App/Services/API/Interceptors/DXL.interceptor'
import { ApiRoutes } from 'App/Services'
import * as dateHelper from 'App/Utils/Helpers/date.helpers'

describe('test loading bill History data ', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should load bill history data', async () => {
    //mock dateFormat method to unify the date format in the project and bitrise
    // eslint-disable-next-line import/namespace
    dateHelper.dateFormat = jest
      .fn()
      .mockReturnValueOnce('27.05')
      .mockReturnValueOnce('28.04')
    const mappedBillHistoryData = {
      nextBillsLink: {
        href: 'https://api.vodafone.de/mva/v1/history?relatedParty.id=urn:vf-de-dxl-tmf:vf:mobile:ban:123456789&offset=3&limit=3'
      },
      billHistoryItems: [
        {
          billDate: '2022-05-18T00:00+02:00',
          billIssuancePrice: 0,
          billIssuanceValue: 0,
          currency: ' €',
          endDate: '2022-05-12T00:00+02:00',
          id: 'urn:vf-de-dxl-tmf:vf:mobile:ban-billdoc:123456789-0000-123456789101',
          paymentInfo: ['27.05'],
          price: 'EUR 0 ',
          startDate: '2022-04-13T00:00+02:00',
          value: 0
        },
        {
          billDate: '2022-04-20T00:00+02:00',
          billIssuancePrice: 276.56,
          billIssuanceValue: 276.56,
          currency: ' €',
          endDate: '2022-04-12T00:00+02:00',
          id: 'urn:vf-de-dxl-tmf:vf:mobile:ban-billdoc:123456789-5500-0118815753504',
          paymentInfo: ['28.04'],
          price: 'EUR 276.56 ',
          startDate: '2022-03-13T00:00+01:00',
          value: 276.56
        }
      ],
      totalCount: 24,
      resultCount: 3
    }
    dxl.DXLAxios.get.mockImplementation(() => ({
      data: billHistoryData
    }))

    const responseData = await loadBillingHistory()
    expect(responseData).toMatchObject(mappedBillHistoryData)
  })

  it('should throw error when bill history api fails', async () => {
    dxl.DXLAxios.get.mockImplementation(() => {
      return Promise.reject('error')
    })
    await expect(loadBillingHistory()).rejects.toEqual('error')
  })
})
describe('test bill History caching time', () => {
  it('caching time should be 15 min', async () => {
    const maxAge = 15 * 60 * 1000
    expect(ApiRoutes.DXL.billHistory.cache.maxAge).toEqual(maxAge)
  })
})
