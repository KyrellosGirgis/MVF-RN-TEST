import React from 'react'

import {
  getLoginTokens,
  setLoggedInMintUserId,
  setLoginTokens
} from 'App/Screens/Login/Implementations/Login.helper'
import {
  clearStorageCookies,
  getStorageCookies,
  setStorageCookies
} from 'App/Services/CookiesManager/CookiesManager'
import { loadOIDCToken, upFrontLoginAPI } from 'App/Services/API'

import Captcha from 'App/Screens/Login/Captcha/Captcha'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import { LOGIN_TYPES } from 'App/Utils/Enums'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'
import { showCaptchaModal } from 'App/Containers/AppModal/CaptchaModal/CaptchaModal.helpers'

const loadTokenThenContinueLoginFlow = async (loginCredentials: {
  userName: string
  password: string
  rememberMe: boolean
}) => {
  await loadOIDCToken()

  await EncryptedStorage.setItem(STORAGE_KEYS.loginType, LOGIN_TYPES.UPFRONT)

  if (loginCredentials.rememberMe) {
    await EncryptedStorage.setItem(
      STORAGE_KEYS.username,
      loginCredentials.userName
    )
    await EncryptedStorage.setItem(
      STORAGE_KEYS.password,
      loginCredentials.password
    )
  }
}

const shouldShowCaptchaModal = (response: {
  status: number
  headers: any
}) => ({
  shouldShowCaptcha:
    response.status === 201 &&
    response.headers['x-vf-captcha-required'] === 'true' &&
    response.headers['x-redirect-location'],
  captchaUrl: response.headers['x-redirect-location']
})

const upfrontLogin = async (
  userCredentials: {
    userName: string
    password: string
    rememberMe: any
  },
  configuration: { shouldPerformOIDCFlow: boolean } = {
    shouldPerformOIDCFlow: true
  }
) => {
  const response = await upFrontLoginAPI(
    userCredentials.userName,
    userCredentials.password
  )

  const { shouldShowCaptcha, captchaUrl } = shouldShowCaptchaModal(response)

  shouldShowCaptcha
    ? await showCaptcha(captchaUrl)
    : await setLoggedInMintUserId(response?.data?.userId)

  configuration.shouldPerformOIDCFlow &&
    (await loadTokenThenContinueLoginFlow(userCredentials))
}

const showCaptcha = async (captchaUrl: string) => {
  return new Promise((resolve, reject) => {
    const captchaModalConfig = {
      title: 'captcha_title',
      modalBody: (
        <Captcha captchaUrl={captchaUrl} onSuccess={resolve} onFail={reject} />
      ),
      onHeaderCloseButtonPress: reject
    }
    showCaptchaModal(captchaModalConfig)
  })
}

const backupAndClearLoginData = async () => {
  const storedLegacyCookies = await getStorageCookies()
  const loggedInMintUserId = await EncryptedStorage.getItemParsedToJSON(
    STORAGE_KEYS.loggedInMintUserId
  )
  const tokens = await getLoginTokens()

  await clearStorageCookies()
  return {
    storedLegacyCookies,
    tokens,
    loggedInMintUserId
  }
}

const restoreLoginData = async ({
  storedLegacyCookies,
  tokens,
  loggedInMintUserId
}: any) => {
  await setStorageCookies(storedLegacyCookies)
  await setLoginTokens(tokens)
  await setLoggedInMintUserId(loggedInMintUserId)
}

export {
  loadTokenThenContinueLoginFlow,
  shouldShowCaptchaModal,
  upfrontLogin,
  backupAndClearLoginData,
  restoreLoginData
}
