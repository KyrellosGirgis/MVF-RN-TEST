/* eslint-disable import/namespace */
import React from 'react'

import { create } from 'react-test-renderer'

import * as Timeline from '@vfgroup-oneplatform/foundation/Components/Timeline'

import { store } from 'App/Redux'

import ThirdPartyPermissionsStep from 'App/Screens/OnBoarding/Components/ThirdPartyPermissionsStep/ThirdPartyPermissionsStep'
import * as AppNavigationHelpers from 'App/Containers/AppNavigation/AppNavigation.helpers'
import * as Info from 'App/Services/API/Requests/ThirdPartyPermissions/info/info'
import * as OnbordingComponnentsHelper from 'App/Screens/OnBoarding/Components/Helper'

const props = {
  onNextStep: jest.fn(),
  isActive: true,
  theme: { name: 'light' }
}

describe('ThirdPartyPermissions step component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {
    store.dispatch = jest.fn()
  })

  beforeEach(() => {
    Timeline.TimelineEvents.subscribe = jest.fn((callback) => {
      callback()
    })
    Info.saveInfoToBE = jest.fn()
    AppNavigationHelpers.hideBlurView = jest.fn()
    AppNavigationHelpers.showBlurView = jest.fn()
    OnbordingComponnentsHelper.showErrorAlert = jest.fn()
  })

  test('should render ThirdPartyPermissions step component successfully when collapsed', () => {
    const element = create(<ThirdPartyPermissionsStep {...props} />)
    const thirdPartyPermissionsStepComponent = element.root.findByProps({
      testID: 'OnboardingThirdPartyPermissionsStepContainer_view'
    })
    const thirdPartyPermissionsStepContinueButton = element.root.findByProps({
      testID: 'OnboardingThirdPartyPermissionsStepContinue_txtBtn'
    })
    const thirdPartyPermissionsStepContinueButtonTextTitle =
      element.root.findByProps({
        testID: 'OnboardingThirdPartyPermissionsStepContinue_txt'
      }).props.title
    const thirdPartyPermissionsStepExpandButton = element.root.findByProps({
      testID: 'OnboardingThirdPartyPermissionsStepExpandCollapse_btn'
    })
    const thirdPartyPermissionsStepPermissionsSection =
      element.root.findByProps({
        testID: 'OnboardingThirdPartyPermissionsStepPermissionsSection_view'
      })

    expect(thirdPartyPermissionsStepComponent).toBeDefined()
    expect(thirdPartyPermissionsStepContinueButton).toBeDefined()
    expect(thirdPartyPermissionsStepContinueButtonTextTitle).toBe(
      'onboarding_3rd_party_permissions_accept_continue'
    )
    expect(thirdPartyPermissionsStepExpandButton).toBeDefined()
    expect(thirdPartyPermissionsStepPermissionsSection).toBeDefined()
    expect(
      thirdPartyPermissionsStepExpandButton.children[0].props.i18nKey
    ).toBe('onboarding_3rd_party_permissions_expand_settings')
  })

  test('should render ThirdPartyPermissions step component successfully when expanded', () => {
    const element = create(<ThirdPartyPermissionsStep {...props} />)
    const thirdPartyPermissionsStepComponent = element.root.findByProps({
      testID: 'OnboardingThirdPartyPermissionsStepContainer_view'
    })
    const thirdPartyPermissionsStepExpandButton = element.root.findByProps({
      testID: 'OnboardingThirdPartyPermissionsStepExpandCollapse_btn'
    })
    thirdPartyPermissionsStepExpandButton.props.onPress()

    const thirdPartyPermissionsStepContinueButton = element.root.findByProps({
      testID: 'OnboardingThirdPartyPermissionsStepContinue_txtBtn'
    })
    const thirdPartyPermissionsStepContinueButtonTextTitle =
      element.root.findByProps({
        testID: 'OnboardingThirdPartyPermissionsStepContinue_txt'
      }).props.title
    const thirdPartyPermissionsStepCollapseButton = element.root.findByProps({
      testID: 'OnboardingThirdPartyPermissionsStepExpandCollapse_btn'
    })
    const thirdPartyPermissionsStepPermissionsSection =
      element.root.findByProps({
        testID: 'OnboardingThirdPartyPermissionsStepPermissionsSection_view'
      })

    expect(thirdPartyPermissionsStepComponent).toBeDefined()
    expect(thirdPartyPermissionsStepContinueButton).toBeDefined()
    expect(thirdPartyPermissionsStepContinueButtonTextTitle).toBe(
      'onboarding_3rd_party_permissions_confirm_continue'
    )
    expect(thirdPartyPermissionsStepExpandButton).toBeDefined()
    expect(thirdPartyPermissionsStepPermissionsSection).toBeDefined()
    expect(
      thirdPartyPermissionsStepCollapseButton.children[0].props.i18nKey
    ).toBe('onboarding_3rd_party_permissions_collapse_settings')

    thirdPartyPermissionsStepCollapseButton.props.onPress()
  })

  test('should call showBlurView and hideBlurView when pressing on confirm button', async () => {
    const element = create(<ThirdPartyPermissionsStep {...props} />)

    const thirdPartyPermissionsStepContinueButton = element.root.findByProps({
      testID: 'OnboardingThirdPartyPermissionsStepContinue_txtBtn'
    })

    await thirdPartyPermissionsStepContinueButton.props.onPress()

    expect(AppNavigationHelpers.showBlurView).toHaveBeenCalledWith({
      showSpinner: true,
      opacity: 0.8
    })

    expect(AppNavigationHelpers.hideBlurView).toHaveBeenCalledTimes(1)
  })

  test('should call saveInfoToBE with correct permissions when collapsed', async () => {
    const element = create(<ThirdPartyPermissionsStep {...props} />)

    const thirdPartyPermissionsStepContinueButton = element.root.findByProps({
      testID: 'OnboardingThirdPartyPermissionsStepContinue_txtBtn'
    })

    await thirdPartyPermissionsStepContinueButton.props.onPress()

    expect(Info.saveInfoToBE).toHaveBeenCalledWith({
      'LI-NBA': true,
      'LI-OM': true,
      'LI-OPT': true
    })

    expect(props.onNextStep).toHaveBeenCalledTimes(1)
  })

  test('should call saveInfoToBE with correct permissions when expanded', async () => {
    const element = create(<ThirdPartyPermissionsStep {...props} />)
    const thirdPartyPermissionsStepExpandButton = element.root.findByProps({
      testID: 'OnboardingThirdPartyPermissionsStepExpandCollapse_btn'
    })
    thirdPartyPermissionsStepExpandButton.props.onPress()
    const thirdPartyPermissionsStepContinueButton = element.root.findByProps({
      testID: 'OnboardingThirdPartyPermissionsStepContinue_txtBtn'
    })

    await thirdPartyPermissionsStepContinueButton.props.onPress()

    expect(Info.saveInfoToBE).toHaveBeenCalledWith({
      'LI-NBA': false,
      'LI-OM': false,
      'LI-OPT': false
    })

    expect(props.onNextStep).toHaveBeenCalledTimes(1)
  })

  test('should call showErrorAlert when saveInfoToBE fails', async () => {
    Info.saveInfoToBE = jest.fn(() => Promise.reject('error'))

    const element = create(<ThirdPartyPermissionsStep {...props} />)

    const thirdPartyPermissionsStepContinueButton = element.root.findByProps({
      testID: 'OnboardingThirdPartyPermissionsStepContinue_txtBtn'
    })
    await thirdPartyPermissionsStepContinueButton.props.onPress()

    expect(OnbordingComponnentsHelper.showErrorAlert).toHaveBeenCalledWith(
      props.onNextStep
    )
  })

  test('should toggle the correct permission', async () => {
    const element = create(<ThirdPartyPermissionsStep {...props} />)

    const thirdPartyPermissionsStepExpandButton = element.root.findByProps({
      testID: 'OnboardingThirdPartyPermissionsStepExpandCollapse_btn'
    })
    thirdPartyPermissionsStepExpandButton.props.onPress()

    const thirdPartyPermissionsStepPermissionItemToggle =
      element.root.findAllByProps({
        testID:
          'OnboardingThirdPartyPermissionsStepPermissionItemTitle_li_opt_toggle'
      })
    thirdPartyPermissionsStepPermissionItemToggle[0].props.onChange(true)

    const thirdPartyPermissionsStepContinueButton = element.root.findByProps({
      testID: 'OnboardingThirdPartyPermissionsStepContinue_txtBtn'
    })
    await thirdPartyPermissionsStepContinueButton.props.onPress()

    expect(Info.saveInfoToBE).toHaveBeenCalledWith({
      'LI-NBA': false,
      'LI-OM': false,
      'LI-OPT': true
    })
  })
})
