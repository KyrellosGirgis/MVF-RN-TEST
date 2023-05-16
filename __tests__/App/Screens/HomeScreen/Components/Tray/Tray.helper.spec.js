import {
  expectedExpandedTraySubscriptions,
  mappedAppUserDataObject
} from '__tests__/App/APIsDataMocks/trayMapperMockData'
import * as NavigationFunctions from 'App/Containers'
import { store } from 'App/Redux'
import {
  mapCurrentSubscriptionsToExpandedProducts,
  navigateToChangePasswordScreen,
  navigateToAddressesOverviewScreen
} from 'App/Screens/HomeScreen/components/Tray/Tray.helpers'
import { UserDataServicesTypes } from 'App/Services/API/Requests/userData/userData.d'
import Routes from 'App/Containers/AppNavigation/Routes'

jest.mock('App/Utils/Helpers/generic.helpers', () => {
  const actualHelper = jest.requireActual('App/Utils/Helpers/generic.helpers')
  return {
    ...actualHelper,
    translate: (str) => str,
    testID: (str) => str,
    replaceCountryCodeInMSISDN: (msisdn) => msisdn
  }
})

describe('testing tray mapper ( products )', () => {
  it('Ensure that tray mapper (Expanded tray products) returned the required object', () => {
    store.getState = () => mappedAppUserDataObject
    const mappedResult = mapCurrentSubscriptionsToExpandedProducts()
    expect(mappedResult).toEqual(expectedExpandedTraySubscriptions)
  })
  it('should navigate to Address Overview screen when currentlyActiveSubscription is mobile and has ban access', () => {
    NavigationFunctions.NavigationFunctions.navigate = jest.fn()
    const currentlyActiveSubscription = {
      id: '003444556662',
      type: UserDataServicesTypes.mobile,
      marketCode: 'MMC',
      ban: '003444556662',
      hasBanAccess: true
    }
    store.getState = () => ({
      appUserData: { currentlyActiveSubscription: currentlyActiveSubscription }
    })
    navigateToAddressesOverviewScreen()
    expect(
      NavigationFunctions.NavigationFunctions.navigate
    ).toHaveBeenCalledWith(Routes.AddressesOverview)
  })
  it('should navigate to Error screen when currentlyActiveSubscription is mobile and has not ban access', () => {
    NavigationFunctions.NavigationFunctions.navigate = jest.fn()
    const currentlyActiveSubscription = {
      id: '003444556662',
      type: UserDataServicesTypes.mobile,
      marketCode: 'MMC',
      ban: '003444556662',
      hasBanAccess: false
    }
    store.getState = () => ({
      appUserData: { currentlyActiveSubscription: currentlyActiveSubscription }
    })
    navigateToAddressesOverviewScreen()
    expect(
      NavigationFunctions.NavigationFunctions.navigate
    ).toHaveBeenCalledWith(Routes.DummyTempErrorScreen)
  })
  it('should navigate to Address Overview screen when currentlyActiveSubscription is fixed net', () => {
    NavigationFunctions.NavigationFunctions.navigate = jest.fn()
    const currentlyActiveSubscription = {
      id: '003444556662',
      type: UserDataServicesTypes.fixednet,
      ban: '003444556662'
    }
    store.getState = () => ({
      appUserData: { currentlyActiveSubscription: currentlyActiveSubscription }
    })
    navigateToAddressesOverviewScreen()
    expect(
      NavigationFunctions.NavigationFunctions.navigate
    ).toHaveBeenCalledWith(Routes.AddressesOverview)
  })
  it('should navigate to Error screen when currentlyActiveSubscription is unity media', () => {
    NavigationFunctions.NavigationFunctions.navigate = jest.fn()
    const currentlyActiveSubscription = {
      id: '003444556662',
      type: UserDataServicesTypes.unitymedia,
      ban: '003444556662'
    }
    store.getState = () => ({
      appUserData: { currentlyActiveSubscription: currentlyActiveSubscription }
    })
    navigateToAddressesOverviewScreen()
    expect(
      NavigationFunctions.NavigationFunctions.navigate
    ).toHaveBeenCalledWith(Routes.DummyTempErrorScreen)
  })
  it('should navigate to Error screen when currentlyActiveSubscription is Cable', () => {
    NavigationFunctions.NavigationFunctions.navigate = jest.fn()
    const currentlyActiveSubscription = {
      id: '003444556662',
      type: UserDataServicesTypes.cable,
      ban: '003444556662'
    }
    store.getState = () => ({
      appUserData: { currentlyActiveSubscription: currentlyActiveSubscription }
    })
    navigateToAddressesOverviewScreen()
    expect(
      NavigationFunctions.NavigationFunctions.navigate
    ).toHaveBeenCalledWith(Routes.DummyTempErrorScreen)
  })
})

describe('test navigateToChangePasswordScreen', () => {
  NavigationFunctions.NavigationFunctions.navigate = jest.fn()

  test('should navigate to ChangePassword screen when AuthLevel equals WEB', async () => {
    navigateToChangePasswordScreen('WEB')
    expect(
      NavigationFunctions.NavigationFunctions.navigate
    ).toHaveBeenCalledWith(Routes.ChangePasswordScreen)
  })

  test('should navigate to DummyTempError screen when AuthLevel not equals WEB', async () => {
    navigateToChangePasswordScreen('Dummy')
    expect(
      NavigationFunctions.NavigationFunctions.navigate
    ).toHaveBeenCalledWith(Routes.DummyTempErrorScreen, {
      message: 'change_password_uneleigible_error_message'
    })
  })
})
