/* eslint-disable import/namespace */
import React from 'react'

import { act, create } from 'react-test-renderer'

import StatusView from '@vfgroup-oneplatform/foundation/Components/StatusView'

import { Linking } from 'react-native'

import OnBoardingErrorTrayBody from 'App/Screens/OnBoarding/OnBoardingErrorTray/OnBoardingErrorTrayBody'
import { handlersActions } from 'App/Screens/OnBoarding/OnBoardingErrorTypes'
import * as modalHelpers from 'App/Containers/AppModal/AppModal.helpers'
import * as LogOut from 'App/Screens/Login/Implementations/LogoutImplementation/LogoutImplementation'

describe('render OnBoardingErrorTray feature sucessfully', () => {
  jest.mock(
    'App/Screens/Login/Implementations/LogoutImplementation/LogoutImplementation',
    () => jest.fn()
  )
  const props = {
    errorMessage: 'title',
    primaryButtonHandler: {
      title: 'primaryButton',
      handlerAction: handlersActions.customerSupportAction
    },
    secondaryButtonHandler: {
      title: 'secondaryButton',
      handlerAction: handlersActions.backToLoginAction
    }
  }
  test('should render OnBoardingErrorTray feature screen successfully with CTA button', async () => {
    Linking.openURL = jest.fn()
    let element
    await act(async () => {
      element = create(<OnBoardingErrorTrayBody {...props} />)
    })
    expect(element).toBeTruthy()
    expect(
      element.root.findByProps({
        testID: 'ErrorTrayBody'
      })
    ).toBeTruthy()
    const message = element.root.findByType(StatusView).props
    expect(message.description).toBe(props.errorMessage)

    const CTAButton =
      element.root.findByType(StatusView).props.primaryButtonProps
    expect(CTAButton.title).toBe(props.primaryButtonHandler.title)

    CTAButton.onPress()
    expect(Linking.openURL).toHaveBeenCalledWith('tel://+498001721212')
  })

  test('should render OnBoardingErrorTray feature screen successfully with BACK TO LOGIN button', async () => {
    // eslint-disable-next-line import/namespace
    modalHelpers.closeModal = jest.fn()
    // eslint-disable-next-line import/namespace
    LogOut.default = jest.fn()

    let element
    await act(async () => {
      element = create(<OnBoardingErrorTrayBody {...props} />)
    })
    expect(element).toBeTruthy()
    expect(
      element.root.findByProps({
        testID: 'ErrorTrayBody'
      })
    ).toBeTruthy()
    const message = element.root.findByType(StatusView).props
    expect(message.description).toBe(props.errorMessage)

    const backToLoginButton =
      element.root.findByType(StatusView).props.secondaryButtonProps
    expect(backToLoginButton.title).toBe(props.secondaryButtonHandler.title)

    backToLoginButton.onPress()
    expect(LogOut.default).toHaveBeenCalledWith({ shouldNavigateToLogin: true })
  })
})
