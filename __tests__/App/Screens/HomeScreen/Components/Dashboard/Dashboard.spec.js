/* eslint-disable import/namespace */

import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { create, act } from 'react-test-renderer'
import ManualRefresh from '@vfgroup-oneplatform/foundation/Components/ManualRefresh'

import {
  userDataOriginalResponse,
  subscriptionUnbilledUsageData
} from '__tests__/App/Services/api/Requests/Dashboard/data'

import store from 'App/Redux/store'

import Dashboard from 'App/Screens/HomeScreen/components/Dashboard/Dashboard'
import * as DeepLinkHelper from 'App/Services/Deeplinks/Deeplinks.helper'

import * as JailBrokenHelpers from 'App/Utils/Helpers/jailBroken.helpers'
import * as legacy from 'App/Services/API/Interceptors/legacy.interceptor'
import { ThunkStatus } from 'App/Redux/StoreType.d'
import { mockMediumTilesJson } from '__tests__/__mocks__/MockedStubbingData'
import * as dashboardSkeleton from 'App/Redux/reducers/DashboardSkeleton/dashboardSkeleton.thunk'

jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native')
  rn.NativeModules.RNBackgroundTimer = {
    setTimeout: jest.fn()
  }
  rn.NativeModules.SettingsManager = {
    settings: { AppleLocale: 'el-US', AppleLanguages: ['el-US'] }
  }
  rn.NativeModules.ExitAppModule = {
    exitApp: ''
  }
  rn.NativeModules.RNPermissions = {}
  return rn
})

jest.mock('App/Containers/AppNavigation/NavigationFunctions', () => {
  return { pop: jest.fn(), navigate: jest.fn() }
})

jest.mock('App/Utils/Helpers/generic.helpers', () => {
  return {
    isDeviceConnectedToNetwork: jest.fn(() => true),
    translate: (str) => str,
    isIOS: true,
    testID: (str) => str
  }
})

const props = {
  splashProps: {
    startSplashEndingAnimation: jest.fn(),
    setSplashMode: jest.fn(),
    setSplashLogoPosition: jest.fn(),
    dismissSplash: jest.fn(),
    setSplashColor: jest.fn(),
    endingDuration: 2000
  }
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
    subscriptions: {
      mobileSubscriptions: [
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object],
        [Object]
      ]
    },
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

const expectToBeDefined = (comp, testID) => {
  expect(
    comp.root.findByProps({
      testID: testID
    })
  ).toBeDefined()
}

const state = {
  smallTiles: {
    smallTiles: [],
    smallTilesLoadingStatus: ThunkStatus.PENDING
  },
  app: { deeplinkUrl: undefined },
  appUserData: userData,
  usages: { usagesTilesLoadingStatus: 'fulfilled', usagesTiles: [] },
  dashboardSkeleton: {
    dashboardSkeletonLoadingStatus: 'fulfilled'
  },
  mediumTiles: {
    mediumTilesLoadingStatus: 'fulfilled',
    mediumTiles: { ...mockMediumTilesJson }
  },
  settings: {
    persistedSubscriptionTiles: [],
    presistedSelectedSmallTiles: {}
  },
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

describe('Dashboard Component', () => {
  beforeAll(() => {
    store.dispatch = jest.fn()
    JailBrokenHelpers.checkIfJailBrokenOrRooted = jest.fn()
    legacy.legacyAxios.get.mockImplementation((url) => {
      if (url.includes('/user-accounts/user-data')) {
        return {
          data: userDataOriginalResponse
        }
      } else if (url.includes('/unbilled-usage?market-code')) {
        return {
          data: subscriptionUnbilledUsageData
        }
      } else {
        return Promise.resolve({
          data: {}
        })
      }
    })
    const Platform = require('react-native').Platform
    Platform.OS = 'ios'
    useDispatch.mockReturnValue(store.dispatch)
    useSelector.mockImplementation((callBack) => {
      return callBack(state)
    })
    store.getState = () => state
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should render Dashboard Component successfully', async () => {
    let element
    await act(() => {
      element = create(<Dashboard {...props} />)
    })
    expectToBeDefined(element, 'DashboardImageBackground')
  })

  test('should call onDashboardRefresh when refresh button call its function onRefresh', async () => {
    dashboardSkeleton.fetchDashboardSkeleton = jest.fn()
    let element
    await act(() => {
      element = create(<Dashboard {...props} />)
    })
    const refreshButton = element.root.findAllByType(ManualRefresh)[0]
    expect(refreshButton).toBeDefined()
    await refreshButton.props.onRefresh()
    expect(dashboardSkeleton.fetchDashboardSkeleton).toHaveBeenCalled()
  })

  test('should use useStartSplashEndAnimation and call handleDeepLinkNavigation when app is opened with a deeplink', async () => {
    store.getState = () => ({
      ...state,
      appUserData: userData,
      app: { deeplinkUrl: 'mvf://home' }
    })
    DeepLinkHelper.handleDeepLinkNavigation = jest.fn()

    await act(() => {
      create(<Dashboard {...props} />)
      jest.advanceTimersByTime(1)
    })

    expect(DeepLinkHelper.handleDeepLinkNavigation).toHaveBeenCalledWith(
      'mvf://home',
      expect.anything()
    )
  })

  test('should use useStartSplashEndAnimation and not call handleDeepLinkNavigation when app is not opened with a deeplink', async () => {
    store.getState = () => ({
      ...state,
      appUserData: userData,
      app: { deeplinkUrl: undefined }
    })
    DeepLinkHelper.handleDeepLinkNavigation = jest.fn()

    await act(() => {
      create(<Dashboard {...props} />)
      jest.advanceTimersByTime(1)
    })

    expect(DeepLinkHelper.handleDeepLinkNavigation).not.toHaveBeenCalled()
  })
})
