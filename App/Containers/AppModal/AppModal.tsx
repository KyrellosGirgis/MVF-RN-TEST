import {
  useTheme,
  withTheme
} from '@vfgroup-oneplatform/foundation/Components/Themes'

import React, { useEffect, useRef, useState } from 'react'
import { Pressable, View } from 'react-native'
import Modal from 'react-native-modal'

import { SafeAreaView } from 'react-native-safe-area-context'

import RNWindowView from 'react-native-window-view'

import { Icon, VFText } from '@vfgroup-oneplatform/foundation/Components'

import { getThemeImages } from 'App/Themes'

import {
  defaultHeightAdjustment,
  minimumTopMarginRatio
} from 'App/Containers/AppModal/AppModal.constants'

import {
  AppModalProps,
  ShowModalProps
} from 'App/Containers/AppModal/AppModal.d'

import styles from 'App/Containers/AppModal/AppModal.styles'

import {
  emitEvent,
  listenForEvent
} from 'App/Services/AppEventEmitter/AppEventEmitter'
import { AppEvents } from 'App/Services/AppEventEmitter/AppEvents'
import SlideInView from 'App/Components/HelperComponents/SlideInView'
import { testID } from 'App/Utils/Helpers/testId.helpers'
import { screenHeight } from 'App/Utils/Helpers/generic.helpers'

const AppModal = ({
  showEventName = AppEvents.SHOW_MODAL,
  hideEventName = AppEvents.HIDE_MODAL
}: AppModalProps) => {
  const [showModal, setShowModal] = useState(false)
  const [marginTop, setMarginTop] = useState(0)
  const modalProps = useRef<ShowModalProps>()
  const theme = useTheme()
  const images = getThemeImages(theme.name)

  useEffect(() => {
    listenForEvent(showEventName, ([props]) => {
      modalProps.current = props
      setShowModal(true)
    })

    listenForEvent(hideEventName, () => {
      setShowModal(false)
    })
  }, [])

  const onLayout = ({ nativeEvent }) => {
    if (modalProps.current?.isFullScreen) {
      setMarginTop(0)
    } else {
      const marginHeight =
        screenHeight - (nativeEvent.layout.height + defaultHeightAdjustment)
      if (marginHeight / screenHeight < minimumTopMarginRatio) {
        setMarginTop(minimumTopMarginRatio * screenHeight)
      } else {
        setMarginTop(marginHeight)
      }
    }
  }

  const appModalHeader = (
    <View style={[styles.headerStyle, modalProps.current?.headerStyle]}>
      <VFText
        i18nKey={modalProps.current?.title}
        style={[styles.titleStyle(theme), modalProps.current?.titleStyle]}
        testKey={testID('AppModalTitle')}
      />
      {modalProps.current?.withHeaderCloseButton && (
        <Pressable
          onPress={() => {
            modalProps.current?.onHeaderCloseButtonPress?.()
            emitEvent(hideEventName ?? AppEvents.HIDE_MODAL, [])
          }}
          testID={testID('AppModalHeaderCloseBtn')}
        >
          <Icon
            type="image"
            name={theme.isDark ? images.ic_close_white : images.ic_close}
            size={24}
            style={[styles.closeButton, modalProps.current?.closeBtnStyle]}
          />
        </Pressable>
      )}
    </View>
  )

  const appModalContent = (
    <View
      style={[styles.containerStyle, modalProps.current?.modalContainerStyle]}
      testID={testID('AppModalContainer')}
    >
      {modalProps.current?.title && appModalHeader}
      <View onLayout={onLayout}>{modalProps.current?.modalBody}</View>
    </View>
  )

  return (
    <>
      {showModal ? (
        modalProps.current?.isNativeIOSModal ? (
          <RNWindowView shown={showModal} style={styles.rnWindowView}>
            <View
              style={[styles.contentContainer, { paddingTop: marginTop }]}
              testID={testID('appModal')}
            >
              <SafeAreaView edges={['right', 'top', 'left']}>
                <SlideInView style={styles.modalStyle}>
                  {appModalContent}
                </SlideInView>
              </SafeAreaView>
            </View>
          </RNWindowView>
        ) : (
          <Modal
            isVisible={showModal}
            style={[styles.modalStyle, { paddingTop: marginTop }]}
            animationIn="slideInUp"
            backdropTransitionInTiming={650}
            backdropTransitionOutTiming={0}
            statusBarTranslucent
            testID={testID('appModal')}
          >
            {appModalContent}
          </Modal>
        )
      ) : (
        <></>
      )}
    </>
  )
}

export default withTheme(AppModal)
