import { NetperformUserStatusType } from './Netperform'

import { store } from 'App/Redux'
import { setUserThirdPartyPermissions } from 'App/Redux/UserThirdPartyPermissions/UserThirdPartyPermissions.thunk'

const updateNetperformSDKStatus = async (
  userNetperformStatus: NetperformUserStatusType | undefined
) => {
  const { status, isPersonalized } = userNetperformStatus || {}
  const { NetperformPermissions } =
    store.getState().userThirdPartyPermissions.userThirdPartyPermissions

  await store.dispatch(
    setUserThirdPartyPermissions({
      NetperformPermissions: {
        NetworkOptimizationPermission:
          status === undefined
            ? NetperformPermissions?.NetworkOptimizationPermission
            : status,
        PersonalizedNetworkOptimizationPermission:
          isPersonalized === undefined
            ? NetperformPermissions?.PersonalizedNetworkOptimizationPermission
            : isPersonalized
      }
    })
  )
}
export { updateNetperformSDKStatus }
