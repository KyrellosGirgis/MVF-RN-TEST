import * as legacy from 'App/Services/API/Interceptors/legacy.interceptor'
import {
  fetchUserAddresses,
  changeAddress
} from 'App/Services/API/Requests/Address/Addresses.requests'
import { store } from 'App/Redux'
import { UserDataServicesTypes } from 'App/Services/API/Requests/userData/userData.d'
import ApiRoutes from 'App/Services/API/ApiRoutes'
import { REQUEST_METHODS } from 'App/Services/API/Constants'

const address = {
  city: 'Düsseldorf',
  country: 'Deutschland',
  houseOrFlat: '3',
  postCode: '40549',
  streetName: 'Ferdinand-Braun-Platz',
  addressChangeAllowed: true,
  addressType: 'CUSTOMER'
}
const responseBody = {
  postalContactPointVBO: [
    {
      contactPoints: {
        contactPoint: [
          {
            addressDetails: {
              street: 'Ferdinand-Braun-Platz',
              streetNumber: '3',
              postCode: '40549',
              city: 'Düsseldorf',
              country: 'Deutschland'
            },
            addressType: 'CUSTOMER',
            addressChangeAllowed: true
          }
        ]
      },
      details: {
        accountId: '003444556662',
        marketCode: 'MMC'
      }
    }
  ]
}
const requestBody = {
  postalContactPointVBO: [
    {
      contactPoints: {
        contactPoint: [
          {
            addressDetails: {
              street: 'Ferdinand-Braun-Platz',
              streetNumber: '3',
              postCode: '40549',
              city: 'Düsseldorf',
              country: 'Deutschland'
            },
            addressType: 'CUSTOMER'
          }
        ]
      },
      details: {
        accountId: '003444556662',
        marketCode: 'MMC'
      }
    }
  ]
}

describe('test address requests', () => {
  describe('test get addresses service', () => {
    let response
    beforeEach(() => {
      store.getState = () => ({
        appUserData: {
          currentlyActiveSubscription: {
            id: '003444556662',
            type: UserDataServicesTypes.mobile,
            marketCode: 'MMC',
            ban: '003444556662'
          }
        }
      })
    })

    it('should return data when get address api success', async () => {
      legacy.legacyAxios.get.mockImplementation(() => ({
        data: responseBody
      }))
      response = await fetchUserAddresses()
      expect(response).toEqual([address])
    })

    it('should throw error when get address api fails', async () => {
      legacy.legacyAxios.get.mockImplementation(() => {
        return Promise.reject('error')
      })
      await expect(fetchUserAddresses()).rejects.toEqual('error')
    })
  })
  describe('test change address service', () => {
    beforeEach(() => {
      store.getState = () => ({
        appUserData: {
          currentlyActiveSubscription: {
            id: '003444556662',
            type: UserDataServicesTypes.mobile,
            marketCode: 'MMC',
            ban: '003444556662'
          }
        }
      })
    })
    it('should return data when change address api success', async () => {
      legacy.legacyAxios.put = jest.fn()
      await changeAddress(address)
      expect(legacy.legacyAxios.put).toHaveBeenCalledWith(
        ApiRoutes.Nil.PostalContactPointAddresses.URL(
          'mobile',
          '003444556662',
          'MMC'
        ),
        requestBody,
        {
          apiId: ApiRoutes.Nil.PostalContactPointAddresses.apiId(
            REQUEST_METHODS.PUT
          )
        }
      )
    })
    it('should throw error when change address api fails', async () => {
      legacy.legacyAxios.put.mockImplementation(() => {
        return Promise.reject('error')
      })
      await expect(changeAddress(address)).rejects.toEqual('error')
    })
  })
})
