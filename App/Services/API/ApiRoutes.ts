import Config from 'react-native-config'

import { RELATED_PARTY_ID_FORMAT } from './Constants'

import {
  constructRequestParametersForBEWPermission,
  getCMSCacheConfigs
} from 'App/Services/API/ApiRoutes.helper'

import OIDC_config from 'App/Services/API/Requests/OIDC/OIDC.config'

import { CLIENT_ID } from 'App/Services/Keys/Keys.helper'
import { minutesToMilliSeconds } from 'App/Utils/Helpers/date.helpers'

const ApiRoutes = {
  DXL: {
    billHistory: {
      URL: (ban: number, offset: string = '0') =>
        `/mva/v1/history?relatedParty.id=urn:vf-de-dxl-tmf:vf:mobile:ban:${ban}&limit=3&offset=${offset}`,
      cache: { maxAge: minutesToMilliSeconds(15) },
      headers: { Accept: 'application/hal+json' },
      apiId: 'DXL.billHistory'
    },
    billDetails: {
      URL: '',
      cache: { maxAge: minutesToMilliSeconds(15) },
      apiId: 'DXL.billDetails'
    },
    documents: {
      URL: (urn: string) =>
        `/mva/v1/tmf-api/document/v4/document/?relatedParty.id=urn:${urn}`,
      cache: { maxAge: minutesToMilliSeconds(60) },
      apiId: 'DXL.documents'
    },
    documentDetails: {
      apiId: 'DXL.documentDetails'
    },
    myPlan: {
      URL: 'meinvodafone/v1/myplan',
      cache: { maxAge: minutesToMilliSeconds(60) },
      apiId: 'DXL.myplan'
    },
    accountMovement: {
      URL: (msisdn: string) =>
        `/mva/v1/accountMovement?relatedParty.id=urn:vf-de-dxl-tmf:vf:mobile:msisdn:${msisdn}`,
      cache: { maxAge: minutesToMilliSeconds(60) },
      apiId: 'DXL.accountMovement'
    },
    addons: {
      URL: '/mva/v1/Addons',
      apiId: 'DXL.addons'
    },
    addonsShop: {
      URL: '/mva/v1/AddonsShop',
      apiId: 'DXL.addonsShop'
    },
    dashboardSkeleton: {
      URL: (subscriptionID: string, serviceType: string, region?: string) =>
        `/mva/v1/user/${RELATED_PARTY_ID_FORMAT[serviceType]}${subscriptionID}${
          region ? '-' + region : ''
        }/dashboard/skeleton`,
      apiId: 'DXL.dashboardSkeleton'
    },
    smallTiles: {
      apiId: 'DXL.smallTiles'
    },
    billBalance: {
      URL: (ban: number) =>
        `/mva/v1/balance?relatedParty.id=urn:vf-de-dxl-tmf:vf:mobile:ban:${ban}`,
      apiId: 'DXL.billBalance'
    },
    mediumTiles: {
      apiId: 'DXL.mediumTiles'
    }
  },
  Mint: {
    sessionStart: {
      URL: '/mint/session/start',
      apiId: 'Mint.sessionStart'
    },
    sessionEnd: { URL: '/mint/session/end', apiId: 'Mint.sessionEnd' },
    processStart: {
      URL: (processName: string) =>
        `/mint/process/start/com.uxpsystems.mint.vodafone.process.frontend.${processName}`,
      apiId: 'Mint.processStart'
    },
    processStep: { URL: '/mint/process/step', apiId: 'Mint.processStep' },
    oidcRevoke: { URL: '/mint/oidc/revoke', apiId: 'Mint.oidcRevoke' },
    oidcToken: { URL: '/mint/oidc/token', apiId: 'Mint.oidcToken' },
    oidcAuthorize: {
      URL: `/mint/oidc/authorize?response_type=${OIDC_config.response_type}&code_challenge=${OIDC_config.code_challenge}&code_challenge_method=${OIDC_config.code_challenge_method}&state=${OIDC_config.state}&nonce=${OIDC_config.nonce}&scope=${OIDC_config.scope}&redirect_uri=${OIDC_config.redirect_uri}&client_id=${CLIENT_ID}&prompt=${OIDC_config.prompt}`,
      apiId: 'Mint.oidcAuthorize'
    },
    imprintDetails: {
      URL: '/mint/vfssdublin/helpAndSupport/impressum.xml',
      apiId: 'Mint.imprintDetails'
    },
    termsOfUse: {
      URL: '/mint/vfssdublin/helpAndSupport/termsAndConditions.xml',
      apiId: 'Mint.termsOfUse'
    }
  },
  Nil: {
    userData: {
      URL: '/api/enterprise-resources/core/bss/user-nil/identity/user-accounts/user-data',
      apiId: 'Nil.userData'
    },
    subscriptionUnbilledUsage: {
      URL: (msisdn: number, marketCode: string) =>
        `/api/enterprise-resources/core/bss/sub-nil/mobile/payment/service-usages/subscriptions/${msisdn}/unbilled-usage?market-code=${marketCode}`,
      apiId: 'Nil.subscriptionUnbilledUsage',
      cache: { maxAge: minutesToMilliSeconds(5) }
    },
    autoTopupStatus: {
      URL: (subscriptionId: string) =>
        `/api/enterprise-resources/core/bss/sub-nil/mobile/subscriptions/${subscriptionId}/bank/auto-debit`,
      apiId: (requestMethod: string) => `Nil.AutoTopup.${requestMethod}`
    },
    PostalContactPointAddresses: {
      URL: (userType: string, accountId: string, marketCode: string) =>
        `/api/enterprise-resources/core/bss/cus-nil/${userType}/postal-contact-points/customer-parties/${accountId}/addresses?${
          marketCode ? `market-code=${marketCode}` : ''
        }`,
      apiId: (requestMethod: string) =>
        `Nil.PostalContactPointAddresses${requestMethod}`
    },
    billDunning: {
      URL: (accountId: string) =>
        `/api/enterprise-resources/core/bss/cus-nil/payment-management/v1/payment/options/${accountId}?usecase=FulfillPaymentDunning&channel-id=Dunning&client-id=Vodafone`,
      apiId: 'Nil.BillDunning'
    },
    voucherTopup: {
      URL: (msisdn: number) =>
        `/api/enterprise-resources/core/bss/sub-nil/mobile/subscriptions/${msisdn}/voucher`,
      apiId: 'Nil.VoucherTopup'
    }
  },
  Vluxgate: {
    hashing: {
      URL: '/api/vluxgate/vlux/hashing',
      apiId: 'Vluxgate.hashing'
    },
    tariffBooked: {
      URL: (msisdn: string, type: string, mkCode: string) =>
        `/api/vluxgate/vlux/${type}/tariffBooked/${msisdn}?market-code=${mkCode}`,
      apiId: 'Vluxgate.tariffBooked'
    },

    bewPermission: constructRequestParametersForBEWPermission
  },
  FunnelConnect: {
    ident: {
      URL: (subscriptionType: string, hash: string, umdid?: string) => {
        const umdidParam = umdid ? `&umdid=${umdid}` : ''
        return `/meinvf-apps-ident/ident?${subscriptionType}=${hash}&s2s=2${umdidParam}`
      },
      apiId: 'FunnelConnect.ident'
    },
    info: {
      URL: (umdid: string) =>
        `/vfde-apps/info?umdid=${umdid}&permissions&notifications&attributes&out=json`,
      apiId: 'FunnelConnect.info',
      cache: { maxAge: minutesToMilliSeconds(5), ignoreCache: false }
    }
  },
  Cprx: {
    captcha: { URL: '/cprx/captcha', apiId: 'Cprx.captcha' }
  },
  CMS: {
    entryPoint: Config.CMS_ROOT_BASE_URL,
    cache: getCMSCacheConfigs({ defaultCacheTime: minutesToMilliSeconds(10) })
  }
}

export default ApiRoutes
