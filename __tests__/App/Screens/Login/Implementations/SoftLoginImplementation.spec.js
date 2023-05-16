/* eslint-disable import/namespace */
import { LoginStatuses as Status } from '@vfgroup-oneplatform/login'

import * as CookiesManagerService from 'App/Services/CookiesManager/CookiesManager'

import * as loginHelpers from 'App/Screens/Login/Implementations/Login.helper'

import SoftLoginImplementation from 'App/Screens/Login/Implementations/SoftLoginImplementation'

import * as OIDC from 'App/Services/API/Requests/OIDC/OIDC'

import * as LoginAPI from 'App/Services/API/Requests/Login/login'

const errorObj = {
  response: {
    config: {
      url: 'asd'
    },
    data: {
      operationError: {
        code: 'asd'
      }
    },
    status: 500
  }
}

describe('Soft Login Implementation', () => {
  const onLoadingStart = jest.fn()
  const authConfig = {}
  const verficationCode = '645462'
  const res = ' response'
  LoginAPI.SMSLoginProvideTAN = jest.fn(() => res)
  const instance = new SoftLoginImplementation(authConfig, onLoadingStart)
  loginHelpers.setLoggedInMintUserId = jest.fn()

  it('should initialize without errors when passing no parameters', () => {
    expect(new SoftLoginImplementation()).not.toBeNull()
  })

  it('should initialize without errors when passing function to onLoadingStart parameter', () => {
    const onLoginStartMock = jest.fn()
    expect(new SoftLoginImplementation({}, onLoginStartMock)).not.toBeNull()
  })

  it('should throw when initializing with values passed to onLoadingStart and onLoadingEnd are not functions', () => {
    expect(() => new SoftLoginImplementation({}, 3, 3)).toThrow()
  })

  it('should return auth config back', () => {
    expect(instance.getAuthConfig()).toBe(authConfig)
  })

  it('Enter valid number and return true case 1', () => {
    const phone = '491721234567'
    expect(instance.validatePhone(phone)).toBeTruthy()
  })

  it('Enter valid number and return true case 2', () => {
    const phone = '4911111234567'
    expect(instance.validatePhone(phone)).toBeTruthy()
  })

  it('Enter invalid number and return false 1', () => {
    const phone = 'aas'
    expect(instance.validatePhone(phone)).toBeFalsy()
  })

  it('Enter invalid number and return false 2', () => {
    const phone = '99'
    expect(instance.validatePhone(phone)).toBeFalsy()
  })

  it('Ensure that OnCodeSubmit called  the SMSLoginProvideTAN with the right verfication code   ', async () => {
    OIDC.loadOIDCToken = jest.fn()

    loginHelpers.setLoginTokens = jest.fn()

    CookiesManagerService.getOSCookies = jest.fn()
    CookiesManagerService.clearOSCookies = jest.fn()

    await instance.onCodeSubmit('', verficationCode)

    expect(LoginAPI.SMSLoginProvideTAN).toHaveBeenCalledWith(
      verficationCode,
      undefined
    )
    expect(OIDC.loadOIDCToken).toHaveBeenCalled()
  })

  it('Ensure that OnCodeSubmit returned expected object ', async () => {
    const respon = await instance.onCodeSubmit('', verficationCode)
    expect(respon).toMatchObject({
      status: Status.Success,
      response: res
    })
  })

  it('Ensure that OncodeSubmit throw an error when the call of SMSLoginProvideTAN throw an error', async () => {
    LoginAPI.SMSLoginProvideTAN = jest.fn(() => {
      return Promise.reject(errorObj)
    })

    expect(await instance.onCodeSubmit('123', '123')).toMatchObject(errorObj)
  })

  it('Ensure that OncodeSubmit throw an error when the call of loadOIDCToken throw an error', async () => {
    OIDC.loadOIDCToken = jest.fn(() => {
      return Promise.reject(errorObj)
    })

    expect(await instance.onCodeSubmit('123', '123')).toMatchObject(errorObj)
  })
  it('should onLoadingStart to be called ', () => {
    instance.onLoginStart()
    expect(onLoadingStart).toHaveBeenCalled()
  })

  it('onVerifyCodeSuccess', async () => {
    // jest.spyOn(reduxFunctions, 'dispatch')
    const response = {
      data: {
        parameters: {
          userId: 19181716
        }
      }
    }
    instance.__onLoadingEnd = jest.fn(() => {})
    await instance.onVerifyCodeSuccess(response)
    expect(instance.__onLoadingEnd).toHaveBeenCalled()
  })
  it('should setLoggedInMintUserId on onVerifyCodeSuccess', async () => {
    const response = {
      data: {
        parameters: {
          userId: 19181716
        }
      }
    }
    instance.__onLoadingEnd = jest.fn(() => {})
    await instance.onVerifyCodeSuccess(response)

    expect(loginHelpers.setLoggedInMintUserId).toHaveBeenCalledWith(19181716)
  })
})
