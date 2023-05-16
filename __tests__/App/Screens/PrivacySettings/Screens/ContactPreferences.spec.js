/* eslint-disable import/namespace */
import React from 'react'
import { ContactPreferences as ContactPreferencesComponent } from '@vfgroup-oneplatform/framework/PrivacySettings/Screens'
import { act, create } from 'react-test-renderer'

import * as modalHelpers from 'App/Containers/AppModal/AppModal.helpers'

import * as NavigationFunctions from 'App/Containers'

import ContactPreferences from 'App/Screens/PrivacySettings/Screens/ContactPreferences/ContactPreferences'
import * as PrivacySettingsHelper from 'App/Screens/PrivacySettings/Screens/Helper'
import * as UtilsHelper from 'App/Utils/Helpers/generic.helpers'

describe('Contact preferences screen test', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should render Contact preferences screen successfully', () => {
    NavigationFunctions.NavigationFunctions.popToTop = jest.fn()
    PrivacySettingsHelper.onScreenBackPress = jest.fn()

    const element = create(<ContactPreferences />)

    const contactPreferencesComponent = element.root.findAllByType(
      ContactPreferencesComponent
    )[0]

    expect(contactPreferencesComponent).toBeTruthy()

    contactPreferencesComponent.props.onClose()
    expect(
      NavigationFunctions.NavigationFunctions.popToTop
    ).toHaveBeenCalledTimes(1)

    contactPreferencesComponent.props.onBack()
    expect(PrivacySettingsHelper.onScreenBackPress).toHaveBeenCalledWith(false)
  })

  test('should call onScreenBackPress with true', () => {
    PrivacySettingsHelper.onScreenBackPress = jest.fn()

    const element = create(<ContactPreferences />)

    const contactPreferencesComponent = element.root.findAllByType(
      ContactPreferencesComponent
    )[0]

    contactPreferencesComponent.props.contactPrefData[0][0].onAcceptanceChange()

    contactPreferencesComponent.props.onBack()
    expect(PrivacySettingsHelper.onScreenBackPress).toHaveBeenCalledWith(true)
  })

  test('should call onScreenBackPress with false when all of the permissons are off', () => {
    PrivacySettingsHelper.onScreenBackPress = jest.fn()

    const element = create(<ContactPreferences />)

    const contactPreferencesComponent = element.root.findAllByType(
      ContactPreferencesComponent
    )[0]

    contactPreferencesComponent.props.contactPrefData[0][0].onAcceptanceChange()
    contactPreferencesComponent.props.contactPrefData[0][0].onAcceptanceChange()

    contactPreferencesComponent.props.onBack()
    expect(PrivacySettingsHelper.onScreenBackPress).toHaveBeenCalledWith(false)
  })

  test('should open Success modal when press onConfirm button', async () => {
    modalHelpers.showModal = jest.fn()
    UtilsHelper.delay = jest.fn(() => {
      return new Promise((resolve) => {
        resolve(null)
      })
    })

    const element = create(<ContactPreferences />)

    const contactPreferencesComponent = element.root.findAllByType(
      ContactPreferencesComponent
    )[0]

    await act(() => {
      contactPreferencesComponent.props.onButtonPress()
      jest.runAllTimers()
    })

    expect(modalHelpers.showModal).toHaveBeenCalledTimes(2)
  })

  test('should call onScreenBackPress with true when toggling parent permission', () => {
    PrivacySettingsHelper.onScreenBackPress = jest.fn()

    const element = create(<ContactPreferences />)

    const contactPreferencesComponent = element.root.findAllByType(
      ContactPreferencesComponent
    )[0]

    contactPreferencesComponent.props.contactPrefData[1][0].onAcceptanceChange()

    contactPreferencesComponent.props.onBack()
    expect(PrivacySettingsHelper.onScreenBackPress).toHaveBeenCalledWith(true)
  })

  test('should call onScreenBackPress with true when toggling child permission', () => {
    PrivacySettingsHelper.onScreenBackPress = jest.fn()

    const element = create(<ContactPreferences />)

    const contactPreferencesComponent = element.root.findAllByType(
      ContactPreferencesComponent
    )[0]

    contactPreferencesComponent.props.contactPrefData[1][1].onAcceptanceChange()

    contactPreferencesComponent.props.onBack()
    expect(PrivacySettingsHelper.onScreenBackPress).toHaveBeenCalledWith(true)
    jest.clearAllMocks()
    contactPreferencesComponent.props.contactPrefData[1][1].onAcceptanceChange()
    contactPreferencesComponent.props.contactPrefData[1][1].onAcceptanceChange()
    contactPreferencesComponent.props.onBack()
    expect(PrivacySettingsHelper.onScreenBackPress).toHaveBeenCalledWith(true)
  })
})
