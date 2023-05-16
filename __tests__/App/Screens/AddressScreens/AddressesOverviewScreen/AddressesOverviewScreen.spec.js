/* eslint-disable import/namespace */
import React from 'react'
import { create, act } from 'react-test-renderer'
import AddressScreen from '@vfgroup-oneplatform/framework/Address/Screens/AddressScreen/AddressScreen'

import { ShimmerWrapper } from '@vfgroup-oneplatform/foundation/Components/Shimmer'

import DummyTempErrorScreen from 'App/Screens/DummyTempErrorScreen/DummyTempErrorScreen'
import AddressesOverviewScreen from 'App/Screens/AddressScreens/AddressesOverviewScreen/AddressesOverviewScreen'
import NavigationFunctions from 'App/Containers/AppNavigation/NavigationFunctions'

import { useApiCall } from 'App/Hooks'
import Routes from 'App/Containers/AppNavigation/Routes'

jest.mock('App/Hooks', () => ({
  ...jest.requireActual('App/Hooks'),
  useApiCall: jest.fn()
}))
jest.mock('App/Containers/AppNavigation/NavigationFunctions', () => ({
  navigate: jest.fn(),
  goBack: jest.fn()
}))

describe('AdressOverview screen rendering test', () => {
  let element, AddressComponent

  beforeEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(async () => {
    useApiCall.mockImplementation(() => {
      return {
        responseData: [
          {
            city: 'Düsseldorf',
            country: 'Deutschland',
            houseOrFlat: '3',
            postCode: '40549',
            streetName: 'Ferdinand-Braun-Platz',
            addressChangeAllowed: true,
            addressType: 'CUSTOMER'
          }
        ],
        isError: false,
        isLoading: false,
        refresh: 'refresh'
      }
    })
    await act(async () => {
      element = create(<AddressesOverviewScreen />)
    })
    AddressComponent = element.root.findAllByType(AddressScreen)[0]
  })

  test('Should render AdressOverview component successfully', async () => {
    expect(AddressComponent).toBeDefined()
  })

  test('Should show shimmering while getting data from API', async () => {
    let screen
    useApiCall.mockImplementation(() => {
      return {
        isError: false,
        isLoading: true
      }
    })
    await act(async () => {
      screen = create(<AddressesOverviewScreen />)
    })

    expect(screen.root.findAllByType(ShimmerWrapper)[0]).toBeDefined()
    expect(
      screen.root.findAllByType(ShimmerWrapper)[0].props.isLoading
    ).toBeTruthy()
  })

  test('Should show error screen when API fail', async () => {
    let screen
    useApiCall.mockImplementation(() => {
      return {
        isError: true,
        isLoading: false
      }
    })
    await act(async () => {
      screen = create(<AddressesOverviewScreen />)
    })
    const AddressScreenComponent = screen.root.findAllByType(AddressScreen)[0]
    expect(AddressScreenComponent).toBe(undefined)
    const ErrorComponent = screen.root.findAllByType(DummyTempErrorScreen)[0]
    expect(ErrorComponent).toBeDefined()
  })

  test('Should go back when pressed on close button', async () => {
    AddressComponent = element.root.findAllByType(AddressScreen)[0]
    const AddressComponentProps = AddressComponent.props
    AddressComponentProps.onClose()
    expect(NavigationFunctions.goBack).toBeCalled()
  })

  test('Should navigate to change address screen when clicked on change andress button and change address is allowed', async () => {
    const AddressComponentProps = AddressComponent.props
    AddressComponentProps.onChangeAddressPress()
    expect(NavigationFunctions.navigate).toHaveBeenCalledWith(
      Routes.ChangingAddressScreen,
      {
        currentAddress: {
          addressChangeAllowed: true,
          addressType: 'CUSTOMER',
          city: 'Düsseldorf',
          country: 'Deutschland',
          houseOrFlat: '3',
          postCode: '40549',
          streetName: 'Ferdinand-Braun-Platz'
        },
        refresh: 'refresh'
      }
    )
  })
  test('Should not navigate to change address screen when clicked on change andress button and change address is not allowed', async () => {
    let screen
    useApiCall.mockImplementation(() => {
      return {
        responseData: [
          {
            city: 'Düsseldorf',
            country: 'Deutschland',
            houseOrFlat: '3',
            postCode: '40549',
            streetName: 'Ferdinand-Braun-Platz',
            addressChangeAllowed: false,
            addressType: 'CUSTOMER'
          }
        ],
        isError: false,
        isLoading: false
      }
    })
    await act(async () => {
      screen = create(<AddressesOverviewScreen />)
    })
    const AddressScreenComponent = screen.root.findAllByType(AddressScreen)[0]
    const AddressComponentProps = AddressScreenComponent.props
    AddressComponentProps.onChangeAddressPress()
    expect(NavigationFunctions.navigate).toHaveBeenCalledTimes(0)
  })
})
