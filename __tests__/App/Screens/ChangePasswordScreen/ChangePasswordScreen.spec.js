/* eslint-disable import/namespace */
import React from 'react'
import { shallow } from 'enzyme'

import * as NavigationFunctions from 'App/Containers'
import { ChangePasswordScreen } from 'App/Screens'

describe('render ChangePasswordScreen component ', () => {
  NavigationFunctions.NavigationFunctions.popToTop = jest.fn()
  const element = shallow(<ChangePasswordScreen />)
  const changePasswordComponent = element.find({
    testID: 'changePasswordTestId'
  })

  const changePasswordProps = changePasswordComponent.props()
  test('should render ChangePasswordScreen component successfully', () => {
    expect(changePasswordComponent).toBeDefined()
  })

  test('should call popToTop when close ChangePasswordComponent is called', () => {
    changePasswordProps.onClosePress()
    expect(NavigationFunctions.NavigationFunctions.popToTop).toBeCalled()
  })

  test('should call popToTop when onSuccess ChangePasswordComponent is called', () => {
    changePasswordProps.onSuccess()
    expect(NavigationFunctions.NavigationFunctions.popToTop).toBeCalled()
  })

  test('should set changePasswordErrorDescription with a default value when ChangePasswordComponent is renderd', () => {
    expect(changePasswordProps.changePasswordErrorDescription).toBe(
      'change_password_modal_failure_subtitle'
    )
  })
})
