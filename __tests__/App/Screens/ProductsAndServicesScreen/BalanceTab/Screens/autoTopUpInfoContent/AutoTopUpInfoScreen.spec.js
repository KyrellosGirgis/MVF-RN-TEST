import React from 'react'

import { create } from 'react-test-renderer'

import AutoTopupInfoScreen from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/screens/AutoTopUpInfoScreen/AutoTopUpInfoScreen'

const comfortTopupTabDescriptions = [
  'Choose your amount for your regular Top-up if your balance is equal to or less than 5 €',
  'Confirm your mobile number',
  'Set up the auto top-up functionality by check it on the form',
  'Select payment methode e.g. Klarna',
  'After being forwarded to Klarna. Login to your Klarna account and confirm your auto Top-up payment.'
]

jest.mock('App/Utils/Helpers/generic.helpers', () => {
  return {
    translate: () => comfortTopupTabDescriptions
  }
})

describe('Auto topup info overlay screen', () => {
  test('should render AutoTopUpInfoOverlayContent component successfully', () => {
    const element = create(<AutoTopupInfoScreen />)

    expect(
      element.root.findByProps({
        testID: 'autoTopupOverlaySubtitle'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'autoTopupOverlaySection'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'autoTopupOverlayFooter'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'autoTopupOverlayFooterSeparator'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'autoTopupOverlayFooterText'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'autoTopupOverlayFooterButton'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'autoTopupOverlayContainer'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'autoTopupOverlayTabsContainer'
      })
    ).toBeDefined()

    expect(
      element.root.findAllByProps({
        testID: 'autoTopupOverlayTab'
      }).length
    ).toBe(2)
  })
})
