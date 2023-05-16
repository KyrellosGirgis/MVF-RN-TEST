import React from 'react'

import { create } from 'react-test-renderer'

import Routes from 'App/Containers/AppNavigation/Routes'

import { NavigationFunctions } from 'App/Containers'
import { UsageEditCard } from 'App/Screens/HomeScreen/components/Dashboard/components'

jest.mock('App/Containers/AppNavigation/NavigationFunctions', () => {
  return { navigate: jest.fn() }
})

describe('Edit dashboard tiles screen', () => {
  test('should render usage edit card component successfully', () => {
    const element = create(<UsageEditCard theme={{ name: 'light' }} />)

    const component = element.root.findByProps({
      testID: 'UsageEditCard_TouchableWithoutFeedback_Wrapper'
    }).props
    expect(component).toBeTruthy()

    const editCardText = element.root.findByProps({
      testID: 'UsageEditCard_Content_EditText'
    }).props
    expect(editCardText.i18nKey).toBe('usage_edit_button')
    const editCardIcon = element.root.findByProps({
      testID: 'UsageEditCard_Content_EditIcon'
    }).props
    expect(editCardIcon).toBeTruthy()
  })

  test('should call NavigationService pop when pressing on return to dashboard button', () => {
    const element = create(<UsageEditCard theme={{ name: 'light' }} />)

    const component = element.root.findByProps({
      testID: 'UsageEditCard_TouchableWithoutFeedback_Wrapper'
    }).props
    component.onPress()
    expect(NavigationFunctions.navigate).toHaveBeenCalledWith(
      Routes.EditDashboardTiles,
      {
        showBackButton: false
      }
    )
    expect(NavigationFunctions.navigate).toHaveBeenCalledTimes(1)
  })
})
