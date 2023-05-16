import React from 'react'
import { create, act } from 'react-test-renderer'

import CurrentScreenCard from 'App/Screens/DeveloperSettings/components/CurrentScreenCard/CurrentScreenCard'

describe('Test CurrentScreenCard', () => {
  test('should render CurrentScreenCard successfully', async () => {
    let element

    await act(async () => {
      element = create(<CurrentScreenCard />)
    })

    expect(
      element.root.findByProps({
        testID: 'current_screen_title'
      })
    ).toBeDefined()
  })
})
