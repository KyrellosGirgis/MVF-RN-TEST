/* eslint-disable import/namespace */
import { UrbanAirship } from 'urbanairship-react-native'

import { checkNotifications } from 'react-native-permissions'

import * as UrbanAirshipManager from 'App/Services/SDKsManagment/SDKs/UrbanAirship/UrbanAirshipManager'
import * as UrbanAirshipHelpers from 'App/Services/SDKsManagment/SDKs/UrbanAirship/UrbanAirship.helpers'

describe('test UrbanAirship manager functions ', () => {
  jest.mock('react-native-permissions', () => {
    return {
      checkNotifications: jest.fn(() => 'granted')
    }
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should invoke configurations functions if UrbanAirship is initialized when calling setUrbanAirshipUserDetails', async () => {
    UrbanAirship.isFlying = jest.fn(() => true)

    await UrbanAirshipManager.setUrbanAirshipUserDetails()
    expect(checkNotifications).toHaveBeenCalled()
    expect(UrbanAirship.setNamedUser).toHaveBeenCalled()
    expect(UrbanAirship.setUserNotificationsEnabled).toHaveBeenCalled()
  })
  test('should not invoke configurations functions if UrbanAirship is not initialized when calling startAirShip', async () => {
    UrbanAirship.isFlying = jest.fn(() => false)

    await UrbanAirshipManager.setUrbanAirshipUserDetails()
    expect(checkNotifications).toHaveBeenCalledTimes(0)
    expect(UrbanAirship.setNamedUser).toHaveBeenCalledTimes(0)
    expect(UrbanAirship.setUserNotificationsEnabled).toHaveBeenCalledTimes(0)
  })
  test('should invoke UrbanAirship.takeOff if UrbanAirship is not initialized when calling initializeUrbanAirship', async () => {
    UrbanAirship.isFlying = jest.fn(() => false)

    await UrbanAirshipManager.initializeUrbanAirship()
    expect(UrbanAirship.takeOff).toHaveBeenCalled()
  })

  test('should not invoke UrbanAirship.takeOff if UrbanAirship is initialized when calling initializeUrbanAirship', async () => {
    UrbanAirship.isFlying = jest.fn(() => true)
    await UrbanAirshipManager.setUrbanAirshipUserDetails()
    expect(UrbanAirship.takeOff).toHaveBeenCalledTimes(0)
  })

  test('should invoke reset methods when calling clearUrbanAirshipUserDetails method', async () => {
    UrbanAirshipHelpers.clearAirShipMessages = jest.fn()
    UrbanAirship.isFlying = jest.fn(() => true)
    await UrbanAirshipManager.clearUrbanAirshipUserDetails()
    expect(UrbanAirshipHelpers.clearAirShipMessages).toHaveBeenCalled()
    expect(UrbanAirship.setNamedUser).toHaveBeenCalled()
    expect(UrbanAirship.setUserNotificationsEnabled).toHaveBeenCalled()
  })
})
