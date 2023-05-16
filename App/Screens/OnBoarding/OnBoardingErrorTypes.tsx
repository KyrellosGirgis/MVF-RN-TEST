import { AxiosError } from 'axios'

import React from 'react'

import { Linking } from 'react-native'

import logOut from 'App/Screens/Login/Implementations/LogoutImplementation/LogoutImplementation'

import { translate } from 'App/Utils/Helpers/generic.helpers'
import OnBoardingErrorTrayBody from 'App/Screens/OnBoarding/OnBoardingErrorTray/OnBoardingErrorTrayBody'
import { showModal, closeModal } from 'App/Containers/AppModal/AppModal.helpers'

const constructAndShowErrorTrayModal = (errorObj: any) => {
  const onBoardingErrorConfig = {
    title: errorObj.title,
    modalBody: (
      <OnBoardingErrorTrayBody
        errorMessage={errorObj.description}
        primaryButtonHandler={errorObj.firstButtonHnadler}
        secondaryButtonHandler={errorObj.secondButtonHandler}
      />
    ),
    withHeaderCloseButton: errorObj.withCloseButton
  }
  showModal(onBoardingErrorConfig)
}

const handleOnBoardingApisErrors = (error: AxiosError) => {
  const apiId = error?.config?.apiId
  const statusCode = error.response?.status
  var errorType = OnBoardingErrors?.servicesIds[apiId]?.errorCodes[statusCode]
  var errorTypeObject = OnBoardingErrors.errorTypes[errorType]
  if (errorType === ErrorType.tray) {
    constructAndShowErrorTrayModal(errorTypeObject)
    throw undefined
  } else if (errorType === ErrorType.inline) {
    return { content: errorTypeObject, type: errorType }
  }
}
const ErrorType = {
  tray: 'tray-error',
  inline: 'inline-error'
}

const handlersActions = {
  backToLoginAction: async () => {
    closeModal()
    await logOut({ shouldNavigateToLogin: true })
  },
  customerSupportAction: () => {
    Linking.openURL('tel://+498001721212')
  }
}

const OnBoardingErrors = {
  errorTypes: {
    [ErrorType.inline]: {
      body: translate('onboarding_error_inline_body')
    },
    [ErrorType.tray]: {
      title: translate('onboarding_error_tray_title'),
      description: translate('onboarding_error_tray_description'),
      firstButtonHnadler: {
        title: 'call_customer_support_button_title',
        handlerAction: handlersActions.customerSupportAction
      },
      secondButtonHandler: {
        title: 'back_to_login_button_title',
        handlerAction: handlersActions.backToLoginAction
      },
      withCloseButton: false
    }
  },
  servicesIds: {
    'Vluxgate.hashing': {
      errorCodes: {
        500: ErrorType.inline,
        504: ErrorType.inline,
        510: ErrorType.inline,
        404: ErrorType.inline,
        400: ErrorType.tray,
        403: ErrorType.tray,
        405: ErrorType.tray,
        415: ErrorType.tray
      }
    },
    'FunnelConnect.info': {
      errorCodes: {
        500: ErrorType.inline,
        404: ErrorType.inline,
        400: ErrorType.inline
      }
    },
    'FunnelConnect.ident': {
      errorCodes: {
        500: ErrorType.inline,
        504: ErrorType.inline,
        510: ErrorType.inline,
        404: ErrorType.inline,
        400: ErrorType.inline,
        403: ErrorType.inline,
        405: ErrorType.inline,
        415: ErrorType.inline
      }
    }
  }
}

export {
  handleOnBoardingApisErrors,
  ErrorType,
  handlersActions,
  constructAndShowErrorTrayModal,
  OnBoardingErrors
}
