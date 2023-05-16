import { createSlice } from '@reduxjs/toolkit'

const { actions: developerSettingsActions, reducer: developerSettingsReducer } =
  createSlice({
    name: 'developerSettings',
    initialState: {
      mockingConfigs: {
        testCaseName: '',
        mockFileName: 'Mock_testCases.json' //set default value for mock file name as per testing requirments
      },
      APIsRequestsLogs: {
        requests: []
      }
    },
    reducers: {
      setTestCaseName: (state, { payload }) => ({
        ...state,
        mockingConfigs: {
          ...state.mockingConfigs,
          testCaseName: payload
        }
      }),
      setMockFileName: (state, { payload }) => ({
        ...state,
        mockingConfigs: {
          ...state.mockingConfigs,
          mockFileName: payload
        }
      }),
      appendAPIsRequestsLogs: (state, { payload }) => ({
        ...state,
        APIsRequestsLogs: {
          requests: [...state.APIsRequestsLogs.requests, payload]
        }
      }),
      clearAPIsRequestsLogs: (state) => ({
        ...state,
        APIsRequestsLogs: {
          requests: []
        }
      })
    }
  })

export { developerSettingsActions, developerSettingsReducer }
