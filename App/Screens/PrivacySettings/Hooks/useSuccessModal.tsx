import React, { useEffect, useState } from 'react'

import styles from './useSuccessModal.styles'

import SuccessModalBody from 'App/Screens/PrivacySettings/Components/SuccessModalBody/SuccessModalBody'

import { showModal, closeModal } from 'App/Containers/AppModal/AppModal.helpers'
import { LoadingIndicator } from 'App/Components'
import { navigateToDashboardScreen } from 'App/Screens/Helpers'

const useSuccessModal = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const closeSuccessModal = () => {
    closeModal()
    setShowSuccessModal(false)
  }

  const getCurrentModalBody = () => {
    return isLoading ? (
      <LoadingIndicator
        containerStyle={styles.loadingIndicatorContainer}
        testID="Privacy_Settings_Success_Modal"
      />
    ) : (
      <SuccessModalBody
        onPrimaryButtonPress={() => {
          closeSuccessModal()
          navigateToDashboardScreen()
        }}
        onSecondaryButtonPress={closeSuccessModal}
      />
    )
  }

  useEffect(() => {
    if (showSuccessModal) {
      const modalBody = getCurrentModalBody()
      const subTrayPrivacyConfig = {
        title: 'subtray_privacy_title',
        modalBody: modalBody,
        withHeaderCloseButton: false,
        headerStyle: styles.modalHeader
      }
      showModal(subTrayPrivacyConfig)
    }
  }, [isLoading, showSuccessModal])

  return [setShowSuccessModal, setIsLoading]
}

export default useSuccessModal
