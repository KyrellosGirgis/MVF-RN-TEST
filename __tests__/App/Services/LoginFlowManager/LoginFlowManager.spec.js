/* eslint-disable import/namespace */

import * as Login from '@vfgroup-oneplatform/login'

import { NavigationFunctions } from 'App/Containers'

import {
  startLoginFlow,
  startBanLevelLoginFlow
} from 'App/Services/LoginFlowManager/LoginFlowManager'

import SoftLoginImplementation from 'App/Screens/Login/Implementations/SoftLoginImplementation'

import UpfrontLoginImplementation from 'App/Screens/Login/Implementations/UpfrontLoginImplementation'
import VerifyCodeSingleton from 'App/Screens/Login/VerifyCode/VerifyCodeImplementation'
import SeamlessLoginImplementation from 'App/Screens/Login/Implementations/SeamlessLoginImplementation'
import * as servicesHelpers from 'App/Services/Helpers'

jest.mock('@vfgroup-oneplatform/login/LoginManager/LoginManager')
jest.mock('App/Screens/Login/Implementations/SoftLoginImplementation')
jest.mock('App/Screens/Login/Implementations/UpfrontLoginImplementation')
jest.mock('App/Screens/Login/Implementations/SeamlessLoginImplementation')

const splashProps = {
  startSplashEndingAnimation: jest.fn(),
  setSplashMode: jest.fn(),
  setSplashLogoPosition: jest.fn(),
  dismissSplash: jest.fn(),
  setSplashColor: jest.fn(),
  endingDuration: 2000
}

const startLoginFlowParams = {
  splashProps,
  enableSeamless: true,
  disableEndAnimationAndShowSpinnerForSeamless: true,
  enableSplashAnimation: true
}

describe('Test LoginFlowManager functions', () => {
  beforeAll(async () => {
    Login.LoginManager.mockImplementation(() => {
      return {
        init: jest.fn(() => jest.fn())
      }
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should startLoginFlow call the flow successfully', async () => {
    NavigationFunctions.navigate = jest.fn()
    servicesHelpers.isSeamless = jest.fn(() => true)

    const expectedLoginConfig = {
      renderLoginIconView: undefined,
      renderVerifyLoginIconView: undefined,
      verifyCode: VerifyCodeSingleton,
      soft: {},
      upfront: {},
      seamless: {}
    }

    await startLoginFlow(startLoginFlowParams)

    expect(Login.LoginManager).toHaveBeenCalledWith(
      expectedLoginConfig,
      NavigationFunctions
    )
    expect(SoftLoginImplementation).toHaveBeenCalled()
    expect(UpfrontLoginImplementation).toHaveBeenCalled()
    expect(SeamlessLoginImplementation).toHaveBeenCalled()
    jest.runAllTimers()

    expect(splashProps.dismissSplash).toHaveBeenCalled()
  })

  test('should not call dismissSplash when enableSplashAnimation is false', async () => {
    NavigationFunctions.navigate = jest.fn()
    servicesHelpers.isSeamless = jest.fn(() => true)

    await startLoginFlow({
      ...startLoginFlowParams,
      enableSplashAnimation: false
    })

    jest.runAllTimers()

    expect(splashProps.dismissSplash).not.toHaveBeenCalled()
  })

  test('should startSplash when enableSeamless is true and disableEndAnimationAndShowSpinnerForSeamless is false ', async () => {
    NavigationFunctions.navigate = jest.fn()
    servicesHelpers.isSeamless = jest.fn(() => true)

    const expectedLoginConfig = {
      renderLoginIconView: undefined,
      renderVerifyLoginIconView: undefined,
      verifyCode: VerifyCodeSingleton,
      soft: {},
      upfront: {},
      seamless: {}
    }

    await startLoginFlow({
      ...startLoginFlowParams,
      enableSplashAnimation: false,
      enableSeamless: true,
      disableEndAnimationAndShowSpinnerForSeamless: false
    })

    expect(Login.LoginManager).toHaveBeenCalledWith(
      expectedLoginConfig,
      NavigationFunctions
    )
  })

  test('should not startSplash when enableSeamless is false and enableSeamless is false and remove seamles login method', async () => {
    NavigationFunctions.navigate = jest.fn()
    servicesHelpers.isSeamless = jest.fn(() => false)

    const expectedLoginConfig = {
      renderLoginIconView: undefined,
      renderVerifyLoginIconView: undefined,
      verifyCode: VerifyCodeSingleton,
      soft: {},
      upfront: {}
    }

    await startLoginFlow({
      ...startLoginFlowParams,
      enableSplashAnimation: false,
      enableSeamless: false
    })

    expect(Login.LoginManager).toHaveBeenCalledWith(
      expectedLoginConfig,
      NavigationFunctions
    )
  })

  test('should startBanLevelLoginFlow call the flow successfully', async () => {
    const expectedLoginConfig = {
      upfront: {}
    }

    await startBanLevelLoginFlow()

    expect(Login.LoginManager).toHaveBeenCalledWith(
      expectedLoginConfig,
      NavigationFunctions
    )
    expect(SoftLoginImplementation).not.toHaveBeenCalled()
    expect(UpfrontLoginImplementation).toHaveBeenCalled()
    expect(SeamlessLoginImplementation).not.toHaveBeenCalled()
  })
})
