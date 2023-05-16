import { DynamicStep } from '@vfgroup-oneplatform/onboarding/OnBoarding.d'

import { testID } from 'App/Utils/Helpers/testId.helpers'

const onBoardingStepsTypes = {
  ThirdPartyPermissionsStep: 'ThirdPartyPermissionsStep',
  DataPrivacyStep: 'DataPrivacyStep',
  BiometricsStep: 'BiometricsStep',
  PermissionsStep: 'PermissionsStep'
}

const onboardingSteps: DynamicStep[] = [
  {
    type: onBoardingStepsTypes.ThirdPartyPermissionsStep,
    title: 'onboarding_3rd_party_permissions_step_title',
    extraData: { id: testID('OnboardingThirdPartyPermissionsStepTitle_txt') }
  },
  {
    type: onBoardingStepsTypes.DataPrivacyStep,
    title: 'onboarding_bew_permissions_step_title',
    extraData: {
      id: testID('OnboardingBEWStepTitle_txt')
    }
  },
  {
    type: onBoardingStepsTypes.BiometricsStep,
    title: 'Biometrics for easy access',
    extraData: { id: testID('OnboardingBiometricsStepTitle_txt') }
  },
  {
    type: onBoardingStepsTypes.PermissionsStep,
    extraData: {
      description: 'permissions_header_title',
      actionTitle1: 'permissions_button_title',
      id: testID('OnboardingPermissionsStepTitle_txt'),
      desId: 'OBpermissionsStepDesc',
      image: 'OBpermissionsStepImage'
    },
    title: 'permissions_step_title'
  }
]

export { onboardingSteps, onBoardingStepsTypes }
