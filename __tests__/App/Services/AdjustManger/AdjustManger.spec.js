import { Adjust, AdjustConfig } from 'react-native-adjust'

import {
  adjustConfig,
  startAdjust
} from 'App/Services/SDKsManagment/SDKs/Adjust/AdjustManager'

jest.mock('react-native-adjust', () => ({
  Adjust: { create: jest.fn(), setEnabled: jest.fn() },
  AdjustConfig: jest.fn()
}))
describe('test Adjust manager functions ', () => {
  test('should connect to Adjst when calling startAdjust', () => {
    expect(adjustConfig).toEqual(undefined)

    startAdjust()

    expect(AdjustConfig).toHaveBeenCalled()
    expect(Adjust.create).toHaveBeenCalled()
  })
})
