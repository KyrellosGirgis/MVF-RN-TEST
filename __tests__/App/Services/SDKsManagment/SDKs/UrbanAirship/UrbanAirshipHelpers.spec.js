/* eslint-disable import/namespace */
import { UrbanAirship } from 'urbanairship-react-native'

import * as UrbanAirshipHelpers from 'App/Services/SDKsManagment/SDKs/UrbanAirship/UrbanAirship.helpers'

describe('UrbanAirship helpers', () => {
  describe('enableAirshipTags', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })
    test('should invoke  UrbanAirship.enableFeature if UrbanAirship is initialized when calling enableAirshipTags method', async () => {
      UrbanAirship.isFlying = jest.fn(() => true)
      await UrbanAirshipHelpers.enableAirshipTags()
      expect(UrbanAirship.enableFeature).toHaveBeenCalled()
    })
    test('should not invoke  UrbanAirship.enableFeature if UrbanAirship is not initialized when calling enableAirshipTags method', async () => {
      UrbanAirship.isFlying = jest.fn(() => false)
      await UrbanAirshipHelpers.enableAirshipTags()
      expect(UrbanAirship.enableFeature).toHaveBeenCalledTimes(0)
    })
  })

  describe('disableAirshipTags', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })
    test('should invoke UrbanAirship.disableFeature if UrbanAirship is initialized when calling disableAirshipTags method', async () => {
      UrbanAirship.isFlying = jest.fn(() => true)
      await UrbanAirshipHelpers.disableAirshipTags()
      expect(UrbanAirship.disableFeature).toHaveBeenCalled()
    })

    test('should not invoke UrbanAirship.disableFeature if UrbanAirship is not initialized when calling disableAirshipTags method', async () => {
      UrbanAirship.isFlying = jest.fn(() => false)
      await UrbanAirshipHelpers.disableAirshipTags()
      expect(UrbanAirship.disableFeature).toHaveBeenCalledTimes(0)
    })
  })

  describe('clearAirShipMessages', () => {
    UrbanAirship.getInboxMessages = jest
      .fn()
      .mockReturnValue(['message1', 'message2'])
    UrbanAirship.deleteInboxMessage = jest.fn()

    it('should get messages and delete them from urbanairship', async () => {
      await UrbanAirshipHelpers.clearAirShipMessages()
      expect(UrbanAirship.getInboxMessages).toHaveBeenCalled()
      expect(UrbanAirship.deleteInboxMessage).toHaveBeenCalledTimes(2)
    })
  })

  describe('addAirShipInboxUpdatingListener', () => {
    UrbanAirship.addListener = jest.fn()

    it('should invoke UrbanAirship.addListener', async () => {
      await UrbanAirshipHelpers.addAirShipInboxUpdatingListener()
      expect(UrbanAirship.addListener).toHaveBeenCalled()
    })
  })

  describe('addAirShipShowInboxListener', () => {
    UrbanAirship.addListener = jest.fn()

    it('should invoke UrbanAirship.addListener', async () => {
      await UrbanAirshipHelpers.addAirShipShowInboxListener()
      expect(UrbanAirship.addListener).toHaveBeenCalled()
    })
  })

  describe('addAirShipDeepLinksListener', () => {
    UrbanAirship.addListener = jest.fn()

    it('should invoke UrbanAirship.addListener', async () => {
      await UrbanAirshipHelpers.addAirShipDeepLinksListener()
      expect(UrbanAirship.addListener).toHaveBeenCalled()
    })
  })
})
