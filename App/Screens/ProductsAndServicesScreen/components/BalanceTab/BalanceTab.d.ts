export interface BalanceHistoryCategory {
  id: number
  name: string
  items: BalanceHistoryItem[]
}

export interface BalanceHistoryItem {
  id: number
  icon?: string
  title?: string
  date: string
  duration?: string
  price: string
  type?: string
}
