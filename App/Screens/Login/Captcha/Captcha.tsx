import React, { useState } from 'react'
import {
  LeftIconErrorMessage,
  VFText
} from '@vfgroup-oneplatform/foundation/Components'
import { View } from 'react-native'

import { setLoggedInMintUserId } from 'App/Screens/Login/Implementations/Login.helper'

import CaptchaBody from 'App/Screens/Login/Captcha/CaptchaBody'

import { verifyCaptchaCodeThenLoginApi } from 'App/Services/API/Requests/Login/login'
import { CaptchaProps } from 'App/Screens/Login/Captcha/Captcha.d'
import styles from 'App/Screens/Login/Captcha/Captcha.styles'

import { LoadingIndicator } from 'App/Components'
import useKeyboardHandler from 'App/Hooks/useKeyboardHandler'
import { closeCaptchaModal } from 'App/Containers/AppModal/CaptchaModal/CaptchaModal.helpers'

const STATUS = {
  IDLE: 'idle',
  VERIFYING_CAPTCHA: 'verifying_captcha',
  INVALID_CAPTCHA: 'invalid_captcha'
}

const Captcha = ({ captchaUrl, onSuccess, onFail }: CaptchaProps) => {
  const [status, setStatus] = useState(STATUS.IDLE)

  const keyboardHeight = useKeyboardHandler()
  const validateCaptchaAndCompleteLogin = async (
    enteredCaptchaCode: string
  ) => {
    setStatus(STATUS.VERIFYING_CAPTCHA)

    try {
      const response = await verifyCaptchaCodeThenLoginApi(enteredCaptchaCode)
      await setLoggedInMintUserId(response?.data?.userId)

      onSuccess()
      closeCaptchaModal()
    } catch (error) {
      if (error?.body === STATUS.INVALID_CAPTCHA) {
        setStatus(STATUS.INVALID_CAPTCHA)
      } else {
        closeCaptchaModal()
        onFail(error)
      }
    }
  }

  const CaptchaHeader = () => (
    <>
      <VFText
        style={styles.title}
        i18nKey="captcha_header"
        testID="captcha_header"
      />
      <VFText
        style={styles.captchaBodyText}
        i18nKey="captcha_body"
        testID="captcha_body"
      />
    </>
  )

  const InvalidCaptchaError = () => (
    <LeftIconErrorMessage
      style={styles.errorMessage}
      errorMessage="captcha_error"
      errorTextStyle={styles.captchaErrorText}
      testID="captcha_error_message"
    />
  )

  return (
    <View style={styles.container(keyboardHeight)} testID="captcha_container">
      {status === STATUS.VERIFYING_CAPTCHA ? (
        <LoadingIndicator
          containerStyle={styles.loadingContainer}
          testID="captcha_loading_container"
        />
      ) : (
        <>
          <CaptchaHeader />

          {status === STATUS.INVALID_CAPTCHA && <InvalidCaptchaError />}

          <CaptchaBody
            captchaUrl={captchaUrl}
            submitCaptchaCode={validateCaptchaAndCompleteLogin}
            resetParentStatus={() => {
              setStatus(STATUS.IDLE)
            }}
            onFail={onFail}
          />
        </>
      )}
    </View>
  )
}

export default Captcha
