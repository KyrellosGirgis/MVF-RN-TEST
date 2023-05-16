import PermissionsProvider from '@vfgroup-oneplatform/framework/CommonUI/Permissions/PermissionsProvider'

import DataPrivacyStep from './DataPrivacyStep/DataPrivacyStep'
import BiometricsStep from './BiometricsStep/BiometricsStep'
import ThirdPartyPermissionsStep from './ThirdPartyPermissionsStep/ThirdPartyPermissionsStep'

import { getDevicePermissions } from 'App/Screens/OnBoarding/DevicePermissions/DevicePermissions'

const getOnboardingCompList = async () => {
  const PermissionsStep = PermissionsProvider(
    {
      grantPermission: () => {},
      declinePermission: () => {}
    },
    {},
    await getDevicePermissions()
  )
  return {
    DataPrivacyStep,
    BiometricsStep,
    PermissionsStep,
    ThirdPartyPermissionsStep
  }
}
export { getOnboardingCompList }
