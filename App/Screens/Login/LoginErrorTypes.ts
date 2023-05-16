import { Linking } from 'react-native'

import { webURLs } from 'App/Services'

import { ErrorType } from 'App/Services/API/Requests/Common/ErrorTypes'
import { openExternalWebView } from 'App/Utils/Helpers/generic.helpers'

const CTAHandlers = {
  CustomerSupport: {
    title: 'Customer_Support',
    handler: () => {
      Linking.openURL('tel://+498001721212')
    }
  },
  WebView: {
    title: 'Continue_Registration',
    handler: () => {
      openExternalWebView(webURLs.registerationURL)
    }
  }
}

const LoginErrors: any = {
  StartPost: {
    'authentication-required': {
      Type: ErrorType.Inline,
      body: 'login_authentication_error_body_message'
    },
    BadCredentialsException: {
      Type: ErrorType.Inline,
      body: 'login_authentication_error_body_message'
    },
    Unauthorized: {
      Type: ErrorType.Inline,
      body: 'login_authentication_error_body_message'
    },
    'last-try-before-lock': {
      Type: ErrorType.Inline,
      body: 'login_last_try_error_body_message'
    },
    'credentials-expired': {
      Type: ErrorType.Tray,
      CTAHandler: CTAHandlers.CustomerSupport,
      body: 'login_credentials_expired_error_body_message'
    },

    'user-permanently-locked': {
      Type: ErrorType.Tray,
      CTAHandler: CTAHandlers.CustomerSupport,
      body: 'login_user_permanently_locked_error_body_message'
    },
    'user-temporary-locked': {
      Type: ErrorType.Inline,
      body: 'login_user_temporary_locked_error_body_message'
    },
    'not-allowed': {
      Type: ErrorType.Inline,
      body: 'login_not_allowed_error_body_message'
    },
    '202': {
      Type: ErrorType.Tray,
      CTAHandler: CTAHandlers.WebView,
      body: 'login_202_error_body_message'
    }
  },
  OIDC: {
    OIDC_Authorize: {
      Type: ErrorType.Inline,
      body: 'login_else_body_message'
    }
  },
  ValidateMsisdn: {
    'validate-msisdn': {
      Type: ErrorType.Inline,
      body: '5xx_error_body_message'
    }
  },
  Step1: {
    'msisdn-is-unknown': {
      Type: ErrorType.Inline,
      body: 'step_1_put_msisdn_is_unknown_error_body_message'
    },
    'msisdn-invalid': {
      Type: ErrorType.Inline,
      body: 'step_1_put_msisdn_is_unknown_error_body_message'
    },
    'error-from-send-document': {
      Type: ErrorType.Inline,
      body: 'step_1_put_msisdn_error_from_send_document_error_body_message'
    },
    'newpassword-mismatch-error': {
      Type: ErrorType.Inline,
      body: 'step_1_put_change_password_newpassword_mismatch_error_message'
    },
    'oldpassword-verification-failed': {
      Type: ErrorType.Inline,
      body: 'step_1_put_change_password_oldpassword_verification_failed_error_message'
    },
    'password-policy-violation': {
      Type: ErrorType.Inline,
      body: 'step_1_put_change_password_password_policy_violation_error_message'
    },
    'username-password-policy-violation': {
      Type: ErrorType.Inline,
      body: 'step_1_put_change_password_username_password_policy_violation_error_message'
    }
  },
  Step2: {
    'tan-invalid': {
      Type: ErrorType.Inline,
      body: 'step_2_tan_invalid_error_body_message'
    },
    'tan-retries-reached': {
      Type: ErrorType.Inline,
      body: 'step_2_tan_retries_reached_error_body_message'
    },
    step_2_403: {
      Type: ErrorType.Tray,
      CTAHandler: CTAHandlers.CustomerSupport,
      body: 'step_2_403_error_body_message'
    }
  },
  Else: {
    Type: ErrorType.Inline,
    body: 'login_else_body_message'
  },
  '5xx': {
    Type: ErrorType.Inline,
    body: '5xx_error_body_message'
  },
  ALL: {
    Type: ErrorType.Inline,
    body: 'no_connection_error_body_message'
  },
  Captcha: {
    body: 'invalid_captcha'
  }
}

export { CTAHandlers }
export default LoginErrors
