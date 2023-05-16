import { createAsyncThunk } from '@reduxjs/toolkit'

import { mapBalanceTopupToBalanceHistory } from './balance.thunk.helpers'

import { loadTopupHistory } from 'App/Services/API/Requests/AccountMovement/AccountMovement.requests'

const fetchBalance = createAsyncThunk('balance/fetchBalance', async () => {
  try {
    const {
      billingAccount: { balanceTopup, accountBalance }
    } = await loadTopupHistory()
    const historyArray = mapBalanceTopupToBalanceHistory(balanceTopup)

    return {
      balance: accountBalance[0]?.amount,
      history: [
        {
          id: 1,
          name: 'Top-up',
          items: historyArray
        }
      ]
    }
  } catch (err) {
    return Promise.reject()
  }
})

export { fetchBalance }
