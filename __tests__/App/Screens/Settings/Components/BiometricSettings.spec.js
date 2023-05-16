/* eslint-disable import/namespace */
import React from 'react'

import { act, create } from 'react-test-renderer'

import { useRoute } from '@react-navigation/native'

import BiometricSettings from 'App/Screens/Settings/Components/BiometricSettings'
import * as AppBiometricsHelper from 'App/Services/AppBiometrics/AppBiometrics.helpers'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

describe('render BiometricSettings feature sucessfully', () => {
  test('should render BiometricSettings feature with failed authenticateIfDeviceHasSensors', async () => {
    let element
    AppBiometricsHelper.authenticateIfDeviceHasSensors = () =>
      new Promise(async (_resolve, reject) => {
        return reject('Failed')
      })
    await act(async () => {
      element = create(<BiometricSettings />)
    })
    expect(
      element.root.findByProps({
        testID: 'SettingsToggle'
      })
    ).toBeTruthy()
    expect(element.root.children[0].props.isSelected).toBeFalsy()
    element.root.children[0].props.onChange()
    await act(async () => {
      element.update(<BiometricSettings />)
    })
    expect(element.root.children[0].props.isSelected).toBeFalsy()
  })

  test('should render BiometricSettings feature screen successfully with AUTHENTICATED status', async () => {
    let element
    AppBiometricsHelper.authenticateIfDeviceHasSensors = () =>
      new Promise(async (resolve) => {
        return resolve('SUCCESS')
      })

    AppBiometricsHelper.isBiometricsAvailableAndEnabled = () =>
      new Promise(async (resolve) => {
        return resolve({ status: 'AVAILABLE' })
      })
    await act(async () => {
      element = create(<BiometricSettings />)
    })
    expect(
      element.root.findByProps({
        testID: 'SettingsToggle'
      })
    ).toBeTruthy()
    expect(element.root.children[0].props.isSelected).toBeFalsy()
    element.root.children[0].props.onChange()

    await act(async () => {
      element.update(<BiometricSettings />)
    })
    expect(element.root.children[0].props.isSelected).toBeTruthy()
    element.root.children[0].props.onChange()

    await act(async () => {
      element.update(<BiometricSettings />)
    })
    expect(element.root.children[0].props.isSelected).toBeFalsy()
  })

  test('should render BiometricSettings feature screen successfully with NOT_AVAILABLE status', async () => {
    let element
    AppBiometricsHelper.authenticateIfDeviceHasSensors = () =>
      new Promise(async (resolve) => {
        return resolve('SUCCESS')
      })

    AppBiometricsHelper.isBiometricsAvailableAndEnabled = () =>
      new Promise(async (resolve) => {
        return resolve({ status: 'NOT_AVAILABLE' })
      })
    await act(async () => {
      element = create(<BiometricSettings />)
    })
    expect(
      element.root.findByProps({
        testID: 'SettingsToggle'
      })
    ).toBeTruthy()
    expect(element.root.children[0].props.isSelected).toBeFalsy()
    element.root.children[0].props.onChange()
    await act(async () => {
      element.update(<BiometricSettings />)
    })

    expect(element.root.children[0].props.isSelected).toBeFalsy()
  })

  test('should render BiometricSettings feature screen successfully if opened from deeplink', async () => {
    let element
    useRoute.mockImplementationOnce(() => ({
      params: {
        openedFromDeeplink: true,
        deeplinkParams: { biometrics: 'on' }
      }
    }))

    EncryptedStorage.getBoolean = jest.fn(() => false)
    AppBiometricsHelper.isBiometricsAvailableAndEnabled = jest.fn(() => ({
      status: 'AVAILABLE'
    }))

    await act(async () => {
      element = create(<BiometricSettings />)
    })

    expect(element.root.children[0].props.isSelected).toBeTruthy()
  })
})
