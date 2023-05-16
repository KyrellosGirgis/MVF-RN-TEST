/* eslint-disable import/namespace */

import { testID } from 'App/Utils/Helpers/testId.helpers'
import * as testIdsHelpers from 'App/Utils/testIds/settingTestIds.helpers'

describe('test Utils testIds Helper functions ', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('applyTestIDWrapper should wrap element by testID and assign it to core objects ', () => {
    const keys = { key1: 'key1', key2: 'key2' }
    const coreKeys = { key1: 'coreKey1', key2: 'coreKey2' }
    const finalKeys = { key1: testID('key1'), key2: testID('key2') }
    testIdsHelpers.applyTestIDWrapper(coreKeys, keys)
    expect(coreKeys).toMatchObject(finalKeys)
  })
  test('should call applyTestIDWrapper for every core library when settingCoreTestIds', () => {
    testIdsHelpers.applyTestIDWrapper = jest.fn()
    testIdsHelpers.settingCoreTestIds()
    expect(testIdsHelpers.applyTestIDWrapper).toBeCalledTimes(7)
  })
})
