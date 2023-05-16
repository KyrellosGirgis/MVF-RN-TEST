import { DynamicStep } from '@vfgroup-oneplatform/onboarding/OnBoarding.d'

import StepStatuses from '@vfgroup-oneplatform/foundation/Components/Timeline/Utils/StepStatuses'
import { StepStatuses as StepStatusesType } from '@vfgroup-oneplatform/foundation/Components/Timeline/Timeline.d'

import { BIOMETRICS_STATUS } from 'App/Services/AppBiometrics/AppBiometrics.constants'
import { isBiometricsAvailableAndEnabled } from 'App/Services/AppBiometrics/AppBiometrics.helpers'

const removeExcludedOnboardingSteps = ({
  onboardingSteps,
  excludedTypes
}: {
  onboardingSteps: DynamicStep[]
  excludedTypes: string[]
}) => onboardingSteps.filter((step) => !excludedTypes.includes(step.type))

const checkIfBiometricsExecluded = async () => {
  const { status } = await isBiometricsAvailableAndEnabled()
  return status === BIOMETRICS_STATUS.NOT_SUPPORTED
}

const updateOnboardingStepsStatus = (
  steps: DynamicStep[],
  checkedSteps: { id: number; status: StepStatusesType }[]
) => {
  const updatedSteps = steps.map((step, index) => {
    const checkedStep = checkedSteps.find((e) => e.id === index)
    step.status = checkedStep ? checkedStep.status : StepStatuses.NEW
    return step
  })

  return updatedSteps
}

export {
  removeExcludedOnboardingSteps,
  checkIfBiometricsExecluded,
  updateOnboardingStepsStatus
}
