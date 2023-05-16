import React, { useEffect, useState } from 'react'
import { Pressable, View } from 'react-native'

import { VFText } from '@vfgroup-oneplatform/foundation/Components'

import VFLottieView, {
  LottieTypes
} from '@vfgroup-oneplatform/foundation/Components/VFLottieView'

import { BlurViewProps } from './BlurView.d'
import styles from './BlurView.styles'

import { AppEvents } from 'App/Services/AppEventEmitter/AppEvents'
import { listenForEvent } from 'App/Services/AppEventEmitter/AppEventEmitter'

export default function BlurView({ style, unlockButton }: BlurViewProps) {
  const [config, setConfig] = useState({
    showBlurView: false,
    showUnlockBtn: false,
    showSpinner: false,
    opacity: 0.98
  })

  const { onPress, title } = unlockButton || { onPress: () => {}, title: '' }
  const { showBlurView, showUnlockBtn, showSpinner, opacity } = config

  useEffect(() => {
    listenForEvent(AppEvents.SHOW_BLUR_VIEW, setConfig)
  }, [])

  return (
    (showBlurView && (
      <View style={[styles.main(opacity), style]} testID="BlurView">
        {showSpinner && (
          <VFLottieView
            type={LottieTypes.whiteSpinner}
            autoPlay={true}
            loop={true}
            lottieViewStyle={[styles.lottieContainer, styles.overlayLottie]}
            testID={'spinnerTestId'}
          />
        )}
        {showUnlockBtn && (
          <Pressable onPress={onPress} testID="BlurView_Pressable">
            <VFText
              i18nKey={title}
              style={styles.btnTitle}
              testID="BlurView_Pressable_Text"
            />
          </Pressable>
        )}
      </View>
    )) ||
    null
  )
}
