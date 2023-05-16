import { useNetInfo } from '@react-native-community/netinfo'

import React, { useEffect, useState } from 'react'
import { AlertBanner } from '@vfgroup-oneplatform/foundation/Components'

import styles from './OfflineModeAlert.styles'

import { usePrevious } from 'App/Hooks'
import { delay } from 'App/Utils/Helpers/generic.helpers'

const HIDE_ONLINE_ALERT_TIMEOUT = 3000

export default function OfflineModeAlert() {
  const { isConnected } = useNetInfo()
  const [isVisible, setIsVisible] = useState(false)
  const [alertMessage, setAlertMessage] = useState('')
  const isConnectedPrevValue = usePrevious(isConnected)

  const alertVisibilityHandler = async () => {
    // SHOW_OFFLINE_ALERT
    if (isConnected === false) {
      setAlertMessage('alert_banner_message_offline')
      setIsVisible(true)
    }
    // HANDLE_ONLINE_ALERT
    else if (isConnected && isConnectedPrevValue === false) {
      setAlertMessage('alert_banner_message_online')
      await delay(HIDE_ONLINE_ALERT_TIMEOUT)
      setIsVisible(false)
    }
  }

  useEffect(() => {
    alertVisibilityHandler()
  }, [isConnected])

  return (
    <AlertBanner
      containerStyle={styles.containerStyle(isConnected)}
      isVisible={isVisible}
      alertMessage={alertMessage}
    />
  )
}
