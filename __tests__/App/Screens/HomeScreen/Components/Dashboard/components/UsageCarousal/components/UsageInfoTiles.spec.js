import React from 'react'

import { create } from 'react-test-renderer'

import UsageInfoCard from '@vfgroup-oneplatform/framework/CommonUI/UsageInfoCard'

import UsageInfoTile from 'App/Screens/HomeScreen/components/Dashboard/components/UsagesCarousel/components/UsageInfoTile/UsageInfoTile'
import UsageEditCard from 'App/Screens/HomeScreen/components/Dashboard/components/UsagesCarousel/components/UsageEditCard/UsageEditCard'

const generalProps = {
  item: {
    _id: '11111111_daten_Vodafone Pass im EU-Test',
    formattedTotal: {
      stringValue: '60',
      unit: 'GB',
      value: 60
    },
    isUnlimited: false,
    billCycleEndDate: '2022-03-04',
    title: 'Mobilfunk-Postpaid Vodafone Pass im EU-Test',
    usageType: 'daten',
    remaining: '54',
    remainingUnit: 'GB',
    remainingValuePercentage: 90
  },
  index: 1,
  isActiveCard: true,
  theme: { name: 1 },
  swipeOpacity: jest.fn()
}

const unlimitedItemProps = {
  _id: '11111111_daten_Vodafone Pass im EU-Test',
  formattedTotal: {
    stringValue: '60',
    unit: 'GB',
    value: 60
  },
  isUnlimited: true,
  billCycleEndDate: '2022-03-04',
  title: 'Mobilfunk-Postpaid Vodafone Pass im EU-Test',
  usageType: 'daten',
  remaining: 'unlimited',
  remainingUnit: '',
  remainingValuePercentage: 100
}

const RealDate = Date.now

describe('render UsageInfoTiles successfully', () => {
  const testUsageTypeProps = {
    ...generalProps,
    item: {
      ...generalProps.item,
      usageType: 'edit'
    }
  }
  beforeAll(() => {
    global.Date.now = jest.fn(() => new Date('2022-02-25').getTime())
  })

  afterAll(() => {
    global.Date.now = RealDate
    jest.clearAllMocks()
  })

  test('Ensure that UsageInfoTiles to be defined  ', () => {
    const usageInfoTilesComponent = create(<UsageInfoTile {...generalProps} />)
    const UsageInfoCardComponent =
      usageInfoTilesComponent.root.findAllByType(UsageInfoCard)[0]

    expect(usageInfoTilesComponent).toBeDefined()
    expect(UsageInfoCardComponent).toBeDefined()
    expect(UsageInfoCardComponent.props.footerText).toBe('resetIn_other')
    expect(UsageInfoCardComponent.props.remaining).toBe('54')
    expect(UsageInfoCardComponent.props.remainingUnit).toBe('GB')
    expect(UsageInfoCardComponent.props.value).toBe(90)
  })

  test('Ensure that UsageInfoTiles footer text gets the right text when 1 day is left ', () => {
    const newItem = {
      ...generalProps.item,
      billCycleEndDate: '2022-02-25'
    }
    const usageInfoTilesComponent = create(
      <UsageInfoTile {...generalProps} item={newItem} />
    )
    const UsageInfoCardComponent =
      usageInfoTilesComponent.root.findAllByType(UsageInfoCard)[0]

    expect(UsageInfoCardComponent.props.footerText).toBe('resetIn_one')
  })

  test('Ensure that UsageInfoTiles with unlimited item will return as expected', () => {
    const usageInfoTilesComponent = create(
      <UsageInfoTile {...generalProps} item={unlimitedItemProps} />
    )
    const UsageInfoCardComponent =
      usageInfoTilesComponent.root.findAllByType(UsageInfoCard)[0]

    expect(UsageInfoCardComponent.props.remaining).toBe('unlimited')
    expect(UsageInfoCardComponent.props.value).toBe(100)
    expect(UsageInfoCardComponent.props.footerText).toBe('unlimited_access')
  })

  test('should render UsageEditCard if usageType is edit ', () => {
    const usageEditCardComponent = create(
      <UsageInfoTile {...testUsageTypeProps} />
    )

    expect(
      usageEditCardComponent.root.findAllByType(UsageEditCard)[0]
    ).toBeDefined()
  })
})
