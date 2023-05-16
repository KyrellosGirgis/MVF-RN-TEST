import { store } from 'App/Redux'
import { usagesActions } from 'App/Redux/Usages/usages.reducer'

describe('unit testing for usages reducer', () => {
  it('should set usagesTiles succesfully', () => {
    const expectedUsagesTiles = ['value1', 'value2', 'value3']
    store.dispatch(usagesActions.setUsagesTiles(expectedUsagesTiles))
    const { usagesTiles } = store.getState().usages
    expect(usagesTiles).toEqual(expectedUsagesTiles)
  })

  it('should set usagesTilesLoadingStatus succesfully', () => {
    const expectedUsagesTilesLoadingStatus = 'fulfilled'
    store.dispatch(
      usagesActions.setUsagesTilesLoadingStatus(
        expectedUsagesTilesLoadingStatus
      )
    )
    const { usagesTilesLoadingStatus } = store.getState().usages
    expect(usagesTilesLoadingStatus).toEqual(expectedUsagesTilesLoadingStatus)
  })
})
