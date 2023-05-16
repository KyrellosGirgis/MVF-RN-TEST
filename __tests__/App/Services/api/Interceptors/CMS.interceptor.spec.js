/* eslint-disable import/namespace */

import * as Loggers from 'App/Services/API/Interceptors/Helpers/loggers'
import * as CMS from 'App/Services/API/Interceptors/CMS.interceptor'

describe('CMS interceptor', () => {
  describe('test applyLegacyRequestInterceptor', () => {
    it('calls LogRequest in applyLegacyRequestInterceptor', () => {
      const Config = {
        headers: { test: 'test' },
        url: 'url',
        baseURL: 'baseUrl'
      }
      Loggers.LogRequest = jest.fn()
      CMS.applyLegacyRequestInterceptor(Config)
      expect(Loggers.LogRequest).toHaveBeenCalledWith(Config)
    })
  })

  describe('test applyLegacyResponseInterceptor', () => {
    it('calls LogResponse in applyLegacyResponseInterceptor', () => {
      const response = ''
      Loggers.LogResponse = jest.fn()
      CMS.applyLegacyResponseInterceptor(response)
      expect(Loggers.LogResponse).toHaveBeenCalledWith(response)
    })
  })
})
