import { constructVoucherTopupBody } from './VoucherTopup.helpers'

import VoucherTopupErrors from './VoucherTopupErrors.constants'

import { legacyAxios } from 'App/Services/API/Interceptors/legacy.interceptor'
import { ApiRoutes } from 'App/Services'
import { getMsisdn } from 'App/Services/AppUserData/AppUserData.helpers'

const topupWithVoucherCode = async (code: string) => {
  const body = constructVoucherTopupBody(code)
  try {
    const { URL, apiId } = ApiRoutes.Nil.voucherTopup
    const { data } = await legacyAxios.post(URL(getMsisdn()), body, {
      apiId: apiId
    })
    return data.subscriptionVBO[0].subscriptions[0].topup.amount
  } catch (error) {
    const detailedErrorText =
      error?.response?.data?.faultMessage?.detailedText || ''
    throw VoucherTopupErrors[detailedErrorText] || VoucherTopupErrors.Else
  }
}

export { topupWithVoucherCode }
