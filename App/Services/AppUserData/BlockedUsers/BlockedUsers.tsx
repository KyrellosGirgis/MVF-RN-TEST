import React from 'react'

import { BlockedUsersErrorConfig } from 'App/Services/AppUserData/AppUserData.constants'

import AppUserDataErrorsBody from 'App/Services/AppUserData/components/AppUserDataErrors/AppUserDataErrorsBody'

import { getTarrifBooked } from 'App/Services/DataLayer/APIs/TarrifBooked/TarrifBooked.requests'
import {
  handleUserDataApiErrorsIfNeeded,
  isMobilePrepaidSubscription
} from 'App/Services/AppUserData/AppUserData.helpers'

import { isIOS, openExternalWebView } from 'App/Utils/Helpers/generic.helpers'

import webURLs from 'App/Services/webURLs'

import logOut from 'App/Screens/Login/Implementations/LogoutImplementation/LogoutImplementation'

import ErrorComponent from 'App/Components/ErrorComponent/ErrorComponent'
import { closeModal, showModal } from 'App/Containers/AppModal/AppModal.helpers'

const tarrifDetailsTypes = {
  DIY_PACKAGE: 'diy-package',
  MATRIX_TARRIF: 'matrix-tariff'
}

const handleBlockedUsersError = () => {
  const AppUserDataErrorsBodyConfig = {
    body: <ErrorComponent {...BlockedUsersErrorConfig} />,
    primaryButtonTitle: 'back_to_login_button_title',
    onPrimaryButtonPress: async () => {
      closeModal()
      await logOut({ shouldNavigateToLogin: true })
    },
    secondaryButtonTitle: 'login_tray_blocked_ucm_button',
    onSecondaryButtonPress: () =>
      openExternalWebView(
        isIOS
          ? webURLs.CALLYA_FLEX_APP_IOS_LINK
          : webURLs.CALLYA_FLEX_APP_ANDROID_LINK
      )
  }
  showModal({
    modalBody: <AppUserDataErrorsBody {...AppUserDataErrorsBodyConfig} />,
    isFullScreen: true
  })
}

const showErrorIfUserIsBlocked = async () => {
  if (isMobilePrepaidSubscription()) {
    const tariffBookedData = await getTarrifBooked()
    const type =
      tariffBookedData.subscriptionVBO[0].subscriptions[0].customerProduct
        .tariffDetails.type
    if (type === tarrifDetailsTypes.DIY_PACKAGE) {
      exports.handleBlockedUsersError()
      return true
    } else if (type !== tarrifDetailsTypes.MATRIX_TARRIF) {
      handleUserDataApiErrorsIfNeeded('error')
      return true
    }
  }
  return false
}

export { showErrorIfUserIsBlocked, handleBlockedUsersError }
