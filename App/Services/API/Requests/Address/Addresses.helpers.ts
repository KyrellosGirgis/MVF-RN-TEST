import {
  PostalContactPointApi,
  ContactPoint,
  AddressUIType
} from 'App/Services/API/Requests/Address/Addresses'
import {
  ActiveSubscription,
  UserDataServicesTypes
} from 'App/Services/API/Requests/userData/userData.d'

const mapPostalContactPointApiResponseToAddressUIModel = (
  postalContactPoint: PostalContactPointApi
) => {
  return postalContactPoint.postalContactPointVBO[0]?.contactPoints?.contactPoint?.map(
    (contactPoint: ContactPoint) => {
      return <AddressUIType>{
        city: contactPoint.addressDetails.city,
        country: contactPoint.addressDetails.country,
        houseOrFlat: contactPoint.addressDetails.streetNumber,
        postCode: contactPoint.addressDetails.postCode,
        streetName: contactPoint.addressDetails.street,
        addressChangeAllowed: contactPoint.addressChangeAllowed,
        addressType: contactPoint.addressType
      }
    }
  )
}

const mapChangedAddressDataToRequestBody = (
  changedAddress: AddressUIType,
  currentlyActiveSubscription: ActiveSubscription
) => {
  return {
    postalContactPointVBO: [
      {
        contactPoints: {
          contactPoint: [
            {
              addressDetails: {
                street: changedAddress.streetName,
                streetNumber: changedAddress.houseOrFlat,
                postCode: changedAddress.postCode,
                city: changedAddress.city,
                country: changedAddress.country
              },
              addressType: changedAddress.addressType
            }
          ]
        },
        details: {
          accountId: getAccountId(currentlyActiveSubscription),
          marketCode: currentlyActiveSubscription.marketCode
        }
      }
    ]
  }
}

const getAccountId = (currentlyActiveSubscription: ActiveSubscription) => {
  switch (currentlyActiveSubscription?.type) {
    case UserDataServicesTypes.mobile:
      return `${currentlyActiveSubscription?.ban ?? ''}`
    default:
      return currentlyActiveSubscription?.id ?? ''
  }
}
export {
  mapPostalContactPointApiResponseToAddressUIModel,
  mapChangedAddressDataToRequestBody,
  getAccountId
}
