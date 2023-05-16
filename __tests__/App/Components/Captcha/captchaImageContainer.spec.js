/* eslint-disable import/namespace */
import React from 'react'

import renderer, { act, create } from 'react-test-renderer'

import { Image } from 'react-native'

import CaptchaImageContainer from 'App/Screens/Login/Captcha/CaptchaImageContainer'
import * as CookiesManagerHelpers from 'App/Services/CookiesManager/CookiesManager.helpers'

describe('render captchaShimmer component ', () => {
  const props = {
    loadCaptchaImageUrl: jest.fn(),
    setCaptchaImageLoadingFailed: jest.fn(),
    isCaptchaImageLoading: false
  }
  test('should render captcha shimmer component successfully', () => {
    const element = renderer.create(<CaptchaImageContainer {...props} />)
    CookiesManagerHelpers.getStorageCookiesAsString = jest.fn()
    expect(
      element.root.findByProps({
        testID: 'captcha_image_container'
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
  })

  test('should show error if captcha image reload failed ', async () => {
    let element
    await act(async () => {
      element = create(<CaptchaImageContainer {...props} />)
    })
    element.root.findAllByType(Image)[0].props.onError()
    expect(props.setCaptchaImageLoadingFailed).toHaveBeenCalled()
  })

  test('should ', async () => {
    let element
    props.isCaptchaImageLoading = true

    await act(async () => {
      element = create(<CaptchaImageContainer {...props} />)
    })
    expect(
      element.root.findByProps({
        testID: 'captcha_shimmer'
      })
    ).toBeDefined()
  })
})
