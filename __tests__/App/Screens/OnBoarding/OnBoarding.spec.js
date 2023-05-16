/* eslint-disable import/namespace */
import React from 'react'
import OnBoardingScreen from '@vfgroup-oneplatform/onboarding'
import { create, act } from 'react-test-renderer'
import { useSelector, useDispatch } from 'react-redux'

import { ShimmerWrapper } from '@vfgroup-oneplatform/foundation/Components/Shimmer'

import * as OnboardingHelper from 'App/Screens/OnBoarding/OnBoarding.helper'

import * as NavigationFunctions from 'App/Containers'
import * as splashAnimationHandlerHelpers from 'App/Services/SplashAnimationHandler/SplashAnimationHandler.helpers'

import OnBoarding from 'App/Screens/OnBoarding/OnBoarding'
import { onBoardingStepsTypes } from 'App/Screens/OnBoarding/Configurations/OnBoardingSteps'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'
import * as ThirdPartyPermissionsHelper from 'App/Services/API/Requests/ThirdPartyPermissions/ThirdPartyPermissions.helper'
import { ErrorType } from 'App/Screens/OnBoarding/OnBoardingErrorTypes'

jest.mock('App/Hooks/useApiCall', () => {
  return () => ({
    isLoading: false,
    isError: false,
    responseData: {}
  })
})

const splashProps = {
  startSplashEndingAnimation: jest.fn(),
  setSplashMode: jest.fn(),
  setSplashLogoPosition: jest.fn(),
  dismissSplash: jest.fn(),
  setSplashColor: jest.fn(),
  endingDuration: 2000
}

const state = {
  onboarding: {
    checkedSteps: [],
    isOnboardingStarted: true
  },
  appUserData: { appUserDataLoadingStatus: 'fufilled' },
  thirdPartyPermissions: { hashedIds: {} }
}

describe('Onboarding screen', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {
    ThirdPartyPermissionsHelper.shouldShowThirdPartyStep = jest.fn(() => true)
    splashAnimationHandlerHelpers.handleSplashEndAnimation = jest.fn()
    useDispatch.mockReturnValue(jest.fn())
  })

  beforeEach(() => {
    OnboardingHelper.checkIfBiometricsExecluded = jest.fn(() => false)
    useSelector.mockImplementation((callBack) => {
      return callBack(state)
    })
  })

  test('should render Onboarding screen successfully with biometrics section', () => {
    NavigationFunctions.NavigationFunctions.replace = jest.fn()
    splashAnimationHandlerHelpers.setCurrentLogoPosition = (
      logoref,
      setSplash,
      onPositionChange
    ) => {
      onPositionChange()
    }

    useSelector.mockImplementation((callBack) => {
      return callBack({
        ...state,
        onboarding: {
          checkedSteps: [{ id: 0 }, { id: 1 }],
          isOnboardingStarted: true
        }
      })
    })

    const element = create(<OnBoarding splashProps={splashProps} />)
    const onboardingProps =
      element.root.findAllByType(OnBoardingScreen)[0].props
    const onboardingSteps = onboardingProps.steps

    expect(onboardingSteps[0].type).toBe(
      onBoardingStepsTypes.ThirdPartyPermissionsStep
    )
    expect(onboardingSteps[1].type).toBe(onBoardingStepsTypes.DataPrivacyStep)
    expect(onboardingSteps[2].type).toBe(onBoardingStepsTypes.BiometricsStep)
    expect(onboardingSteps[3].type).toBe(onBoardingStepsTypes.PermissionsStep)

    onboardingProps.onStartPress()
    expect(useDispatch).toHaveBeenCalled()
  })

  test('should call onStepUpdate when step updates', () => {
    NavigationFunctions.NavigationFunctions.replace = jest.fn()

    const element = create(<OnBoarding splashProps={splashProps} />)
    const onboardingProps =
      element.root.findAllByType(OnBoardingScreen)[0].props
    onboardingProps.onStepUpdate({}, 1, 'NEW')
    expect(useDispatch).toHaveBeenCalled()
  })

  test('should  render Onboarding screen successfully when no checked steps', () => {
    NavigationFunctions.NavigationFunctions.replace = jest.fn()
    useSelector.mockImplementation((callBack) => {
      return callBack({
        ...state,
        onboarding: {
          checkedSteps: [],
          isOnboardingStarted: false
        }
      })
    })

    const element = create(<OnBoarding splashProps={splashProps} />)
    const onboardingProps =
      element.root.findAllByType(OnBoardingScreen)[0].props
    const onboardingSteps = onboardingProps.steps

    expect(onboardingSteps[0].type).toBe(
      onBoardingStepsTypes.ThirdPartyPermissionsStep
    )
    expect(onboardingSteps[1].type).toBe(onBoardingStepsTypes.DataPrivacyStep)
    expect(onboardingSteps[2].type).toBe(onBoardingStepsTypes.BiometricsStep)
    expect(onboardingSteps[3].type).toBe(onBoardingStepsTypes.PermissionsStep)
  })

  test('should call onFinishPress when press on onFinish and replace current screen', async () => {
    NavigationFunctions.NavigationFunctions.replace = jest.fn()

    useSelector.mockImplementation((callBack) => {
      return callBack({
        ...state,
        onboarding: {
          checkedSteps: [{ id: 0 }, { id: 1 }, { id: 2 }],
          isOnboardingStarted: true
        }
      })
    })
    const element = create(<OnBoarding splashProps={splashProps} />)
    const onboardingProps =
      element.root.findAllByType(OnBoardingScreen)[0].props
    jest.clearAllMocks()
    onboardingProps.onFinishPress()
    expect(NavigationFunctions.NavigationFunctions.replace).toHaveBeenCalled()
  })

  test('should render Onboarding screen successfully without biometrics section', async () => {
    OnboardingHelper.checkIfBiometricsExecluded = jest.fn(() => true)

    let element
    await act(async () => {
      element = create(<OnBoarding splashProps={splashProps} />)
    })

    const onboardingSteps =
      element.root.findAllByType(OnBoardingScreen)[0].props.steps

    const expectedOnboardingStepsTypes = onboardingSteps.map(
      (step) => step.type
    )

    expect(expectedOnboardingStepsTypes).not.toContain(
      onBoardingStepsTypes.BiometricsStep
    )
  })

  test('should Onboarding screen has expected steps when shouldShowThirdPartyStep succeed with true', async () => {
    ThirdPartyPermissionsHelper.shouldShowThirdPartyStep = jest.fn(() => true)

    let element
    await act(async () => {
      element = create(<OnBoarding splashProps={splashProps} />)
    })

    const onboardingSteps =
      element.root.findAllByType(OnBoardingScreen)[0].props.steps

    const expectedOnboardingStepsTypes = onboardingSteps.map(
      (step) => step.type
    )

    expect(expectedOnboardingStepsTypes).toContain(
      onBoardingStepsTypes.ThirdPartyPermissionsStep
    )
  })

  test('should Onboarding screen has expected steps when shouldShowThirdPartyStep succeed with false', async () => {
    ThirdPartyPermissionsHelper.shouldShowThirdPartyStep = jest.fn(() => false)

    let element
    await act(async () => {
      element = create(<OnBoarding splashProps={splashProps} />)
    })

    const onboardingSteps =
      element.root.findAllByType(OnBoardingScreen)[0].props.steps

    const expectedOnboardingStepsTypes = onboardingSteps.map(
      (step) => step.type
    )

    expect(expectedOnboardingStepsTypes).not.toContain(
      onBoardingStepsTypes.ThirdPartyPermissionsStep
    )
  })

  test('should shimmer when appUserDataLoadingStatus is pending', async () => {
    useSelector.mockImplementation((callBack) => {
      return callBack({
        ...state,
        appUserData: { appUserDataLoadingStatus: 'pending' }
      })
    })
    let element
    await act(async () => {
      element = create(<OnBoarding splashProps={splashProps} />)
    })
    const shimmerCard = element.root.findAllByType(ShimmerWrapper)[0]
    expect(shimmerCard).toBeDefined()
    expect(shimmerCard.props.isLoading).toBeTruthy()
  })

  test('should set isOnboardingFinished value in EncryptedStorage when call onStepsCompleted', async () => {
    EncryptedStorage.setItem = jest.fn()
    useSelector.mockImplementation((callBack) => {
      return callBack({
        ...state,
        onboarding: {
          checkedSteps: [{ id: 0 }, { id: 1 }, { id: 2 }],
          isOnboardingStarted: true
        }
      })
    })

    const element = create(<OnBoarding splashProps={splashProps} />)
    const onboardingProps =
      element.root.findAllByType(OnBoardingScreen)[0].props
    onboardingProps.onStepsCompleted()

    expect(EncryptedStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.isOnboardingFinished,
      'true'
    )
  })

  test('should render Onboarding screen Error successfully when shouldShowThirdPartyStep throws error with inline type', async () => {
    ThirdPartyPermissionsHelper.shouldShowThirdPartyStep = jest.fn(() => {
      throw {
        type: ErrorType.inline,
        content: { body: 'any body' }
      }
    })

    let element
    await act(async () => {
      element = create(<OnBoarding splashProps={splashProps} />)
    })

    expect(
      element.root.findByProps({
        testID: 'OnboardingErrorScreenErrorWrapper'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'OnboardingErrorScreen_txt'
      }).props.i18nKey
    ).toBe('any body')
  })

  test('should call initOnboardingconfigs when pressing on try again button of the Onboarding screen Error', async () => {
    ThirdPartyPermissionsHelper.shouldShowThirdPartyStep = jest.fn(() => {
      throw {
        type: ErrorType.inline,
        content: { body: 'any body' }
      }
    })

    let element
    await act(async () => {
      element = create(<OnBoarding splashProps={splashProps} />)
    })

    const tryAgainButtonProps = element.root.findByProps({
      testID: 'OnboardingErrorScreenTryAgain_btn'
    }).props
    tryAgainButtonProps.onPress()
    expect(
      ThirdPartyPermissionsHelper.shouldShowThirdPartyStep
    ).toHaveBeenCalled()
  })
})
