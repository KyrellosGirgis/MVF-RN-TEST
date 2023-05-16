/* eslint-disable import/namespace */

import * as appModalHelper from 'App/Containers/AppModal/AppModal.helpers'
import * as appUserDataHelpers from 'App/Services/AppUserData/AppUserData.helpers'

describe('Test appUserData helpers ( overlay errors )', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('handleNoSubscriptionsErrorIfNeeded should showModal if isAppUserDataWithNoSubscriptions', () => {
    appUserDataHelpers.isAppUserDataWithNoSubscriptions = jest
      .fn()
      .mockReturnValue(true)
    appModalHelper.showModal = jest.fn()
    appUserDataHelpers.handleNoSubscriptionsErrorIfNeeded()
    expect(appModalHelper.showModal).toHaveBeenCalled()
  })
  test('handleNoSubscriptionsErrorIfNeeded should NOT showModal if isAppUserData has subscriptions ', () => {
    appUserDataHelpers.isAppUserDataWithNoSubscriptions = jest
      .fn()
      .mockReturnValue(false)
    appModalHelper.showModal = jest.fn()
    appUserDataHelpers.handleNoSubscriptionsErrorIfNeeded()
    expect(appModalHelper.showModal).not.toHaveBeenCalled()
  })
  test('handleUserDataApiErrorsIfNeeded should showModal if error status is NOT 401', () => {
    const error = { response: { status: 400 } }
    appUserDataHelpers.showBlockingOverlayModal = jest.fn()
    appUserDataHelpers.handleUserDataApiErrorsIfNeeded(error)
    expect(appModalHelper.showModal).toHaveBeenCalled()
  })
  test('handleUserDataApiErrorsIfNeeded should NOT showModal if error status is 401', () => {
    const error = { response: { status: 401 } }
    appUserDataHelpers.showBlockingOverlayModal = jest.fn()
    appUserDataHelpers.handleUserDataApiErrorsIfNeeded(error)
    expect(appModalHelper.showModal).not.toHaveBeenCalled()
  })
})
