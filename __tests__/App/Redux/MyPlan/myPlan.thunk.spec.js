/* eslint-disable import/namespace */
import { store } from 'App/Redux'
import { fetchMyPlan } from 'App/Redux/myplan/myPlan.thunk'
import * as MyPlanApi from 'App/Services/API/Requests/MyPlan/MyPlan'

describe('unit testing for myPlan thunk', () => {
  it('fetchMyPlan should call loadMyPlan when request is resolved', async () => {
    MyPlanApi.loadMyPlan = jest.fn(() => Promise.resolve())
    await store.dispatch(fetchMyPlan())
    expect(MyPlanApi.loadMyPlan).toHaveBeenCalled()
  })

  it('fetchMyPlan should call loadMyPlan when request is rejected', async () => {
    MyPlanApi.loadMyPlan = jest.fn(() => Promise.reject())
    await store.dispatch(fetchMyPlan())
    expect(MyPlanApi.loadMyPlan).toHaveBeenCalled()
  })
})
