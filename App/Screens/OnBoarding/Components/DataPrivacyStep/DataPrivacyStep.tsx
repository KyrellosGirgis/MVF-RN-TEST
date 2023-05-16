import React, { useEffect } from 'react'
import { View } from 'react-native'

import { TimelineEvents } from '@vfgroup-oneplatform/foundation/Components'

import styles from './DataPrivacyStep.styles'

import { getHashedMintUserId } from 'App/Utils/Helpers/generic.helpers'

import DataPrivacyFooter from 'App/Screens/OnBoarding/Components/DataPrivacyStep/Components/DataPrivacyFooter/DataPrivacyFooter'

import DataPrivacyHeader from 'App/Screens/OnBoarding/Components/DataPrivacyStep/Components/DataPrivacyHeader/DataPrivacyHeader'

import BEWSection from 'App/Screens/OnBoarding/Components/DataPrivacyStep/Components/BEWSection/BEWSection'

import DataPrivacyStepShimmer from 'App/Screens/OnBoarding/Components/DataPrivacyStep/Components/DataPrivacyStepShimmer/DataPrivacyStepShimmer'

import NetperformSection from 'App/Screens/OnBoarding/Components/DataPrivacyStep/Components/NetperformSection/NetperformSection'

import {
  setToBiProps,
  showErrorAlert
} from 'App/Screens/OnBoarding/Components/Helper'

import { OnboardingStep } from 'App/Screens/OnBoarding/Configurations/OnboardingStep'

import { testID } from 'App/Utils/Helpers/testId.helpers'
import {
  hideBlurView,
  showBlurView
} from 'App/Containers/AppNavigation/AppNavigation.helpers'
import { saveBEWPermissionsToBE } from 'App/Services/API/Requests/DataPrivacyPermissions/BEWPermissions'

import { DATA_PRIVACY_PERMISSIONS } from 'App/Services/API/Requests/DataPrivacyPermissions/DataPrivacyPermissions.constants'
import { useApiCall } from 'App/Hooks'
import { getPrivacyPermissionsStatusFromBE } from 'App/Services/API/Requests/DataPrivacyPermissions/DataPrivacyPermissions.helpers'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import { NetperformUserStatus } from 'App/Services/SDKsManagment/SDKs/NetPerform/Netperform.constants'
import { updateNetperformSDKStatus } from 'App/Services/SDKsManagment/SDKs/NetPerform/Netperform.helper'

const DataPrivacyStep = (props: OnboardingStep) => {
  const { isActive, onNextStep, onSkipStep } = props

  const {
    responseData: bewPermissionsStatus,
    isLoading: isBEWPermissionsStatusLoading
  } = useApiCall(getPrivacyPermissionsStatusFromBE)

  const { shouldShowBEWADV, shouldShowBEWDEV, shouldShowNetperform } =
    bewPermissionsStatus || {}

  useEffect(() => {
    // Changes tobi position according to the position of the current step
    TimelineEvents.subscribe((value) => setToBiProps(value, props))

    // Skip the current step if no permission is shown
    bewPermissionsStatus &&
      isActive &&
      !shouldShowBEWADV &&
      !shouldShowBEWDEV &&
      !shouldShowNetperform &&
      onSkipStep()
  }, [isActive])

  const onToggleChange = (value: boolean, permissionKey: string) => {
    bewPermissionsStatus[permissionKey] = value
  }

  const saveNetperformPermission = async () => {
    await EncryptedStorage.updateObject(await getHashedMintUserId(), {
      [NetperformUserStatus.status]:
        !!bewPermissionsStatus[DATA_PRIVACY_PERMISSIONS.NETPERFORM]
    })

    updateNetperformSDKStatus({
      status: !!bewPermissionsStatus[DATA_PRIVACY_PERMISSIONS.NETPERFORM]
    })
  }

  const onConsentPress = async () => {
    showBlurView({ showSpinner: true, opacity: 0.8 })

    try {
      if (shouldShowBEWADV || shouldShowBEWDEV) {
        await saveBEWPermissionsToBE(bewPermissionsStatus)
      }

      shouldShowNetperform && (await saveNetperformPermission())

      onNextStep()
    } catch (error) {
      showErrorAlert(onNextStep)
    }
    hideBlurView()
  }

  return isBEWPermissionsStatusLoading ? (
    <DataPrivacyStepShimmer containerStyle={styles.componentWrapper} />
  ) : (
    <View
      style={styles.componentWrapper}
      testID={testID('OnboardingBEWStepWrapper_view')}
    >
      <DataPrivacyHeader />

      {(shouldShowBEWADV || shouldShowBEWDEV) && (
        <BEWSection
          shouldShowBEWDEV={shouldShowBEWDEV}
          shouldShowBEWADV={shouldShowBEWADV}
          onToggleChange={onToggleChange}
        />
      )}

      {shouldShowNetperform && (
        <NetperformSection onToggleChange={onToggleChange} />
      )}

      <DataPrivacyFooter onConsentPress={onConsentPress} />
    </View>
  )
}

export default DataPrivacyStep
