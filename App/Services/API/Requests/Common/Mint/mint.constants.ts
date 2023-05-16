import { ErrorType } from 'App/Services/API/Requests/Common/ErrorTypes'

const MintErrors: any = {
  Mint: {
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
  Else: {
    Type: ErrorType.Inline,
    body: 'mint_else_body_message'
  },
  '5xx': {
    Type: ErrorType.Inline,
    body: '5xx_error_body_message'
  }
}

const ProcessName = {
  ValidateMsisdnViaSms: 'ValidateMsisdnViaSms',
  ChangePassword: 'changePassword'
}

export { MintErrors, ProcessName }
