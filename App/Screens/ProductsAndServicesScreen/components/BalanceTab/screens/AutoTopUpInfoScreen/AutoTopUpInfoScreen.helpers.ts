import { getThemeImages } from 'App/Themes'

import { TOPUP_TAB_TYPES } from './AutoTopUpInfoScreen.constants'

import { translate } from 'App/Utils'

const getNumberIconsByTheme = (themeName: string) => {
  const Images = getThemeImages(themeName)
  return [
    Images.icNumberOne,
    Images.icNumberTwo,
    Images.icNumberThree,
    Images.icNumberFour,
    Images.icNumberFive,
    Images.icNumberSix,
    Images.icNumberSeven,
    Images.icNumberEight,
    Images.icNumberNine
  ]
}

const isActive = (selectedTab: string, currentTab: string) =>
  selectedTab === currentTab

const getDescrptionsList = (currentTab: TOPUP_TAB_TYPES) =>
  translate(
    `auto_topup_quick_action_info_${
      currentTab === TOPUP_TAB_TYPES.COMFORT_TOPUP ? 'first' : 'second'
    }_tab_descriptions`
  )

export { getNumberIconsByTheme, isActive, getDescrptionsList }
