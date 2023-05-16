import { store } from 'App/Redux'
import { mediumTilesActions } from 'App/Redux/reducers/MediumTiles/MediumTiles.reducer'

describe('unit testing dashboard skeleton reducer', () => {
  it('should set mediumTilesLoadingStatus succesfully', () => {
    const expectedMediumTilesLoadingStatus = 'fulfilled'
    store.dispatch(
      mediumTilesActions.setMediumTilesLoadingStatus(
        expectedMediumTilesLoadingStatus
      )
    )
    const { mediumTilesLoadingStatus } = store.getState().mediumTiles
    expect(mediumTilesLoadingStatus).toEqual(expectedMediumTilesLoadingStatus)
  })
})
