import { ShowModalProps } from 'App/Containers/AppModal/AppModal.d'

import { AppEvents } from 'App/Services/AppEventEmitter/AppEvents'
import { emitEvent } from 'App/Services/AppEventEmitter/AppEventEmitter'
import { isIOS } from 'App/Utils/Helpers/generic.helpers'

const showCaptchaModal = (captchaModalProps: ShowModalProps) => {
  closeCaptchaModal()
  emitEvent(AppEvents.SHOW_CAPTCHA_MODAL, [
    {
      withHeaderCloseButton: true,
      isNativeIOSModal: isIOS,
      ...captchaModalProps
    }
  ])
}

const closeCaptchaModal = () => {
  emitEvent(AppEvents.HIDE_CAPTCHA_MODAL, [])
}

export { showCaptchaModal, closeCaptchaModal }
