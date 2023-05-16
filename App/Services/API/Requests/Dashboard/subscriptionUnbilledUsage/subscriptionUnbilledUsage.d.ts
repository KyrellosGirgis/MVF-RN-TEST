export interface subscriptionUnbilledUsageType {
  serviceUsageVBO: ServiceUsageVBO
}

export interface ServiceUsageVBO {
  accountId: string
  type: string
  billDetails: BillDetails
  usageAccounts: UsageAccount[]
}

export interface BillDetails {
  billCycleStartDate: Date
  billCycleEndDate: string
  currentSummary: null
  lastSummary: null
}

export interface UsageAccount {
  details: Details
  productSpecification: ProductSpecification
  paymentGroup: PaymentGroup[]
  usageGroup: UsageGroup[]
}

export interface Details {
  msisdn: string
  marketCode: string
  amount: string
  unitOfMeasure: string
  billDate: Date
  lastUpdateDate: null
}

export interface PaymentGroup {
  description: string
  payment: Payment[]
}

export interface Payment {
  category: string
  amount: string
  previousAmount: string
  unitOfMeasure: string
  startDate: Date
  endDate: Date
  lastUpdateDate: null
}

export interface ProductSpecification {
  tariffDetails: TariffDetails
}

export interface TariffDetails {
  name: string
  code: string
  description: string
}

export interface UsageGroup {
  container: string
  usage: Usage[]
}

export interface Usage {
  name: string
  description: string
  type: string
  rollOverIndicator: boolean
  upgradable: boolean
  limitStatus?: boolean
  isLimitedMember: boolean
  remaining: string
  used: string
  total: string
  unitOfMeasure: string
  lastUpdateDate: Date | null
  endDate: null
  code?: string
}

export interface Amount {
  value: number
  unit: string
  stringValue?: string
}

export interface UsageTile {
  _id: string
  title: string
  usageType: string
  isRoaming: boolean
  isUnlimited: boolean
  billCycleEndDate: string
  formattedTotal: Amount
  remaining: string
  remainingUnit: string
  leftOfText?: string
  remainingValuePercentage: string | number
}
