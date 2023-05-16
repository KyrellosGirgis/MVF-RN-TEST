/* eslint-disable import/namespace */
import * as AppModalHelper from 'App/Containers/AppModal/AppModal.helpers'

import store from 'App/Redux/store'

import { mapBEUserDataToAppUserData } from 'App/Services/API/Requests/userData/userData.helpers'

import * as userDataHelper from 'App/Services/AppUserData/AppUserData.helpers'

import * as LogOut from 'App/Screens/Login/Implementations/LogoutImplementation/LogoutImplementation'
import {
  userDataWithAllProducts,
  userDataWithAllProductsMappedToSubscriptions
} from '__tests__/App/Services/api/Requests/Dashboard/data'
import { Role } from 'App/Services/API/Requests/userData/userData.d'

jest.mock('react-native/Libraries/Linking/Linking', () => ({
  openURL: jest.fn()
}))

jest.mock('App/Utils/Helpers/generic.helpers', () => {
  return {
    isIOS: true,
    translate: (str) => str,
    testID: (str) => str,
    replaceCountryCodeInMSISDN: (str) => str,
    removeKeysFromObject: (obj) => obj
  }
})

describe('Common Functions Test Cases', () => {
  beforeAll(() => {
    store.getState = jest.fn(() => ({
      appUserData: {
        currentlyActiveSubscription: {
          type: 'mobile',
          marketCode: 'mmo',
          id: '123456'
        },
        userAccountVBO: {
          onlineUser: {
            firstName: 'John'
          }
        }
      }
    }))
  })

  it('isMobilePostpaidSubscription function should return true if subscription is postpaid', () => {
    expect(userDataHelper.isMobilePostpaidSubscription()).toBe(false)
  })

  it('isMobilePrepaidSubscription function should return true if subscription is prepaid', () => {
    expect(userDataHelper.isMobilePrepaidSubscription()).toBe(true)
  })

  it('getFirstNameFromUserData should return john', () => {
    expect(userDataHelper.getFirstNameFromAppUserData()).toBe('John')
  })

  it('getMsisdn should return msisdn', () => {
    expect(userDataHelper.getMsisdn()).toBe('123456')
  })
})

describe('userDataHasNoSubscriptions', () => {
  it('should return true if there are no subscriptions', () => {
    store.getState = jest.fn(() => ({
      appUserData: {
        userAccountVBO: {
          subscriptions: {}
        }
      }
    }))
    expect(userDataHelper.isAppUserDataWithNoSubscriptions()).toBe(true)
  })

  it('should return true if all subscriptions are undefined or null', () => {
    store.getState = jest.fn(() => ({
      appUserData: {
        userAccountVBO: {
          subscriptions: {
            item1: null,
            item2: undefined
          }
        }
      }
    }))
    expect(userDataHelper.isAppUserDataWithNoSubscriptions()).toBe(true)
  })

  it('should return true if all subscriptions are empty arrays', () => {
    store.getState = jest.fn(() => ({
      appUserData: {
        userAccountVBO: {
          subscriptions: {
            item1: [],
            item2: []
          }
        }
      }
    }))
    expect(userDataHelper.isAppUserDataWithNoSubscriptions()).toBe(true)
  })

  it('should return false if there are subscriptions', () => {
    store.getState = jest.fn(() => ({
      appUserData: {
        userAccountVBO: {
          subscriptions: {
            item1: [{ id: 1 }],
            item2: [{ id: 2 }]
          }
        }
      }
    }))
    expect(userDataHelper.isAppUserDataWithNoSubscriptions()).toBe(false)
  })

  it('Should display the ErrorComponent', () => {
    AppModalHelper.showModal = jest.fn()
    AppModalHelper.closeModal = jest.fn()
    store.getState = jest.fn(() => ({
      appUserData: {
        userAccountVBO: {
          subscriptions: {}
        }
      }
    }))
    LogOut.default = jest.fn()
    userDataHelper.handleNoSubscriptionsErrorIfNeeded()
    userDataHelper.handleUserDataApiErrorsIfNeeded()

    expect(AppModalHelper.showModal).toHaveBeenCalledTimes(2)
  })

  it('should return correct subscriptions from user data', () => {
    mapBEUserDataToAppUserData({
      userAccountVBO: userDataWithAllProducts.userAccountVBO
    })
    expect(userDataWithAllProducts.userAccountVBO.subscriptions).toEqual(
      userDataWithAllProductsMappedToSubscriptions
    )
  })

  describe('test getCategorizedSubscriptionsFromUserData with different inputs', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })
    it('should return  empty array of mapped subscripions in case of mobile contract contains empty array of subscripions', () => {
      const userAccountVBO = {
        mobile: [
          {
            contract: {
              mboId: 3456,
              subscription: []
            }
          }
        ]
      }
      const expectedResult = []
      mapBEUserDataToAppUserData({
        userAccountVBO
      })
      expect(userAccountVBO.subscriptions.mobileSubscriptions).toEqual(
        expectedResult
      )
    })

    it('should return empty array of mapped subscripions in case of mobile contract contains no subscriptions at all', () => {
      const userAccountVBO = {
        mobile: [
          {
            contract: {
              mboId: 3456
            }
          }
        ]
      }
      const expectedResult = []
      mapBEUserDataToAppUserData({
        userAccountVBO
      })
      expect(userAccountVBO.subscriptions.mobileSubscriptions).toEqual(
        expectedResult
      )
    })

    it('should not map object with no body of contract subsciprions ', () => {
      const userAccountVBO = {
        mobile: [
          {
            contract: {
              mboId: 3456,
              role: Role.CustomerAccountAdmin,
              subscription: [
                {},
                {
                  mboId: 6789,
                  mboName: 'Mobilfunk-Postpaid',
                  partyRoleId: 7890,
                  ban: 123456781,
                  msisdn: 1234567891233,
                  marketCode: 'MMC',
                  subType: 'EK',
                  role: 'SubscriptionAdmin',
                  access: 'AccessSubscription',
                  status: 'effective',
                  registrationDate: '1970-01-01',
                  isActiveContract: false,
                  isFemtoSubscription: false
                }
              ]
            }
          }
        ]
      }
      const expectedResult = [
        {
          itemTitle: 'Mobilfunk-Postpaid',
          itemSubTitle: '1234567891233',
          itemImage: 'mobile_image',
          id: '1234567891233',
          type: 'mobile',
          marketCode: 'MMC',
          ban: 123456781,
          hasBanAccess: true,
          mboName: 'Mobilfunk-Postpaid',
          mboId: 6789,
          contractMboId: 3456,
          contractRole: Role.CustomerAccountAdmin
        }
      ]
      mapBEUserDataToAppUserData({
        userAccountVBO
      })
      expect(userAccountVBO.subscriptions.mobileSubscriptions).toEqual(
        expectedResult
      )
    })

    it('should not map falsy values of contract subsciprions', () => {
      const userAccountVBO = {
        mobile: [
          {
            contract: {
              mboId: 3456,
              role: Role.CustomerAccountAdmin,
              subscription: [false, undefined, 0, '', null, NaN]
            }
          }
        ]
      }
      const expectedResult = []
      mapBEUserDataToAppUserData({
        userAccountVBO
      })
      expect(userAccountVBO.subscriptions.mobileSubscriptions).toEqual(
        expectedResult
      )
    })

    it('ensure that empty contract object or falsy values has no effect on the result subscriptions array', () => {
      const userAccountVBO = {
        mobile: [
          {
            contract: {
              mboId: 3456,
              role: Role.CustomerAccountAdmin,
              subscription: [
                {
                  mboId: 6789,
                  mboName: 'Mobilfunk-Postpaid',
                  partyRoleId: 7890,
                  ban: 123456781,
                  msisdn: 1234567891233,
                  marketCode: 'MMC',
                  subType: 'EK',
                  role: 'SubscriptionAdmin',
                  access: 'AccessSubscription',
                  status: 'effective',
                  registrationDate: '1970-01-01',
                  isActiveContract: false,
                  isFemtoSubscription: false
                }
              ]
            }
          },
          {},
          false,
          undefined,
          0,
          '',
          null,
          NaN
        ]
      }
      const expectedResult = [
        {
          itemTitle: 'Mobilfunk-Postpaid',
          itemSubTitle: '1234567891233',
          itemImage: 'mobile_image',
          id: '1234567891233',
          type: 'mobile',
          marketCode: 'MMC',
          ban: 123456781,
          hasBanAccess: true,
          mboName: 'Mobilfunk-Postpaid',
          mboId: 6789,
          contractMboId: 3456,
          contractRole: Role.CustomerAccountAdmin
        }
      ]
      mapBEUserDataToAppUserData({
        userAccountVBO
      })
      expect(userAccountVBO.subscriptions.mobileSubscriptions).toEqual(
        expectedResult
      )
    })
  })
})
