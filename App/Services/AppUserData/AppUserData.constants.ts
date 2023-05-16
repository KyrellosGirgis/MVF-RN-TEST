import { closeModal } from 'App/Containers/AppModal/AppModal.helpers'
import { store } from 'App/Redux'
import { fetchAppUserData } from 'App/Redux/AppUserData/appUserData.thunk'

const NoSubscriptionsErrorConfig = {
  withHeader: true,
  header: 'blocking-tray-no-subscriptions-title',
  headerTestId: 'overlay-no-subscriptions-title',
  iconName: 'ic_WarningHiLight_Theme',
  iconTestId: 'overlay-no-subscriptions-icon',
  description: 'blocking-tray-no-subscriptions-description',
  descriptionTestId: 'overlay-no-subscriptions-description',
  withTryAgainButton: false
}

const UserDataApiErrorConfig = {
  withHeader: true,
  header: 'overlay_modal_error_title',
  headerTestId: 'OnboardingErrorScreen_header',
  iconName: 'ic_WarningHiLight_Theme',
  iconTestId: 'OnboardingErrorScreen_icon',
  description: 'overlay_modal_error_description',
  withTryAgainButton: true,
  descriptionTestId: 'OnboardingErrorScreen_txt',
  tryAgainButtonTestId: 'OnboardingErrorScreenTryAgain',
  onTryAgainPress: () => {
    store.dispatch(fetchAppUserData())
    closeModal()
  }
}

const BlockedUsersErrorConfig = {
  withHeader: true,
  header: 'login_tray_blocked_ucm_title',
  headerTestId: 'OnboardingErrorScreen_header',
  iconName: 'ic_WarningHiLight_Theme',
  iconTestId: 'OnboardingErrorScreen_icon',
  description: 'login_tray_blocked_ucm_message',
  descriptionTestId: 'OnboardingErrorScreen_txt',
  withTryAgainButton: false
}

export {
  NoSubscriptionsErrorConfig,
  UserDataApiErrorConfig,
  BlockedUsersErrorConfig
}
