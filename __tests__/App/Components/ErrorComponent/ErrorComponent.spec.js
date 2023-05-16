import { create } from 'react-test-renderer'
import React from 'react'

import ErrorComponent from 'App/Components/ErrorComponent/ErrorComponent'

describe('render ErrorComponent successfully', () => {
  test('should ErrorComponent render successfully', () => {
    const descAccessibilityLabel = 'errorTextID'
    const errorComponent = create(
      <ErrorComponent
        description="any text"
        descriptionTestId={descAccessibilityLabel}
      />
    )
    expect(errorComponent).toBeDefined()
    expect(
      errorComponent.root.findByProps({ testID: 'ErrorComponentWrapper' })
    ).toBeDefined()

    const errorText = errorComponent.root.findByProps({
      testID: descAccessibilityLabel
    })
    expect(errorText.props.i18nKey).toBe('any text')
  })

  test('should render try again button if withTryAgainButton is true', () => {
    const descAccessibilityLabel = 'errorTestID'
    const errorComponent = create(
      <ErrorComponent
        description="any text"
        descriptionTestId={descAccessibilityLabel}
        withTryAgainButton
        tryAgainButtonTestId="tryAgainButtonTestId"
      />
    )
    expect(
      errorComponent.root.findByProps({ testID: 'tryAgainButtonTestId_btn' })
    ).toBeDefined()
    expect(
      errorComponent.root.findByProps({ testID: 'tryAgainButtonTestId_icon' })
    ).toBeDefined()
    expect(
      errorComponent.root.findByProps({ testKey: 'tryAgainButtonTestId_txt' })
        .props.i18nKey
    ).toBe('dashboard_loading_error_try_again_button')
  })
})
