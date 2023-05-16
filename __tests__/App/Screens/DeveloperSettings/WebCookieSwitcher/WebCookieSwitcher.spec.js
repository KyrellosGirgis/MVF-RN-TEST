import React from 'react'
import { create } from 'react-test-renderer'

import WebCookieSwitcher from 'App/Screens/DeveloperSettings/components/WebCookieSwitcher/WebCookieSwitcher'
import { testID } from 'App/Utils/Helpers/testId.helpers'

describe('WebCookieSwitcher', () => {
  test('should render the WebCookieSwitcher component', async () => {
    const webCookieSwitcher = create(<WebCookieSwitcher />)
    expect(webCookieSwitcher).toBeDefined()
  })

  test('should render the DeveloperSettingsCard', async () => {
    const webCookieSwitcher = create(<WebCookieSwitcher />)
    const developerSettingsCard = webCookieSwitcher.root.children[0]
    expect(developerSettingsCard).toBeDefined()
  })

  test('should render the webCookieSwitcher title', async () => {
    const webCookieSwitcher = create(<WebCookieSwitcher />)
    const cardTitle = webCookieSwitcher.root.findByProps({
      title: 'Web Cookie Switcher'
    })
    expect(cardTitle.props.title).toBe('Web Cookie Switcher')
  })

  test('should render the WebCookieSwitcher description and example and textInput', async () => {
    const webCookieSwitcher = create(<WebCookieSwitcher />)
    const description = webCookieSwitcher.root.findByProps({
      testID: testID('webCookieDescription')
    })
    expect(description.props).toHaveProperty('i18nKey', 'Web Cookies')

    const example = webCookieSwitcher.root.findByProps({
      testID: testID('webCookieExample')
    })
    expect(example.props).toHaveProperty(
      'i18nKey',
      'ex:- key=value;key=value;key=value'
    )

    const textInput = webCookieSwitcher.root.findByProps({
      testID: testID('webCookieTextBox')
    })
    expect(textInput.props).toBeDefined()
  })
})
