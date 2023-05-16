import { createSlice } from '@reduxjs/toolkit'

import { setUserThirdPartyPermissions } from './UserThirdPartyPermissions.thunk'

const {
  actions: userThirdPartyPermissionsActions,
  reducer: userThirdPartyPermissionsReducer
} = createSlice({
  name: 'userThirdPartyPermissions',
  initialState: { userThirdPartyPermissions: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      setUserThirdPartyPermissions.fulfilled,
      (state, { payload }) => ({
        ...state,
        userThirdPartyPermissions: {
          ...state.userThirdPartyPermissions,
          ...payload
        }
      })
    )
  }
})

export { userThirdPartyPermissionsActions, userThirdPartyPermissionsReducer }
