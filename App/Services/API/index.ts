import {
  DXL_BASE_URL,
  LEGACY_BASE_URL,
  FUNNEL_CONNECT_BASE_URL
} from 'App/Services/API/Constants'

import {
  startMintProcess,
  proceedMintProcessStep
} from 'App/Services/API/Requests/Common/Mint/mint'

import {
  seamlessLoginDE,
  upFrontLoginAPI,
  SMSLoginProvideTAN
} from 'App/Services/API/Requests/Login/login'

import LogOutAPI from 'App/Services/API/Requests/Logout'

import {
  loadOIDCToken,
  refreshOIDC,
  addTokenExpirationTime
} from 'App/Services/API/Requests/OIDC/OIDC'

import 'App/Services/API/Interceptors/DXL.interceptor'
import 'App/Services/API/Interceptors/legacy.interceptor'

export {
  DXL_BASE_URL,
  LEGACY_BASE_URL,
  FUNNEL_CONNECT_BASE_URL,
  seamlessLoginDE,
  upFrontLoginAPI,
  startMintProcess,
  proceedMintProcessStep,
  SMSLoginProvideTAN,
  LogOutAPI,
  loadOIDCToken,
  refreshOIDC,
  addTokenExpirationTime
}
