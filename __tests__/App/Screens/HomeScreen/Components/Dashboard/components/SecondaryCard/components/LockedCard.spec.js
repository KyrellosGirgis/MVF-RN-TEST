import { create } from 'react-test-renderer'
import React from 'react'

import LockedCard from 'App/Screens/HomeScreen/components/Dashboard/components/SecondaryCard/components/LockedCard/LockedCard'

describe('Testing Secondary Card Locked card component', () => {
  test('should render locked card component correctly', () => {
    const element = create(<LockedCard />)
    const lockedCardDescription = element.root.findByProps({
      testID: 'SecondaryCardLockedBillDescription_txt'
    })
    expect(
      element.root.findByProps({
        testID: 'SecondaryCardLockedBillContainer'
      })
    ).toBeDefined()
    expect(
      element.root.findByProps({
        testID: 'SecondaryCardLockedBillImage_icon'
      })
    ).toBeDefined()
    expect(lockedCardDescription).toBeDefined()
    expect(lockedCardDescription.props.i18nKey).toBe(
      'sub_tray_access_secure_content_subtitle'
    )
  })
})
