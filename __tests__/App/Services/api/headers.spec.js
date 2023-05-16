import _ from 'lodash'

import { getHeaders } from 'App/Services/API/Interceptors/Helpers/headers'
import { LEGACY_BASE_URL, DXL_BASE_URL } from 'App/Services/API'
import { ApiRoutes } from 'App/Services'
import { API_KEY } from 'App/Services/Keys/Keys.helper'

jest.mock('react-native-config', () => {
  return {
    BASE_URL_LEGACY: 'https://www.vodafone.de',
    BASE_URL_DXL: 'https://api.vodafone.de',
    IS_MOCK: 'true'
  }
})
const request = {
  url: 'https://www.vodafone.de/api/enterprise-resources/core/bss/cus-nil/customer/customer-accounts/4915203143192/payment-methods?usecase=FulfillPayment&client-id=web&channel-id=meinVodafone-Web&id-type=MSISDN',
  headers: {}
}

describe('test API headers', () => {
  beforeAll(() => {
    const Platform = require('react-native').Platform
    Platform.OS = 'ios'
  })

  it('should get the header for NIL type', () => {
    expect(
      _.isEqual(getHeaders(request.url), {
        Accept: 'application/json',
        Referer: `${LEGACY_BASE_URL}/api`,
        'x-vf-target-auth-system': 'M',
        'x-client-application': 'VFAPP',
        'x-vf-rep-os': 'ios',
        'x-vf-rep-osv': '15',
        'x-vf-rep-appv': 1,
        'x-vf-api': Math.ceil(new Date().getTime() / 1000),
        'x-vf-rep-from': 'app',
        'x-vf-clientid': 'MyVFApp',
        'Accept-Language': 'en'
      })
    ).toBeTruthy()
  })

  it('should get the header for MINT with revoke url', () => {
    request.url = `${LEGACY_BASE_URL}${ApiRoutes.Mint.oidcRevoke.URL}`
    expect(
      _.isEqual(getHeaders(request.url), {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-vf-rep-from': 'app',
        Accept: '*/*',
        'x-vf-rep-os': 'ios',
        'x-vf-rep-osv': '15',
        'x-vf-rep-appv': 1,
        'Accept-Language': 'en'
      })
    ).toBeTruthy()
  })

  it('should get the header for MINT with token url', () => {
    request.url = `${LEGACY_BASE_URL}${ApiRoutes.Mint.oidcToken.URL}`
    expect(
      _.isEqual(getHeaders(request.url), {
        'Content-Type': 'application/x-www-form-urlencoded',
        'x-vf-rep-from': 'app',
        Accept: '*/*',
        'x-vf-rep-os': 'ios',
        'x-vf-rep-osv': '15',
        'x-vf-rep-appv': 1,
        'Accept-Language': 'en'
      })
    ).toBeTruthy()
  })

  it('should get the header for MINT in upfront login case', () => {
    request.url = `${LEGACY_BASE_URL}${ApiRoutes.Mint.sessionStart.URL}`
    expect(
      _.isEqual(getHeaders(request.url), {
        'Content-Type': 'application/json',
        'x-vf-rep-from': 'app',
        Accept: '*/*',
        'x-vf-rep-os': 'ios',
        'x-vf-rep-osv': '15',
        'x-vf-rep-appv': 1,
        'Accept-Language': 'en'
      })
    ).toBeTruthy()
  })

  it('should get the header for DXL type not mocked', () => {
    request.url = 'https://api.vodafone.de/mva/v1/address/validate'
    expect(
      _.isEqual(getHeaders(request.url), {
        Accept: 'application/json',
        Referer: `${DXL_BASE_URL}/api`,
        'x-vf-target-auth-system': 'M',
        'x-client-application': 'VFAPP',
        'x-vf-rep-os': 'ios',
        'x-vf-rep-osv': '15',
        'x-vf-rep-appv': 1,
        'x-vf-rep-from': 'app',
        'x-vf-clientid': 'MyVFApp',
        'x-api-key': API_KEY,
        'x-vf-api': Math.ceil(new Date().getTime() / 1000),
        'Accept-Language': 'en'
      })
    ).toBeTruthy()
  })

  it('should get the header for Vluxgate type', () => {
    request.url = `${LEGACY_BASE_URL}/api/vluxgate/vlux/mobile/tariff/details/${4915203143192}`
    expect(
      _.isEqual(getHeaders(request.url), {
        Accept: 'application/json',
        Referer: `${LEGACY_BASE_URL}/api`,
        'x-vf-target-auth-system': 'M',
        'x-client-application': 'VFAPP',
        'x-vf-rep-os': 'ios',
        'x-vf-rep-osv': '15',
        'x-vf-rep-appv': 1,
        'x-vf-rep-from': 'app',
        'x-vf-clientid': 'MyVFApp',
        'Accept-Version': '1.0',
        'APP-Version': 1,
        Platform: 'ios',
        'x-vf-api': Math.ceil(new Date().getTime() / 1000),
        'Accept-Language': 'en'
      })
    ).toBeTruthy()
  })

  it('should get the header for Vluxgate version 2 type', () => {
    request.url = `${LEGACY_BASE_URL}/api/vluxgate/bew/vlux/mobile/tariff/details/${4915203143192}`
    expect(
      _.isEqual(getHeaders(request.url), {
        Accept: 'application/json',
        Referer: `${LEGACY_BASE_URL}/api`,
        'x-vf-target-auth-system': 'M',
        'x-client-application': 'VFAPP',
        'x-vf-rep-os': 'ios',
        'x-vf-rep-osv': '15',
        'x-vf-rep-appv': 1,
        'x-vf-rep-from': 'app',
        'x-vf-clientid': 'MyVFApp',
        'Accept-Version': '2.0',
        'APP-Version': 1,
        Platform: 'ios',
        'x-vf-api': Math.ceil(new Date().getTime() / 1000),
        'Accept-Language': 'en'
      })
    ).toBeTruthy()
  })
})
