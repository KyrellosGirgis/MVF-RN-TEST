export type BalanceCalendarScreenParams = {
  BalanceCalendar: {
    onApplyCalendarFilter: (dateFilterPeriod: DateFilterPeriod) => {}
    dateFilterPeriod: DateFilterPeriod
  }
}
export interface DateFilterPeriod {
  start: string
  end: string
  selectedPeriod: string
}
