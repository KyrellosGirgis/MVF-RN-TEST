/* eslint-disable import/namespace */

import React from 'react'

import { useSelector } from 'react-redux'
import { create, act } from 'react-test-renderer'

import store from 'App/Redux/store'

import Tray from 'App/Screens/HomeScreen/components/Tray/Tray'

import { ThunkStatus } from 'App/Redux/StoreType.d'

import { NavigationFunctions } from 'App/Containers'
import Routes from 'App/Containers/AppNavigation/Routes'
import { getTrayData } from 'App/Screens/HomeScreen/components/Tray/Tray.data'
import * as trayHelpers from 'App/Screens/HomeScreen/components/Tray/Tray.helpers'
import * as DeepLinksHelpers from 'App/Services/Deeplinks/Deeplinks.helper'

jest.mock('App/Screens/HomeScreen/components/Tray/Tray.data', () => ({
  ...jest.requireActual('App/Screens/HomeScreen/components/Tray/Tray.data'),
  getTrayData: jest.fn()
}))

jest.mock('App/Containers/AppNavigation/NavigationFunctions', () => ({
  navigate: jest.fn()
}))

const trayProps = {
  withTrayProps: {
    setTrayConfig: jest.fn(),
    setTrayVisable: jest.fn(),
    setTrayType: jest.fn(),
    setTrayHeight: jest.fn(),
    isVisable: false
  },
  onTryAgain: jest.fn()
}

const userData = {
  loggedInUserId: '1234',
  buckets: [
    {
      _id: '54903225_daten_GigaDepot-Datenvolumen Inland & EU',
      counterType: '',
      footerText: 'Reset in 14 days',
      headerTitle: ' GigaDepot-Datenvolumen Inland & EU',
      isRoaming: false,
      isShared: false,
      remainingValue: [Object],
      remainingValueName: 4,
      usageType: 'daten',
      value: [Object],
      valueName: '4GB'
    },
    {
      _id: '54903225_daten_Vodafone Pässe',
      footerText: 'unlimited_access',
      headerTitle: ' Vodafone Pässe',
      isRoaming: false,
      isShared: false,
      remainingValue: [Object],
      remainingValueName: 'Unlimited',
      usageType: 'daten',
      valueName: ''
    },
    {
      _id: '54903225_daten_Vodafone Pass im EU-Ausland',
      counterType: '',
      footerText: 'Reset in 14 days',
      headerTitle: ' Vodafone Pass im EU-Ausland',
      isRoaming: false,
      isShared: false,
      remainingValue: [Object],
      remainingValueName: 54,
      usageType: 'daten',
      value: [Object],
      valueName: '54GB'
    }
  ],
  userAccountVBO: {
    activeContractMobile: { id: 54905086 },
    authLevel: 'WEB',
    mobile: [
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object],
      [Object]
    ],
    onlineUser: {
      emailValidationStatus: 'c',
      firstName: 'Test',
      isFirstLogin: false,
      lastLoginDate: '2022-01-12T00:00:00+01:00',
      lastName: 'McTester1',
      mintUserID: 21357228,
      onlineUserID: 95529596,
      permissionFlag: true,
      primaryEmail: 'abc@vodafone.com',
      title: 'Herr',
      userName: 'McAppTest01'
    }
  }
}

const state = {
  dashboardSkeleton: {
    dashboardSkeletonLoadingStatus: ThunkStatus.FULFILLED
  },
  appUserData: userData,
  products: {
    productsSubscriptions: {
      mobileSubscriptions: [
        {
          mboId: 0,
          partyRoleId: 0,
          ban: 123456789,
          msisdn: 1234567891234,
          marketCode: 'MMC',
          subType: 'TN',
          role: 'SubscriptionAdmin',
          access: 'AccessSubscription',
          status: 'effective',
          registrationDate: '1970-01-01',
          isActiveContract: false,
          isFemtoSubscription: false
        }
      ],
      fixednetSubscriptions: [
        {
          access: 'DSLSubaccountSubscription',
          acn: '001952345361',
          isActiveContract: true,
          mboId: 62035451,
          partyRoleId: 106079739,
          registrationDate: '1970-01-01',
          role: 'SubscriptionAdmin',
          status: 'effective',
          subType: 'DSL',
          uoi: '10010006303241'
        }
      ],
      cableSubscriptions: [
        {
          hasCableMail: false,
          id: '332881148',
          isActiveContract: true,
          isDefaultContract: true,
          displayName: 'Red Internet 25 Cable',
          subscription: [
            {
              activatedDate: '1970-01-01',
              id: '332881148',
              type: 'KIP'
            }
          ]
        }
      ],
      unitymediaSubscriptions: [
        {
          access: 'Residential',
          accessGroups: ['DE_PROFILE', 'DE_ORION', 'DE_ADMIN'],
          accountNumber: 984119301,
          id: 1984119301,
          isActiveContract: true,
          isDefaultContract: true,
          name: 'Kabel-Vertrag-Unity.Media',
          partyRoleId: 0,
          region: 'NRW',
          registrationDate: '2021-03-26',
          role: 'AD',
          status: 'activated',
          subType: 'Unity-Media',
          subscription: [
            { code: 'A', name: 'Analog TV', status: 8 },
            { code: 'T', name: 'Telefon', status: 8 },
            { code: 'D', name: 'Digital TV', status: 1 },
            { code: 'I', name: 'Internet', status: 8 },
            { code: 'M', name: 'Mobilfunk', status: 8 }
          ]
        }
      ]
    }
  }
}

describe('Test useMainTrayConfigueration hook', () => {
  beforeAll(async () => {
    useSelector.mockImplementation((callBack) => {
      return callBack(state)
    })
    store.getState = () => state
  })
  let trayConfig = {}
  beforeEach(() => {
    DeepLinksHelpers.handleDeeplinkingWhenAppIsOpened = jest.fn()

    trayProps.withTrayProps.setTrayConfig = jest.fn((_, config) => {
      trayConfig = config
    })
    act(() => {
      create(<Tray {...trayProps} />)
    })
  })

  test('should toggle tray for products and account', () => {
    const toggleTray = jest.fn()
    trayConfig.onPressTrayItem({ subTrayID: 'account' }, toggleTray)
    trayConfig.onPressTrayItem({ subTrayID: 'products' }, toggleTray)
    expect(toggleTray).toBeCalledTimes(2)
  })

  test('should navigate when pressed any other tray item', () => {
    trayConfig.onPressTrayItem({ subTrayID: '', action: 'dest' })

    expect(DeepLinksHelpers.handleDeeplinkingWhenAppIsOpened).toBeCalledWith(
      'dest'
    )
  })

  test('should set tray visable when pressing logout subTrayItem', () => {
    const subTrayItem = { itemTitle: 'logout_title' }
    trayConfig.onPressSubTrayItems(subTrayItem)
    expect(trayProps.withTrayProps.setTrayVisable).toBeCalledWith(false)
  })

  test('should Navigate to privacy settings', () => {
    const subTrayItem = { itemTitle: 'subtray_privacy_title' }
    trayConfig.onPressSubTrayItems(subTrayItem)
    expect(NavigationFunctions.navigate).toBeCalledWith(Routes.PrivacySettings)
  })

  test('should Navigate to Settings', () => {
    const subTrayItem = { itemTitle: 'settings_title' }
    trayConfig.onPressSubTrayItems(subTrayItem)
    expect(NavigationFunctions.navigate).toBeCalledWith(Routes.Settings)
  })

  test('should Navigate to MessageCenterScreen', () => {
    const subTrayItem = { itemTitle: 'messages_section_title' }
    trayConfig.onPressSubTrayItems(subTrayItem)
    expect(NavigationFunctions.navigate).toBeCalledWith(
      Routes.MessageCenterScreen
    )
  })
  test('should Navigate to ChangePasswordScreen', () => {
    const subTrayItem = { itemTitle: 'my_password_title' }
    trayHelpers.navigateToChangePasswordScreen = jest.fn()
    trayConfig.onPressSubTrayItems(subTrayItem)

    expect(trayHelpers.navigateToChangePasswordScreen).toHaveBeenCalled()
  })

  test('should Navigate to AddressesOverviewScreen', () => {
    const subTrayItem = { itemTitle: 'addresses_section_title' }
    trayHelpers.navigateToAddressesOverviewScreen = jest.fn()

    trayConfig.onPressSubTrayItems(subTrayItem)

    expect(trayHelpers.navigateToAddressesOverviewScreen).toHaveBeenCalled()
  })

  test('should call setTraConfig when calling useMainTrayConfiguration hook inside Tray component', () => {
    expect(trayProps.withTrayProps.setTrayConfig).toBeCalled()
    expect(getTrayData).toBeCalled()
  })
  test('should call setModalVisible', () => {
    trayConfig.toggleModal(true)
    expect(trayProps.withTrayProps.setTrayVisable).toBeCalledWith(true)
  })
})
