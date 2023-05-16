/* eslint-disable import/namespace */
import { store } from 'App/Redux'
import * as UserThirdPartyPermissionsThunk from 'App/Redux/UserThirdPartyPermissions/UserThirdPartyPermissions.thunk'
import { updateNetperformSDKStatus } from 'App/Services/SDKsManagment/SDKs/NetPerform/Netperform.helper'

describe('Test Netperform helper', () => {
  beforeAll(() => {
    store.dispatch = jest.fn()
    UserThirdPartyPermissionsThunk.setUserThirdPartyPermissions = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should updateNetperformSDKStatus call store.dispatch with the correct parameters when undefined is passed and storage has no values', async () => {
    store.getState = () => ({
      userThirdPartyPermissions: { userThirdPartyPermissions: {} }
    })

    await updateNetperformSDKStatus()
    expect(store.dispatch).toHaveBeenCalledWith(
      UserThirdPartyPermissionsThunk.setUserThirdPartyPermissions({
        NetperformPermissions: {
          NetworkOptimizationPermission: undefined,
          PersonalizedNetworkOptimizationPermission: undefined
        }
      })
    )
  })

  test('should updateNetperformSDKStatus call store.dispatch with the correct parameters when undefined is passed and storage has value for NetworkOptimizationPermission', async () => {
    store.getState = () => ({
      userThirdPartyPermissions: {
        userThirdPartyPermissions: {
          NetperformPermissions: { NetworkOptimizationPermission: true }
        }
      }
    })

    await updateNetperformSDKStatus()
    expect(store.dispatch).toHaveBeenCalledWith(
      UserThirdPartyPermissionsThunk.setUserThirdPartyPermissions({
        NetperformPermissions: {
          NetworkOptimizationPermission: true,
          PersonalizedNetworkOptimizationPermission: undefined
        }
      })
    )
  })

  test('should updateNetperformSDKStatus call store.dispatch with the correct parameters when undefined is passed and storage has value for NetworkOptimizationPermission and PersonalizedNetworkOptimizationPermission ', async () => {
    store.getState = () => ({
      userThirdPartyPermissions: {
        userThirdPartyPermissions: {
          NetperformPermissions: {
            NetworkOptimizationPermission: true,
            PersonalizedNetworkOptimizationPermission: false
          }
        }
      }
    })

    await updateNetperformSDKStatus()
    expect(store.dispatch).toHaveBeenCalledWith(
      UserThirdPartyPermissionsThunk.setUserThirdPartyPermissions({
        NetperformPermissions: {
          NetworkOptimizationPermission: true,
          PersonalizedNetworkOptimizationPermission: false
        }
      })
    )
  })

  test('should updateNetperformSDKStatus call store.dispatch with the correct parameters when status is passed', async () => {
    store.getState = () => ({
      userThirdPartyPermissions: {
        userThirdPartyPermissions: {
          NetperformPermissions: {
            NetworkOptimizationPermission: true,
            PersonalizedNetworkOptimizationPermission: false
          }
        }
      }
    })

    await updateNetperformSDKStatus({ status: false })
    expect(store.dispatch).toHaveBeenCalledWith(
      UserThirdPartyPermissionsThunk.setUserThirdPartyPermissions({
        NetperformPermissions: {
          NetworkOptimizationPermission: false,
          PersonalizedNetworkOptimizationPermission: false
        }
      })
    )
  })

  test('should updateNetperformSDKStatus call store.dispatch with the correct parameters when isPersonalised is passed', async () => {
    store.getState = () => ({
      userThirdPartyPermissions: {
        userThirdPartyPermissions: {
          NetperformPermissions: {
            NetworkOptimizationPermission: true,
            PersonalizedNetworkOptimizationPermission: true
          }
        }
      }
    })

    await updateNetperformSDKStatus({ isPersonalized: false })
    expect(store.dispatch).toHaveBeenCalledWith(
      UserThirdPartyPermissionsThunk.setUserThirdPartyPermissions({
        NetperformPermissions: {
          NetworkOptimizationPermission: true,
          PersonalizedNetworkOptimizationPermission: false
        }
      })
    )
  })

  test('should updateNetperformSDKStatus call store.dispatch with the correct parameters when status and isPersonalised are passed', async () => {
    store.getState = () => ({
      userThirdPartyPermissions: {
        userThirdPartyPermissions: {
          NetperformPermissions: {
            NetworkOptimizationPermission: true,
            PersonalizedNetworkOptimizationPermission: true
          }
        }
      }
    })

    await updateNetperformSDKStatus({ status: false, isPersonalized: false })
    expect(store.dispatch).toHaveBeenCalledWith(
      UserThirdPartyPermissionsThunk.setUserThirdPartyPermissions({
        NetperformPermissions: {
          NetworkOptimizationPermission: false,
          PersonalizedNetworkOptimizationPermission: false
        }
      })
    )
  })
})
