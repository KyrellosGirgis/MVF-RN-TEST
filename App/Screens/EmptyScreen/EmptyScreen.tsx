import React from 'react'
import { VFScreen } from '@vfgroup-oneplatform/foundation/Components'

import { navigateToDashboardScreen } from 'App/Screens/Helpers'

import { NavigationFunctions } from 'App/Containers'

const EmptyScreen = () => (
  <VFScreen
    title="Empty Screen"
    withHeaderSpace
    showBack
    testID="Empty_Screen"
    onBack={() => NavigationFunctions.goBack()}
    onClose={navigateToDashboardScreen}
    clearStatusBarEntries={false}
  />
)

export default EmptyScreen
