import { LoginStatuses as Status } from '@vfgroup-oneplatform/login'
import { VerifyCodeBase } from '@vfgroup-oneplatform/login/BaseClasses'

import { clearOSCookies } from 'App/Services/CookiesManager/CookiesManager'

import { SMSLoginProvideMSISDN } from 'App/Services/API/Requests/Login/login'

class VerifyCodeImplementation extends VerifyCodeBase {
  constructor(...args) {
    super(...args)
    this.GET_SMS_CODE_SUCCESS = {
      status: Status.Success,
      response: {}
    }
    this.GET_SMS_CODE_FAILED = {
      status: Status.Failed,
      errorMessage: 'verification_error_phone_number_is_not_correct',
      subErrorMessage: 'Please_try_again'
    }
    this.verifyCodeLength = 6
  }

  getSMSCode = async (phoneNumber) => {
    try {
      await clearOSCookies()
      const { processId, processStepResponse } = await SMSLoginProvideMSISDN(
        phoneNumber
      )

      this.setConfiguration({ authConfig: { processId: processId } })

      return {
        status: Status.Success,
        processStepResponse
      }
    } catch (error) {
      throw error // Since Core Component takes the error Object with throwing only
    }
  }
  getResendCodeTimeout = () => {
    return 30000
  }
  withCountdown = true
}

const VerifyCodeSingleton = new VerifyCodeImplementation()
export default VerifyCodeSingleton
