interface Characteristic {
  name: string
  value: string
  valueType?: string
  '@type'?: string
}

interface OutOfBundleAmount {
  value: number
  unit: string
  characteristic: Characteristic[]
}
export interface Subscription {
  name: string
  relatedEntity?: RelatedEntity[]
  relatedParty?: RelatedParty
  outOfBundleAmount: OutOfBundleAmount[]
  productCharacteristic: Characteristic[]
  totalBeforeVAT: Amount
}

export interface RelatedParty {
  id: string
}

export interface RelatedEntity {
  href: string
  id: string
  '@type': string
  documentType: string
  relatedEntity: RelatedEntity
  relatedParty: RelatedParty[]
  characteristic: Characteristic[]
}

export interface BillDetails {
  amountDue: Amount
  id: string
  billDate: string
  subscription: Subscription[]
  billSummary: any[]
  billingAccount: any
  billingPeriod: any
  paymentDueDate: string
  relatedEntity: BillDetailsRelatedEntity[]
}

export interface Amount {
  value: number
  unit: string
}

export interface BillDetailsRelatedEntity {
  href: string
  id: string
  '@type': string
  documentType: string
  relatedEntity: any
  characteristic: any[]
}
