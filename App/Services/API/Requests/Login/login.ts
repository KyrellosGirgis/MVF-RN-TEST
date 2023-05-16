import Config from 'react-native-config'

import {
  handleUpFrontLoginAPIError,
  handleSMSLoginProvideTANError,
  handleVerifyCaptchaCodeThenLoginApiError
} from './LoginErrorHandlers'

import {
  proceedMintProcessStep,
  startMintProcess
} from 'App/Services/API/Requests/Common/Mint/mint'

import { ProcessName } from 'App/Services/API/Requests/Common/Mint/mint.constants'

import { legacyAxios } from 'App/Services/API/Interceptors/legacy.interceptor'
import ApiRoutes from 'App/Services/API/ApiRoutes'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

/* seamleass login API -----------------------------------*/

const seamlessLoginDE = async () => {
  const { URL, apiId } = ApiRoutes.Mint.sessionStart
  const data = {
    authMethod: 'AAA',
    byPIN: false,
    additionalParameters: {
      deviceType: 'Smartphone'
    }
  }
  return legacyAxios.post(URL, data, { apiId })
}

/* upfront login API -----------------------------------*/

const upFrontLoginAPI = async (userName: string, password: string) => {
  const body = {
    clientType: 'Portal',
    targetURL: '',
    context: '',
    username: userName,
    password: password
  }
  try {
    const { URL, apiId } = ApiRoutes.Mint.sessionStart
    const shouldSkipCaptcha = await EncryptedStorage.getBoolean(
      STORAGE_KEYS.shouldSkipCaptcha
    )
    const response = await legacyAxios.post(URL, body, {
      apiId,
      headers: {
        ...(Config.IS_PRODUCTION === 'false' &&
          shouldSkipCaptcha && { 'X-MVA-TestClientID': 'MVARN' })
      }
    })
    return response
  } catch (error) {
    throw await handleUpFrontLoginAPIError(error)
  }
}

/* upfront login Captcha -----------------------------------*/

const getCaptchaImageUrl = (captchaUrl: string) => {
  return legacyAxios.get(`${captchaUrl}?forApp=true`)
}

const verifyCaptchaCodeThenLoginApi = async (captcha: string) => {
  try {
    const { URL, apiId } = ApiRoutes.Cprx.captcha
    const response = await legacyAxios.post(
      `${URL}?forApp=true&captcha=${captcha}`,
      undefined,
      { apiId }
    )
    return response
  } catch (error) {
    throw await handleVerifyCaptchaCodeThenLoginApiError(error)
  }
}

/* SMS login APIs -----------------------------------*/

async function SMSLoginProvideMSISDN(phoneNumber: any) {
  const processStartResponse = await startMintProcess(
    ProcessName.ValidateMsisdnViaSms
  )
  const processId = processStartResponse.data.processId
  const processStepResponse = await proceedMintProcessStep(
    processStartResponse.data.actionType,
    processStartResponse.data.stepName,
    {
      msisdn: phoneNumber
    },
    processId
  )

  return { processStepResponse, processId }
}

const SMSLoginProvideTAN = async (TAN: string, processId: string) => {
  const { URL, apiId } = ApiRoutes.Mint.processStep
  const body = {
    actionType:
      'com.uxpsystems.mint.framework.bpm.process.ManualInputStepAction',
    processId: processId,
    stepName: 'provide-tan',
    parameters: {
      tan: TAN
    }
  }
  try {
    const response = await legacyAxios.put(URL, body, { apiId })
    return response
  } catch (error) {
    throw await handleSMSLoginProvideTANError(error)
  }
}

/* refresh mint-sso-token  -----------------------------------*/

const refreshMintSSOToken = () => {
  const { URL, apiId } = ApiRoutes.Mint.sessionStart
  return legacyAxios.head(URL, { apiId })
}

export {
  seamlessLoginDE,
  upFrontLoginAPI,
  SMSLoginProvideTAN,
  refreshMintSSOToken,
  getCaptchaImageUrl,
  verifyCaptchaCodeThenLoginApi,
  SMSLoginProvideMSISDN
}
