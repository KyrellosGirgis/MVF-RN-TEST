/* eslint-disable import/namespace */
import React from 'react'
import { create } from 'react-test-renderer'

import { VFScreen } from '@vfgroup-oneplatform/foundation/Components'

import PrivacySettingsDetails from 'App/Screens/PrivacySettings/Components/PrivacySettingsDetails/PrivacySettingsDetails'
import * as NavigationFunctions from 'App/Containers'

describe('Test ImprintDetailsScreen', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should render ImprintDetailsScreenscreen successfully', () => {
    NavigationFunctions.NavigationFunctions.popToTop = jest.fn()
    NavigationFunctions.NavigationFunctions.goBack = jest.fn()

    const element = create(<PrivacySettingsDetails testId="test" />)

    const privacySettingsDetailsComponent =
      element.root.findAllByType(VFScreen)[0]

    expect(privacySettingsDetailsComponent).toBeTruthy()
    privacySettingsDetailsComponent.props.onClose()
    expect(
      NavigationFunctions.NavigationFunctions.popToTop
    ).toHaveBeenCalledTimes(1)

    privacySettingsDetailsComponent.props.onBack()
    expect(
      NavigationFunctions.NavigationFunctions.goBack
    ).toHaveBeenCalledTimes(1)
  })
})
