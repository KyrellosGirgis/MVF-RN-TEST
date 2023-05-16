/* eslint-disable import/namespace */
import React from 'react'

import { act, create } from 'react-test-renderer'

import { Linking } from 'react-native'

import LoginErrorTray from 'App/Screens/Login/LoginErrorTray/LoginErrorTrayBody'

import { CTAHandlers } from 'App/Screens/Login/LoginErrorTypes'
import { webURLs } from 'App/Services'
import { openExternalWebView } from 'App/Utils/Helpers/generic.helpers'

describe('render LoginErrorTray feature sucessfully', () => {
  const props = {
    errorMessage: 'error',
    CTAhandler: CTAHandlers.WebView
  }

  test('should render LoginErrorTray feature screen successfully with web view button', async () => {
    let element
    await act(async () => {
      element = create(<LoginErrorTray {...props} />)
    })
    expect(element).toBeTruthy()
    expect(
      element.root.findByProps({
        testID: 'ErrorTrayBody'
      })
    ).toBeTruthy()
    const message = element.root.findByProps({
      testID: 'ErrorMessage'
    })
    expect(message).toBeTruthy()
    expect(message.props.i18nKey).toBe(props.errorMessage)

    const webViewButton = element.root.findByProps({
      testID: 'ErrorTrayBody_button'
    })
    expect(webViewButton).toBeTruthy()
    webViewButton.props.onPress()
    expect(openExternalWebView).toHaveBeenCalledWith(webURLs.registerationURL)
  })

  test('should render LoginErrorTray feature screen successfully with CustomerSupport button', async () => {
    Linking.openURL = jest.fn()
    props.CTAhandler = CTAHandlers.CustomerSupport
    let element
    await act(async () => {
      element = create(<LoginErrorTray {...props} />)
    })
    expect(element).toBeTruthy()
    expect(
      element.root.findByProps({
        testID: 'ErrorTrayBody'
      })
    ).toBeTruthy()
    const message = element.root.findByProps({
      testID: 'ErrorMessage'
    })
    expect(message).toBeTruthy()
    expect(message.props.i18nKey).toBe(props.errorMessage)

    const CustomerSupportButton = element.root.findByProps({
      testID: 'ErrorTrayBody_button'
    })
    expect(CustomerSupportButton).toBeTruthy()
    CustomerSupportButton.props.onPress()
    expect(Linking.openURL).toHaveBeenCalledWith('tel://+498001721212')
  })
})
