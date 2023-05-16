import React from 'react'
import AddressScreen from '@vfgroup-oneplatform/framework/Address/Screens/AddressScreen/AddressScreen'

import DummyTempErrorScreen from 'App/Screens/DummyTempErrorScreen/DummyTempErrorScreen'

import { fetchUserAddresses } from 'App/Services/API/Requests/Address/Addresses.requests'
import { AddressUIType } from 'App/Services/API/Requests/Address/Addresses'
import { useApiCall } from 'App/Hooks'

import NavigationFunctions from 'App/Containers/AppNavigation/NavigationFunctions'
import Routes from 'App/Containers/AppNavigation/Routes'

const AddressesOverviewScreen = () => {
  const {
    responseData: addresses,
    isError,
    isLoading,
    refresh
  } = useApiCall(fetchUserAddresses)

  const handlePressChangeAddress = (addressToBeChanged: AddressUIType) => {
    if (addressToBeChanged.addressChangeAllowed) {
      NavigationFunctions.navigate(Routes.ChangingAddressScreen, {
        currentAddress: addressToBeChanged,
        refresh: refresh
      })
    }
  }

  return isError ? (
    <DummyTempErrorScreen />
  ) : (
    <AddressScreen
      isLoading={isLoading}
      addressData={addresses ?? []}
      onClose={NavigationFunctions.goBack}
      onChangeAddressPress={() => handlePressChangeAddress(addresses[0])}
    />
  )
}

export default AddressesOverviewScreen
