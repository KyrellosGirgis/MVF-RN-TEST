import React, { FunctionComponent, useState } from 'react'
import CoreAppPrivacy from '@vfgroup-oneplatform/framework/Settings/AppPrivacy/AppPrivacy'

import {
  APP_PERMISSION_CONFIGS,
  APP_PRIVACY_PERMISSION_KEYS
} from './AppPrivacy.config'

import {
  enableNetperformPermission,
  enablePersonalizedServicePermission,
  disableNetperformPermissions
} from './AppPrivacy.helper'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import { getHashedMintUserId } from 'App/Utils/Helpers/generic.helpers'
import { isPersonalizedEnabled } from 'App/Services/SDKsManagment/SDKs/NetPerform/NetperformInitializer'
import { NetperformUserStatus } from 'App/Services/SDKsManagment/SDKs/NetPerform/Netperform.constants'

const AppPrivacy: FunctionComponent = () => {
  const [netperformToggleStatus, setNetperformToggleStatus] =
    useState<boolean>()

  const onAcceptanceChangeHandling = (key: any, value: boolean) => {
    if (key === APP_PRIVACY_PERMISSION_KEYS.improveNetworkStatus) {
      value ? enableNetperformPermission(value) : disableNetperformPermissions()

      setNetperformToggleStatus(value)
    } else {
      enablePersonalizedServicePermission(value)
    }
    return true
  }

  const getNetperformToggleInitialValue = async () => {
    const userNetperformStatus = await EncryptedStorage.getItemParsedToJSON(
      await getHashedMintUserId()
    )
    setNetperformToggleStatus(
      !!userNetperformStatus?.[NetperformUserStatus.status]
    )
    return !!userNetperformStatus?.[NetperformUserStatus.status]
  }

  const checkTogglesStatus = async () => {
    const currentNetperformToggleStatus =
      netperformToggleStatus === undefined
        ? await getNetperformToggleInitialValue()
        : netperformToggleStatus
    const isPersonalized = await isPersonalizedEnabled()

    return {
      [APP_PRIVACY_PERMISSION_KEYS.improveNetworkStatus]: {
        isVisible: true,
        toggleValue: currentNetperformToggleStatus
      },
      [APP_PRIVACY_PERMISSION_KEYS.personalizedServiceStatus]: {
        isVisible: currentNetperformToggleStatus,
        toggleValue: isPersonalized
      }
    }
  }

  return (
    <CoreAppPrivacy
      permissionsConfig={APP_PERMISSION_CONFIGS}
      onAcceptanceChange={onAcceptanceChangeHandling}
      checkTogglesStatus={checkTogglesStatus}
      withTray
      images={[]}
    />
  )
}

export default AppPrivacy
