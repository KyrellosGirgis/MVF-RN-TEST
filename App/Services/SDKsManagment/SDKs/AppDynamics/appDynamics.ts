import { Instrumentation } from '@appdynamics/react-native-agent'

import appDynamicsConfig from './appDynamicsConfig'

let appDynamicsShutdowned: boolean

const startAppDynamics = async () => {
  await Instrumentation.start(appDynamicsConfig)
  appDynamicsShutdowned === true && Instrumentation.restartAgent()

  appDynamicsShutdowned = false
}

const stopAppDynamics = () => {
  if (appDynamicsShutdowned === false) {
    Instrumentation.shutdownAgent()
    appDynamicsShutdowned = true
  }
}

export { startAppDynamics, stopAppDynamics }
