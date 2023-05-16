import { createSlice } from '@reduxjs/toolkit'

const { actions: cmsActions, reducer: cmsReducer } = createSlice({
  name: 'cms',
  initialState: {
    privacyCookiePermissionsVersion: undefined,
    dataPrivacyUrl: undefined
  },
  reducers: {
    setPrivacyCookiePermissionsVersion: (state, { payload }) => ({
      ...state,
      privacyCookiePermissionsVersion: payload
    }),
    setDataPrivacyUrl: (state, { payload }) => ({
      ...state,
      dataPrivacyUrl: payload
    }),
    setPrivacy: (state, { payload }) => ({
      ...state,
      privacyCookiePermissionsVersion: payload.consent_version,
      dataPrivacyUrl: payload.dataPrivacyUrl
    })
  }
})

export { cmsActions, cmsReducer }
