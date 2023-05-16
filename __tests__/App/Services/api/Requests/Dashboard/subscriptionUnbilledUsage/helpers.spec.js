/* eslint-disable import/namespace */
import Moment from 'moment'

import {
  formatDecimalByLanguage,
  calcCorrectUnit,
  getDurationinDays
} from 'App/Services/API/Requests/Dashboard/subscriptionUnbilledUsage/helpers'

describe('test subscriptionUnbilledUsages helpers', () => {
  it('should formatDecimalByLanguage return the value as it is', () => {
    expect(formatDecimalByLanguage(230)).toEqual('230')
  })

  describe('while locale is DE', () => {
    beforeAll(() => {
      Moment.locale('de')
    })
    it('should formatDecimalByLanguage return as expected', async () => {
      expect(formatDecimalByLanguage(230.56)).toEqual('230,56')
    })
  })

  describe('while locale is EN', () => {
    beforeAll(() => {
      Moment.locale('en')
    })
    it('should formatDecimalByLanguage return as expected', async () => {
      expect(formatDecimalByLanguage(230.56)).toEqual('230.56')
    })
  })

  it('should calcCorrectUnit return as expected when size > 1024 & unit = mb', async () => {
    expect(calcCorrectUnit(2048, 'mb')).toEqual({ value: 2, unit: 'GB' })
  })

  it('should calcCorrectUnit return as expected when size < 1024 & unit = mb', async () => {
    expect(calcCorrectUnit(1000.4578, 'mb')).toEqual({
      value: 1000.46,
      unit: 'MB'
    })
  })

  it('should calcCorrectUnit return as expected when size > 1024 & unit = gb', async () => {
    expect(calcCorrectUnit(2048, 'gb')).toEqual({ value: 2048, unit: 'GB' })
  })

  it('should calcCorrectUnit return as expected when unit = minuten', async () => {
    expect(calcCorrectUnit(300, 'minuten')).toEqual({
      value: 300,
      unit: 'mins'
    })
  })

  it('should getDurationinDays return as expected', async () => {
    global.Date.now = jest.fn(() => new Date('2022-01-10').getTime())
    expect(getDurationinDays('2022-01-20').toString()).toBe('PT0.01S')
  })
})
