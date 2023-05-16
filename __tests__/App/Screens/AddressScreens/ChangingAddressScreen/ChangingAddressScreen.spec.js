/* eslint-disable import/namespace */
import React from 'react'
import { create, act } from 'react-test-renderer'
import ChangeAddressScreen from '@vfgroup-oneplatform/framework/Address/Screens/ChangeAddressScreen'

import { changeAddress } from 'App/Services/API/Requests/Address/Addresses.requests'

import ChangingAddressScreen from 'App/Screens/AddressScreens/ChangingAddressScreen/ChangingAddressScreen'
import { navigateToDashboardScreen } from 'App/Screens/Helpers'
import NavigationFunctions from 'App/Containers/AppNavigation/NavigationFunctions'

const countries = [
  { value: 'SVK', label: 'Slovakia' },
  { value: 'SVN', label: 'Slovenia' },
  { value: 'SLB', label: 'Solomon Islands' },
  { value: 'SOM', label: 'Somalia' }
]
jest.mock('App/Utils/Helpers/generic.helpers', () => {
  return {
    translate: () => countries
  }
})
jest.mock('@react-navigation/native', () => {
  return {
    useRoute: jest.fn(() => ({
      params: {
        currentAddress: {},
        refresh: jest.fn()
      }
    }))
  }
})

jest.mock('App/Services/API/Requests/Address/Addresses.requests', () => {
  return {
    changeAddress: jest.fn()
  }
})
jest.mock('App/Containers/AppNavigation/NavigationFunctions', () => ({
  navigate: jest.fn(),
  goBack: jest.fn()
}))
jest.mock('App/Screens/Helpers', () => ({
  navigateToDashboardScreen: jest.fn()
}))

describe('render Changing Address commponent', () => {
  let ChangeAddressComponent, ChangeAddressComponentProps
  beforeAll(async () => {
    let element
    await act(async () => {
      element = create(<ChangingAddressScreen />)
      jest.runAllTimers()
    })
    ChangeAddressComponent = element.root.findAllByType(ChangeAddressScreen)[0]
    ChangeAddressComponentProps = ChangeAddressComponent.props
  })

  test('should render Changing Address component successfully', () => {
    expect(ChangeAddressComponent).toBeDefined()
    expect(ChangeAddressComponentProps.countries).toEqual(countries)
  })
  test('should invoke onClose when close Changing Address component', () => {
    ChangeAddressComponentProps.onClose()
    expect(navigateToDashboardScreen).toHaveBeenCalled()
  })
  test('should invoke onBack when back from Changing Address component', () => {
    ChangeAddressComponentProps.onBack()
    expect(NavigationFunctions.goBack).toHaveBeenCalled()
  })
  test('should invoke handleOnSuccessButtonPress when click on Success Button in the quick action', () => {
    ChangeAddressComponentProps.onSuccess()
    expect(navigateToDashboardScreen).toHaveBeenCalled()
  })
  test('should invoke handleOnResultModalClose when click on close Button in the quick action', () => {
    ChangeAddressComponentProps.onResultModalClose()
    expect(NavigationFunctions.goBack).toHaveBeenCalled()
  })
  test('should call Put Address Service when click on Save Address button in Changing Address component', () => {
    ChangeAddressComponentProps.onSaveAddressPress()
    expect(changeAddress).toHaveBeenCalled()
  })
})
