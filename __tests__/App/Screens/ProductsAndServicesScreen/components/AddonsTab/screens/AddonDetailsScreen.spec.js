import React from 'react'
import { shallow } from 'enzyme'

import { useRoute } from '@react-navigation/native'

import AddonDetailsScreen from 'App/Screens/ProductsAndServicesScreen/components/AddonsTab/screens/AddonDetailsScreen'
import * as NavigationFunctions from 'App/Containers'

const addon = {
  id: 'Long distance calls',
  image: { uri: 'https://media.vodafone.de/www/images/app/icons/music.png' },
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
jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useRoute: jest.fn(() => ({
      params: {
        addOnItem: addon,
        actionType: 'Remove',
        isOpenedThrowInLineContent: false
      }
    }))
  }
})

describe('render Addons details screen ', () => {
  NavigationFunctions.NavigationFunctions.pop = jest.fn()
  NavigationFunctions.NavigationFunctions.goBack = jest.fn()
  it('should render AddOns details screen successfully', async () => {
    const element = shallow(<AddonDetailsScreen />)
    const addonDetailsScreen = element.find({
      testID: 'AddOnDetailsScreen'
    })
    expect(addonDetailsScreen).toBeDefined()
    const addonDetailsScreenProps = addonDetailsScreen.props()
    expect(addonDetailsScreenProps.mode).toEqual('Remove')
    expect(addonDetailsScreenProps.name).toEqual(addon.name)
    expect(addonDetailsScreenProps.title).toEqual(addon.title)
    expect(addonDetailsScreenProps.description).toEqual(addon.description)
    expect(addonDetailsScreenProps.startingDate).toEqual(addon.startingDate)
    expect(addonDetailsScreenProps.expirationDate).toEqual(addon.expirationDate)
    expect(addonDetailsScreenProps.isAutoRenewable).toEqual(
      addon.isAutoRenewable
    )
    expect(addonDetailsScreenProps.duration).toEqual(addon.duration)
    expect(addonDetailsScreenProps.price).toEqual(addon.price)
    expect(addonDetailsScreenProps.unit).toEqual(addon.unit)
    expect(addonDetailsScreenProps.status).toEqual(addon.status)
    addonDetailsScreenProps.onClose()
    expect(NavigationFunctions.NavigationFunctions.goBack).toBeCalled()
    addonDetailsScreenProps.onBack()
    expect(NavigationFunctions.NavigationFunctions.goBack).toBeCalled()
    addonDetailsScreenProps.onPressConfirm()
    expect(NavigationFunctions.NavigationFunctions.goBack).toBeCalled()
  })
  it('should invoke goBack when action Type is buy and opened throw InLineContent', () => {
    useRoute.mockImplementation(() => ({
      params: {
        addOnItem: addon,
        actionType: 'buy',
        isOpenedThrowInLineContent: true
      }
    }))

    const element = shallow(<AddonDetailsScreen />)
    const addonDetailsScreen = element.find({
      testID: 'AddOnDetailsScreen'
    })
    const addonDetailsScreenProps = addonDetailsScreen.props()
    expect(addonDetailsScreenProps.mode).toEqual('buy')
    addonDetailsScreenProps.onPressConfirm()
    expect(NavigationFunctions.NavigationFunctions.goBack).toBeCalled()
  })

  it('should invoke pop methid when action Type is buy and not opened throw InLineContent', () => {
    useRoute.mockImplementation(() => ({
      params: {
        addOnItem: addon,
        actionType: 'buy',
        isOpenedThrowInLineContent: false
      }
    }))

    const element = shallow(<AddonDetailsScreen />)
    const addonDetailsScreen = element.find({
      testID: 'AddOnDetailsScreen'
    })
    const addonDetailsScreenProps = addonDetailsScreen.props()
    expect(addonDetailsScreenProps.mode).toEqual('buy')
    addonDetailsScreenProps.onPressConfirm()
    expect(NavigationFunctions.NavigationFunctions.pop).toHaveBeenCalledWith(2)
  })
})
