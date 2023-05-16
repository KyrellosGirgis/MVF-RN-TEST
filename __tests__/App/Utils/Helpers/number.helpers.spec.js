import { trimAfterDecimal } from 'App/Utils/Helpers/number.helpers'

describe('test trimAfterDecimal function ', () => {
  test('should return the integer part if countAfterDecimal <= 0', () => {
    expect(trimAfterDecimal(12.0981, 0)).toBe('12')
    expect(trimAfterDecimal(12.0981, -1)).toBe('12')
  })

  test('should return the integer part and two digits after decimal if no countAfterDecimal passed', () => {
    expect(trimAfterDecimal(12.0981)).toBe('12.09')
    expect(trimAfterDecimal(12)).toBe('12.00')
    expect(trimAfterDecimal(12.3)).toBe('12.30')
  })

  test('should return the integer part and four digits after decimal if countAfterDecimal == 4', () => {
    expect(trimAfterDecimal(12.09819, 4)).toBe('12.0981')
    expect(trimAfterDecimal(12, 4)).toBe('12.0000')
    expect(trimAfterDecimal(12.38, 4)).toBe('12.3800')
  })
})
