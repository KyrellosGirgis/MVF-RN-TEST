import {
  getAutoTopupStatus,
  updateAutoTopupStatus
} from 'App/Services/API/Requests/AutoTopUp/AutoTopUp.requests'

import * as legacy from 'App/Services/API/Interceptors/legacy.interceptor'
import ApiRoutes from 'App/Services/API/ApiRoutes'
import { REQUEST_METHODS } from 'App/Services/API/Constants'
import { AUTO_TOPUP_STATUS } from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/BalanceTab.constants'
import { store } from 'App/Redux'

const autoTopUpStatus = 'NotRegistered'
const responseBody = {
  subscriptionVBO: [
    {
      type: 'mobile',
      subscriptions: [
        {
          details: {
            msisdn: '003444556662',
            marketCode: 'MMO'
          },
          topup: {
            status: 'NotRegistered',
            statusMessage: 'NotRegistered'
          }
        }
      ]
    }
  ]
}
const requestBody = {
  subscriptionVBO: [
    {
      type: 'mobile',
      subscriptions: [
        {
          details: {
            msisdn: '003444556662'
          },
          topup: {
            status: 'activate'
          }
        }
      ]
    }
  ]
}

describe('test AutoTopUp requests', () => {
  beforeEach(() => {
    store.getState = () => ({
      appUserData: {
        currentlyActiveSubscription: {
          id: '003444556662'
        }
      }
    })
  })
  describe('test getAutoTopupStatus service', () => {
    it('should return data when get address api success', async () => {
      legacy.legacyAxios.get.mockImplementation(() => ({
        data: responseBody
      }))
      const response = await getAutoTopupStatus()
      expect(legacy.legacyAxios.get).toHaveBeenCalledWith(
        ApiRoutes.Nil.autoTopupStatus.URL('003444556662'),
        {
          apiId: ApiRoutes.Nil.autoTopupStatus.apiId(REQUEST_METHODS.GET)
        }
      )
      expect(response).toEqual(autoTopUpStatus)
    })

    it('should throw error when get address api fails', async () => {
      legacy.legacyAxios.get.mockImplementation(() => {
        return Promise.reject('error')
      })
      await expect(getAutoTopupStatus()).rejects.toEqual('error')
    })
  })
  describe('test updateAutoTopupStatus service', () => {
    it('should return data when updateAutoTopupStatus api success', async () => {
      legacy.legacyAxios.put = jest.fn()
      await updateAutoTopupStatus(AUTO_TOPUP_STATUS.ACTIVATE)
      expect(legacy.legacyAxios.put).toHaveBeenCalledWith(
        ApiRoutes.Nil.autoTopupStatus.URL('003444556662'),
        requestBody,
        {
          apiId: ApiRoutes.Nil.autoTopupStatus.apiId(REQUEST_METHODS.PUT)
        }
      )
    })
    it('should throw error when updateAutoTopupStatus api fails', async () => {
      legacy.legacyAxios.put.mockImplementation(() => {
        return Promise.reject('error')
      })
      await expect(updateAutoTopupStatus()).rejects.toEqual('error')
    })
  })
})
