import { UsageTile } from 'App/Services/API/Requests/Dashboard/subscriptionUnbilledUsage/subscriptionUnbilledUsage.d'

export interface Props {
  item: UsageTile
  index: number
  isActiveCard: boolean
  theme: { name: string }
  swipeOpacity: any
}
