/* eslint-disable import/namespace */
import React from 'react'
import { create } from 'react-test-renderer'

import * as LoginFlowManager from 'App/Services/LoginFlowManager/LoginFlowManager'

import LoginPlaceholder from 'App/Screens/Login/LoginPlaceholder/LoginPlaceholder'

describe('LoginPlaceholder test', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should render LoginPlaceholder successfully', () => {
    LoginFlowManager.startLoginFlow = jest.fn()

    create(<LoginPlaceholder />)

    expect(LoginFlowManager.startLoginFlow).toHaveBeenCalledTimes(1)
  })
})
