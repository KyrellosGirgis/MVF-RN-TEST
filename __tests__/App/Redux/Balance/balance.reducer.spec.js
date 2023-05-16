import { store } from 'App/Redux'
import { balanceActions } from 'App/Redux/Balance/balance.reducer'

describe('unit testing for balance reducer', () => {
  it('should call action succesfully', () => {
    const response = {
      billingAccount: {
        accountBalance: [
          {
            amount: {
              unit: 'EUR',
              value: 6.45
            }
          }
        ],
        balanceTopup: []
      }
    }
    store.dispatch(balanceActions.setBalance(response))
    const balance = store.getState().balance.payload
    expect(balance).toMatchObject(response)
  })
})
