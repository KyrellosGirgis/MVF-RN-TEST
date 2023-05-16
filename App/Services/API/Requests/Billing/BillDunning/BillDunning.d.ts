export interface BillingInformation {
  dunningLetterAmount: number
}
export interface BillDunning {
  banStatus: string
  inDunning: boolean
  billingInformation: BillingInformation
}
