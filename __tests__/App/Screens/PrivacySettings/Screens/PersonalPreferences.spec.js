/* eslint-disable import/namespace */
import React from 'react'
import { PersonalPreferences as PersonalPreferencesComponent } from '@vfgroup-oneplatform/framework/PrivacySettings'
import { create, act } from 'react-test-renderer'

import * as modalHelpers from 'App/Containers/AppModal/AppModal.helpers'

import * as NavigationFunctions from 'App/Containers'

import PersonalPreferences from 'App/Screens/PrivacySettings/Screens/PersonalPreferences/PersonalPreferences'
import * as PrivacySettingsHelper from 'App/Screens/PrivacySettings/Screens/Helper'
import LoadingIndicator from 'App/Components/LoadingIndicator/LoadingIndicator'
import SuccessModalBody from 'App/Screens/PrivacySettings/Components/SuccessModalBody/SuccessModalBody'

describe('Personal preferences screen test', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should render Personal preferences screen successfully', () => {
    NavigationFunctions.NavigationFunctions.popToTop = jest.fn()
    PrivacySettingsHelper.onScreenBackPress = jest.fn()

    const element = create(<PersonalPreferences />)

    const personalPreferencesComponent = element.root.findAllByType(
      PersonalPreferencesComponent
    )[0]

    expect(personalPreferencesComponent).toBeTruthy()

    personalPreferencesComponent.props.onClose()
    expect(
      NavigationFunctions.NavigationFunctions.popToTop
    ).toHaveBeenCalledTimes(1)

    personalPreferencesComponent.props.onBack()
    expect(PrivacySettingsHelper.onScreenBackPress).toHaveBeenCalledWith(false)
  })

  test('should call onScreenBackPress with true', () => {
    PrivacySettingsHelper.onScreenBackPress = jest.fn()

    const element = create(<PersonalPreferences />)

    const personalPreferencesComponent = element.root.findAllByType(
      PersonalPreferencesComponent
    )[0]

    personalPreferencesComponent.props.onPermissionChange({
      value: true,
      key: 'item'
    })

    personalPreferencesComponent.props.onBack()
    expect(PrivacySettingsHelper.onScreenBackPress).toHaveBeenCalledWith(true)
  })

  test('should call onScreenBackPress with false when all of the permissons are off', () => {
    PrivacySettingsHelper.onScreenBackPress = jest.fn()

    const element = create(<PersonalPreferences />)

    const personalPreferencesComponent = element.root.findAllByType(
      PersonalPreferencesComponent
    )[0]

    personalPreferencesComponent.props.onPermissionChange({
      value: true,
      key: 'item'
    })

    personalPreferencesComponent.props.onPermissionChange({
      value: false,
      key: 'item'
    })

    personalPreferencesComponent.props.onBack()
    expect(PrivacySettingsHelper.onScreenBackPress).toHaveBeenCalledWith(false)
  })

  test('should open Success modal when press onConfirm button', async () => {
    modalHelpers.showModal = jest.fn()

    const element = create(<PersonalPreferences />)

    const personalPreferencesComponent = element.root.findAllByType(
      PersonalPreferencesComponent
    )[0]

    await act(() => {
      personalPreferencesComponent.props.onConfirm()
      jest.runAllTimers()
    })

    expect(modalHelpers.showModal).toHaveBeenCalledTimes(2)
  })

  test('should render success modal content correctly', async () => {
    const modalsRendered = []

    NavigationFunctions.NavigationFunctions.popToTop = jest.fn()
    modalHelpers.closeModal = jest.fn()
    modalHelpers.showModal = jest.fn(
      ({ title: title, modalBody: modalBody }) => {
        modalsRendered.push({ title, modalBody })
      }
    )

    const element = create(<PersonalPreferences />)
    const personalPreferencesComponent = element.root.findAllByType(
      PersonalPreferencesComponent
    )[0]

    await act(() => {
      personalPreferencesComponent.props.onConfirm()
      jest.runAllTimers()
    })

    expect(modalsRendered[0].title).toEqual('subtray_privacy_title')
    expect(modalsRendered[1].title).toEqual('subtray_privacy_title')

    const lodaingIndicator = modalsRendered[0].modalBody
    const successModalBody = modalsRendered[1].modalBody

    expect(lodaingIndicator.type).toBe(LoadingIndicator)
    expect(successModalBody.type).toBe(SuccessModalBody)

    successModalBody.props.onSecondaryButtonPress()
    expect(modalHelpers.closeModal).toHaveBeenCalledTimes(1)

    jest.clearAllMocks()

    successModalBody.props.onPrimaryButtonPress()
    expect(modalHelpers.closeModal).toHaveBeenCalledTimes(1)
    expect(
      NavigationFunctions.NavigationFunctions.popToTop
    ).toHaveBeenCalledTimes(1)
  })
})
