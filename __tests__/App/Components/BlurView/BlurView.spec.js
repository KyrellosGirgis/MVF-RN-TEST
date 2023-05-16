import { create } from 'react-test-renderer'
import React from 'react'

import { store } from 'App/Redux'
import { BlurView } from 'App/Components'
import { emitEvent } from 'App/Services/AppEventEmitter/AppEventEmitter'
import { AppEvents } from 'App/Services/AppEventEmitter/AppEvents'

describe('render BlurView successfully', () => {
  beforeAll(() => {
    store.dispatch = jest.fn()
  })

  test('Ensure that BlurView to be defined ', () => {
    const blurviewComponent = create(<BlurView />)
    emitEvent(AppEvents.SHOW_BLUR_VIEW, { showBlurView: true })
    expect(blurviewComponent).toBeDefined()
    expect(
      blurviewComponent.root.findByProps({ testID: 'BlurView' })
    ).toBeDefined()
  })
})
