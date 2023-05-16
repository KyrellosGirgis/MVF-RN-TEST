import { store } from 'App/Redux'
import { myPlanActions } from 'App/Redux/myplan/myPlan.reducer'

describe('unit testing for myPlan reducer', () => {
  it('should set myPlanData succesfully', () => {
    const myPlanRepsonse = {
      status: 'Cancelled',
      renewalDate: '10/20/2020',
      datePlaceholders: ['28th Feb'],
      title: 'Vodafone Special 50GB',
      usageData: [],
      contractData: []
    }
    store.dispatch(myPlanActions.setMyPlan(myPlanRepsonse))
    const myPlan = store.getState().myPlan.payload
    expect(myPlan).toMatchObject(myPlanRepsonse)
  })
})
