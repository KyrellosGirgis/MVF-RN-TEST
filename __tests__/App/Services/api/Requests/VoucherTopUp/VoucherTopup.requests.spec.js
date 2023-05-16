import { topupWithVoucherCode } from 'App/Services/API/Requests/VoucherTopup/VoucherTopup.requests'

import * as legacy from 'App/Services/API/Interceptors/legacy.interceptor'

jest.mock('App/Services/API/Interceptors/legacy.interceptor', () => {
  return {
    legacyAxios: {
      post: jest.fn()
    }
  }
})

const response = {
  subscriptionVBO: [
    {
      type: 'mobile',
      subscriptions: [
        {
          details: {
            msisdn: '003444556662'
          },
          topup: {
            voucherCode: '012345678913456',
            amount: '25.00',
            status: 'success',
            statusMessage:
              'Vielen Dank, wir werden Ihrem Konto 25,00 EUR gutschreiben.'
          }
        }
      ]
    }
  ]
}

describe('test Voucher TopUp requests', () => {
  describe('test topupWithVoucherCode service', () => {
    it('should return data when topupWithVoucherCode api success', async () => {
      legacy.legacyAxios.post.mockImplementation(() => {
        return {
          data: response
        }
      })

      const result = await topupWithVoucherCode('012345678913456')
      expect(result).toEqual('25.00')
    })

    it('should throw error when api call fails', async () => {
      const serviceError = {
        cause: 'EXPIRED_CODE',
        message: 'voucher_top_up_general_error_message',
        name: 'voucher_top_up_error_title'
      }
      legacy.legacyAxios.post.mockImplementation(() => {
        return new Promise((resolve, reject) => {
          reject(serviceError)
        })
      })
      await expect(topupWithVoucherCode('012345678913456')).rejects.toEqual(
        serviceError
      )
    })
  })
})
