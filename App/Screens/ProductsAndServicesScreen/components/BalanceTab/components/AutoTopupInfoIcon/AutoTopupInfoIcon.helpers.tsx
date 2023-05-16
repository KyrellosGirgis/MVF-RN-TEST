import React from 'react'

import { Theme } from '@vfgroup-oneplatform/foundation/Components/Themes/Modes/index.d'

import AutoTopupInfoScreen from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/screens/AutoTopUpInfoScreen/AutoTopUpInfoScreen'

import { showModal } from 'App/Containers/AppModal/AppModal.helpers'
import styles from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/screens/AutoTopUpInfoScreen/AutoTopUpInfoScreen.styles'

const showAutoTopupInfoModal = (theme: Theme) => {
  const autoTopupInfoOverlayContentConfig = {
    title: 'auto_topup_quick_action_title',
    modalBody: <AutoTopupInfoScreen />,
    titleStyle: styles.QATitleStyle,
    headerStyle: styles.headerStyle,
    modalContainerStyle: styles.overlayStyle(theme)
  }
  showModal(autoTopupInfoOverlayContentConfig)
}

export { showAutoTopupInfoModal }
