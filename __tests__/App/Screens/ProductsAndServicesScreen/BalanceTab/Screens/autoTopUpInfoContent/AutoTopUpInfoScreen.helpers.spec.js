import DarkImages from 'App/Themes/Modes/Dark/Images'
import LightImages from 'App/Themes/Modes/Light/Images'

import {
  getNumberIconsByTheme,
  isActive
} from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/screens/AutoTopUpInfoScreen/AutoTopUpInfoScreen.helpers'

describe('Test AutoTopupOverlayHelper', () => {
  const numbersLightImages = [
    LightImages.icNumberOne,
    LightImages.icNumberTwo,
    LightImages.icNumberThree,
    LightImages.icNumberFour,
    LightImages.icNumberFive,
    LightImages.icNumberSix,
    LightImages.icNumberSeven,
    LightImages.icNumberEight,
    LightImages.icNumberNine
  ]
  const numbersDarkImages = [
    DarkImages.icNumberOne,
    DarkImages.icNumberTwo,
    DarkImages.icNumberThree,
    DarkImages.icNumberFour,
    DarkImages.icNumberFive,
    DarkImages.icNumberSix,
    DarkImages.icNumberSeven,
    DarkImages.icNumberEight,
    DarkImages.icNumberNine
  ]

  it('getNumberIconsByTheme should return numbers light images', () => {
    expect(getNumberIconsByTheme('light')).toEqual(numbersLightImages)
  })

  it('getNumberIconsByTheme should return numbers dark images', () => {
    expect(getNumberIconsByTheme('dark')).toEqual(numbersDarkImages)
  })

  it('getNumberIconsByTheme should return the numbers light theme images when unknown theme is provided', () => {
    expect(getNumberIconsByTheme('randomTheme')).toEqual(numbersLightImages)
  })

  it('isActive return true if the function inputs are the same', () => {
    expect(isActive('selectedTab', 'selectedTab')).toEqual(true)
  })

  it('isActive return false if the function inputs are different', () => {
    expect(isActive('selectedTab', 'currentTab')).toEqual(false)
  })
})
