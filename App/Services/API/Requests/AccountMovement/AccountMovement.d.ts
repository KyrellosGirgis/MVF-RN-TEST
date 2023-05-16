export interface TopupHistoryItem {
  description: string
  confirmationDate: string
  status: string
  channel: TopupHistoryItemChannel
}

export interface TopupHistoryItemChannel {
  id: string
  amount: TopupHistoryItemAmount
}

export interface TopupHistoryItemAmount {
  amount: Number
  units: string
}
