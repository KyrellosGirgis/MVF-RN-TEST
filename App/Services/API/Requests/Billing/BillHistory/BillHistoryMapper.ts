import {
  BillingHistoryType,
  History
} from 'App/Services/API/Requests/Billing/BillHistory/BillHistory.d'
import {
  BillData,
  BilllHistory
} from 'App/Services/API/Requests/Billing/BillHistory/BillHistoryMapper.d'

import { getSymbolFromCurrency } from 'App/Utils/Helpers/currencySymbol.helpers'
import { dateFormat } from 'App/Utils/Helpers/date.helpers'
import { DATE_FORMATS } from 'App/Utils/Enums/index'
import { isDE } from 'App/Utils/Helpers/generic.helpers'

const mapBillHistory = (billingHistoryData: BillingHistoryType) => {
  const billingHistory = billingHistoryData._embedded.history
  const nextBillsListLink = billingHistoryData._links.next
  const billsHistoryUiModel: BilllHistory = {
    nextBillsLink: nextBillsListLink,
    billHistoryItems: mapBillHistoryItems(billingHistory),
    totalCount: billingHistoryData.totalCount,
    resultCount: billingHistoryData.resultCount
  }
  return billsHistoryUiModel
}

const mapBillHistoryItems = (history: History[]) => {
  return (
    history?.map((historyItem: History) => {
      const { id, billDate, paymentDueDate, _links, billingAccount } =
        historyItem
      const { startDateTime, endDateTime } = historyItem.billingPeriod
      const { value, unit } = historyItem.amountDue
      const currency = getSymbolFromCurrency(unit)

      return <BillData>{
        id: id,
        billDate: billDate,
        paymentInfo: [dateFormat(paymentDueDate, DATE_FORMATS.SHORTddmm)],
        value: value,
        unit: unit,
        currency: isDE() ? ` ${currency}` : currency,
        startDate: startDateTime,
        endDate: endDateTime,
        price: `${unit} ${value} `,
        billIssuanceValue: value,
        billIssuancePrice: value,
        billDetailsLink: _links.bill,
        billingAccount: billingAccount
      }
    }) || []
  )
}

export { mapBillHistory, mapBillHistoryItems }
