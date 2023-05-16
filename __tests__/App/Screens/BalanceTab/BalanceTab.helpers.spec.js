import {
  isAutoTopUpActivated,
  shouldShowAutoTopUpBanner,
  shouldShowAutoTopUpCard
} from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/BalanceTab.helpers'
import { AUTO_TOPUP_STATUS } from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/BalanceTab.constants'

describe('Balance Tap helpers test', () => {
  it('shouldShowAutoTopUpCard should return true when auto topUp status is ACTIVATE', () => {
    expect(shouldShowAutoTopUpCard(AUTO_TOPUP_STATUS.ACTIVATE)).toEqual(true)
  })
  it('shouldShowAutoTopUpCard return true when auto topUp status is DEACTIVATE', () => {
    expect(shouldShowAutoTopUpCard(AUTO_TOPUP_STATUS.DEACTIVATE)).toEqual(true)
  })
  it('shouldShowAutoTopUpCard should return true when auto topUp status is ASK_ACTIVATE', () => {
    expect(shouldShowAutoTopUpCard(AUTO_TOPUP_STATUS.ASK_ACTIVATE)).toEqual(
      true
    )
  })
  it('shouldShowAutoTopUpCard should return true when auto topUp status is ACTIVE_COMFORT_CHARGE', () => {
    expect(
      shouldShowAutoTopUpCard(AUTO_TOPUP_STATUS.ACTIVE_COMFORT_CHARGE)
    ).toEqual(true)
  })
  it('shouldShowAutoTopUpCard should return false when auto topUp status is NOT_REGISTERED', () => {
    expect(shouldShowAutoTopUpCard(AUTO_TOPUP_STATUS.NOT_REGISTERED)).toEqual(
      false
    )
  })
  it('isAutoTopUpActivated should return true when auto topUp status is ACTIVATE', () => {
    expect(isAutoTopUpActivated(AUTO_TOPUP_STATUS.ACTIVATE)).toEqual(true)
  })
  it('isAutoTopUpActivated should return true when auto topUp status is ACTIVE_COMFORT_CHARGE', () => {
    expect(
      isAutoTopUpActivated(AUTO_TOPUP_STATUS.ACTIVE_COMFORT_CHARGE)
    ).toEqual(true)
  })
  it('isAutoTopUpActivated should return false when auto topUp status is DEACTIVATE', () => {
    expect(isAutoTopUpActivated(AUTO_TOPUP_STATUS.DEACTIVATE)).toEqual(false)
  })
  it('isAutoTopUpActivated should return false when auto topUp status is ASK_ACTIVATE', () => {
    expect(isAutoTopUpActivated(AUTO_TOPUP_STATUS.ASK_ACTIVATE)).toEqual(false)
  })
  it('shouldShowAutoTopUpBanner should return true when auto topUp status is NOT_REGISTERED and is loading is false', () => {
    expect(
      shouldShowAutoTopUpBanner(AUTO_TOPUP_STATUS.NOT_REGISTERED, false)
    ).toEqual(true)
  })
  it('shouldShowAutoTopUpBanner should return false when auto topUp status is NOT_REGISTERED and is loading is true', () => {
    expect(
      shouldShowAutoTopUpBanner(AUTO_TOPUP_STATUS.NOT_REGISTERED, true)
    ).toEqual(false)
  })
  it('shouldShowAutoTopUpBanner should return false when auto topUp status is ASK_ACTIVATE', () => {
    expect(
      shouldShowAutoTopUpBanner(AUTO_TOPUP_STATUS.ASK_ACTIVATE, false)
    ).toEqual(false)
  })
  it('shouldShowAutoTopUpBanner should return false when auto topUp status is ACTIVATE', () => {
    expect(
      shouldShowAutoTopUpBanner(AUTO_TOPUP_STATUS.ACTIVATE, false)
    ).toEqual(false)
  })
  it('shouldShowAutoTopUpBanner should return false when auto topUp status is DEACTIVATE', () => {
    expect(
      shouldShowAutoTopUpBanner(AUTO_TOPUP_STATUS.DEACTIVATE, false)
    ).toEqual(false)
  })
  it('shouldShowAutoTopUpBanner should return false when auto topUp status is ACTIVE_COMFORT_CHARGE', () => {
    expect(
      shouldShowAutoTopUpBanner(AUTO_TOPUP_STATUS.ACTIVE_COMFORT_CHARGE, false)
    ).toEqual(false)
  })
})
