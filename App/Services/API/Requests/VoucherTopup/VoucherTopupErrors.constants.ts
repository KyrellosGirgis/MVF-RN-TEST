import { VoucherCodeErrorTypes } from '@vfgroup-oneplatform/framework/Payment/Utils/VoucherCodeErrorTypes'

import { translate } from 'App/Utils/Helpers/generic.helpers'

const VoucherTopupErrors: any = {
  'error.  Diese Aufladenummer existiert nicht.': {
    name: translate('voucher_top_up_error_title'),
    message: translate('voucher_top_up_invalid_code_error_message'),
    cause: VoucherCodeErrorTypes.NON_EXISTENT_CODE
  },
  'error.  Diese Aufladenummer ist bereits eingelöst worden.': {
    name: translate('voucher_top_up_error_title'),
    message: translate('voucher_top_up_already_redeemed_error_message'),
    cause: VoucherCodeErrorTypes.REDEEMED_CODE
  },
  Else: {
    name: translate('voucher_top_up_error_title'),
    message: translate('voucher_top_up_general_error_message'),
    cause: VoucherCodeErrorTypes.EXPIRED_CODE
  }
}

export default VoucherTopupErrors
