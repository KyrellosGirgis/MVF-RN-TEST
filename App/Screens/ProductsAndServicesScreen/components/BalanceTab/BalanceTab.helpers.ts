import moment from 'moment'

import _cloneDeep from 'lodash/cloneDeep'

import { BalanceHistoryCategory, BalanceHistoryItem } from './BalanceTab.d'

import { AUTO_TOPUP_STATUS } from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/BalanceTab.constants'

const shouldShowAutoTopUpCard = (autoTopupStatus: string) =>
  [
    AUTO_TOPUP_STATUS.ACTIVATE,
    AUTO_TOPUP_STATUS.DEACTIVATE,
    AUTO_TOPUP_STATUS.ASK_ACTIVATE,
    AUTO_TOPUP_STATUS.ACTIVE_COMFORT_CHARGE
  ].includes(autoTopupStatus as AUTO_TOPUP_STATUS)

const shouldShowAutoTopUpBanner = (
  autoTopupStatus: string,
  isLoading: boolean
) => (isLoading ? false : autoTopupStatus === AUTO_TOPUP_STATUS.NOT_REGISTERED)

const isAutoTopUpActivated = (autoTopupStatus: string) =>
  [
    AUTO_TOPUP_STATUS.ACTIVATE,
    AUTO_TOPUP_STATUS.ACTIVE_COMFORT_CHARGE
  ].includes(autoTopupStatus as AUTO_TOPUP_STATUS)

const filterHistory = ({
  originalData,
  startDate,
  endDate
}: {
  originalData: BalanceHistoryCategory[]
  startDate: string
  endDate: string
}) => {
  const mappedData = _cloneDeep(originalData)
  mappedData.forEach((historyCategory: BalanceHistoryCategory) => {
    historyCategory.items =
      historyCategory.items?.filter((historyItem: BalanceHistoryItem) => {
        return (
          +moment(historyItem.date) >= +moment(startDate).startOf('day') &&
          +moment(historyItem.date) <= +moment(endDate).endOf('day')
        )
      }) || []
  })
  return mappedData
}

export {
  shouldShowAutoTopUpCard,
  shouldShowAutoTopUpBanner,
  isAutoTopUpActivated,
  filterHistory
}
