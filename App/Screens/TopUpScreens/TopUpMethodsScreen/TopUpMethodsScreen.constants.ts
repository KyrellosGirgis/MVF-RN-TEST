import { PaymentTypes } from '@vfgroup-oneplatform/framework/Payment'

import { testID } from 'App/Utils/Helpers/testId.helpers'
//topup tray Amount values
const AMOUNT_RECHARGE = {
  EURO_5: '5',
  EURO_15: '15',
  EURO_20: '20',
  EURO_25: '25',
  EURO_50: '50',
  EURO_80: '80'
}
//topup Amount values mapped online
const MAPPED_ONLINE_RECHARGE = {
  [AMOUNT_RECHARGE.EURO_5]: '500',
  [AMOUNT_RECHARGE.EURO_15]: '1500',
  [AMOUNT_RECHARGE.EURO_20]: '500-1500',
  [AMOUNT_RECHARGE.EURO_25]: '2500',
  [AMOUNT_RECHARGE.EURO_50]: '5000',
  [AMOUNT_RECHARGE.EURO_80]: '5000-1500-1500'
}

const defaultWheelValue = [{ value: AMOUNT_RECHARGE.EURO_15, gift: false }]

const wheelValues = [
  {
    value: AMOUNT_RECHARGE.EURO_5,
    gift: false
  },
  {
    value: AMOUNT_RECHARGE.EURO_15,
    gift: false
  },
  {
    value: AMOUNT_RECHARGE.EURO_20,
    gift: false
  },
  {
    value: AMOUNT_RECHARGE.EURO_25,
    gift: false
  },
  {
    value: AMOUNT_RECHARGE.EURO_50,
    gift: false
  },
  {
    value: AMOUNT_RECHARGE.EURO_80,
    gift: false
  }
]

const getTopupMethods = (Images: Object) => [
  {
    itemTitle: 'paymentMethods_itemTitle_Online_itemTitle',
    itemSubTitle: 'paymentMethods_itemTitle_Online_itemSubTitle',
    paymentType: PaymentTypes.BALANCE_TOP_UP,
    itemImage: Images.ic_voucher_top_up,
    accessibilityID: testID('paymentMethods')
  },
  {
    itemTitle: 'paymentMethods_itemTitle_CallNow_itemTitle',
    itemSubTitle: 'paymentMethods_itemTitle_CallNow_itemSubTitle',
    paymentType: PaymentTypes.VOUCHER_TOP_UP,
    itemImage: Images.ic_voucher_qr_button,
    accessibilityID: testID('paymentMethods')
  }
]

export {
  MAPPED_ONLINE_RECHARGE,
  AMOUNT_RECHARGE,
  wheelValues,
  defaultWheelValue,
  getTopupMethods
}
