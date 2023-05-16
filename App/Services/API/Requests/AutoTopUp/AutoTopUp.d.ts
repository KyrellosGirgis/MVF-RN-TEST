interface SubscriptionVBO {
  subscriptions: Subscription[]
}
interface Subscription {
  details: Details
  topup: AutoTopUp
}
interface Details {
  msisdn: String
}
interface AutoTopUp {
  status: string
}
export interface AutoTopupStatusType {
  subscriptionVBO: SubscriptionVBO[]
}
