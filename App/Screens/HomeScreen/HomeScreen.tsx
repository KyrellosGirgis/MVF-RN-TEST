import React, { useEffect } from 'react'
import { TRAY_TYPES, withTray } from '@vfgroup-oneplatform/framework/Dashboard'
import _pick from 'lodash/pick'

import { HomeProps } from './HomeScreen.d'
import Dashboard from './components/Dashboard/Dashboard'
import Tray from './components/Tray/Tray'

import PrivacyAndPermissionsUpdateOverlay from './components/PrivacyPermissionsOverlay/PrivacyPermissionsOverlay'

import { AppLifecycleManager } from 'App/Services/AppLifecycleManager/AppLifecycleManager'

import { WithTrayProps } from 'App/types'

function HomeScreen({ splashProps, ...props }: HomeProps) {
  const withTrayProps = _pick<WithTrayProps>(props, [
    'setTrayVisable',
    'setTrayConfig',
    'setTrayType',
    'isTrayVisable',
    'setTrayHeight'
  ]) as WithTrayProps

  useEffect(() => {
    AppLifecycleManager.executeHomeScreenLaunchingTasks()
  }, [])

  useEffect(() => {
    withTrayProps.setTrayType(TRAY_TYPES.MAIN)
  }, [])

  return (
    <>
      <Dashboard splashProps={splashProps} />
      <Tray withTrayProps={withTrayProps} />
      <PrivacyAndPermissionsUpdateOverlay />
    </>
  )
}

export default withTray(HomeScreen)
