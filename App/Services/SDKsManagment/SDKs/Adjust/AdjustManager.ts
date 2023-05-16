import { Adjust, AdjustConfig } from 'react-native-adjust'

import Config from 'react-native-config'

import { ADJUST_KEY } from 'App/Services/Keys/Keys.helper'

let adjustConfig: AdjustConfig

const startAdjust = () => {
  adjustConfig = new AdjustConfig(
    ADJUST_KEY,
    Config.IS_PRODUCTION === 'true'
      ? AdjustConfig.EnvironmentProduction
      : AdjustConfig.EnvironmentSandbox
  )
  Adjust.create(adjustConfig)
  Adjust.setEnabled(true)
}
const stopAdjust = () => {
  Adjust.isEnabled((enabled: boolean) => {
    if (enabled) {
      Adjust.setEnabled(false)
    }
  })
}

export { stopAdjust, startAdjust, adjustConfig }
