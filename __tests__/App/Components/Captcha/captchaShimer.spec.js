import React from 'react'

import renderer from 'react-test-renderer'

import CaptchaShimmer from 'App/Screens/Login/Captcha/Captcha.shimmer'

describe('render captchaShimmer component ', () => {
  test('should render captcha shimmer component successfully', () => {
    const element = renderer.create(<CaptchaShimmer />)
    expect(
      element.root.findByProps({
        testID: 'captcha_shimmer_container'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'captcha_shimmer'
      })
    ).toBeDefined()
  })
})
