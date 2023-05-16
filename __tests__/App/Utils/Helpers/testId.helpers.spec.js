import { Platform } from 'react-native'

import { testID } from 'App/Utils/Helpers/testId.helpers'

jest.mock('react-native', function () {
  return {
    Platform: {
      OS: 'ios',
      select: function (specifics) {
        return specifics[this.OS]
      }
    }
  }
})

jest.mock('App/Utils/Helpers/testId.helpers', () =>
  jest.requireActual('App/Utils/Helpers/testId.helpers')
)

describe('Utils - testId.helpers', () => {
  it('should return undefined if no testId parameter is provided', () => {
    const testId = testID()
    expect(testId).toBeUndefined()
  })

  it('should return testId without prefix if we passed testId parameter and the platform is ios', () => {
    const testId = testID('title')
    expect(testId).toBe('title')
  })

  it('should return testId with prefix if we passed testId parameter and the platform is android', () => {
    Platform.OS = 'android'
    const testId = testID('title')
    expect(testId).toBe('id:id/title')
  })
})
