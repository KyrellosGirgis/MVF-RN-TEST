import React from 'react'
import StatusView from '@vfgroup-oneplatform/foundation/Components/StatusView'
import images from '@vfgroup-oneplatform/foundation/Components/Themes/Images'

import styles from 'App/Screens/MessageCenter/MessageCenterScreen/MessageCenterScreen.styles'

type DownloadPDFErrorTrayProps = {
  onPrimaryButtonPress: () => void
}

const DownloadPDFErrorTray = ({
  onPrimaryButtonPress
}: DownloadPDFErrorTrayProps) => {
  return (
    <StatusView
      title="PDF_error_tray_title"
      description="PDF_error_tray_description"
      image={images.ic_WarningHiLight_Theme}
      primaryButtonProps={{
        title: 'PDF_error_tray_button_title',
        onPress: onPrimaryButtonPress
      }}
      containerStyle={styles.errorTrayModalContainerStyle}
    />
  )
}

export default DownloadPDFErrorTray
