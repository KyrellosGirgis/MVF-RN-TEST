import React from 'react'
import { create } from 'react-test-renderer'
import StatusView from '@vfgroup-oneplatform/foundation/Components/StatusView'

import SuccessModalBody from 'App/Screens/PrivacySettings/Components/SuccessModalBody/SuccessModalBody'

describe('SuccessModalBody test', () => {
  test('should render Success Modal Body successfully', () => {
    const onPrimaryButtonPress = jest.fn()
    const onSecondaryButtonPress = jest.fn()

    const element = create(
      <SuccessModalBody
        onPrimaryButtonPress={onPrimaryButtonPress}
        onSecondaryButtonPress={onSecondaryButtonPress}
      />
    )

    const statusViewComponent = element.root.findAllByType(StatusView)[0]

    expect(statusViewComponent).toBeTruthy()
    expect(statusViewComponent.props.title).toBe(
      'privacy_settings_quick_action_title'
    )
    expect(statusViewComponent.props.description).toBe(
      'privacy_settings_quick_action_description'
    )
    expect(statusViewComponent.props.primaryButtonProps.title).toBe(
      'privacy_settings_quick_action_primary_button_text'
    )
    expect(statusViewComponent.props.secondaryButtonProps.title).toBe(
      'privacy_settings_quick_action_secondary_button_text'
    )

    statusViewComponent.props.primaryButtonProps.onPress()
    expect(onPrimaryButtonPress).toHaveBeenCalled()

    statusViewComponent.props.secondaryButtonProps.onPress()
    expect(onSecondaryButtonPress).toHaveBeenCalled()
  })
})
