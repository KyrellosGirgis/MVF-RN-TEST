import { APP_DYNAMICS_KEY } from 'App/Services/Keys/Keys.helper'

const appDynamicsConfig = {
  appKey: APP_DYNAMICS_KEY,
  collectorURL: 'https://fra-col.eum-appdynamics.com',
  screenshotURL: 'https://fra-col.eum-appdynamics.com',
  jsAgentAjaxEnabled: true,
  anrDetectionEnabled: true,
  autoInstrument: true
}
export default appDynamicsConfig
