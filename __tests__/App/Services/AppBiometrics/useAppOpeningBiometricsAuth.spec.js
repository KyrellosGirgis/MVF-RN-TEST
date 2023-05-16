/* eslint-disable import/namespace */
import { renderHook } from '@testing-library/react-hooks'

import {
  authenticateUsingBiometrics,
  isBiometricsAvailableAndEnabled
} from 'App/Services/AppBiometrics/AppBiometrics.helpers'

import useAppOpeningBiometricsAuth from 'App/Services/AppBiometrics/useAppOpeningBiometricsAuth'
import * as appNavigationHelpers from 'App/Containers/AppNavigation/AppNavigation.helpers'
import { getTimeDifferenceFromNow } from 'App/Utils/Helpers/generic.helpers'
// import * as genericHelpers from 'App/Utils/Helpers/generic.helpers'

const mockSetState = jest.fn()

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: () => ['', mockSetState],
  useRef: jest.fn(() => ({
    current: false
  })),
  useEffect: jest.fn()
}))

jest.mock('App/Services/AppBiometrics/AppBiometrics.helpers', () => {
  const actualHelper = jest.requireActual(
    'App/Services/AppBiometrics/AppBiometrics.helpers'
  )
  return {
    ...actualHelper,
    isBiometricsAvailableAndEnabled: jest.fn(() => ({
      isEnabled: true,
      status: 'AVAILABLE'
    })),
    authenticateUsingBiometrics: jest.fn(() => 'AUTHENTICATED')
  }
})
jest.mock('App/Utils/Helpers/generic.helpers', () => {
  const actualHelper = jest.requireActual('App/Utils/Helpers/generic.helpers')
  return {
    ...actualHelper,
    translate: (str) => str,
    getTimeDifferenceFromNow: jest.fn().mockImplementation(() => 7)
  }
})

describe('run useAppOpeningBiometricsAuth successfully', () => {
  test('should run useAppOpeningBiometricsAuth correctly with all needed logic', () => {
    renderHook(() => useAppOpeningBiometricsAuth())
  })

  test('onBackgroundHandler when Biometrics is Available And Enabled', async () => {
    appNavigationHelpers.showBlurView = jest.fn()
    await useAppOpeningBiometricsAuth().onBackgroundHandler()
    expect(isBiometricsAvailableAndEnabled).toHaveBeenCalled()
    expect(appNavigationHelpers.showBlurView).toHaveBeenCalled()
    expect(mockSetState).toHaveBeenCalled()
  })

  test('onForegroundHandler when Biometrics is Available , Enabled and shouldAuthenticate', async () => {
    await useAppOpeningBiometricsAuth().onForegroundHandler()
    expect(getTimeDifferenceFromNow).toHaveBeenCalled()
    expect(authenticateUsingBiometrics).toHaveBeenCalled()
    expect(mockSetState).toHaveBeenCalled()
  })
  test('onForegroundHandler when Biometrics should not Authenticate and User did not Cancel Authentication and there not Warning Shown', async () => {
    appNavigationHelpers.hideBlurView = jest.fn()
    getTimeDifferenceFromNow.mockImplementation(() => 3)
    await useAppOpeningBiometricsAuth().onForegroundHandler()
    expect(getTimeDifferenceFromNow).toHaveBeenCalled()
    expect(appNavigationHelpers.hideBlurView).toHaveBeenCalled()
  })
})
