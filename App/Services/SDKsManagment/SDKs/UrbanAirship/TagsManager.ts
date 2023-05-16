import { UrbanAirship } from 'urbanairship-react-native'

import { isUrbanAirshipInitialized } from './UrbanAirship.helpers'

import { isMobilePostpaidSubscription } from 'App/Services/AppUserData/AppUserData.helpers'

import { getAppVersion, getDeviceModel } from 'App/Utils/Helpers/appInfo.helper'

const removeAllUrbanAirshipTags = async () => {
  const tags = await UrbanAirship.getTags()
  tags.forEach((tag) => {
    UrbanAirship.removeTag(tag)
  })
}

const addAllUrbanAirshipTags = (tags: string[]) => {
  tags.forEach((tag) => {
    UrbanAirship.addTag(tag)
  })
}

const buildUrbanAirshipTags = () => {
  return [
    'LastVisitYear_' + new Date().getFullYear().toString(),
    'LastVisitMonth_' + (new Date().getMonth() + 1).toString(),
    'LastVisitDay_' + new Date().getDate().toString(),
    'Version_' + getAppVersion(),
    'DeviceModel_' + getDeviceModel(),
    isMobilePostpaidSubscription() ? 'Type_post' : 'Type_pre'
  ]
}

const setupUrbanAirshipTags = async () => {
  if (await isUrbanAirshipInitialized()) {
    await exports.removeAllUrbanAirshipTags()

    const tags = exports.buildUrbanAirshipTags()
    await exports.addAllUrbanAirshipTags(tags)
  }
}

export {
  buildUrbanAirshipTags,
  setupUrbanAirshipTags,
  removeAllUrbanAirshipTags,
  addAllUrbanAirshipTags
}
