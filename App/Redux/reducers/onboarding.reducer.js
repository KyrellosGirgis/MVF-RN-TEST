import { createSlice } from '@reduxjs/toolkit'

const { actions: onboardingActions, reducer: onboardingReducer } = createSlice({
  name: 'onboarding',
  initialState: {
    checkedSteps: [],
    isOnboardingStarted: false
  },
  reducers: {
    setCheckedSteps: (state, { payload }) => ({
      ...state,
      checkedSteps: payload
    }),
    setIsOnboardingStarted: (state, { payload }) => ({
      ...state,
      isOnboardingStarted: payload
    }),
    resetOnboarding: () => ({
      checkedSteps: [],
      isOnboardingStarted: false
    })
  }
})

export { onboardingActions, onboardingReducer }
