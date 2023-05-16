/* eslint-disable import/namespace */

import { ApiRoutes } from 'App/Services'
import * as legacy from 'App/Services/API/Interceptors/legacy.interceptor'
import { fetchPrivacySettingsDetails } from 'App/Services/API/Requests/PrivacySettingsDetails/PrivacySettingsDetails'

const ImprintData = {
  headline: 'test',
  text: 'test'
}

describe('Test fetchPrivacySettingsDetails file', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {})

  describe('Test fetchPrivacySettingsDetails', () => {
    describe('Test fetchPrivacySettingsDetails', () => {
      it('should return expected data from fetchPrivacySettingsDetails when api succeeds', async () => {
        legacy.legacyAxios.get = jest.fn(() => {
          return {
            data: ImprintData
          }
        })

        const response = await fetchPrivacySettingsDetails(
          ApiRoutes.Mint.imprintDetails
        )
        expect(response).toBe(ImprintData)
      })

      it('should throw error from fetchPrivacySettingsDetails when api fails', async () => {
        legacy.legacyAxios.get.mockImplementation(() => {
          return Promise.reject('failed to load CMS')
        })
        await expect(
          fetchPrivacySettingsDetails(ApiRoutes.Mint.imprintDetails)
        ).rejects.toEqual('failed to load CMS')
      })

      it('should return undefined from fetchPrivacySettingsDetails when data is undefined', async () => {
        legacy.legacyAxios.get = jest.fn(() => {
          return {
            undefined
          }
        })
        const response = await fetchPrivacySettingsDetails(
          ApiRoutes.Mint.imprintDetails
        )
        expect(response).toBe(undefined)
      })
    })
  })
})
