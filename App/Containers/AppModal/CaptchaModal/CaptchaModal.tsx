import React from 'react'

import AppModal from 'App/Containers/AppModal/AppModal'

import { AppEvents } from 'App/Services/AppEventEmitter/AppEvents'

const CaptchaModal = () => {
  return (
    <AppModal
      showEventName={AppEvents.SHOW_CAPTCHA_MODAL}
      hideEventName={AppEvents.HIDE_CAPTCHA_MODAL}
    />
  )
}

export default CaptchaModal
