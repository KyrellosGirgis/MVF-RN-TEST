import { translate } from 'App/Utils/Helpers/generic.helpers'

export const UNLIMITED_DATA_THRESHOLD = 999000

export const DISPLAYED_UNIT: { [key: string]: string } = {
  minuten: translate('mins'),
  mb: 'MB',
  gb: 'GB',
  sms: 'SMS',
  mms: 'MMS'
}
