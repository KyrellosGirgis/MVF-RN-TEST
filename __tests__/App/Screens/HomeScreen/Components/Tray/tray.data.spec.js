/* eslint-disable import/namespace */
import { useSelector } from 'react-redux'

import { store } from 'App/Redux'
import { mapOptionalNavigationToTrayItems } from 'App/Screens/HomeScreen/components/Tray/Tray.data'
import * as optionalNavigationHelpers from 'App/Services/DataLayer/Helpers/Dashboard/DashboardSkeleton.helpers'
import { ThunkStatus } from 'App/Redux/StoreType.d'

const state = {
  dashboardSkeleton: {
    dashboardSkeletonLoadingStatus: ThunkStatus.FULFILLED
  }
}

describe('Test Tray component', () => {
  beforeAll(() => {
    useSelector.mockImplementation((callBack) => {
      return callBack(state)
    })
    store.getState = () => state
    optionalNavigationHelpers.getOptionalNavigationSkeleton = jest.fn(() => [
      {
        title: 'topup',
        iconSource: 'src',
        action: 'src'
      }
    ])
  })
  test('should map skeleton items to tray items', async () => {
    expect(mapOptionalNavigationToTrayItems()).toStrictEqual([
      {
        title: 'topup',
        subTrayID: 'topup',
        icon: 'src',
        subTray: {
          subTrayItems: []
        },
        action: 'src'
      }
    ])
    expect(optionalNavigationHelpers.getOptionalNavigationSkeleton).toBeCalled()
  })
})
