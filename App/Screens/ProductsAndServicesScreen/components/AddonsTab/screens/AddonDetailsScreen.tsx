import React from 'react'

// eslint-disable-next-line import/named
import { RouteProp, useRoute } from '@react-navigation/native'

import AddOnDetailsScreen from '@vfgroup-oneplatform/framework/AddOns/Screens/AddOnDetailsScreen'

import {
  AddOnDetailsScreenRouteProps,
  ADDONS_ACTIONS
} from 'App/Screens/ProductsAndServicesScreen/components/AddonsTab/Addons.d'

import { NavigationFunctions } from 'App/Containers'
import { testID } from 'App/Utils/Helpers/testId.helpers'

const AddonDetailsScreen = () => {
  const { addOnItem, actionType, isOpenedThrowInLineContent } =
    useRoute<RouteProp<AddOnDetailsScreenRouteProps, 'params'>>().params
  const onPressConfirm = () => {
    switch (actionType) {
      case ADDONS_ACTIONS.REMOVE:
        NavigationFunctions.goBack()
        break
      case ADDONS_ACTIONS.BUY:
        isOpenedThrowInLineContent
          ? NavigationFunctions.goBack()
          : NavigationFunctions.pop(2)
        break
    }
  }

  return (
    <AddOnDetailsScreen
      testID={testID('AddOnDetailsScreen')}
      {...addOnItem}
      onPressConfirm={onPressConfirm}
      mode={actionType}
      onClose={() => NavigationFunctions.goBack()}
      onBack={() => NavigationFunctions.goBack()}
      onToggleAutoRenew={() => {}}
    />
  )
}
export default AddonDetailsScreen
