import React from 'react'

import renderer from 'react-test-renderer'

import DashboardErrorCard from '@vfgroup-oneplatform/framework/Dashboard/Dashboard/DashboardErrorCard/DashboardErrorCard'

import ErrorCard from 'App/Components/ErrorCard/ErrorCard'

describe('render loadingError component ', () => {
  const props = {
    errorText: 'error',
    errorHandler: jest.fn(),
    theme: {},
    errorDetails: 'errorDetails'
  }

  test('should render loadingError components successfully in ios', () => {
    const element = renderer.create(<ErrorCard {...props} />)
    expect(
      element.root.findByProps({
        testID: 'loading_error_container'
      })
    ).toBeDefined()
  })

  test('should call errorHandler from props when pressing on retry', () => {
    const element = renderer.create(<ErrorCard {...props} />)
    element.root.findAllByType(DashboardErrorCard)[0].props.errorHandler()
    expect(props.errorHandler).toBeCalled()
  })
})
