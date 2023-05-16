import React from 'react'

import { shallow } from 'enzyme'
import { create, act } from 'react-test-renderer'
import * as redux from 'react-redux'

import DeveloperSettings from 'App/Screens/DeveloperSettings/DeveloperSettings'
import WebCookieSwitcher from 'App/Screens/DeveloperSettings/components/WebCookieSwitcher/WebCookieSwitcher'
import * as NavigationFunctions from 'App/Containers'

describe('Developer Setting tests', () => {
  test('should render correctly generic components successfully', async () => {
    let element
    const spy = jest.spyOn(redux, 'useSelector')

    jest.mock('App/Services/StorageWrappers/EncryptedStorage.ts', () => ({
      getItemParsedToJSON: jest.fn(() => ({
        mockingConfigs: { testCaseName: '', mockFileName: '' }
      }))
    }))
    spy.mockReturnValue({ testCaseName: '', mockFileName: '' })

    await act(async () => {
      element = create(<DeveloperSettings />)
    })
    expect(
      element.root.findByProps({
        testID: 'developerSettingsScroll'
      })
    ).toBeDefined()
    expect(
      element.root.findByProps({
        closeButtonTestID: 'DScloseIcon'
      })
    ).toBeDefined()

    expect(element.root.findByType(WebCookieSwitcher)).toBeDefined()
  })
})

describe('render Developer Settings screen component ', () => {
  NavigationFunctions.NavigationFunctions.pop = jest.fn()
  const element = shallow(<DeveloperSettings />)
  const developerSettingsComponent = element.find({
    testID: 'DeveloperSettingsID'
  })

  const developerSettingsProps = developerSettingsComponent.props()

  test('should call pop when close DeveloperSettings is called', () => {
    developerSettingsProps.onClose()
    expect(NavigationFunctions.NavigationFunctions.pop).toBeCalled()
  })
})
