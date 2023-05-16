export interface BillingHistoryType {
  _embedded: Embedded
  totalCount: number
  resultCount: number
  _links: Links
}
export interface Links {
  self: Href
  next: Href
  last: Href
}
export interface BillLink {
  bill: Href
}
export interface Href {
  href: string
}
export interface Embedded {
  history: History[]
  billingAccount: billingAccount
}
export interface History {
  id: string
  amountDue: AmountDue
  billDate: Date
  billingPeriod: BillingPeriod
  paymentDueDate: Date
  billingAccount: billingAccount
  paymentMethod: paymentMethod
  _links: BillLink
}

export interface AmountDue {
  value: number
  unit: string
}

export interface BillingPeriod {
  startDateTime: Date
  endDateTime: Date
}

export interface billingAccount {
  id: string
  accountBalance: accountBalance[]
  characteristic: characteristic[]
}

export interface accountBalance {
  balanceType: string
  amount: amount
}
export interface amount {
  unit: string
  value: number
}

export interface characteristic {
  name: string
  value: string
  valueType: string
  '@type': string
}
export interface paymentMethod {
  id: string
  '@type': string
}
