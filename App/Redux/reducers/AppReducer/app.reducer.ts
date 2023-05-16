import { createSlice } from '@reduxjs/toolkit'

const { actions: appActions, reducer: appReducer } = createSlice({
  name: 'app',
  initialState: {
    deeplinkUrl: undefined,
    isLoggedIn: false
  },
  reducers: {
    setDeeplinkUrl: (state, { payload }) => ({
      ...state,
      deeplinkUrl: payload
    }),
    setIsLoggedIn: (state, { payload }) => ({
      ...state,
      isLoggedIn: payload
    })
  }
})

export { appActions, appReducer }
