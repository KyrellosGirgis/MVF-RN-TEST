import Moment from 'moment'

import 'moment/locale/en-gb'
import 'moment/locale/de'
import { loadAppLanguage } from 'App/I18n/helpers/localisations.helpers'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

const setMomentLocale = async () => {
  const selectedLanguage = await loadAppLanguage()
  selectedLanguage === STORAGE_KEYS.CMS_ITEMS.LOCAL_DE
    ? Moment.locale('de')
    : Moment.locale('en-gb')
}

const dateFormat = (dateTime: Date, format: string | Object) =>
  dateTime &&
  Moment(dateTime).format(
    typeof format === 'string' ? format : format[Moment().locale()]
  )

const getDateDifference = (startDate: string | Date) =>
  Moment.duration(Moment().diff(Moment(startDate)))

const minutesToMilliSeconds = (min: number) => min * 60 * 1000

export { setMomentLocale, dateFormat, getDateDifference, minutesToMilliSeconds }
