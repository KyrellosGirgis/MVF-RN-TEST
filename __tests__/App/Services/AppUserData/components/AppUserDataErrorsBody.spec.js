import React from 'react'

import renderer from 'react-test-renderer'

import AppUserDataErrorsBody from 'App/Services/AppUserData/components/AppUserDataErrors/AppUserDataErrorsBody'

import { testID } from 'App/Utils/Helpers/testId.helpers'

describe('render AppUserDataErrorsBody component ', () => {
  test('should render AppUserDataErrorsBody successfully', () => {
    const onProceed = jest.fn()
    const onCancel = jest.fn()

    const appUserDataErrorsBodyConfig = {
      body: null,
      primaryButtonTitle: 'proceedButtonTitle',
      secondaryButtonTitle: 'cancelButtonTitle',
      onPrimaryButtonPress: onProceed,
      onSecondaryButtonPress: onCancel
    }
    const element = renderer.create(
      <AppUserDataErrorsBody {...appUserDataErrorsBodyConfig} />
    )
    expect(
      element.root.findByProps({
        testID: testID('appUserDataErrorsBody')
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testKey: testID('appUserDataErrorsBodyPrimaryButton')
      }).props.title
    ).toEqual('proceedButtonTitle')

    element.root
      .findByProps({
        testKey: testID('appUserDataErrorsBodyPrimaryButton')
      })
      .props.onPress()

    expect(onProceed).toBeCalled()

    expect(
      element.root.findByProps({
        testKey: testID('appUserDataErrorsBodySecondaryButton')
      }).props.title
    ).toEqual('cancelButtonTitle')

    element.root
      .findByProps({
        testKey: testID('appUserDataErrorsBodySecondaryButton')
      })
      .props.onPress()
    expect(onCancel).toBeCalled()
  })
})
