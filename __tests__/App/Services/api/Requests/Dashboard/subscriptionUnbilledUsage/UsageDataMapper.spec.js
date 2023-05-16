import {
  limitedUsage,
  limitedUsageVoice,
  mappedLimitedBucket,
  mappedLimitedBucketVoice,
  mappedUnlimitedBucket,
  mappedUnlimitedBucketVoice,
  unlimitedUsage,
  unlimitedUsageVoice
} from '__tests__/App/Services/api/Requests/Dashboard/data'

import mapUsageDataToUsageTiles from 'App/Services/API/Requests/Dashboard/subscriptionUnbilledUsage/UsageDataMapper'

describe('mapping the subscription usages to tiles data', () => {
  it('should map limited usage correctly', () => {
    const result = mapUsageDataToUsageTiles(
      { mboId: 1234, mboName: '' },
      limitedUsage,
      '2022-01-04'
    )
    expect(result).toEqual(mappedLimitedBucket)
  })

  it('should map unlimited usage correctly', () => {
    const result = mapUsageDataToUsageTiles(
      { mboId: 1234, mboName: '' },
      unlimitedUsage,
      '2022-01-04'
    )
    expect(result).toEqual(mappedUnlimitedBucket)
  })

  it('should map limited voice usage correctly', () => {
    const result = mapUsageDataToUsageTiles(
      { mboId: 1234, mboName: '' },
      limitedUsageVoice,
      '2022-01-04'
    )
    expect(result).toEqual(mappedLimitedBucketVoice)
  })

  it('should map unlimited voice usage correctly', () => {
    const result = mapUsageDataToUsageTiles(
      { mboId: 1234, mboName: '' },
      unlimitedUsageVoice,
      '2022-01-04'
    )
    expect(result).toEqual(mappedUnlimitedBucketVoice)
  })

  it('should return empty array when no usage', () => {
    const result = mapUsageDataToUsageTiles(
      { mboId: 1234, mboName: '' },
      { ...unlimitedUsageVoice, usage: undefined },
      '2022-01-04'
    )
    expect(result).toEqual([])
  })
})
