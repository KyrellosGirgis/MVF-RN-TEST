import React from 'react'
import { create } from 'react-test-renderer'
import AppPermissions from '@vfgroup-oneplatform/framework/Settings/AppPermissions/AppPermissions'

import DevicePermissionsScreen from 'App/Screens/Settings/Components/DevicePermissionsScreen/DevicePermissionsScreen'

describe('DevicePermissions Component', () => {
  test('should render correctly ', async () => {
    const instance = create(<DevicePermissionsScreen />)
    const coreDevicePermissions = instance.root.findAllByType(AppPermissions)[0]
    expect(instance).toBeDefined()
    expect(coreDevicePermissions).toBeDefined()
  })
})
