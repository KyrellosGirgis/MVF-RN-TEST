/* eslint-disable no-unused-vars */
import {
  handleStartMintProcessError,
  handleProceedMintProcessStepError
} from './MintErrorHandlers'

import { legacyAxios } from 'App/Services/API/Interceptors/legacy.interceptor'
import ApiRoutes from 'App/Services/API/ApiRoutes'

async function startMintProcess(processName: string) {
  const { URL, apiId } = ApiRoutes.Mint.processStart
  try {
    const response = await legacyAxios.post(URL(processName), undefined, {
      apiId
    })
    return response
  } catch (error) {
    throw await handleStartMintProcessError(error)
  }
}

async function proceedMintProcessStep(
  actionType: string,
  stepName: string,
  parameters: any,
  processId: string
) {
  const { URL, apiId } = ApiRoutes.Mint.processStep
  const body = {
    actionType,
    stepName,
    parameters,
    processId
  }
  try {
    const response = await legacyAxios.put(URL, body, { apiId })
    return response
  } catch (error) {
    throw await handleProceedMintProcessStepError(error)
  }
}

export { startMintProcess, proceedMintProcessStep }
