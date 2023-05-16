/* eslint-disable import/namespace */
import { LocaleConfig } from 'react-native-calendars'

import moment from 'moment'

import { setCalendarLocale } from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/screens/BalanceHistoryFilterCalendar/BalanceHistoryFilterCalendar.locales'

describe('test balance calendar locales helper ', () => {
  test('setCalendarLocale should set locale based on language selected (en) ', () => {
    moment.locale('en')
    setCalendarLocale()
    expect(LocaleConfig.defaultLocale).toEqual('en-gb')
  })
  test('setCalendarLocale should set locale based on language selected (de)', () => {
    moment.locale('de')
    setCalendarLocale()
    expect(LocaleConfig.defaultLocale).toEqual('de')
  })
})
