import { minutesToMilliSeconds } from 'App/Utils/Helpers/date.helpers'

describe('test date Util Helper functions ', () => {
  test('test minutesToMillSeconds method', () => {
    const minValue = 15
    const millsecondValue = 900000
    expect(minutesToMilliSeconds(minValue)).toEqual(millsecondValue)
  })
})
