/* eslint-disable import/namespace */
import { store } from 'App/Redux'
import { fetchBalance } from 'App/Redux/Balance/balance.thunk'
import * as balanceRequest from 'App/Services/API/Requests/AccountMovement/AccountMovement.requests'

describe('unit testing for balance thunk', () => {
  it('fetchBalance should call loadTopupHistory when request is resolved', async () => {
    balanceRequest.loadTopupHistory = jest.fn(() => Promise.resolve())
    await store.dispatch(fetchBalance())
    expect(balanceRequest.loadTopupHistory).toHaveBeenCalled()
  })

  it('fetchMyPlan should call loadMyPlan when request is rejected', async () => {
    balanceRequest.loadTopupHistory = jest.fn(() => Promise.reject())
    await store.dispatch(fetchBalance())
    expect(balanceRequest.loadTopupHistory).toHaveBeenCalled()
  })
})
