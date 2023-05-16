/* eslint-disable import/namespace */
import {
  removeExcludedOnboardingSteps,
  checkIfBiometricsExecluded,
  updateOnboardingStepsStatus
} from 'App/Screens/OnBoarding/OnBoarding.helper'

import * as biometricsPermissions from 'App/Services/AppBiometrics/AppBiometrics.helpers'
import { BIOMETRICS_STATUS } from 'App/Services/AppBiometrics/AppBiometrics.constants'

import {
  onboardingSteps as OnBoardingStepsJSON,
  onBoardingStepsTypes
} from 'App/Screens/OnBoarding/Configurations/OnBoardingSteps'

describe('Onboarding helper test', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should removeExcludedOnboardingSteps execlude types passed', () => {
    const allSteps = removeExcludedOnboardingSteps({
      onboardingSteps: OnBoardingStepsJSON,
      excludedTypes: []
    })
    expect(allSteps).toEqual(OnBoardingStepsJSON)

    const stepsWithoutBiometrics = removeExcludedOnboardingSteps({
      onboardingSteps: OnBoardingStepsJSON,
      excludedTypes: [onBoardingStepsTypes.BiometricsStep]
    }).map((step) => step.type)
    expect(stepsWithoutBiometrics).not.toContain(
      onBoardingStepsTypes.BiometricsStep
    )
    expect(stepsWithoutBiometrics).toContain(
      onBoardingStepsTypes.ThirdPartyPermissionsStep
    )

    const stepsWithoutBiometricsAndThirdPartyPermissions =
      removeExcludedOnboardingSteps({
        onboardingSteps: OnBoardingStepsJSON,
        excludedTypes: [
          onBoardingStepsTypes.BiometricsStep,
          onBoardingStepsTypes.ThirdPartyPermissionsStep
        ]
      }).map((step) => step.type)
    expect(stepsWithoutBiometricsAndThirdPartyPermissions).not.toContain(
      onBoardingStepsTypes.BiometricsStep
    )
    expect(stepsWithoutBiometricsAndThirdPartyPermissions).not.toContain(
      onBoardingStepsTypes.ThirdPartyPermissionsStep
    )
  })

  test('should checkIfBiometricsExcluded return true if biometrics is not supported', async () => {
    biometricsPermissions.isBiometricsAvailableAndEnabled = jest.fn(() => ({
      status: BIOMETRICS_STATUS.NOT_SUPPORTED
    }))

    const isBiometricsExcluded = await checkIfBiometricsExecluded()

    expect(isBiometricsExcluded).toBeTruthy()
  })

  test('should checkIfBiometricsExcluded return false if biometrics satus is anything other than not supported', async () => {
    biometricsPermissions.isBiometricsAvailableAndEnabled = jest.fn(() => ({
      status: BIOMETRICS_STATUS.AUTHENTICATED
    }))

    const isBiometricsExcluded = await checkIfBiometricsExecluded()

    expect(isBiometricsExcluded).toBeFalsy()
  })

  test('should updateOnboardingStepsStatus returns expected result', () => {
    const status = 'COMPLETED'
    const id = 1
    const result = updateOnboardingStepsStatus(OnBoardingStepsJSON, [
      { id, status }
    ])
    const expectedResult = OnBoardingStepsJSON.map((step, index) => ({
      ...step,
      status: index === id ? status : step.status
    }))

    expect(result).toEqual(expectedResult)
  })
})
