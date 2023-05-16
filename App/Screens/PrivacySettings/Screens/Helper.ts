import { Alert } from 'react-native'

import {
  PrivacySettingsState,
  SectionItem
} from 'App/Screens/PrivacySettings/Configurations/PrivacySettings'

import { thirdPartyTrackingTrackers } from 'App/Screens/PrivacySettings/Configurations/ThirdPartyTracking'

import { NavigationFunctions } from 'App/Containers'

const onScreenBackPress = (showAlert: boolean) => {
  if (showAlert) {
    Alert.alert('Demo', 'To be implemented', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => {
          NavigationFunctions.goBack()
        }
      }
    ])
  } else {
    NavigationFunctions.goBack()
  }
}

const getStateInitialized = (
  dataObject: SectionItem[],
  status: boolean = false
) => {
  const initialState: PrivacySettingsState = {}
  dataObject.forEach((item) => {
    initialState[item.title] = status
  })
  return initialState
}

const getFlattenTrackersItems = () =>
  thirdPartyTrackingTrackers.flatMap((section) =>
    section.flatMap((item) => item)
  )

export { onScreenBackPress, getStateInitialized, getFlattenTrackersItems }
