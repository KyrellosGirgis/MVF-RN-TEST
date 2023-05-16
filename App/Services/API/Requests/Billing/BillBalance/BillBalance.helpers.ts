import { BillBalance } from 'App/Services/API/Requests/Billing/BillBalance/BillBalance.d'

import {
  BILL_MEDIA_CATEGORY,
  BILL_MEDIA_CATEGORY_PAPER
} from 'App/Services/API/Requests/Billing/BillBalance/BillBalance.constants'

const shouldShowPaperBillBanner = (billBalance: BillBalance) =>
  billBalance.bill.billingAccount?.characteristic?.find(
    (haracteristic) => haracteristic.name === BILL_MEDIA_CATEGORY
  )?.value === BILL_MEDIA_CATEGORY_PAPER

export { shouldShowPaperBillBanner }
