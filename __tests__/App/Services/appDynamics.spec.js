import { Instrumentation } from '@appdynamics/react-native-agent'

import {
  startAppDynamics,
  stopAppDynamics
} from 'App/Services/SDKsManagment/SDKs/AppDynamics/appDynamics'

describe('Test AppDynamics  function ', () => {
  test('should startAppDynamics call start function', async () => {
    await startAppDynamics()
    expect(Instrumentation.start).toHaveBeenCalled()
  })

  test('should  stopAppDynamics call shutdownAgent function ', () => {
    stopAppDynamics()
    expect(Instrumentation.shutdownAgent).toHaveBeenCalled()
  })
})
