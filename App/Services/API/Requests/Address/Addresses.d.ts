interface AddressDetails {
  street: string
  streetNumber: string
  postCode: string
  city: string
  country: string
}
interface PostalContactPointVBO {
  contactPoints: ContactPoints
}
interface ContactPoints {
  contactPoint: ContactPoint[]
}
export interface ContactPoint {
  addressType: string
  addressChangeAllowed: boolean
  addressChangeReason: string
  addressDetails: AddressDetails
}

export interface PostalContactPointApi {
  postalContactPointVBO: PostalContactPointVBO[]
}
export interface AddressUIType {
  city: string
  country: string
  houseOrFlat: string
  postCode: string
  streetName: string
  addressChangeAllowed: boolean
  addressType: string
}
