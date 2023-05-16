/* eslint-disable import/namespace */

import Config from 'react-native-config'

import {
  ACPTargetParameters,
  ACPTargetRequestObject
} from '@adobe/react-native-acptarget'

import * as AdobeTarget from 'App/Services/SDKsManagment/SDKs/Adobe/AdobeTargetOffers/AdobeTargetOffers'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import { AdobeTargetConstants } from 'App/Services/SDKsManagment/SDKs/Adobe/AdobeTargetOffers/AdobeTargetOffers.constants'

describe('Test AdobeTarget SDK', () => {
  beforeAll(() => {
    EncryptedStorage.getItem = jest.fn(() => 'test')
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
  const adobeResponse = { data: 'adobeResponse' }

  test('should assert on getAdobeTargetOffer success output', async () => {
    const RCTACPTarget = require('react-native').NativeModules.ACPTarget
    RCTACPTarget.registerTargetRequests = jest.fn((_, callback) =>
      callback(undefined, adobeResponse)
    )

    expect(
      await AdobeTarget.getAdobeTargetOffer('test', { test: 'test' })
    ).toEqual(adobeResponse)
  })

  test('should assert on getAdobeTargetOffer error output', async () => {
    const RCTACPTarget = require('react-native').NativeModules.ACPTarget
    RCTACPTarget.registerTargetRequests = jest.fn((_, callback) =>
      callback('adobe target error', undefined)
    )
    try {
      expect(
        await AdobeTarget.getAdobeTargetOffer('test', { test: 'test' })
      ).toThrowError()
    } catch (err) {}
  })
  test('should return ACPTargetParameters obj  ', async () => {
    const param = new ACPTargetParameters('test', null, null, null)
    expect(AdobeTarget.createACPTargetParameters('test')).toEqual(param)
  })

  test('should return ACPTargetRequestObject from createACPRequestObject  ', async () => {
    Config.IS_PRODUCTION = 'true'
    Math.random = jest.fn().mockReturnValue(1)

    const param = new ACPTargetParameters({ test: 'test' }, null, null, null)
    const callback = (error, content) => {}
    var request = new ACPTargetRequestObject(
      AdobeTargetConstants.mbox_mv_app_offer_bookable_tariff,
      param,
      '',
      callback
    )
    expect(
      await AdobeTarget.createACPRequestObject(
        AdobeTargetConstants.mbox_mv_app_offer_bookable_tariff,
        param,
        '',
        callback
      )
    ).toEqual(request)
  })

  test('should return valid test output from getTargetTestCase', async () => {
    Config.IS_PRODUCTION = 'false'
    const mboxValue = AdobeTargetConstants.mbox_mv_app_offer_vov
    const expectedMboxValue =
      AdobeTargetConstants.mbox_mv_app_offer_vov + '_test'
    const testMboxValue = await AdobeTarget.getTargetTestCase(mboxValue)
    expect(testMboxValue).toEqual(expectedMboxValue)
  })

  test('should return the same mbox output from getTargetTestCase', async () => {
    Config.IS_PRODUCTION = 'true'
    const mboxValue = 'mbox'
    const testMboxValue = await AdobeTarget.getTargetTestCase(mboxValue)
    expect(testMboxValue).toEqual(mboxValue)
  })
})
