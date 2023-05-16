import React from 'react'

import { create } from 'react-test-renderer'
import { StatusBar } from 'react-native'
import { BackgroundView } from '@vfgroup-oneplatform/onboarding/Components'

import OnboardingErrorScreen from 'App/Screens/OnBoarding/Screens/OnboardingErrorScreen/OnboardingErrorScreen'

const props = {
  errorText: 'Any error text',
  getLogoRef: jest.fn(),
  onTryAgain: jest.fn()
}

describe('Test OnboardingErrorScreen component', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should render OnboardingErrorScreen component successfully', () => {
    const element = create(<OnboardingErrorScreen {...props} />)

    const statusBar = element.root.findAllByType(StatusBar)[0]
    const backgroundView = element.root.findAllByType(BackgroundView)[0]

    expect(statusBar).toBeDefined()
    expect(backgroundView).toBeDefined()
    expect(
      element.root.findByProps({
        testID: 'OnboardingErrorScreenErrorWrapper'
      })
    ).toBeDefined()
    expect(
      element.root.findByProps({
        testID: 'OnboardingErrorScreen_txt'
      }).props.i18nKey
    ).toBe(props.errorText)
    expect(
      element.root.findByProps({
        testID: 'OnboardingErrorScreen_icon'
      })
    ).toBeDefined()
    expect(
      element.root.findByProps({
        testID: 'OnboardingErrorScreenTryAgain_btn'
      })
    ).toBeDefined()
  })

  test('should call props.getLogoRef when calling BackgroundView getLogoRef', () => {
    const element = create(<OnboardingErrorScreen {...props} />)

    const backgroundView = element.root.findAllByType(BackgroundView)[0]

    backgroundView.props.getLogoRef()
    expect(props.getLogoRef).toHaveBeenCalled()
  })

  test('should call props.onTryAgain when pressing try again button', () => {
    const element = create(<OnboardingErrorScreen {...props} />)

    const tryAgainButton = element.root.findByProps({
      testID: 'OnboardingErrorScreenTryAgain_btn'
    })

    tryAgainButton.props.onPress()
    expect(props.onTryAgain).toHaveBeenCalled()
  })
})
