import {
  getAccountId,
  mapChangedAddressDataToRequestBody,
  mapPostalContactPointApiResponseToAddressUIModel
} from 'App/Services/API/Requests/Address/Addresses.helpers'
import { UserDataServicesTypes } from 'App/Services/API/Requests/userData/userData.d'

describe('Adress helper test', () => {
  test('should retturn BAN number if user type is mobile', () => {
    const currentlyActiveSubscription = {
      id: '003444556661',
      type: UserDataServicesTypes.mobile,
      marketCode: 'MMC',
      ban: '003444556662'
    }
    expect(getAccountId(currentlyActiveSubscription)).toEqual('003444556662')
  })

  test('should retturn empty string if user type is mobile and BAN number is undefined', () => {
    const currentlyActiveSubscription = {
      id: '003444556661',
      type: UserDataServicesTypes.mobile,
      marketCode: 'MMC'
    }
    expect(getAccountId(currentlyActiveSubscription)).toEqual('')
  })

  test('should retturn user ID if user type is not mobile', () => {
    const currentlyActiveSubscription = {
      id: '003444556661',
      type: UserDataServicesTypes.fixednet,
      marketCode: 'MMC',
      ban: '003444556662'
    }
    expect(getAccountId(currentlyActiveSubscription)).toEqual('003444556661')
  })

  test('should retturn empty string if user type is not mobile and ID number is undefined', () => {
    const currentlyActiveSubscription = {
      type: UserDataServicesTypes.fixednet,
      marketCode: 'MMC',
      ban: '003444556662'
    }
    expect(getAccountId(currentlyActiveSubscription)).toEqual('')
  })

  test('should retturn empty string if user type is undefined', () => {
    expect(getAccountId()).toEqual('')
  })

  test('should map Changed Address Data To RequestBody', () => {
    const RequestBody = {
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
    const addressUIModel = {
      city: 'Düsseldorf',
      country: 'Deutschland',
      houseOrFlat: '3',
      postCode: '40549',
      streetName: 'Ferdinand-Braun-Platz',
      addressChangeAllowed: true,
      addressType: 'CUSTOMER'
    }
    const currentlyActiveSubscription = {
      id: '003444556662',
      type: UserDataServicesTypes.mobile,
      marketCode: 'MMC',
      ban: '003444556662'
    }
    expect(
      mapChangedAddressDataToRequestBody(
        addressUIModel,
        currentlyActiveSubscription
      )
    ).toEqual(RequestBody)
  })

  test('Should map Postal Contact Point Api Response To Address UI Model', () => {
    const addressUIModel = [
      {
        city: 'Düsseldorf',
        country: 'Deutschland',
        houseOrFlat: '3',
        postCode: '40549',
        streetName: 'Ferdinand-Braun-Platz',
        addressChangeAllowed: true,
        addressType: 'CUSTOMER'
      }
    ]

    const postalContactPoint = {
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

    expect(
      mapPostalContactPointApiResponseToAddressUIModel(postalContactPoint)
    ).toEqual(addressUIModel)
  })
})
