/* eslint-disable import/namespace */
import React from 'react'
import { create } from 'react-test-renderer'

import PrivacyAndPermissionsUpdateOverlay from 'App/Screens/HomeScreen/components/PrivacyPermissionsOverlay/PrivacyPermissionsOverlay'
import * as AppEventEmitter from 'App/Services/AppEventEmitter/AppEventEmitter'
import { AppEvents } from 'App/Services/AppEventEmitter/AppEvents'

describe('PrivacyPermissionsOverlay test without mocking state', () => {
  const element = create(<PrivacyAndPermissionsUpdateOverlay />).root
    .children[0]
  test('should render overlay Body successfully', () => {
    expect(element).toBeTruthy()
  })

  test('should start the overlay closed', async () => {
    expect(element.props.isVisible).toBeFalsy()
  })

  test('should intialize the basic profile value with true', async () => {
    const basicProfileToggleElement =
      element.props.privacySettingsSections[1].actions.items[0]

    expect(basicProfileToggleElement.initialValue).toBeTruthy()
  })

  test('should intialize the advanced profile value with false', async () => {
    const advancedProfileToggleElement =
      element.props.privacySettingsSections[1].actions.items[1]

    expect(advancedProfileToggleElement.initialValue).toBeFalsy()
  })

  test('should close overlay onDismiss', async () => {
    element.props.onDismiss()
    expect(element.props.isVisible).toBeFalsy()
  })

  test('should close overlay onAcceptAll', async () => {
    element.props.onAcceptAll()
    expect(element.props.isVisible).toBeFalsy()
  })
  test('should close overlay onRejectAll', async () => {
    element.props.onRejectAll()
    expect(element.props.isVisible).toBeFalsy()
  })

  test('should close overlay onOkButtonPress', async () => {
    element.props.onOkButtonPress()
    expect(element.props.isVisible).toBeFalsy()
  })

  test('should close overlay onAcceptAllManagePrivacy', async () => {
    element.props.onAcceptAllManagePrivacy()
    expect(element.props.isVisible).toBeFalsy()
  })

  test('should close overlay onRejectAllManagePrivacy', async () => {
    element.props.onRejectAllManagePrivacy()
    expect(element.props.isVisible).toBeFalsy()
  })
})

describe('PrivacyPermissionsOverlay state status test', () => {
  const element = create(<PrivacyAndPermissionsUpdateOverlay />)
  let [toggleOne, toggleTwo, toggleThree] =
    element.root.children[0].props.privacySettingsSections[2].actions.items

  test('should intialize the post value with false and change the state value when toggled', async () => {
    expect(toggleOne.initialValue).toBeFalsy()
    toggleOne.onToggle()
    element.update(<PrivacyAndPermissionsUpdateOverlay />)
    toggleOne =
      element.root.children[0].props.privacySettingsSections[2].actions.items[0]
    expect(toggleOne.initialValue).toBeTruthy()
  })
  test('should intialize the messaging value with false and change the state value when toggled', async () => {
    expect(toggleTwo.initialValue).toBeFalsy()
    toggleTwo.onToggle()
    element.update(<PrivacyAndPermissionsUpdateOverlay />)
    toggleTwo =
      element.root.children[0].props.privacySettingsSections[2].actions.items[1]
    expect(toggleTwo.initialValue).toBeTruthy()
  })
  test('should intialize the phoneCalls value with false and change the state value when toggled', async () => {
    expect(toggleThree.initialValue).toBeFalsy()
    toggleThree.onToggle()
    element.update(<PrivacyAndPermissionsUpdateOverlay />)
    toggleThree =
      element.root.children[0].props.privacySettingsSections[2].actions.items[2]
    expect(toggleThree.initialValue).toBeTruthy()
  })

  test('the tray should be shown if the SHOW_PRIVACY_PERMISSIONS_OVERLAY event emmited', async () => {
    AppEventEmitter.emitEvent(AppEvents.SHOW_PRIVACY_PERMISSIONS_OVERLAY, true)
    element.update(<PrivacyAndPermissionsUpdateOverlay />)
    expect(element.root.children[0].props.isVisible).toBeTruthy()
  })
})
