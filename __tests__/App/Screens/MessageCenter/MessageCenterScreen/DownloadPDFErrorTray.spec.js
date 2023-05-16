import React from 'react'
import { create } from 'react-test-renderer'
import StatusView from '@vfgroup-oneplatform/foundation/Components/StatusView'

import DownloadPDFErrorTray from 'App/Screens/MessageCenter/MessageCenterScreen/Components/DownloadPDFErrorTray/DownloadPDFErrorTray'

describe('DownloadPDFErrorTray test', () => {
  test('should render PDFErrorTray successfully', () => {
    const onPrimaryButtonPress = jest.fn()

    const element = create(
      <DownloadPDFErrorTray onPrimaryButtonPress={onPrimaryButtonPress} />
    )

    const statusViewComponent = element.root.findAllByType(StatusView)[0]

    expect(statusViewComponent).toBeTruthy()
    expect(statusViewComponent.props.title).toBe('PDF_error_tray_title')
    expect(statusViewComponent.props.description).toBe(
      'PDF_error_tray_description'
    )
    expect(statusViewComponent.props.primaryButtonProps.title).toBe(
      'PDF_error_tray_button_title'
    )

    statusViewComponent.props.primaryButtonProps.onPress()
    expect(onPrimaryButtonPress).toHaveBeenCalled()
  })
})
