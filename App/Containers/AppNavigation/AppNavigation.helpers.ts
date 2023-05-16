import RNScreenshotPrevent from 'react-native-screenshot-prevent'

import { emitEvent } from 'App/Services/AppEventEmitter/AppEventEmitter'
import { AppEvents } from 'App/Services/AppEventEmitter/AppEvents'
import { getCmsItem } from 'App/Services/StorageWrappers/CMSStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

const showBlurView = ({
  showUnlockBtn = false,
  showSpinner = false,
  opacity = 0.98
}) =>
  emitEvent(AppEvents.SHOW_BLUR_VIEW, {
    showBlurView: true,
    showUnlockBtn,
    showSpinner,
    opacity
  })

const hideBlurView = () =>
  emitEvent(AppEvents.SHOW_BLUR_VIEW, { showBlurView: false })

const preventScreenShotsIfNeeded = async (screenName: string) => {
  const { screens } = (await getCmsItem(STORAGE_KEYS.CMS_ITEMS.SECURED_SCREENS))
    ?.securedScreens ?? { screens: [] }

  const isSecuredScreen = screens.includes(screenName)

  RNScreenshotPrevent.enabled(isSecuredScreen)
  isSecuredScreen
    ? RNScreenshotPrevent.enableSecureView()
    : RNScreenshotPrevent.disableSecureView()
}

export { showBlurView, hideBlurView, preventScreenShotsIfNeeded }
