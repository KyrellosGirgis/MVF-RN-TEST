/* eslint-disable import/namespace */
import {
  enableNetperformPermission,
  enablePersonalizedServicePermission,
  disableNetperformPermissions
} from 'App/Screens/Settings/Components/AppPrivacy/AppPrivacy.helper'

import { NetperformUserStatus } from 'App/Services/SDKsManagment/SDKs/NetPerform/Netperform.constants'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import { getHashedMintUserId } from 'App/Utils/Helpers/generic.helpers'
import * as NetperformSDKServices from 'App/Services/SDKsManagment/SDKs/NetPerform/Netperform.helper'

jest.mock('App/Utils/Helpers/generic.helpers', () => {
  const actualHelper = jest.requireActual('App/Utils/Helpers/generic.helpers')
  return {
    ...actualHelper,
    translate: (str) => str,
    getHashedMintUserId: jest.fn(() => '9876')
  }
})

describe('Test AppPrivacy helper', () => {
  beforeAll(() => {
    NetperformSDKServices.updateNetperformSDKStatus = jest.fn()
    EncryptedStorage.updateObject = jest.fn()
    EncryptedStorage.setObject = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should enableNetperformPermission call the functions with the correct parameters', async () => {
    await enableNetperformPermission(true)

    expect(
      NetperformSDKServices.updateNetperformSDKStatus
    ).toHaveBeenCalledWith({
      status: true
    })
    expect(EncryptedStorage.updateObject).toHaveBeenCalledWith(
      getHashedMintUserId(),
      {
        [NetperformUserStatus.status]: true
      }
    )
    await enableNetperformPermission(false)

    expect(
      NetperformSDKServices.updateNetperformSDKStatus
    ).toHaveBeenCalledWith({
      status: false
    })
    expect(EncryptedStorage.updateObject).toHaveBeenCalledWith(
      getHashedMintUserId(),
      {
        [NetperformUserStatus.status]: false
      }
    )
  })

  test('should enablePersonalizedServicePermission call the functions with the correct parameters', async () => {
    await enablePersonalizedServicePermission(true)

    expect(
      NetperformSDKServices.updateNetperformSDKStatus
    ).toHaveBeenCalledWith({
      isPersonalized: true
    })
    expect(EncryptedStorage.updateObject).toHaveBeenCalledWith(
      getHashedMintUserId(),
      {
        [NetperformUserStatus.isPersonalized]: true
      }
    )

    await enablePersonalizedServicePermission(false)

    expect(
      NetperformSDKServices.updateNetperformSDKStatus
    ).toHaveBeenCalledWith({
      isPersonalized: false
    })
    expect(EncryptedStorage.updateObject).toHaveBeenCalledWith(
      getHashedMintUserId(),
      {
        [NetperformUserStatus.isPersonalized]: false
      }
    )
  })

  test('should disableNetperformPermissions call the functions with the correct parameters', async () => {
    await disableNetperformPermissions()

    expect(
      NetperformSDKServices.updateNetperformSDKStatus
    ).toHaveBeenCalledWith({
      status: false,
      isPersonalized: false
    })
    expect(EncryptedStorage.setObject).toHaveBeenCalledWith(
      getHashedMintUserId(),
      {
        [NetperformUserStatus.status]: false,
        [NetperformUserStatus.isPersonalized]: false
      }
    )
  })
})
