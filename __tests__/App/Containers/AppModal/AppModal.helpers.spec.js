import { closeModal, showModal } from 'App/Containers/AppModal/AppModal.helpers'
import { emitEvent } from 'App/Services/AppEventEmitter/AppEventEmitter'
import { AppEvents } from 'App/Services/AppEventEmitter/AppEvents'

jest.mock('App/Services/AppEventEmitter/AppEventEmitter', () => {
  return {
    emitEvent: jest.fn()
  }
})

describe('AppModal component helper functions test ', () => {
  it('should emit SHOW_MODAL event when call showModal', () => {
    const modalConfig = {
      title: 'modalTitle',
      modalBody: null,
      isNativeIOSModal: false,
      withHeaderCloseButton: true,
      withHeader: true
    }
    showModal(modalConfig)
    expect(emitEvent).toHaveBeenNthCalledWith(1, AppEvents.HIDE_MODAL, [])
    expect(emitEvent).toHaveBeenNthCalledWith(2, AppEvents.SHOW_MODAL, [
      modalConfig
    ])
  })

  it('should emit HIDE_MODAL event when call closeModal', () => {
    closeModal()
    expect(emitEvent).toHaveBeenNthCalledWith(1, AppEvents.HIDE_MODAL, [])
  })
})
