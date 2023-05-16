import {
  constructFooterText,
  getFormattedValue,
  isUsageUnlimited
} from 'App/Services/API/Requests/Dashboard/subscriptionUnbilledUsage/UsageData.helpers'

describe('test usage data helpers', () => {
  it('should constructFooterText return as expected when unlimited data usage', () => {
    const result = constructFooterText('daten', true, '2022-01-04')
    expect(result).toEqual('unlimited_access')
  })

  it('should constructFooterText return as expected when unlimited voice usage', () => {
    const result = constructFooterText('minuten', true, '2022-01-04')
    expect(result).toEqual('unlimited_calls')
  })

  it('should constructFooterText return as expected when limited usage', () => {
    const result = constructFooterText('daten', false, '2022-01-04')
    expect(result).toEqual('resetIn_other')
  })

  it('should getFormattedValue return as expected when limited data usage', () => {
    expect(getFormattedValue('2048', 'MB', 'daten')).toEqual({
      stringValue: '2',
      value: 2,
      unit: 'GB'
    })
    expect(getFormattedValue('600', 'MB', 'daten')).toEqual({
      stringValue: '600',
      value: 600,
      unit: 'MB'
    })
  })

  it('should getFormattedValue return as expected when limited mins usage', () => {
    expect(getFormattedValue('600', 'minuten', 'minuten')).toEqual({
      stringValue: '600',
      value: 600,
      unit: 'mins'
    })
  })

  it('should isUsageUnlimited return true when total > threshold in data case', () => {
    expect(isUsageUnlimited({ value: 1000000, unit: 'MB' }, '')).toEqual(true)
  })

  it('should isUsageUnlimited return true when description contains flat and total = 0 in voice case', () => {
    expect(isUsageUnlimited({ value: 0, unit: 'MB' }, 'this is flat')).toEqual(
      true
    )
  })

  it('should isUsageUnlimited return false when following cases happen', () => {
    expect(
      isUsageUnlimited({ value: 600, unit: 'MB' }, 'this is flat')
    ).toEqual(false)
    expect(isUsageUnlimited({ value: 998999, unit: 'MB' }, '')).toEqual(false)
  })
})
