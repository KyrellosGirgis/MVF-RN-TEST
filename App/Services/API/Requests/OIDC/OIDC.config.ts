import { pkceChallenge } from 'react-native-pkce-challenge'

import { generateRandom } from 'App/Screens/Login/Implementations/Login.helper'

const challenge = pkceChallenge()
const state = generateRandom(16)
const nonceValue = generateRandom(16)

const OIDC_config = {
  redirect_uri: 'mvapp://oidclogin',
  grant_type: 'authorization_code',
  state: state,
  challenge: pkceChallenge(),
  code_challenge_method: 'S256',
  response_type: 'code',
  scope: 'openid%20profile%20validate-token%20offline_access%20webseal',
  code_verifier: challenge.codeVerifier,
  nonce: nonceValue === state ? generateRandom(16) : nonceValue,
  code_challenge: challenge.codeChallenge,
  prompt: 'none'
}
export default OIDC_config
