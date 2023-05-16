import { createSlice } from '@reduxjs/toolkit'

const { actions: webViewOpenedActions, reducer: webViewOpenedReducer } =
  createSlice({
    name: 'webViewOpened',
    initialState: {
      isWebViewOpened: false,
      initialURL: ''
    },
    reducers: {
      setIsWebViewOpened: (state, { payload }) => ({
        ...state,
        isWebViewOpened: payload
      }),
      setInitialURL: (state, { payload }) => ({
        ...state,
        initialURL: payload
      })
    }
  })

export { webViewOpenedActions, webViewOpenedReducer }
