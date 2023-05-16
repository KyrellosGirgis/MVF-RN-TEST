/* eslint-disable import/namespace */
import { store } from 'App/Redux'
import * as MediumTilesRequests from 'App/Services/DataLayer/APIs/Dashboard/MediumTiles/MediumTiles.requests'

import { fetchMediumTiles } from 'App/Redux/reducers/MediumTiles/MediumTiles.thunk'

describe('unit testing for mediumTiles thunk', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('fecthMediumTilesAction should call loadMediumTiles', async () => {
    MediumTilesRequests.loadMediumTiles = jest.fn(() => {})

    const dispatch = jest.fn()

    const fecthMediumTilesAction = await fetchMediumTiles({})(dispatch)
    store.dispatch(fecthMediumTilesAction)

    expect(MediumTilesRequests.loadMediumTiles).toHaveBeenCalled()
  })
})
