import React from 'react'

import { act, create } from 'react-test-renderer'

import SettingsScreen from 'App/Screens/Settings/SettingsScreen'

describe('render Settings feature sucessfully', () => {
  const props = {
    navigation: {},
    screenProps: {
      setTrayConfig: jest.fn(),
      setTrayVisable: jest.fn(),
      setTrayType: jest.fn()
    },
    theme: {}
  }
  test('should render Settings feature screen successfully', async () => {
    let element
    await act(async () => {
      element = create(<SettingsScreen {...props} />)
    })
    expect(element).toBeTruthy()
    expect(
      element.root.findByProps({
        testID: 'AppSettings'
      })
    ).toBeTruthy()
  })
})
