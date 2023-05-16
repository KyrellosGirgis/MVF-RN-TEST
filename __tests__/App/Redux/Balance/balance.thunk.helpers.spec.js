import { mapBalanceTopupToBalanceHistory } from 'App/Redux/Balance/balance.thunk.helpers'

describe('unit testing for balance thunk helperr', () => {
  it('test mapBalanceTopupToBalanceHistory maps response to balance history correctly', async () => {
    const topupResoponse = [
      {
        description: 'PYM.ATM',
        channel: {
          id: 'PYM.ATM',
          amount: {
            amount: 12,
            units: 'EUR'
          }
        },
        confirmationDate: '2022-10-27T12:26:42.156Z',
        status: 'completed'
      }
    ]
    const balanceHistory = [
      {
        icon: 'topup_history_method_payment_ATM',
        title: 'topup_history_method_payment_ATM',
        date: '2022-10-27T12:26:42.156Z',
        price: '+12.00€',
        type: 'Top-up'
      }
    ]
    expect(mapBalanceTopupToBalanceHistory(topupResoponse)).toEqual(
      balanceHistory
    )
  })

  it('test getHistoryItemType provids a default value if type is not specified ', async () => {
    const topupResoponse = [
      {
        description: undefined,
        channel: {
          id: 'PYM.ATM',
          amount: {
            amount: 12,
            units: 'EUR'
          }
        },
        confirmationDate: '2022-10-27T12:26:42.156Z',
        status: 'completed'
      }
    ]
    const balanceHistory = [
      {
        icon: 'topup_history_method_payment_PYM',
        title: 'topup_history_method_payment_PYM',
        date: '2022-10-27T12:26:42.156Z',
        price: '+12.00€',
        type: 'Top-up'
      }
    ]
    expect(mapBalanceTopupToBalanceHistory(topupResoponse)).toEqual(
      balanceHistory
    )
  })
})
