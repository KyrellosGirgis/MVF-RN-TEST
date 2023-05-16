import React from 'react'
import { Text } from 'react-native'

import { emitEvent } from 'App/Services/AppEventEmitter/AppEventEmitter'
import { AppEvents } from 'App/Services/AppEventEmitter/AppEvents'
import {
  closeCaptchaModal,
  showCaptchaModal
} from 'App/Containers/AppModal/CaptchaModal/CaptchaModal.helpers'

jest.mock('App/Services/AppEventEmitter/AppEventEmitter', () => {
  return {
    emitEvent: jest.fn()
  }
})

describe('Captcha Modal component helper functions test ', () => {
  it('should emit SHOW_CAPTCHA_MODAL event when call  showCaptchaModal', () => {
    const modalConfig = {
      title: 'modalTitle',
      modalBody: <Text />,
      isNativeIOSModal: true,
      withHeaderCloseButton: false
    }
    showCaptchaModal(modalConfig)
    expect(emitEvent).toHaveBeenNthCalledWith(
      1,
      AppEvents.HIDE_CAPTCHA_MODAL,
      []
    )
    expect(emitEvent).toHaveBeenNthCalledWith(2, AppEvents.SHOW_CAPTCHA_MODAL, [
      modalConfig
    ])
  })

  it('should emit HIDE_CAPTCHA_MODAL event when call closeCaptchaModal', () => {
    closeCaptchaModal()
    expect(emitEvent).toHaveBeenNthCalledWith(
      1,
      AppEvents.HIDE_CAPTCHA_MODAL,
      []
    )
  })
})
