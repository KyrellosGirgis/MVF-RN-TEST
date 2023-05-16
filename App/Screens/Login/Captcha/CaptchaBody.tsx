import React, { useEffect, useRef, useState } from 'react'

import { VFButton, VFInput } from '@vfgroup-oneplatform/foundation/Components'

import { withTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import CaptchaImageContainer from './CaptchaImageContainer'

import ErrorCard from 'App/Components/ErrorCard/ErrorCard'

import styles from 'App/Screens/Login/Captcha/Captcha.styles'

import { getCaptchaImageUrl } from 'App/Services/API/Requests/Login/login'
import { captchaBodyProps } from 'App/Screens/Login/Captcha/Captcha.d'

import { closeCaptchaModal } from 'App/Containers/AppModal/CaptchaModal/CaptchaModal.helpers'

const CaptchaBody = ({
  captchaUrl,
  theme,
  submitCaptchaCode,
  resetParentStatus,
  onFail
}: captchaBodyProps) => {
  const [captchaImageUrl, setCaptchaImageUrl] = useState('')
  const [captchaImageLoadingFailed, setCaptchaImageLoadingFailed] =
    useState(false)
  const [enteredCaptcha, setEnteredCaptcha] = useState('')
  const [isCaptchaImageLoading, setIsCaptchaImageLoading] = useState(false)

  const captchaInputRef = useRef()

  const loadCaptchaImageUrl = async (flag: boolean = true) => {
    flag && resetParentStatus()
    captchaInputRef?.current?.clear()
    setIsCaptchaImageLoading(true)

    try {
      const response = await getCaptchaImageUrl(captchaUrl)
      setCaptchaImageUrl(response.data.captcha_image_url)
    } catch {}
    setCaptchaImageLoadingFailed(false)
    setIsCaptchaImageLoading(false)
  }

  useEffect(() => {
    loadCaptchaImageUrl(false)
  }, [])

  const CaptchaCodeInput = (
    <VFInput
      containerStyle={styles.input}
      label="captcha_input"
      upperLabel="captcha_input"
      onChangeText={setEnteredCaptcha}
      autoCapitalize="none"
      baseColor={theme.colors.textInput.default.baseColor}
      tintColor={theme.colors.textInput.default.tintColor}
      selectionColor={theme.colors.textInput.default.selectionColor}
      textColor={theme.colors.textColor}
      ref={(_ref) => {
        captchaInputRef.current = _ref
      }}
      disabled={false}
      testID="captcha_input"
    />
  )

  const CaptchaButtons = (
    <>
      {!captchaImageLoadingFailed && (
        <VFButton
          title="captcha_continue_button"
          disabled={enteredCaptcha === ''}
          style={styles.Buttons}
          disabledStyle={styles.disabledButtonStyle(theme)}
          onPress={() => {
            submitCaptchaCode(enteredCaptcha)
          }}
          disabledTextStyle={styles.disabledTextStyle(theme)}
          testID="captcha_continue_button"
        />
      )}

      <VFButton
        type="secondary"
        style={styles.Buttons}
        title="captcha_cancel_button"
        onPress={() => {
          closeCaptchaModal()
          onFail({ hideError: true })
        }}
        testID="captcha_cancel_button"
      />
    </>
  )

  return (
    <>
      {captchaImageLoadingFailed ? (
        <ErrorCard
          errorText="captcha_image_loading_failed_error"
          errorDetails="captcha_image_loading_failed_retry"
          errorHandler={loadCaptchaImageUrl}
          theme={theme}
          testID="captcha_loading_error"
        />
      ) : (
        <>
          <CaptchaImageContainer
            captchaImageUrl={captchaImageUrl}
            loadCaptchaImageUrl={loadCaptchaImageUrl}
            setCaptchaImageLoadingFailed={setCaptchaImageLoadingFailed}
            isCaptchaImageLoading={isCaptchaImageLoading}
          />

          {CaptchaCodeInput}
        </>
      )}
      {CaptchaButtons}
    </>
  )
}

export default withTheme(CaptchaBody)
