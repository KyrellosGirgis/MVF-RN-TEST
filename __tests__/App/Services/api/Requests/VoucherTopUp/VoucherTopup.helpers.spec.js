import { constructVoucherTopupBody } from 'App/Services/API/Requests/VoucherTopup/VoucherTopup.helpers'

describe('Voucher topup helpers test', () => {
  it('should generate body right', () => {
    const requestBody = {
      subscriptionVBO: [
        {
          type: 'mobile',
          subscriptions: [
            {
              details: {
                msisdn: ''
              },
              topup: {
                voucherCode: '123456789123456'
              }
            }
          ]
        }
      ]
    }
    expect(constructVoucherTopupBody('123456789123456')).toEqual(requestBody)
  })
})
