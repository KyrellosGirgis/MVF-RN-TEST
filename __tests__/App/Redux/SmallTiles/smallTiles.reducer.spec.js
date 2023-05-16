import { store } from 'App/Redux'
import { smallTilesActions } from 'App/Redux/reducers/SmallTiles/smallTiles.reducer'

describe('unit testing dashboard skeleton reducer', () => {
  it('should set smallTilesLoadingStatus succesfully', () => {
    const expectedSmallTilesLoadingStatus = 'fulfilled'
    store.dispatch(
      smallTilesActions.setSmallTilesLoadingStatus(
        expectedSmallTilesLoadingStatus
      )
    )
    const { smallTilesLoadingStatus } = store.getState().smallTiles
    expect(smallTilesLoadingStatus).toEqual(expectedSmallTilesLoadingStatus)
  })
})
