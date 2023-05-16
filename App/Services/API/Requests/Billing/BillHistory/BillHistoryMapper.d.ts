import { billingAccount, Href } from './BillHistory.d'

export interface BilllHistory {
  nextBillsLink: Href
  billHistoryItems: BillData[]
  totalCount: number
  resultCount: number
}
export interface BillData {
  id: string
  value: number
  unit: string
  currency: string
  startDate: Date
  endDate: Date
  billIssuanceValue: number
  billIssuancePrice: number
  paymentInfo: string[]
  billDate: Date
  price: string
  imageListProp: any
  billDetailsLink: Href
  billingAccount: billingAccount
  isLoading: Boolean
}
