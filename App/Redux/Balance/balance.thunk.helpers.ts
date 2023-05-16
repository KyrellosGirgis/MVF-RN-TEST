import { TopupHistoryItem } from 'App/Services/API/Requests/AccountMovement/AccountMovement'
import { concateAmountWithCurrency } from 'App/Utils/Helpers/currencySymbol.helpers'

const mapBalanceTopupToBalanceHistory = (balanceTopup: TopupHistoryItem[]) =>
  balanceTopup?.map((topupHistoryItem: TopupHistoryItem) => {
    const amount = (
      Math.trunc(topupHistoryItem.channel.amount.amount * 100) / 100
    ).toFixed(2)
    const priceValue = concateAmountWithCurrency(
      amount.toString(),
      topupHistoryItem.channel.amount.units.toString()
    )
    return {
      icon: getHistoryItemType(topupHistoryItem.description),
      title: getHistoryItemType(topupHistoryItem.description),
      date: topupHistoryItem.confirmationDate,
      price: '+' + priceValue,
      type: 'Top-up'
    }
  })

const getHistoryItemType = (type: string) => {
  const typeArr = type ? type.split('.') : ['PYM']
  return `topup_history_method_payment_${typeArr[typeArr.length - 1]}`
}

export { mapBalanceTopupToBalanceHistory }
