import * as RN from 'react-native'

import { addIOSAppDataResetingListener } from 'App/Utils/Helpers/phoneAppSetting.ios'

describe('addIOSAppDataResetingListener tests', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('test addIOSAppDataResetingListener should call watchKeys', () => {
    RN.NativeModules.SettingsManager.getConstants = jest.fn(() => 1)
    RN.Settings.watchKeys = jest.fn(() => 1)
    addIOSAppDataResetingListener()
    expect(RN.Settings.watchKeys).toBeCalled()
  })
})
