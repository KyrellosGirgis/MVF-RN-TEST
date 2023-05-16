/* eslint-disable import/namespace */
import React from 'react'

import { create, act } from 'react-test-renderer'

import * as Timeline from '@vfgroup-oneplatform/foundation/Components/Timeline'

import * as BEWPermissions from 'App/Services/API/Requests/DataPrivacyPermissions/BEWPermissions'

import DataPrivacyStep from 'App/Screens/OnBoarding/Components/DataPrivacyStep/DataPrivacyStep'
import * as OnbordingComponentsHelper from 'App/Screens/OnBoarding/Components/Helper'
import * as AppNavigationHelpers from 'App/Containers/AppNavigation/AppNavigation.helpers'
import * as BEWPermissionsHelper from 'App/Services/API/Requests/DataPrivacyPermissions/DataPrivacyPermissions.helpers'
import { getHashedMintUserId } from 'App/Utils/Helpers/generic.helpers'
import { DATA_PRIVACY_PERMISSIONS } from 'App/Services/API/Requests/DataPrivacyPermissions/DataPrivacyPermissions.constants'

import { store } from 'App/Redux'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import { NetperformUserStatus } from 'App/Services/SDKsManagment/SDKs/NetPerform/Netperform.constants'
import * as NetperformSDKServices from 'App/Services/SDKsManagment/SDKs/NetPerform/Netperform.helper'

jest.mock('App/Utils/Helpers/generic.helpers', () => {
  const actualHelper = jest.requireActual('App/Utils/Helpers/generic.helpers')
  return {
    ...actualHelper,
    translate: (str) => str,
    getHashedMintUserId: jest.fn(() => '9876')
  }
})

const props = {
  onNextStep: jest.fn(),
  onSkipStep: jest.fn(),
  isActive: true,
  theme: { name: 'light' }
}

const bewPermissionsStatus = {
  shouldShowBEWDEV: true,
  shouldShowBEWADV: true,
  shouldShowNetperform: true,
  originalDEV: true,
  originalADV: true,
  advBEWVersion: '4',
  devBEWVersion: '4'
}

const initializeComponent = async (extraProps) => {
  let element
  const componentProps = extraProps || props
  await act(async () => {
    element = create(<DataPrivacyStep {...componentProps} />)
    jest.runAllTimers()
  })
  return element
}

describe('DataPrivacy step component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    Timeline.TimelineEvents.subscribe = jest.fn((callback) => {
      callback()
    })
    BEWPermissions.saveBEWPermissionsToBE = jest.fn()
    AppNavigationHelpers.hideBlurView = jest.fn()
    AppNavigationHelpers.showBlurView = jest.fn()
    OnbordingComponentsHelper.showErrorAlert = jest.fn()
    BEWPermissionsHelper.getPrivacyPermissionsStatusFromBE = jest.fn(
      () => bewPermissionsStatus
    )
  })

  test('should render DataPrivacy step header successfully', async () => {
    const element = await initializeComponent()

    const dataPrivacyStepComponent = element.root.findByProps({
      testID: 'OnboardingBEWStepWrapper_view'
    })
    const headerTitle = element.root.findByProps({
      testID: 'OnboardingBEWStepHeaderTitle_txt'
    }).props
    const headerContent = element.root.findByProps({
      testID: 'OnboardingBEWStepHeaderContent_txt'
    }).props

    expect(dataPrivacyStepComponent).toBeDefined()
    expect(headerTitle.i18nKey).toBe('onboarding_bew_permissions_step_subtitle')
    expect(headerContent.i18nKey).toBe(
      'onboarding_bew_permissions_step_description'
    )
  })

  test('should render bew section successfully when shouldShowBEWDEV & shouldShowBEWADV are true', async () => {
    const element = await initializeComponent()

    const bewSeparator = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionSeparator_view'
    })
    const bewHeaderWithIconWrapper = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionHeaderWithIconWrapper_view'
    })
    const bewHeaderIcon = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionHeaderWithIconIcon_img'
    })
    const bewHeaderIconText = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionHeaderWithIconTitle_txt'
    }).props

    const devHtmlWrapper = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionDEVWrapper_view'
    })
    const devHtmlTextWrapper = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionDEVHtmlText_view'
    })
    const devHtmlToggle = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionDEVSwitch_toggle'
    })
    const advHtmlWrapper = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionADVWrapper_view'
    })
    const advHtmlTextWrapper = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionADVHtmlText_view'
    })
    const advHtmlToggle = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionADVSwitch_toggle'
    })

    expect(bewSeparator).toBeDefined()
    expect(bewHeaderWithIconWrapper).toBeDefined()
    expect(bewHeaderIcon).toBeDefined()
    expect(bewHeaderIconText.i18nKey).toBe('onboarding_bew_adv_dev_step_title')
    expect(devHtmlWrapper).toBeDefined()
    expect(devHtmlTextWrapper).toBeDefined()
    expect(devHtmlToggle).toBeDefined()
    expect(advHtmlWrapper).toBeDefined()
    expect(advHtmlTextWrapper).toBeDefined()
    expect(advHtmlToggle).toBeDefined()
  })

  test('should render netperform section successfully', async () => {
    const element = await initializeComponent()

    const netperformSeparator = element.root.findByProps({
      testID: 'OnboardingBEWStepNetperformSectionSeparator_view'
    })
    const netperformHeaderWrapper = element.root.findByProps({
      testID: 'OnboardingBEWStepNetperformSectionHeaderWrapper_view'
    })
    const netperformHeaderWithIconWrapper = element.root.findByProps({
      testID: 'OnboardingBEWStepNetperformSectionHeaderWithIconWrapper_view'
    })
    const netperformHeaderIcon = element.root.findByProps({
      testID: 'OnboardingBEWStepNetperformSectionHeaderWithIconIcon_img'
    })
    const netperformHeaderIconText = element.root.findByProps({
      testID: 'OnboardingBEWStepNetperformSectionHeaderWithIconTitle_txt'
    }).props
    const netperformHeaderToggle = element.root.findByProps({
      testID: 'OnboardingBEWStepNetperformSectionHeaderSwitch_toggle'
    })
    const netperformHtmlTextWrapper = element.root.findByProps({
      testID: 'OnboardingBEWStepNetperformSectionHtmlText_view'
    })

    expect(netperformSeparator).toBeDefined()
    expect(netperformHeaderWrapper).toBeDefined()
    expect(netperformHeaderWithIconWrapper).toBeDefined()
    expect(netperformHeaderIcon).toBeDefined()
    expect(netperformHeaderIconText.i18nKey).toBe(
      'onboarding_bew_netperform_toggle_title'
    )
    expect(netperformHtmlTextWrapper).toBeDefined()
    expect(netperformHeaderToggle).toBeDefined()
  })

  test('should not render bew section when shouldShowBEWDEV and shouldShowBEWADV are false', async () => {
    BEWPermissionsHelper.getPrivacyPermissionsStatusFromBE = jest.fn(() => ({
      shouldShowBEWDEV: false,
      shouldShowBEWADV: false
    }))
    const element = await initializeComponent()

    expect(() =>
      element.root.findByProps({
        testID: 'OnboardingBEWStepBEWSectionSeparator_view'
      })
    ).toThrowError()

    expect(() =>
      element.root.findByProps({
        testID: 'OnboardingBEWStepBEWSectionHeaderWithIconWrapper_view'
      })
    ).toThrowError()

    expect(() =>
      element.root.findByProps({
        testID: 'OnboardingBEWStepBEWSectionDEVWrapper_view'
      })
    ).toThrowError()

    expect(() =>
      element.root.findByProps({
        testID: 'OnboardingBEWStepBEWSectionADVWrapper_view'
      })
    ).toThrowError()

    const consentButton = element.root.findByProps({
      testID: 'OnboardingBEWStepConsentTextBtn'
    })

    await consentButton.props.onPress()
  })

  test('should render bew section and not adv toggle when shouldShowBEWDEV is true and shouldShowBEWADV is false', async () => {
    BEWPermissionsHelper.getPrivacyPermissionsStatusFromBE = jest.fn(() => ({
      shouldShowBEWDEV: true,
      shouldShowBEWADV: false
    }))
    const element = await initializeComponent()

    const bewSeparator = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionSeparator_view'
    })
    const bewHeaderWithIconWrapper = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionHeaderWithIconWrapper_view'
    })
    const bewHeaderIcon = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionHeaderWithIconIcon_img'
    })
    const bewHeaderIconText = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionHeaderWithIconTitle_txt'
    }).props

    const devHtmlWrapper = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionDEVWrapper_view'
    })
    const devHtmlTextWrapper = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionDEVHtmlText_view'
    })
    const devHtmlToggle = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionDEVSwitch_toggle'
    })

    expect(bewSeparator).toBeDefined()
    expect(bewHeaderWithIconWrapper).toBeDefined()
    expect(bewHeaderIcon).toBeDefined()
    expect(bewHeaderIconText.i18nKey).toBe('onboarding_bew_adv_dev_step_title')
    expect(devHtmlWrapper).toBeDefined()
    expect(devHtmlTextWrapper).toBeDefined()
    expect(devHtmlToggle).toBeDefined()

    expect(() =>
      element.root.findByProps({
        testID: 'OnboardingBEWStepBEWSectionADVWrapper_view'
      })
    ).toThrowError()

    const consentButton = element.root.findByProps({
      testID: 'OnboardingBEWStepConsentTextBtn'
    })

    await consentButton.props.onPress()
  })

  test('should not render bew section and not dev toggle when shouldShowBEWDEV is false and shouldShowBEWADV is true', async () => {
    BEWPermissionsHelper.getPrivacyPermissionsStatusFromBE = jest.fn(() => ({
      shouldShowBEWDEV: false,
      shouldShowBEWADV: true
    }))
    const element = await initializeComponent()

    const bewSeparator = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionSeparator_view'
    })
    const bewHeaderWithIconWrapper = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionHeaderWithIconWrapper_view'
    })
    const bewHeaderIcon = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionHeaderWithIconIcon_img'
    })
    const bewHeaderIconText = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionHeaderWithIconTitle_txt'
    }).props
    const advHtmlWrapper = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionADVWrapper_view'
    })
    const advHtmlTextWrapper = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionADVHtmlText_view'
    })
    const advHtmlToggle = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionADVSwitch_toggle'
    })

    expect(bewSeparator).toBeDefined()
    expect(bewHeaderWithIconWrapper).toBeDefined()
    expect(bewHeaderIcon).toBeDefined()
    expect(bewHeaderIconText.i18nKey).toBe('onboarding_bew_adv_dev_step_title')
    expect(advHtmlWrapper).toBeDefined()
    expect(advHtmlTextWrapper).toBeDefined()
    expect(advHtmlToggle).toBeDefined()

    expect(() =>
      element.root.findByProps({
        testID: 'OnboardingBEWStepBEWSectionDEVWrapper_view'
      })
    ).toThrowError()
  })

  test('should render DataPrivacy step footer successfully', async () => {
    const element = await initializeComponent()

    const consentButton = element.root.findByProps({
      testID: 'OnboardingBEWStepConsentTextBtn'
    })
    const consentButtonText = element.root.findByProps({
      testID: 'OnboardingBEWStepConsentText'
    }).props
    const dataPrivacyButton = element.root.findByProps({
      testID: 'OnboardingBEWStepDataPrivacy_btn'
    })

    const dataPrivacyText = element.root.findByProps({
      testID: 'OnboardingBEWStepDataPrivacyButton_txt'
    })

    dataPrivacyButton.props.onPress()

    expect(consentButton).toBeDefined()
    expect(consentButtonText.title).toBe('onboarding_bew_consent_button')
    expect(dataPrivacyButton).toBeDefined()
    expect(dataPrivacyText).toBeDefined()
    expect(dataPrivacyText.props.i18nKey).toBe(
      'onboarding_bew_dataprivacy_pressable_text'
    )
  })

  test('should call showBlurView, hideBlurView, onNextStep and saveBEWPermissionsToBE on success when press on Consent button', async () => {
    const element = await initializeComponent()
    EncryptedStorage.updateObject = jest.fn()
    store.getState = () => ({
      appUserData: { loggedInUserId: 1234 }
    })

    const consentButton = element.root.findByProps({
      testID: 'OnboardingBEWStepConsentTextBtn'
    })
    expect(consentButton).toBeDefined()

    await consentButton.props.onPress()

    expect(AppNavigationHelpers.showBlurView).toHaveBeenCalledWith({
      showSpinner: true,
      opacity: 0.8
    })
    expect(BEWPermissions.saveBEWPermissionsToBE).toHaveBeenCalledTimes(1)
    expect(AppNavigationHelpers.hideBlurView).toHaveBeenCalledTimes(1)
    expect(EncryptedStorage.updateObject).toHaveBeenCalledWith('9876', {
      [NetperformUserStatus.status]: false
    })
    expect(props.onNextStep).toHaveBeenCalled()
  })

  test('should call showErrorAlert when saveBEWPermissionsToBE fails', async () => {
    BEWPermissions.saveBEWPermissionsToBE = jest.fn(() =>
      Promise.reject('error')
    )
    const element = await initializeComponent()
    const consentButton = element.root.findByProps({
      testID: 'OnboardingBEWStepConsentTextBtn'
    })
    await consentButton.props.onPress()

    expect(OnbordingComponentsHelper.showErrorAlert).toHaveBeenCalledWith(
      props.onNextStep
    )
  })

  test('should call saveBEWPermissionsToBE with the correct permissions when toggling DEV toggles', async () => {
    const element = await initializeComponent()
    const devHtmlToggle = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionDEVSwitch_toggle'
    })

    devHtmlToggle.props.onChange(true)

    const consentButton = element.root.findByProps({
      testID: 'OnboardingBEWStepConsentTextBtn'
    })

    await consentButton.props.onPress()

    const expectedBEWPermissionsStatus = {
      ...bewPermissionsStatus,
      [DATA_PRIVACY_PERMISSIONS.DEV]: true
    }
    expect(BEWPermissions.saveBEWPermissionsToBE).toHaveBeenCalledWith(
      expectedBEWPermissionsStatus
    )
  })

  test('should call saveBEWPermissionsToBE with the correct permissions when toggling ADV toggles', async () => {
    const element = await initializeComponent()

    const advHtmlToggle = element.root.findByProps({
      testID: 'OnboardingBEWStepBEWSectionADVSwitch_toggle'
    })

    advHtmlToggle.props.onChange(true)
    const consentButton = element.root.findByProps({
      testID: 'OnboardingBEWStepConsentTextBtn'
    })

    await consentButton.props.onPress()

    const expectedBEWPermissionsStatus = {
      ...bewPermissionsStatus,
      [DATA_PRIVACY_PERMISSIONS.ADV]: true
    }
    expect(BEWPermissions.saveBEWPermissionsToBE).toHaveBeenCalledWith(
      expectedBEWPermissionsStatus
    )
  })

  test('should call saveBEWPermissionsToBE after press on next button with the selected permissions', async () => {
    const newBEWPermissionsStatus = {
      ...bewPermissionsStatus,
      shouldShowNetperform: false
    }
    BEWPermissionsHelper.getPrivacyPermissionsStatusFromBE = jest.fn(
      () => newBEWPermissionsStatus
    )

    const element = await initializeComponent()
    const consentButton = element.root.findByProps({
      testID: 'OnboardingBEWStepConsentTextBtn'
    })

    await consentButton.props.onPress()

    expect(BEWPermissions.saveBEWPermissionsToBE).toHaveBeenCalledWith(
      newBEWPermissionsStatus
    )

    expect(props.onNextStep).toHaveBeenCalledTimes(1)
  })

  test('should dispatch setUserThirdPartyPermissions and set netperform value in encrypted storage with the correct value when toggling netperform toggle', async () => {
    store.dispatch = jest.fn()
    EncryptedStorage.updateObject = jest.fn()
    NetperformSDKServices.updateNetperformSDKStatus = jest.fn()

    const element = await initializeComponent()

    const netperformHeaderToggle = element.root.findByProps({
      testID: 'OnboardingBEWStepNetperformSectionHeaderSwitch_toggle'
    })

    netperformHeaderToggle.props.onChange(true)

    const consentButton = element.root.findByProps({
      testID: 'OnboardingBEWStepConsentTextBtn'
    })

    jest.clearAllMocks()
    await consentButton.props.onPress()

    expect(EncryptedStorage.updateObject).toHaveBeenCalledWith(
      getHashedMintUserId(),
      { [NetperformUserStatus.status]: true }
    )

    expect(
      NetperformSDKServices.updateNetperformSDKStatus
    ).toHaveBeenCalledWith({
      status: true
    })
  })

  test('should call onSkipStep when all permissions are not shown', async () => {
    BEWPermissionsHelper.getPrivacyPermissionsStatusFromBE = jest.fn(() => ({
      shouldShowBEWDEV: false,
      shouldShowBEWADV: false,
      shouldShowNetperform: false
    }))

    const element = await initializeComponent({ ...props, isActive: false })
    await act(async () => {
      element.update(<DataPrivacyStep {...props} />)
    })

    expect(props.onSkipStep).toHaveBeenCalledTimes(1)
  })
})
