import store from './store'

export const ThunkStatus = {
  REJECTED: 'rejected',
  FULFILLED: 'fulfilled',
  PENDING: 'pending'
}

export type StoreType = ReturnType<typeof store.getState>
