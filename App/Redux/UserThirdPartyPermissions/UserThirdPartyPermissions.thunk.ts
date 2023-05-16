import { createAsyncThunk } from '@reduxjs/toolkit'

import { UserThirdPartyPermissions } from 'App/Services/SDKsManagment/UserThirdPartyPermissions.d'
import { updateSDKsStatus } from 'App/Services/SDKsManagment/SDKsManger'

const setUserThirdPartyPermissions = createAsyncThunk(
  'UserThirdPartyPermissions/setUserThirdPartyPermissions',
  async (userThirdPartyPermissions: UserThirdPartyPermissions) => {
    updateSDKsStatus(userThirdPartyPermissions)
    return userThirdPartyPermissions
  }
)

export { setUserThirdPartyPermissions }
