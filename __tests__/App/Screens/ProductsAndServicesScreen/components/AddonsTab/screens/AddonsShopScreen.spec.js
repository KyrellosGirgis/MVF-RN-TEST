import React from 'react'
import { shallow } from 'enzyme'

import AddonsShopScreen from 'App/Screens/ProductsAndServicesScreen/components/AddonsTab/screens/AddonsShopScreen'
import * as NavigationFunctions from 'App/Containers'
import { useApiCall } from 'App/Hooks'
import Routes from 'App/Containers/AppNavigation/Routes'

jest.mock('App/Hooks', () => ({
  ...jest.requireActual('App/Hooks'),
  useApiCall: jest.fn()
}))

const addon = {
  id: 'Long distance calls',
  image: {
    uri: 'https://media.vodafone.de/www/images/app/icons/music.png'
  },
  name: 'Long distance calls',
  price: '4.00',
  icon: 'maps',
  duration: 'month',
  expirationDate: '26/11/2020',
  title: "Don't get lost anywhere you travel this month.",
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. ',
  unit: 'EUR',
  isAutoRenewable: false,
  status: 'active'
}

describe('render Addons Shop Screen', () => {
  NavigationFunctions.NavigationFunctions.navigate = jest.fn()
  NavigationFunctions.NavigationFunctions.goBack = jest.fn()
  it('should render Addons Shop Screen successfully', () => {
    useApiCall.mockImplementation(() => {
      return {
        responseData: [addon],
        isError: false,
        isLoading: false,
        refresh: 'refresh'
      }
    })
    const element = shallow(<AddonsShopScreen />)
    const addOnsShopScreen = element.find({
      testID: 'AddOnsShopScreen'
    })
    expect(addOnsShopScreen).toBeDefined()
    const addOnsShopScreenProps = addOnsShopScreen.props()
    expect(addOnsShopScreenProps.isLoading).toEqual(false)
    expect(addOnsShopScreenProps.isError).toEqual(false)
    expect(addOnsShopScreenProps.addOnsData).toEqual([addon])
    expect(addOnsShopScreenProps.withCategories).toEqual(true)

    expect(addOnsShopScreenProps.errorText).toEqual(
      'shop_addons_screen_error_message'
    )
    expect(addOnsShopScreenProps.onTryAgainPress).toEqual('refresh')
    addOnsShopScreenProps.onClose()
    expect(NavigationFunctions.NavigationFunctions.goBack).toBeCalled()
    addOnsShopScreenProps.onBack()
    expect(NavigationFunctions.NavigationFunctions.goBack).toBeCalled()
  })

  it('Should navigate to Addons Details Screen when the addon Item Presed', () => {
    const element = shallow(<AddonsShopScreen />)
    const addOnsShopScreen = element.find({
      testID: 'AddOnsShopScreen'
    })
    const addOnsShopScreenProps = addOnsShopScreen.props()
    addOnsShopScreenProps.onItemPress(addon)
    expect(
      NavigationFunctions.NavigationFunctions.navigate
    ).toHaveBeenCalledWith(Routes.AddonsDetailsScreen, {
      addOnItem: addon,
      actionType: 'buy'
    })
  })
})
