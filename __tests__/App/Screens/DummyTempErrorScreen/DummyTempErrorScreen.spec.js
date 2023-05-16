import React from 'react'
import { create } from 'react-test-renderer'

import * as NavigationFunctions from 'App/Containers'

import DummyTempErrorScreen from 'App/Screens/DummyTempErrorScreen/DummyTempErrorScreen'

describe('Empty DummyTempErrorScreen test', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should render DummyTempErrorScreen successfully', () => {
    NavigationFunctions.NavigationFunctions.goBack = jest.fn()

    const element = create(<DummyTempErrorScreen />)

    const vfScreenComponent = element.root.findByProps({
      testID: 'Error-screen'
    })
    expect(vfScreenComponent).toBeDefined()

    expect(
      element.root.findByProps({ testID: 'ErrorComponentWrapper' })
    ).toBeDefined()

    vfScreenComponent.props.onClose()

    expect(
      NavigationFunctions.NavigationFunctions.goBack
    ).toHaveBeenCalledTimes(1)
  })
})
