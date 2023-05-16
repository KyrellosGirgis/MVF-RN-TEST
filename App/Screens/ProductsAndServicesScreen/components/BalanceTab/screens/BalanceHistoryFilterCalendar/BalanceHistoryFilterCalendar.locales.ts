import { LocaleConfig } from 'react-native-calendars'

import moment from 'moment'

import { isDE } from 'App/Utils/Helpers/generic.helpers'

const enLocale = 'en-gb'
const deLocale = 'de'

LocaleConfig.locales[enLocale] = {
  monthNames: moment.localeData(enLocale).months(),
  monthNamesShort: moment.localeData(enLocale).monthsShort(),
  dayNames: moment.localeData(enLocale).weekdays(),
  dayNamesShort: moment.localeData(enLocale).weekdaysMin(),
  today: 'Today'
}

LocaleConfig.locales.de = {
  monthNames: moment.localeData(deLocale).months(),
  monthNamesShort: moment.localeData(deLocale).monthsShort(),
  dayNames: moment.localeData(deLocale).weekdays(),
  dayNamesShort: moment.localeData(deLocale).weekdaysMin(),
  today: 'Today'
}

const setCalendarLocale = () => {
  LocaleConfig.defaultLocale = isDE() ? deLocale : enLocale
}

export { setCalendarLocale }
