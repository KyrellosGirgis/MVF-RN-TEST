import {
  UrbanAirship,
  EventType,
  Subscription as AirShipSubscription,
  Feature
} from 'urbanairship-react-native'

import { getNotExpiredUnreadMessagesLength } from '@vfgroup-oneplatform/message-center/AirsipConfig/index'

import { handleDeeplinkingWhenAppIsOpened } from 'App/Services/Deeplinks/Deeplinks.helper'

import { NavigationFunctions } from 'App/Containers'
import Routes from 'App/Containers/AppNavigation/Routes'

const isUrbanAirshipInitialized = async () => await UrbanAirship.isFlying()

const clearAirShipMessages = async () => {
  const messages = await UrbanAirship.getInboxMessages()
  messages.forEach((element) => {
    UrbanAirship.deleteInboxMessage(element.id)
  })
}

const addAirShipInboxUpdatingListener = (
  setNotExpiredUnreadMessagesLegnth: Function
): AirShipSubscription => {
  return UrbanAirship.addListener(EventType.InboxUpdated, async () => {
    setNotExpiredUnreadMessagesLegnth(await getNotExpiredUnreadMessagesLength())
  })
}

const addAirShipShowInboxListener = () => {
  UrbanAirship.addListener(EventType.ShowInbox, () => {
    NavigationFunctions.navigate(Routes.MessageCenterScreen)
  })
}

const addAirShipDeepLinksListener = () => {
  UrbanAirship.addListener(EventType.DeepLink, (event) => {
    handleDeeplinkingWhenAppIsOpened(event.deepLink)
  })
}

const enableAirshipTags = async () => {
  if (await isUrbanAirshipInitialized()) {
    await UrbanAirship.enableFeature([Feature.FEATURE_TAGS_AND_ATTRIBUTES])
  }
}

const disableAirshipTags = async () => {
  if (await isUrbanAirshipInitialized()) {
    await UrbanAirship.disableFeature([Feature.FEATURE_TAGS_AND_ATTRIBUTES])
  }
}
export {
  addAirShipInboxUpdatingListener,
  clearAirShipMessages,
  addAirShipShowInboxListener,
  addAirShipDeepLinksListener,
  enableAirshipTags,
  disableAirshipTags,
  isUrbanAirshipInitialized
}
