import {
  getFirstNameFromAppUserData,
  getMsisdn
} from 'App/Services/AppUserData/AppUserData.helpers'
import { userDataOriginalResponse } from '__tests__/App/Services/api/Requests/Dashboard/data'

import { store } from 'App/Redux'

describe('Test screens Helpers', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    store.getState = () => ({
      appUserData: userDataOriginalResponse
    })
  })

  test('should get username from appUserData if firstName found', () => {
    const username = getFirstNameFromAppUserData()
    expect(username).toBe(
      userDataOriginalResponse.userAccountVBO.onlineUser.firstName
    )
  })

  test('should return empty string from appUserData if firstName not found', () => {
    store.getState = () => ({
      appUserData: { userAccountVBO: { onlineUser: {} } }
    })
    expect(getFirstNameFromAppUserData()).toBe('')

    store.getState = () => ({
      appUserData: undefined
    })
    expect(getFirstNameFromAppUserData()).toBe('')
  })

  test('should get msisdn from appUserData if is is found', () => {
    store.getState = jest.fn(() => ({
      appUserData: {
        currentlyActiveSubscription: { id: '123', type: 'cable' }
      }
    }))
    const phoneNumber = getMsisdn()
    expect(phoneNumber).toBe('123')
  })

  test('should return empty string from appUserData if msisdn not found', () => {
    store.getState = jest.fn(() => ({
      appUserData: {
        currentlyActiveSubscription: {}
      }
    }))
    expect(getMsisdn()).toBe('')
  })
})
