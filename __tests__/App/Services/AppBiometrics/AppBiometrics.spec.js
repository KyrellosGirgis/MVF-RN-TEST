import FingerprintScanner from 'react-native-fingerprint-scanner'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

import {
  getBiometricsAvailabilityStatus,
  isUserAuthenticatedByOS,
  isBiometricsAvailableAndEnabled,
  authenticateUsingBiometrics
} from 'App/Services/AppBiometrics/AppBiometrics.helpers'

describe('render authenticateIfDeviceHasSensors function sucessfully', () => {
  test('authenticateIfDeviceHasSensors function return SUCCESS', async () => {
    const Platform = require('react-native').Platform
    Platform.OS = 'android'
    FingerprintScanner.isSensorAvailable = () =>
      new Promise(async (resolve) => {
        return resolve('SUCCESS')
      })
    FingerprintScanner.authenticate = () =>
      new Promise(async (resolve) => {
        return resolve('SUCCESS')
      })
    FingerprintScanner.release = jest.fn()
    let result
    try {
      result = await getBiometricsAvailabilityStatus()
    } catch (error) {
      result = error
    }
    expect(result).toBe('AVAILABLE')
  })
  test('authenticateIfDeviceHasSensors function return Error', async () => {
    FingerprintScanner.isSensorAvailable = () =>
      new Promise(async (_resolve, reject) => {
        return reject('Failed')
      })
    FingerprintScanner.authenticate = () =>
      new Promise(async (_resolve, reject) => {
        return reject('Failed')
      })
    FingerprintScanner.release = jest.fn()
    let result
    try {
      result = await getBiometricsAvailabilityStatus()
    } catch (error) {
      result = error
    }
    expect(result).toBe('NOT_SUPPORTED')
  })

  test('isUserAuthenticatedByOS function return SUCCESS', async () => {
    const Platform = require('react-native').Platform
    Platform.OS = 'android'
    FingerprintScanner.isSensorAvailable = () =>
      new Promise(async (resolve) => {
        return resolve('SUCCESS')
      })
    FingerprintScanner.authenticate = () =>
      new Promise(async (resolve) => {
        return resolve('SUCCESS')
      })
    FingerprintScanner.release = jest.fn()
    let result
    try {
      result = await isUserAuthenticatedByOS({
        showAuthBtn: true
      })
    } catch (error) {
      result = error
    }
    expect(result).toBeTruthy()
  })

  test('isUserAuthenticatedByOS function return Error', async () => {
    FingerprintScanner.isSensorAvailable = () =>
      new Promise(async (_resolve, reject) => {
        return reject('Failed')
      })
    FingerprintScanner.authenticate = () =>
      new Promise(async (_resolve, reject) => {
        return reject('Failed')
      })
    FingerprintScanner.release = jest.fn()
    let result
    try {
      result = await isUserAuthenticatedByOS({
        showAuthBtn: true
      })
    } catch (error) {
      result = error
    }
    expect(result).toBeFalsy()
  })

  test('isBiometricsAvailableAndEnabled function return SUCCESS', async () => {
    const Platform = require('react-native').Platform
    Platform.OS = 'android'
    FingerprintScanner.isSensorAvailable = () =>
      new Promise(async (resolve) => {
        return resolve('SUCCESS')
      })
    FingerprintScanner.authenticate = () =>
      new Promise(async (resolve) => {
        return resolve('SUCCESS')
      })
    FingerprintScanner.release = jest.fn()
    EncryptedStorage.getBoolean = () => new Promise((resolve) => resolve(true))
    let result
    try {
      result = await isBiometricsAvailableAndEnabled()
    } catch (error) {
      result = error
    }
    expect(result).toStrictEqual({ isEnabled: true, status: 'AVAILABLE' })
  })

  test('authenticateUsingBiometrics function return SUCCESS', async () => {
    const Platform = require('react-native').Platform
    Platform.OS = 'android'
    FingerprintScanner.isSensorAvailable = () =>
      new Promise(async (resolve) => {
        return resolve('SUCCESS')
      })
    FingerprintScanner.authenticate = () =>
      new Promise(async (resolve) => {
        return resolve('SUCCESS')
      })
    FingerprintScanner.release = jest.fn()
    EncryptedStorage.getBoolean = () => new Promise((resolve) => resolve(true))
    let result
    try {
      result = await authenticateUsingBiometrics()
    } catch (error) {
      result = error
    }
    expect(result).toBe('AUTHENTICATED')
  })

  test('authenticateUsingBiometrics function return NOT_AVAILABLE', async () => {
    const Platform = require('react-native').Platform
    Platform.OS = 'android'
    FingerprintScanner.isSensorAvailable = () =>
      new Promise(async (_resolve, reject) => {
        return reject('Failed')
      })
    FingerprintScanner.authenticate = () =>
      new Promise(async (_resolve, reject) => {
        return reject('Failed')
      })
    FingerprintScanner.release = jest.fn()
    EncryptedStorage.getBoolean = () => new Promise((resolve) => resolve(true))
    let result
    try {
      result = await authenticateUsingBiometrics()
    } catch (error) {
      result = error
    }
    expect(result).toBe('NOT_AVAILABLE')
  })

  test('authenticateUsingBiometrics function return CANCELLED', async () => {
    const Platform = require('react-native').Platform
    Platform.OS = 'android'
    FingerprintScanner.isSensorAvailable = () =>
      new Promise(async (resolve) => {
        return resolve('SUCCESS')
      })
    FingerprintScanner.authenticate = () =>
      new Promise(async (_resolve, reject) => {
        return reject('Failed')
      })
    FingerprintScanner.release = jest.fn()
    EncryptedStorage.getBoolean = () => new Promise((resolve) => resolve(true))
    let result
    try {
      result = await authenticateUsingBiometrics({ forceAuthentication: true })
    } catch (error) {
      result = error
    }
    expect(result).toBe('CANCELLED')
  })
})
