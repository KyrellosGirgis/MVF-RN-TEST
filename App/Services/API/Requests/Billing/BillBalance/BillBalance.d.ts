interface characteristic {
  name: string
  value: string
  valueType: string
  '@type': string
}
interface BillingAccount {
  characteristic: characteristic[]
}
interface Bill {
  billingAccount: BillingAccount
}

export interface BillBalance {
  bill: Bill
}
