/* eslint-disable import/namespace */
import React from 'react'
import { create } from 'react-test-renderer'

import { ImprintDetailsScreen } from 'App/Screens'
import PrivacySettingsDetails from 'App/Screens/PrivacySettings/Components/PrivacySettingsDetails/PrivacySettingsDetails'

describe('Test ImprintDetailsScreen', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should render ImprintDetailsScreenscreen successfully', () => {
    const element = create(<ImprintDetailsScreen />)

    const privacySettingsDetailsComponent = element.root.findAllByType(
      PrivacySettingsDetails
    )[0]

    expect(privacySettingsDetailsComponent).toBeTruthy()
  })
})
