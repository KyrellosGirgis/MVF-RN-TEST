import React from 'react'
import ChangeAddressScreen from '@vfgroup-oneplatform/framework/Address/Screens/ChangeAddressScreen'

import { StatusBar } from 'react-native'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

// eslint-disable-next-line import/named
import { RouteProp, useRoute } from '@react-navigation/native'

import { translate } from 'App/Utils'
import { changeAddress } from 'App/Services/API/Requests/Address/Addresses.requests'
import { AddressUIType } from 'App/Services/API/Requests/Address/Addresses'
import NavigationFunctions from 'App/Containers/AppNavigation/NavigationFunctions'
import { navigateToDashboardScreen } from 'App/Screens/Helpers'

interface ChangingAddressRouteProps {
  params: {
    currentAddress: AddressUIType
    refresh: Function
  }
}

const ChangingAddressScreen = () => {
  const { currentAddress, refresh } =
    useRoute<RouteProp<ChangingAddressRouteProps, 'params'>>().params

  const onSaveAddress = async (data: any) => {
    await changeAddress({ ...currentAddress, ...data })
  }
  const navigateBackToAddressesOverviewScreen = () => {
    refresh()
    NavigationFunctions.goBack()
  }

  const countries = translate('countries')
  const theme = useTheme()
  return (
    <>
      <ChangeAddressScreen
        addressData={currentAddress}
        countries={countries}
        onSaveAddressPress={onSaveAddress}
        countryLabel={translate('change_address_form_country_label')}
        onSuccess={navigateToDashboardScreen}
        onResultModalClose={navigateBackToAddressesOverviewScreen}
        onClose={navigateToDashboardScreen}
        onBack={navigateBackToAddressesOverviewScreen}
      />
      {/* TODO(remove change status bar background color workaround after
        removing the change status bar background color from the ChangeAddressScreen component done ) */}
      <StatusBar backgroundColor={theme.isDark ? 'black' : 'white'} />
    </>
  )
}

export default ChangingAddressScreen
