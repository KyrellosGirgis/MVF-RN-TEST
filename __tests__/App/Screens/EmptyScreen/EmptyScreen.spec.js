import React from 'react'
import { VFScreen } from '@vfgroup-oneplatform/foundation/Components'
import { create } from 'react-test-renderer'

import * as NavigationFunctions from 'App/Containers'

import EmptyScreen from 'App/Screens/EmptyScreen/EmptyScreen'

describe('Empty screen test', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should render Empty screen successfully', () => {
    NavigationFunctions.NavigationFunctions.popToTop = jest.fn()
    NavigationFunctions.NavigationFunctions.goBack = jest.fn()

    const element = create(<EmptyScreen />)

    const vfScreenComponent = element.root.findAllByType(VFScreen)[0]

    expect(vfScreenComponent).toBeTruthy()

    vfScreenComponent.props.onClose()
    expect(
      NavigationFunctions.NavigationFunctions.popToTop
    ).toHaveBeenCalledTimes(1)

    vfScreenComponent.props.onBack()
    expect(
      NavigationFunctions.NavigationFunctions.goBack
    ).toHaveBeenCalledTimes(1)
  })
})
