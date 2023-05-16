import { concateAmountWithCurrency } from 'App/Utils/Helpers/currencySymbol.helpers'
import { loadBillingHistory } from 'App/Services/API/Requests/Billing/BillHistory/BillHistory'
import { isMobilePostpaidSubscription } from 'App/Services/AppUserData/AppUserData.helpers'
import { fetchBalance } from 'App/Redux/Balance/balance.thunk'
import { store } from 'App/Redux'

const getBalanceForPrepaidSubscription = async () => {
  await store.dispatch(fetchBalance())
  return store.getState()?.balance?.balance
}
const getTotalAmount = async () => {
  const amount = isMobilePostpaidSubscription()
    ? (await loadBillingHistory())?.billHistoryItems[0]?.billingAccount
        ?.accountBalance[0]?.amount
    : await getBalanceForPrepaidSubscription()
  return concateAmountWithCurrency(amount?.value, amount?.unit) ?? ''
}

export { getTotalAmount }
