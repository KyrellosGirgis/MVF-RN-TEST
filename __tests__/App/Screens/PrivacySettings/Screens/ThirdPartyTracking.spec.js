/* eslint-disable import/namespace */
import React from 'react'
import { ThirdPartyTracking as ThirdPartyTrackingComponent } from '@vfgroup-oneplatform/framework/PrivacySettings'
import { create, act } from 'react-test-renderer'

import * as modalHelpers from 'App/Containers/AppModal/AppModal.helpers'

import * as NavigationFunctions from 'App/Containers'

import ThirdPartyTracking from 'App/Screens/PrivacySettings/Screens/ThirdPartyTracking/ThirdPartyTracking'
import * as PrivacySettingsHelper from 'App/Screens/PrivacySettings/Screens/Helper'

describe('Third Party Tracking screen test', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should render Third Party Tracking screen successfully', () => {
    NavigationFunctions.NavigationFunctions.popToTop = jest.fn()
    PrivacySettingsHelper.onScreenBackPress = jest.fn()

    const element = create(<ThirdPartyTracking />)

    const thirdPartyTrackingComponent = element.root.findAllByType(
      ThirdPartyTrackingComponent
    )[0]

    expect(thirdPartyTrackingComponent).toBeTruthy()

    thirdPartyTrackingComponent.props.onClose()
    expect(
      NavigationFunctions.NavigationFunctions.popToTop
    ).toHaveBeenCalledTimes(1)

    thirdPartyTrackingComponent.props.onBack()
    expect(PrivacySettingsHelper.onScreenBackPress).toHaveBeenCalledWith(false)
  })

  test('should call onScreenBackPress with true when one permission is on', () => {
    PrivacySettingsHelper.onScreenBackPress = jest.fn()

    const element = create(<ThirdPartyTracking />)

    const thirdPartyTrackingComponent = element.root.findAllByType(
      ThirdPartyTrackingComponent
    )[0]

    thirdPartyTrackingComponent.props.trackers[0][0].onAcceptanceChange()

    thirdPartyTrackingComponent.props.onBack()
    expect(PrivacySettingsHelper.onScreenBackPress).toHaveBeenCalledWith(true)
  })

  test('should call onScreenBackPress with false when all of the permissons are off', () => {
    PrivacySettingsHelper.onScreenBackPress = jest.fn()

    const element = create(<ThirdPartyTracking />)

    const thirdPartyTrackingComponent = element.root.findAllByType(
      ThirdPartyTrackingComponent
    )[0]

    thirdPartyTrackingComponent.props.trackers[0][0].onAcceptanceChange()
    thirdPartyTrackingComponent.props.trackers[0][0].onAcceptanceChange()

    thirdPartyTrackingComponent.props.onBack()
    expect(PrivacySettingsHelper.onScreenBackPress).toHaveBeenCalledWith(false)
  })

  test('should open Success modal when press onConfirm button', async () => {
    modalHelpers.showModal = jest.fn()

    const element = create(<ThirdPartyTracking />)

    const thirdPartyTrackingComponent = element.root.findAllByType(
      ThirdPartyTrackingComponent
    )[0]

    await act(() => {
      thirdPartyTrackingComponent.props.onConfirmPress()
      jest.runAllTimers()
    })

    expect(modalHelpers.showModal).toHaveBeenCalledTimes(2)
  })
})
