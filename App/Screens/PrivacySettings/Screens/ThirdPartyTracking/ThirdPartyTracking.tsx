import React, { useEffect, useState } from 'react'

import { includes as _includes } from 'lodash'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'
import { ThirdPartyTracking as ThirdPartyTrackingComponent } from '@vfgroup-oneplatform/framework/PrivacySettings'

import { getThemeImages } from 'App/Themes'

import {
  getFlattenTrackersItems,
  getStateInitialized,
  onScreenBackPress
} from 'App/Screens/PrivacySettings/Screens/Helper'

import useSuccessModal from 'App/Screens/PrivacySettings/Hooks/useSuccessModal'

import {
  thirdPartyTrackingTextSection,
  thirdPartyTrackingTrackers
} from 'App/Screens/PrivacySettings/Configurations/ThirdPartyTracking'

import { PrivacySettingsState } from 'App/Screens/PrivacySettings/Configurations/PrivacySettings'

import { delay } from 'App/Utils/Helpers/generic.helpers'
import { navigateToDashboardScreen } from 'App/Screens/Helpers'

const ThirdPartyTracking = () => {
  const theme = useTheme()
  const images = getThemeImages(theme.name)
  const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState(true)
  const [setShowSuccessModal, setSuccessModalLoading] = useSuccessModal()
  const [trackersState, setTrackersState] = useState<PrivacySettingsState>(
    getStateInitialized(getFlattenTrackersItems())
  )

  useEffect(() => {
    if (isConfirmButtonDisabled && _includes(trackersState, true)) {
      setIsConfirmButtonDisabled(false)
    } else if (!isConfirmButtonDisabled && !_includes(trackersState, true)) {
      setIsConfirmButtonDisabled(true)
    }
  }, [trackersState])

  const onToggle = (key: string) => {
    setTrackersState({ ...trackersState, [key]: !trackersState[key] })
  }

  const getTrackersData = () =>
    thirdPartyTrackingTrackers.map((section) =>
      section.map((item) => ({
        ...item,
        initialValue: trackersState[item.title],
        onAcceptanceChange: () => onToggle(item.title)
      }))
    )

  const onConfirm = async () => {
    setSuccessModalLoading(true)
    setShowSuccessModal(true)
    await delay(2000)
    setSuccessModalLoading(false)
  }

  return (
    // @ts-ignore
    <ThirdPartyTrackingComponent
      onBack={() => onScreenBackPress(!isConfirmButtonDisabled)}
      onClose={navigateToDashboardScreen}
      images={images}
      description={thirdPartyTrackingTextSection}
      trackers={getTrackersData()}
      isConfirmDisabled={isConfirmButtonDisabled}
      onConfirmPress={onConfirm}
    />
  )
}

export default ThirdPartyTracking
