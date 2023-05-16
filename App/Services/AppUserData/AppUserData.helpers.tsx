import React from 'react'

import { AxiosError } from 'axios'

import AppUserDataErrorsBody from 'App/Services/AppUserData/components/AppUserDataErrors/AppUserDataErrorsBody'

import {
  NoSubscriptionsErrorConfig,
  UserDataApiErrorConfig
} from 'App/Services/AppUserData/AppUserData.constants'

import { unhandledStatusCodesList } from 'App/Services/API/Requests/userData/userData.helpers'

import { store } from 'App/Redux'

import { PaymentType } from 'App/Utils/Enums/index'
import { UserDataServicesTypes } from 'App/Services/API/Requests/userData/userData.d'
import { closeModal, showModal } from 'App/Containers/AppModal/AppModal.helpers'
import logOut from 'App/Screens/Login/Implementations/LogoutImplementation/LogoutImplementation'
import ErrorComponent from 'App/Components/ErrorComponent/ErrorComponent'

const isMobileSubscription = (paymentType: string) => {
  const { currentlyActiveSubscription } = store.getState().appUserData
  return (
    currentlyActiveSubscription &&
    currentlyActiveSubscription.type === UserDataServicesTypes.mobile &&
    currentlyActiveSubscription.marketCode.toLowerCase() === paymentType
  )
}

const isMobilePostpaidSubscription = () => {
  return isMobileSubscription(PaymentType.MMC)
}

const isMobilePrepaidSubscription = () => {
  return isMobileSubscription(PaymentType.MMO)
}

const getFirstNameFromAppUserData = () => {
  const { onlineUser } = store.getState().appUserData?.userAccountVBO || {}
  return onlineUser?.firstName || ''
}

const getMsisdn = () => {
  const { currentlyActiveSubscription } = store.getState().appUserData
  return currentlyActiveSubscription?.id || ''
}

const isAppUserDataWithNoSubscriptions = () => {
  const productsSubscriptions =
    store.getState()?.appUserData?.userAccountVBO?.subscriptions
  return Object.values(productsSubscriptions).every(
    (item) => item === undefined || item === null || item?.length === 0
  )
}

const handleNoSubscriptionsErrorIfNeeded = () => {
  if (!exports.isAppUserDataWithNoSubscriptions()) {
    return
  }
  const AppUserDataErrorsBodyConfig = {
    body: <ErrorComponent {...NoSubscriptionsErrorConfig} />,
    primaryButtonTitle: 'blocking-tray-no-subscriptions-button-text',
    onPrimaryButtonPress: async () => {
      closeModal()
      await logOut({ shouldNavigateToLogin: true })
    }
  }
  showModal({
    modalBody: <AppUserDataErrorsBody {...AppUserDataErrorsBodyConfig} />,
    isFullScreen: true
  })
}

const handleUserDataApiErrorsIfNeeded = (error: AxiosError) => {
  if (unhandledStatusCodesList.includes(error?.response?.status)) {
    return
  }
  const AppUserDataErrorsBodyConfig = {
    body: <ErrorComponent {...UserDataApiErrorConfig} />,
    primaryButtonTitle: 'back_to_login_button_title',
    onPrimaryButtonPress: async () => {
      closeModal()
      await logOut({ shouldNavigateToLogin: true })
    }
  }
  showModal({
    modalBody: <AppUserDataErrorsBody {...AppUserDataErrorsBodyConfig} />,
    isFullScreen: true
  })
}

export {
  getFirstNameFromAppUserData,
  getMsisdn,
  isMobilePostpaidSubscription,
  isAppUserDataWithNoSubscriptions,
  handleNoSubscriptionsErrorIfNeeded,
  handleUserDataApiErrorsIfNeeded,
  isMobilePrepaidSubscription
}
