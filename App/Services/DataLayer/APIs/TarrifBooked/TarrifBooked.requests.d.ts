export type TarrifBooked = { subscriptionVBO: SubscriptionVBO[] }

export type SubscriptionVBO = {
  type: string
  subscriptions: Subscription[]
}

export type Subscription = {
  details: SubscriptionDetails
  contractDetails: ContractDetails
  customerProduct: CustomerProduct
}

export type SubscriptionDetails = {
  msisdn: string
  status: string
  marketCode: string
}

export type ContractDetails = {
  startDate: string
  endDate: string
}

export type CustomerProduct = {
  tariffDetails: TariffDetails
}

export type TariffDetails = {
  name: string
  code: string
  offerInstCode: string
  description: string
  type: string
  recurringOffer: boolean
  trialOffer: boolean
  cycleValue: string
  cycleUnit: string
  cycleStartDate: string
  cycleEndDate: string
  status: string
  price: string
  unitOfMeasure: string
  primaryOfferId: string
  characteristicsValue: Characteristic[]
}

export type Characteristic = {
  code: string
  value: string
  unitOfMeasure: string
}
