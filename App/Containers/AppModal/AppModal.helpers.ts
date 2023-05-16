import { ShowModalProps } from 'App/Containers/AppModal/AppModal.d'

import { AppEvents } from 'App/Services/AppEventEmitter/AppEvents'
import { emitEvent } from 'App/Services/AppEventEmitter/AppEventEmitter'

const showModal = (props: ShowModalProps) => {
  closeModal()
  emitEvent(AppEvents.SHOW_MODAL, [
    {
      withHeaderCloseButton: true,
      isNativeIOSModal: false,
      ...props
    }
  ])
}

const closeModal = () => {
  emitEvent(AppEvents.HIDE_MODAL, [])
}

export { showModal, closeModal }
