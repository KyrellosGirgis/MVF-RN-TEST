/* eslint-disable import/namespace */

import React from 'react'

import { act, create } from 'react-test-renderer'
import PreOnboardingTutorial from '@vfgroup-oneplatform/framework/PreOnboardingTutorial'

import PreOnBoarding from 'App/Screens/PreOnBoarding/PreOnBoarding'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import * as OIDC from 'App/Services/API/Requests/OIDC/OIDC'
import * as NavigationFunctions from 'App/Containers'
import Routes from 'App/Containers/AppNavigation/Routes'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useRef: jest.fn(() => ({
    current: {
      play: jest.fn(() => '')
    }
  }))
}))

const splashProps = {
  startSplashEndingAnimation: jest.fn(),
  setSplashMode: jest.fn(),
  setSplashLogoPosition: jest.fn(),
  dismissSplash: jest.fn(),
  setSplashColor: jest.fn(),
  endingDuration: 2000
}

const createComponent = async () => {
  let component
  await act(async () => {
    component = create(<PreOnBoarding splashProps={splashProps} />)
  })
  const onboardingProps = component.root.findByType(PreOnboardingTutorial).props

  return {
    component,
    onboardingProps
  }
}

describe('PreOnboardingTutorialScreen', () => {
  beforeAll(async () => {
    NavigationFunctions.NavigationFunctions.navigateWithResetAction = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should call primaryButtonPress correctly', async () => {
    OIDC.loadOIDCToken = jest.fn(() => new Promise((resolve) => resolve('yes')))
    EncryptedStorage.setItem = jest.fn()

    const { component, onboardingProps } = await createComponent()
    await onboardingProps.onPrimaryButtonPress()
    expect(component).toBeTruthy()
    expect(EncryptedStorage.setItem).toHaveBeenCalled()
    expect(
      NavigationFunctions.NavigationFunctions.navigateWithResetAction
    ).toHaveBeenCalledWith(Routes.LoginPlaceholder, {
      enableSeamless: true,
      disableEndAnimationAndShowSpinnerForSeamless: true,
      enableSplashAnimation: false
    })
  })

  test('should call onSecondaryButtonPress correctly', async () => {
    OIDC.loadOIDCToken = jest.fn(() => new Promise((resolve) => resolve('yes')))
    EncryptedStorage.setItem = jest.fn()
    const { onboardingProps } = await createComponent()
    onboardingProps.onSecondaryButtonPress()
    expect(EncryptedStorage.setItem).toHaveBeenCalled()
  })

  test('should not call navigateWithResetAction multiple times when pressing multiple times on primaryButton ', async () => {
    OIDC.loadOIDCToken = jest.fn(() => new Promise((resolve) => resolve('yes')))
    EncryptedStorage.setItem = jest.fn()

    const { component, onboardingProps } = await createComponent()
    await onboardingProps.onPrimaryButtonPress()

    const primaryButton = component.root.findByType(PreOnboardingTutorial).props

    await primaryButton.onPrimaryButtonPress()

    expect(
      NavigationFunctions.NavigationFunctions.navigateWithResetAction
    ).toHaveBeenCalledTimes(1)
  })
})
