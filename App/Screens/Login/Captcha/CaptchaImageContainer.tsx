import React, { useEffect, useState } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'

import { VFText } from '@vfgroup-oneplatform/foundation/Components'

import { withTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { getThemeImages } from 'App/Themes'

import styles from 'App/Screens/Login/Captcha/Captcha.styles'
import CaptchaShimmer from 'App/Screens/Login/Captcha/Captcha.shimmer'
import { captchaImageContainerProps } from 'App/Screens/Login/Captcha/Captcha.d'
import { getStorageCookiesAsString } from 'App/Services/CookiesManager/CookiesManager.helpers'

const CaptchaImageContainer = ({
  theme,
  loadCaptchaImageUrl,
  setCaptchaImageLoadingFailed,
  captchaImageUrl,
  isCaptchaImageLoading
}: captchaImageContainerProps) => {
  const [CSID, setCSID] = useState('')

  const getCSID = async () => {
    const CSIDValue = await getStorageCookiesAsString()
    setCSID(CSIDValue)
  }

  useEffect(() => {
    getCSID()
  }, [])

  const CaptchaImageRefreshView = (
    <TouchableOpacity
      style={styles.retry}
      onPress={loadCaptchaImageUrl}
      testID="captcha_retry"
    >
      <Image
        style={styles.retryImage(theme)}
        source={getThemeImages(theme.name).ic_RefreshRed}
        testID="captcha_retry_image"
      />

      <VFText
        style={styles.retryText(theme)}
        i18nKey="captcha_retry_message"
        testID="captcha_retry_text"
      />
    </TouchableOpacity>
  )

  return (
    <View style={styles.captchaImageContainer} testID="captcha_image_container">
      {isCaptchaImageLoading ? (
        <CaptchaShimmer />
      ) : (
        <Image
          source={{
            uri: captchaImageUrl,
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Cookie: CSID
            }
          }}
          resizeMode={'cover'}
          onError={() => {
            setCaptchaImageLoadingFailed(true)
          }}
          style={styles.image}
          testID="captcha_image"
        />
      )}

      {CaptchaImageRefreshView}
    </View>
  )
}

export default withTheme(CaptchaImageContainer)
