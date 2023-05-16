/* eslint-disable import/namespace */

import { Alert } from 'react-native'

import * as NavigationFunctions from 'App/Containers'
import * as RNNativeModules from 'App/Utils/RNNativeModules/generic.RNNativeModules'
import * as LogoutImplementationHelper from 'App/Screens/Login/Implementations/LogoutImplementation/LogoutImplementation.helper'
import * as MockingConfigsCardHelpers from 'App/Screens/DeveloperSettings/components/MockingConfigsCard/MockingConfigsCard.helpers'
import {
  saveDeveloperSettings,
  dismiss
} from 'App/Screens/DeveloperSettings/components/DeveloperSettingActions/DeveloperSettingActions.helper'

jest.mock('App/Utils/Helpers/generic.helpers', () => {
  const actualHelper = jest.requireActual('App/Utils/Helpers/generic.helpers')
  return {
    ...actualHelper,
    translate: (str) => str,
    delay: jest.fn()
  }
})

describe('Test DeveloperSettingActions Helper', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeEach(() => {
    NavigationFunctions.NavigationFunctions.pop = jest.fn()
    MockingConfigsCardHelpers.saveAndApplyMockingConfigs = jest.fn()
  })

  beforeAll(() => {
    Alert.alert = jest.fn()
  })

  it('should call pop when calling dismiss function', () => {
    dismiss()
    expect(NavigationFunctions.NavigationFunctions.pop).toHaveBeenCalled()
  })

  it('should saveDeveloperSettings call the correct flow when shouldLogoutAndClose= true', async () => {
    const persistAllDeveloperSettingsSections = jest.fn()
    LogoutImplementationHelper.clearAllData = jest.fn()
    RNNativeModules.exitApp = jest.fn()

    await saveDeveloperSettings({
      shouldLogoutAndClose: true,
      persistAllDeveloperSettingsSections
    })
    expect(persistAllDeveloperSettingsSections).toHaveBeenCalled()
    expect(
      MockingConfigsCardHelpers.saveAndApplyMockingConfigs
    ).toHaveBeenCalled()
    expect(LogoutImplementationHelper.clearAllData).toHaveBeenCalled()
    expect(RNNativeModules.exitApp).toHaveBeenCalled()
  })

  it('should saveDeveloperSettings call the correct flow when shouldLogoutAndClose= false', async () => {
    const persistAllDeveloperSettingsSections = jest.fn()

    await saveDeveloperSettings({
      shouldLogoutAndClose: false,
      persistAllDeveloperSettingsSections
    })
    expect(persistAllDeveloperSettingsSections).toHaveBeenCalled()
    expect(
      MockingConfigsCardHelpers.saveAndApplyMockingConfigs
    ).toHaveBeenCalled()
    expect(NavigationFunctions.NavigationFunctions.pop).toHaveBeenCalled()
  })

  it('should saveDeveloperSettings call showPopUp when persistAllDeveloperSettingsSections throws error', async () => {
    const persistAllDeveloperSettingsSections = jest.fn(() => {
      throw new Error('error in persisting')
    })

    await saveDeveloperSettings({
      shouldLogoutAndClose: false,
      persistAllDeveloperSettingsSections
    })

    expect(persistAllDeveloperSettingsSections).toHaveBeenCalled()
    expect(
      MockingConfigsCardHelpers.saveAndApplyMockingConfigs
    ).not.toHaveBeenCalled()
    expect(NavigationFunctions.NavigationFunctions.pop).not.toHaveBeenCalled()
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'error in persisting', [
      { text: 'OK', style: 'cancel' }
    ])
  })

  it('should saveDeveloperSettings call showPopUp when saveAllDevSettingSections throws error', async () => {
    const persistAllDeveloperSettingsSections = jest.fn()
    MockingConfigsCardHelpers.saveAndApplyMockingConfigs = jest.fn(() => {
      throw new Error('error in saving')
    })

    await saveDeveloperSettings({
      shouldLogoutAndClose: false,
      persistAllDeveloperSettingsSections
    })

    expect(persistAllDeveloperSettingsSections).toHaveBeenCalled()
    expect(
      MockingConfigsCardHelpers.saveAndApplyMockingConfigs
    ).toHaveBeenCalled()
    expect(NavigationFunctions.NavigationFunctions.pop).not.toHaveBeenCalled()
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'error in saving', [
      { text: 'OK', style: 'cancel' }
    ])
  })

  it('should saveDeveloperSettings call showPopUp when dismiss throws error', async () => {
    const persistAllDeveloperSettingsSections = jest.fn()
    NavigationFunctions.NavigationFunctions.pop = jest.fn(() => {
      throw new Error('error in dismiss')
    })

    await saveDeveloperSettings({
      shouldLogoutAndClose: false,
      persistAllDeveloperSettingsSections
    })

    expect(persistAllDeveloperSettingsSections).toHaveBeenCalled()
    expect(
      MockingConfigsCardHelpers.saveAndApplyMockingConfigs
    ).toHaveBeenCalled()
    expect(NavigationFunctions.NavigationFunctions.pop).toHaveBeenCalled()
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'error in dismiss', [
      { text: 'OK', style: 'cancel' }
    ])
  })

  it('should saveDeveloperSettings call showPopUp when clearAllData throws error', async () => {
    const persistAllDeveloperSettingsSections = jest.fn()
    RNNativeModules.exitApp = jest.fn()
    LogoutImplementationHelper.clearAllData = jest.fn(() => {
      throw new Error('error in clearAllData')
    })

    await saveDeveloperSettings({
      shouldLogoutAndClose: true,
      persistAllDeveloperSettingsSections
    })

    expect(persistAllDeveloperSettingsSections).toHaveBeenCalled()
    expect(
      MockingConfigsCardHelpers.saveAndApplyMockingConfigs
    ).toHaveBeenCalled()
    expect(LogoutImplementationHelper.clearAllData).toHaveBeenCalled()
    expect(RNNativeModules.exitApp).not.toHaveBeenCalled()
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'error in clearAllData', [
      { text: 'OK', style: 'cancel' }
    ])
  })

  it('should saveDeveloperSettings call showPopUp when exitApp throws error', async () => {
    const persistAllDeveloperSettingsSections = jest.fn()
    LogoutImplementationHelper.clearAllData = jest.fn()
    RNNativeModules.exitApp = jest.fn(() => {
      throw new Error('error in exitApp')
    })

    await saveDeveloperSettings({
      shouldLogoutAndClose: true,
      persistAllDeveloperSettingsSections
    })

    expect(persistAllDeveloperSettingsSections).toHaveBeenCalled()
    expect(
      MockingConfigsCardHelpers.saveAndApplyMockingConfigs
    ).toHaveBeenCalled()
    expect(LogoutImplementationHelper.clearAllData).toHaveBeenCalled()
    expect(RNNativeModules.exitApp).toHaveBeenCalled()
    expect(Alert.alert).toHaveBeenCalledWith('Error', 'error in exitApp', [
      { text: 'OK', style: 'cancel' }
    ])
  })
})
