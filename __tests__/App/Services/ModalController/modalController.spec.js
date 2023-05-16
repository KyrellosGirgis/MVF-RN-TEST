import React from 'react'
import { DeviceEventEmitter } from 'react-native'
import { VFText } from '@vfgroup-oneplatform/foundation/Components'

import { closeModal, showModal } from 'App/Containers/AppModal/AppModal.helpers'
import { AppEvents } from 'App/Services/AppEventEmitter/AppEvents'

describe('customized modal', () => {
  DeviceEventEmitter.emit = jest.fn()

  test('emit showModal event when calling showModal', () => {
    const title = 'abc'
    const modalBody = <VFText />
    const onCancel = () => {}
    const modalConfig = {
      title: title,
      modalBody: modalBody,
      onHeaderCloseButtonPress: onCancel,
      isNativeIOSModal: false,
      withHeaderCloseButton: true,
      withHeader: true
    }
    showModal(modalConfig)

    expect(DeviceEventEmitter.emit).toHaveBeenNthCalledWith(
      1,
      AppEvents.HIDE_MODAL,
      []
    )
    expect(DeviceEventEmitter.emit).toHaveBeenNthCalledWith(
      2,
      AppEvents.SHOW_MODAL,
      [modalConfig]
    )
  })
  test('emit closeModal event when calling closeModal', () => {
    closeModal()
    expect(DeviceEventEmitter.emit).toHaveBeenCalledWith(
      AppEvents.HIDE_MODAL,
      []
    )
  })
})
