import { MintErrors } from './mint.constants'

import { ErrorFiveHundreds } from 'App/Services/API/Requests/Common/ErrorTypes'

import {
  handleGenericApiErrorsIfNeeded,
  showErrorBasedOnType
} from 'App/Services/API/Requests/Common/Requests.helpers'

const handleProceedMintProcessStepError = async (error: any) => {
  const { isGeneric, finalError } = await handleGenericApiErrorsIfNeeded(error)
  if (isGeneric) {
    return finalError
  }

  const { data, status } = finalError
  const message: string = data?.operationError?.code
  let errorObject = MintErrors.Mint[message]

  if (!errorObject) {
    errorObject = getErrorObject500sOrElse(status)
  }
  return showErrorBasedOnType(errorObject)
}

const handleStartMintProcessError = async (error: any) => {
  const { isGeneric, finalError } = await handleGenericApiErrorsIfNeeded(error)
  if (isGeneric) {
    return finalError
  }
  const { status } = finalError
  const errorObject = getErrorObject500sOrElse(status)
  return showErrorBasedOnType(errorObject)
}

const getErrorObject500sOrElse = (status: number) =>
  ErrorFiveHundreds.includes(status) ? MintErrors['5xx'] : MintErrors.Else

export {
  showErrorBasedOnType,
  handleProceedMintProcessStepError,
  handleStartMintProcessError
}
