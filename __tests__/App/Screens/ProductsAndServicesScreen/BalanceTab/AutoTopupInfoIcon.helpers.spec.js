import { showModal } from 'App/Containers/AppModal/AppModal.helpers'
import { showAutoTopupInfoModal } from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/components/AutoTopupInfoIcon/AutoTopupInfoIcon.helpers'

jest.mock('App/Containers/AppModal/AppModal.helpers', () => {
  return {
    closeModal: jest.fn(),
    showModal: jest.fn()
  }
})

describe('AutoTopupInfoIcon helper functions test', () => {
  it('should invoke showModal when call showAutoTopupInfoModal', () => {
    showAutoTopupInfoModal({ isDark: false })
    expect(showModal).toHaveBeenCalled()
  })
})
