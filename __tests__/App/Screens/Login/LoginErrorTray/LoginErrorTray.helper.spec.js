/* eslint-disable import/namespace */
import { LoginStatuses as Status } from '@vfgroup-oneplatform/login'

import { store } from 'App/Redux'

import * as Tray from 'App/Components'
import {
  handleUpFrontLoginAPIError,
  handleSMSLoginProvideTANError,
  handleOIDCError,
  showErrorBasedOnType
} from 'App/Services/API/Requests/Login/LoginErrorHandlers'
import * as Modal from 'App/Containers/AppModal/AppModal.helpers'
import { CTAHandlers } from 'App/Screens/Login/LoginErrorTypes'
import { ErrorType } from 'App/Services/API/Requests/Common/ErrorTypes'
import {
  handleStartMintProcessError,
  handleProceedMintProcessStepError
} from 'App/Services/API/Requests/Common/Mint/MintErrorHandlers'

jest.mock('App/Utils/Helpers/generic.helpers', () => {
  return {
    isDeviceConnectedToNetwork: () => true,
    translate: (str) => str
  }
})

describe('testing handling error helpers', () => {
  beforeAll(() => {
    Modal.showModal = jest.fn()
    store.dispatch = jest.fn()
  })

  test('showErrorBasedOnType shows the modal if the object has CTAHandler and Type = tray', async () => {
    const Object = {
      Type: ErrorType.Tray,
      CTAHandler: CTAHandlers.WebView,
      body: 'login_202_error_body_message'
    }

    Tray.LoginErrorTray = jest.fn()
    showErrorBasedOnType(Object)
    expect(Modal.showModal).toHaveBeenCalled()
  })

  test('showErrorBasedOnType returns the correct object for the inline error if its screen type is inline', async () => {
    Modal.showModal = jest.fn()
    const Object = {
      Type: ErrorType.Inline,
      body: 'login_not_allowed_error_body_message'
    }
    Tray.LoginErrorTray = jest.fn()
    expect(showErrorBasedOnType(Object)).toMatchObject({
      status: Status.Failed,
      errorMessage: Object.body
    })
  })

  test('handleUpFrontLoginAPIError returns the correct object for the error with correct operation error code', async () => {
    const errorResponse = {
      response: {
        data: {
          operationError: {
            code: 'authentication-required'
          }
        },
        status: 401
      }
    }

    expect(await handleUpFrontLoginAPIError(errorResponse)).toMatchObject({
      status: Status.Failed,
      errorMessage: 'login_authentication_error_body_message'
    })
  })

  test('handleUpFrontLoginAPIError returns the 5xx object for for the error with 500 status', async () => {
    const errorResponse = {
      response: {
        data: {
          operationError: {
            code: 'asd'
          }
        },
        status: 500
      }
    }

    expect(await handleUpFrontLoginAPIError(errorResponse)).toMatchObject({
      status: Status.Failed,
      errorMessage: '5xx_error_body_message'
    })
  })

  test('handleUpFrontLoginAPIError returns the else object  for the error without 500 status', async () => {
    const errorResponse = {
      response: {
        data: {
          operationError: {
            code: 'asd'
          }
        },
        status: 400
      }
    }

    expect(await handleUpFrontLoginAPIError(errorResponse)).toMatchObject({
      status: Status.Failed,
      errorMessage: 'login_else_body_message'
    })
  })

  test('handleProceedMintProcessStepError returns else message if the error object is incorrect', async () => {
    const errorResponse = {
      response: {
        data: {
          operationError: {
            code: 'asd'
          }
        },
        status: 400
      }
    }
    expect(
      await handleProceedMintProcessStepError(errorResponse)
    ).toMatchObject({
      status: Status.Failed,
      errorMessage: 'mint_else_body_message'
    })
  })

  test('handleProceedMintProcessStepError returns the correct error object of the operation error code', async () => {
    const errorResponse = {
      response: {
        data: {
          operationError: {
            code: 'msisdn-is-unknown'
          }
        },
        status: 400
      }
    }

    expect(
      await handleProceedMintProcessStepError(errorResponse)
    ).toMatchObject({
      status: Status.Failed,
      errorMessage: 'step_1_put_msisdn_is_unknown_error_body_message'
    })
  })

  test('handleProceedMintProcessStepError returns the 5xx error object if the status is 500', async () => {
    const errorResponse = {
      response: {
        data: {
          operationError: {
            code: 'asd'
          }
        },
        status: 500
      }
    }

    expect(
      await handleProceedMintProcessStepError(errorResponse)
    ).toMatchObject({
      status: Status.Failed,
      errorMessage: '5xx_error_body_message'
    })
  })

  test('handleSMSLoginProvideTANError returns else message if the operationerror code is undefind and status not 403 or 500', async () => {
    const errorResponse = {
      response: {
        data: {
          operationError: {
            code: 'asd'
          }
        },
        status: 401
      }
    }
    expect(await handleSMSLoginProvideTANError(errorResponse)).toMatchObject({
      status: Status.Failed,
      errorMessage: 'login_else_body_message'
    })
  })

  test('handleSMSLoginProvideTANError returns the correct object of the operationerror code', async () => {
    const errorResponse = {
      response: {
        data: {
          operationError: {
            code: 'tan-invalid'
          }
        },
        status: 401
      }
    }
    expect(await handleSMSLoginProvideTANError(errorResponse)).toMatchObject({
      status: Status.Failed,
      errorMessage: 'step_2_tan_invalid_error_body_message'
    })
  })

  test('handleSMSLoginProvideTANError returns the correct object if response code is 403', async () => {
    const errorResponse = {
      response: {
        data: {
          operationError: {
            code: 'asd'
          }
        },
        status: 403
      }
    }

    await handleSMSLoginProvideTANError(errorResponse)
    expect(Modal.showModal).toHaveBeenCalled()
  })

  test('handleSMSLoginProvideTANError returns the correct object if response code is 500', async () => {
    const errorResponse = {
      response: {
        data: {
          operationError: {
            code: 'asd'
          }
        },
        status: 500
      }
    }

    await handleSMSLoginProvideTANError(errorResponse)
    expect(Modal.showModal).toHaveBeenCalled()
  })

  test('handleStartMintProcessError returns the 5xx error object if the response code is 500,504 or 510', async () => {
    const errorResponse = {
      response: {
        status: 500
      }
    }
    expect(await handleStartMintProcessError(errorResponse)).toMatchObject({
      status: Status.Failed,
      errorMessage: '5xx_error_body_message'
    })
  })

  test('handleStartMintProcessError returns the else error object if the response code is not  500,504 or 510', async () => {
    const errorResponse = {
      response: {
        status: 404
      }
    }
    expect(await handleStartMintProcessError(errorResponse)).toMatchObject({
      status: Status.Failed,
      errorMessage: 'mint_else_body_message'
    })
  })

  test('handleOIDCError returns the correct error object ', async () => {
    const errorResponse = {
      response: {
        status: 404
      }
    }
    expect(await handleOIDCError(errorResponse)).toMatchObject({
      status: Status.Failed,
      errorMessage: 'login_else_body_message'
    })
  })
})
