import { onboardingActions } from 'App/Redux/reducers/onboarding.reducer'
import { store } from 'App/Redux'

describe('unit testing for onboarding reducer', () => {
  test('should set CheckedSteps', () => {
    const expectedCheckedSteps = ['DataPrivacyStep', 'BiometricsStep']
    store.dispatch(onboardingActions.setCheckedSteps(expectedCheckedSteps))
    const { checkedSteps } = store.getState().onboarding
    expect(checkedSteps).toEqual(expectedCheckedSteps)
  })

  test('should set IsOnboardingStarted', () => {
    store.dispatch(onboardingActions.setIsOnboardingStarted(true))
    const { isOnboardingStarted } = store.getState().onboarding
    expect(isOnboardingStarted).toEqual(true)
  })

  test('should reset Onboarding', () => {
    store.dispatch(onboardingActions.resetOnboarding())
    const { checkedSteps, isOnboardingStarted } = store.getState().onboarding
    expect(checkedSteps).toEqual([])
    expect(isOnboardingStarted).toEqual(false)
  })
})
