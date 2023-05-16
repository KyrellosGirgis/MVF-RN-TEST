/* eslint-disable import/namespace */
import { UrbanAirship } from 'urbanairship-react-native'

import * as userDataHelpers from 'App/Services/AppUserData/AppUserData.helpers'

import * as UrbanAirshipTagsManager from 'App/Services/SDKsManagment/SDKs/UrbanAirship/TagsManager'

import * as AppInfoHelpers from 'App/Utils/Helpers/appInfo.helper'

jest.mock('App/Services/SDKsManagment/SDKs/UrbanAirship/UrbanAirship.helpers')
const UrbanAirshipHelpers = require('App/Services/SDKsManagment/SDKs/UrbanAirship/UrbanAirship.helpers')

describe('TagsManager', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  describe('removeUrbanAirshipTags', () => {
    test('should invoke UrbanAirship.removeTag when calling removeAllUrbanAirshipTags and there is  UrbanAirship tags ', async () => {
      UrbanAirship.getTags = jest.fn().mockReturnValue(['tag1', 'tag2', 'tag3'])
      expect(UrbanAirship.getTags()).toEqual(['tag1', 'tag2', 'tag3'])
      await UrbanAirshipTagsManager.removeAllUrbanAirshipTags()
      expect(UrbanAirship.removeTag).toHaveBeenCalledTimes(3)
    })

    test('should not invoke UrbanAirship.removeTag when calling removeAllUrbanAirshipTags and there is not UrbanAirship tags ', async () => {
      UrbanAirship.getTags = jest.fn().mockReturnValue([])
      await UrbanAirshipTagsManager.removeAllUrbanAirshipTags()
      expect(UrbanAirship.removeTag).toHaveBeenCalledTimes(0)
    })
  })

  describe('addUrbanAirshipTags', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    test('should invoke UrbanAirship.addTag when calling addUrbanAirshipTags', () => {
      UrbanAirshipTagsManager.addAllUrbanAirshipTags(['tag1', 'tag2', 'tag3'])
      expect(UrbanAirship.addTag).toHaveBeenCalled()
    })
  })
  describe('buildUrbanAirshipTags', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    AppInfoHelpers.getAppVersion = jest.fn().mockReturnValue(1)
    AppInfoHelpers.getDeviceModel = jest.fn().mockReturnValue('model')
    userDataHelpers.isMobilePostpaidSubscription = jest
      .fn()
      .mockReturnValue(false)
    it('should build common tags', () => {
      const result = UrbanAirshipTagsManager.buildUrbanAirshipTags()
      expect(result).toHaveLength(6)
    })
  })

  describe('setupUrbanAirshipTags', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })
    const currentTags = [
      'LastVisitDay_31',
      'LastVisitMonth_7',
      'LastVisitYear_2022',
      'Version_0.0.1',
      'DeviceModel_Samsung A52',
      'Type_pre'
    ]

    AppInfoHelpers.getAppVersion = jest.fn().mockReturnValue(1)
    AppInfoHelpers.getDeviceModel = jest.fn().mockReturnValue('model')

    UrbanAirshipTagsManager.buildUrbanAirshipTags = jest
      .fn()
      .mockReturnValue([
        'LastVisitYear_2023',
        'LastVisitMonth_1',
        'LastVisitDay_15',
        'Version_1',
        'DeviceModel_model',
        'Type_pre'
      ])

    test('should call removeAllUrbanAirshipTags & addUrbanAirshipTags', async () => {
      UrbanAirship.getTags = jest.fn().mockReturnValue(currentTags)
      UrbanAirshipHelpers.isUrbanAirshipInitialized = jest
        .fn()
        .mockReturnValue(true)

      await UrbanAirshipTagsManager.setupUrbanAirshipTags()

      expect(UrbanAirship.removeTag).toHaveBeenCalled()
      expect(UrbanAirshipTagsManager.buildUrbanAirshipTags).toHaveBeenCalled()
      expect(UrbanAirship.addTag).toHaveBeenCalled()
    })

    test('should not call addUrbanAirshipCommonTags & addUrbanAirshipSubscriptionTags if UrbanAirship is not initialized', async () => {
      UrbanAirship.getTags = jest.fn().mockReturnValue(currentTags)
      UrbanAirshipHelpers.isUrbanAirshipInitialized = jest
        .fn()
        .mockReturnValue(false)

      await UrbanAirshipTagsManager.setupUrbanAirshipTags()

      expect(
        UrbanAirshipTagsManager.buildUrbanAirshipTags
      ).not.toHaveBeenCalled()
      expect(UrbanAirship.addTag).not.toHaveBeenCalled()
    })
  })
})
