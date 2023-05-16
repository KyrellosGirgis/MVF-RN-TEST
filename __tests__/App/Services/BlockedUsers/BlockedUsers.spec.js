/* eslint-disable import/namespace */
import * as blockedUsersHelper from 'App/Services/AppUserData/BlockedUsers/BlockedUsers'

import * as userDataHelper from 'App/Services/AppUserData/AppUserData.helpers'

import * as tarrifBookedRequest from 'App/Services/DataLayer/APIs/TarrifBooked/TarrifBooked.requests'
import * as AppModalHelper from 'App/Containers/AppModal/AppModal.helpers'

describe('handleBlockedUsersError', () => {
  it('Should show BlockingOverlayModal', () => {
    AppModalHelper.showModal = jest.fn()

    blockedUsersHelper.handleBlockedUsersError()

    expect(AppModalHelper.showModal).toHaveBeenCalledTimes(1)
  })
})

describe('getTarrifBookedType', () => {
  it('should call handleBlockedUsersError ', async () => {
    const tariffBookedData = {
      subscriptionVBO: [
        {
          subscriptions: [
            {
              customerProduct: {
                tariffDetails: {
                  type: 'diy-package'
                }
              }
            }
          ]
        }
      ]
    }

    userDataHelper.isMobilePrepaidSubscription = jest.fn(() => true)

    tarrifBookedRequest.getTarrifBooked = jest.fn(() =>
      Promise.resolve(tariffBookedData)
    )
    blockedUsersHelper.handleBlockedUsersError = jest.fn()

    const isUserBlockedErrorShown =
      await blockedUsersHelper.showErrorIfUserIsBlocked()

    expect(isUserBlockedErrorShown).toBeTruthy()
    expect(blockedUsersHelper.handleBlockedUsersError).toHaveBeenCalled()
  })

  it('should call handleUserDataApiErrorsIfNeeded', async () => {
    const tariffBookedData = {
      subscriptionVBO: [
        {
          subscriptions: [
            {
              customerProduct: {
                tariffDetails: {
                  type: 'unkown'
                }
              }
            }
          ]
        }
      ]
    }

    userDataHelper.isMobilePrepaidSubscription = jest.fn(() => true)

    tarrifBookedRequest.getTarrifBooked = jest.fn(() =>
      Promise.resolve(tariffBookedData)
    )
    userDataHelper.handleUserDataApiErrorsIfNeeded = jest.fn()

    const isUserBlockedErrorShown =
      await blockedUsersHelper.showErrorIfUserIsBlocked()

    expect(isUserBlockedErrorShown).toBeTruthy()
    expect(userDataHelper.handleUserDataApiErrorsIfNeeded).toHaveBeenCalled()
  })

  it('shouldnot call the tarrif booked service if the user supscription is not prepaid ', async () => {
    const tariffBookedData = {
      subscriptionVBO: [
        {
          subscriptions: [
            {
              customerProduct: {
                tariffDetails: {
                  type: 'diy-package'
                }
              }
            }
          ]
        }
      ]
    }
    userDataHelper.isMobilePrepaidSubscription = jest.fn(() => false)
    blockedUsersHelper.handleBlockedUsersError = jest.fn()
    tarrifBookedRequest.getTarrifBooked = jest.fn(() =>
      Promise.resolve(tariffBookedData)
    )

    const isUserBlockedErrorShown =
      await blockedUsersHelper.showErrorIfUserIsBlocked()

    expect(isUserBlockedErrorShown).toBeFalsy()
    expect(tarrifBookedRequest.getTarrifBooked).not.toHaveBeenCalled()
    expect(blockedUsersHelper.handleBlockedUsersError).not.toHaveBeenCalled()
  })
})
