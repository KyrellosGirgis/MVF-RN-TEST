/* eslint-disable import/namespace */
import React from 'react'

import { create } from 'react-test-renderer'

import { VFButton } from '@vfgroup-oneplatform/foundation/Components'

import * as Timeline from '@vfgroup-oneplatform/foundation/Components/Timeline'

import BiometricsStep from 'App/Screens/OnBoarding/Components/BiometricsStep/BiometricsStep'
import * as BiometricsHelper from 'App/Services/AppBiometrics/AppBiometrics.helpers'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

const props = { onNextStep: jest.fn(), onSkipStep: jest.fn(), isActive: true }

describe('Biometrics step component', () => {
  test('should render Biometrics step componnent successfully', () => {
    Timeline.TimelineEvents.subscribe = jest.fn((callback) => {
      callback()
    })
    const element = create(<BiometricsStep {...props} />)
    const biometricsStepComponent = element.root.findByProps({
      testID: 'Biometrics_Step_Component_Wrapper'
    })
    const description = element.root.findByProps({
      testID: 'Biometrics_Step_Text'
    }).props
    const buttons = element.root.findAllByType(VFButton)
    const continueButton = buttons[0].props
    const notNowButton = buttons[1].props

    expect(biometricsStepComponent).toBeTruthy()
    expect(description.i18nKey).toBe('biometrics_step_description')
    expect(continueButton.title).toBe('captcha_continue_button')
    expect(notNowButton.title).toBe('notNow')
  })

  test('should set biometrics on and call nextStep when press on continue button with biometrics available', async () => {
    BiometricsHelper.isBiometricsAvailableAndEnabled = jest.fn(() => ({
      status: 'AVAILABLE'
    }))

    const element = create(<BiometricsStep {...props} />)
    const continueButton = element.root.findAllByType(VFButton)[0].props
    await continueButton.onPress()
    expect(EncryptedStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.isBiometricsOn,
      'true'
    )
    expect(props.onNextStep).toHaveBeenCalled()
  })

  test('should showBiometricsWarning when press on continue button with biometrics unavailable', async () => {
    BiometricsHelper.isBiometricsAvailableAndEnabled = jest.fn(() => ({
      status: 'NOT_AVAILABLE'
    }))
    BiometricsHelper.showBiometricsWarning = jest.fn()

    const element = create(<BiometricsStep {...props} />)
    const continueButton = element.root.findAllByType(VFButton)[0].props
    await continueButton.onPress()
    expect(BiometricsHelper.showBiometricsWarning).toHaveBeenCalled()
  })

  test('should call skipStep when press on not now button', async () => {
    const element = create(<BiometricsStep {...props} />)
    const notNowButton = element.root.findAllByType(VFButton)[1].props
    await notNowButton.onPress()
    expect(props.onSkipStep).toHaveBeenCalled()
  })
})
