import React from 'react'

import { SpeedChecker } from '@vfgroup-oneplatform/netperform'

import { navigateToDashboardScreen } from 'App/Screens/Helpers'
import { store } from 'App/Redux'

const SpeedCheckerScreen = () => {
  const { currentlyActiveSubscription } = store.getState().appUserData

  return (
    <SpeedChecker
      onClose={navigateToDashboardScreen}
      showMap={true}
      phoneNumber={currentlyActiveSubscription?.itemSubTitle}
    />
  )
}

export default SpeedCheckerScreen
