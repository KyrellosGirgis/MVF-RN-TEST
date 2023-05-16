/* eslint-disable import/namespace */

import React from 'react'

import { act, create } from 'react-test-renderer'

import { Image, TouchableOpacity } from 'react-native'

import { VFButton } from '@vfgroup-oneplatform/foundation/Components'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

import Captcha from 'App/Screens/Login/Captcha/Captcha'
import * as API from 'App/Services/API/Requests/Login/login'
import * as captchaModalHelpers from 'App/Containers/AppModal/CaptchaModal/CaptchaModal.helpers'

import * as OIDC from 'App/Services/API/Requests/OIDC/OIDC'
import * as loginHelpers from 'App/Screens/Login/Implementations/Login.helper'
import * as CookiesManagerHelpers from 'App/Services/CookiesManager/CookiesManager.helpers'

describe('render captcha component ', () => {
  const props = {
    captchaUrl: 'url',
    theme: {},
    submitCaptchaCode: jest.fn(),
    resetParentStatus: jest.fn(),
    onFail: jest.fn(),
    onSuccess: jest.fn()
  }
  API.getCaptchaImageUrl = jest.fn()
  CookiesManagerHelpers.getStorageCookiesAsString = jest.fn()

  beforeEach(() => {
    API.getCaptchaImageUrl = jest.fn(
      () =>
        new Promise((resolve) =>
          resolve({
            data: { captcha_image_url: 'url' }
          })
        )
    )
  })
  test('should render captcha components successfully', async () => {
    let element
    await act(async () => {
      element = create(<Captcha {...props} />)
    })
    expect(
      element.root.findByProps({
        testID: 'captcha_container'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'captcha_header'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'captcha_body'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'captcha_image_container'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'captcha_image'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'captcha_retry'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'captcha_header'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'captcha_body'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'captcha_image_container'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'captcha_image'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'captcha_retry'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'captcha_retry_image'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'captcha_retry_text'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'captcha_input'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'captcha_continue_button'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'captcha_cancel_button'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'captcha_retry_text'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'captcha_input'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'captcha_continue_button'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'captcha_cancel_button'
      })
    ).toBeDefined()
  })

  test('should close modal when clicking cancel button', async () => {
    let element
    await act(async () => {
      element = create(<Captcha {...props} />)
    })
    captchaModalHelpers.closeCaptchaModal = jest.fn()

    element.root.findAllByType(VFButton)[1].props.onPress()
    expect(captchaModalHelpers.closeCaptchaModal).toBeCalled()
  })

  test('should initially set image source from props', async () => {
    let element
    await act(async () => {
      element = create(<Captcha {...props} />)
    })
    expect(element.root.findAllByType(Image)[0].props.source.uri).toEqual(
      props.captchaUrl
    )
  })

  test('should render loadingError if captcha image failed to load', async () => {
    let element
    await act(async () => {
      element = create(<Captcha {...props} />)
    })
    element.root.findAllByType(Image)[0].props.onError()
    expect(
      element.root.findByProps({
        testID: 'captcha_loading_error'
      })
    ).toBeDefined()
  })

  test('should render shimmering while captcha image is loading', async () => {
    let element
    await act(async () => {
      element = create(<Captcha {...props} />)
    })
    element.root.findAllByType(TouchableOpacity)[0].props.onPress()
    API.getCaptchaImageUrl = jest.fn()
    expect(
      element.root.findByProps({
        testID: 'captcha_shimmer'
      })
    ).toBeDefined()
  })

  test('should validate captcha and continue login flow when continue button is pressed', async () => {
    API.verifyCaptchaCodeThenLoginApi = jest.fn()
    OIDC.loadOIDCToken = jest.fn(() => {
      return 'Logindata'
    })
    loginHelpers.setLoginTokens = jest.fn()
    EncryptedStorage.setItem = jest.fn()
    captchaModalHelpers.closeCaptchaModal = jest.fn()
    let element
    await act(async () => {
      element = create(<Captcha {...props} />)
    })
    element.root.findAllByType(VFButton)[0].props.onPress()
    expect(
      element.root.findByProps({
        testID: 'captcha_loading_container'
      })
    ).toBeDefined()
    expect(API.verifyCaptchaCodeThenLoginApi).toHaveBeenCalled()
  })

  test('should render captchaIsInvalid when entering invalid captcha', async () => {
    API.verifyCaptchaCodeThenLoginApi = jest.fn(() => {
      throw {
        body: 'invalid_captcha'
      }
    })

    let element
    await act(async () => {
      element = create(<Captcha {...props} />)
    })
    element.root.findAllByType(VFButton)[0].props.onPress()

    expect(API.verifyCaptchaCodeThenLoginApi).toThrow()

    expect(
      element.root.findByProps({
        testID: 'captcha_error_message'
      })
    ).toBeDefined()
  })

  test('should close captcha modal when login fails ( captcha verification passed )', async () => {
    API.verifyCaptchaCodeThenLoginApi = jest.fn(() => {
      throw {
        body: 'any_error'
      }
    })
    captchaModalHelpers.closeCaptchaModal = jest.fn()

    let element
    await act(async () => {
      element = create(<Captcha {...props} />)
    })
    element.root.findAllByType(VFButton)[0].props.onPress()

    expect(API.verifyCaptchaCodeThenLoginApi).toThrow()

    expect(captchaModalHelpers.closeCaptchaModal).toBeCalled()
  })
})
