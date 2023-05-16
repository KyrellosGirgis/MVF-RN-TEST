/* eslint-disable import/namespace */

import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { create, act } from 'react-test-renderer'
import ManualRefresh from '@vfgroup-oneplatform/foundation/Components/ManualRefresh'

import * as optionalNavigationHelpers from 'App/Services/DataLayer/Helpers/Dashboard/DashboardSkeleton.helpers'

import {
  userDataOriginalResponse,
  subscriptionUnbilledUsageData
} from '__tests__/App/Services/api/Requests/Dashboard/data'

import store from 'App/Redux/store'

import HomeScreen from 'App/Screens/HomeScreen/HomeScreen'
import Tray from 'App/Screens/HomeScreen/components/Tray/Tray'

import * as executeAppLaunchingTasksHelpers from 'App/Services/AppLifecycleManager/helpers/executeAppLaunchingTasks.helpers'
import * as airship from 'App/Services/SDKsManagment/SDKs/UrbanAirship/UrbanAirshipManager'
import StorageCacheStore from 'App/Services/StorageWrappers/StorageCacheStore/StorageCacheStore'
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
  navigation: {
    replace: jest.fn(),
    push: jest.fn(),
    pop: jest.fn(),
    goBack: jest.fn()
  },
  route: {
    key: 'HomeScreen',
    name: 'HomeScreen',
    path: undefined,
    params: {}
  },
  splashProps: {
    endingDuration: 2900,
    startSplashEndingAnimation: jest.fn(),
    dismissSplash: jest.fn(),
    setSplashMode: jest.fn(),
    setSplashColor: jest.fn(),
    setTrayVisable: jest.fn(),
    setTrayConfig: jest.fn()
  },
  theme: { name: 'light', isDark: false, colors: {} },
  setTimeout: jest.fn()
}
const appUserData = {
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
    },
    subscriptions: {
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

const state = {
  app: { deeplinkUrl: undefined },
  appUserData: appUserData,
  usages: { usagesTilesLoadingStatus: 'fulfilled', usagesTiles: [] },
  smallTiles: {
    ThirdCardComponent: {
      _id: '1_MyOffers',
      extraInfo: {
        background: 'secondary_card2',
        title: 'my_offers',
        icon: 'icAllRewards'
      }
    },
    FourthCardComponent: {
      _id: '2_Top-up',
      extraInfo: {
        title: 'top_up',
        icon: 'icTopUp',
        leftTitle: ''
      }
    },
    smallTilesLoadingStatus: ThunkStatus.FULFILLED
  },
  settings: {
    persistedSubscriptionTiles: [],
    presistedSelectedSmallTiles: {}
  },
  dashboardSkeleton: {
    dashboardSkeletonLoadingStatus: ThunkStatus.FULFILLED
  },
  mediumTiles: {
    mediumTilesLoadingStatus: 'fulfilled',
    mediumTiles: { ...mockMediumTilesJson }
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

describe('HomeScreen', () => {
  beforeAll(() => {
    store.dispatch = jest.fn()
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

    optionalNavigationHelpers.getOptionalNavigationSkeleton = jest.fn(() => [
      {
        title: 'topup',
        iconSource: 'src',
        action: {
          actionType: 'type',
          source: 'src'
        }
      }
    ])

    store.getState = () => state
  })
  dashboardSkeleton.fetchDashboardSkeleton = jest.fn()
  const expectToBeDefined = (comp, testID) => {
    expect(
      comp.root.findByProps({
        testID: testID
      })
    ).toBeDefined()
  }

  function mockSomeFunctions() {
    useDispatch.mockReturnValue(jest.fn())
    StorageCacheStore.clear = jest.fn()
  }

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should render Dashboard Component successfully ', async () => {
    let element
    await act(() => {
      element = create(<HomeScreen {...props} />)
    })
    expectToBeDefined(element, 'DashboardImageBackground')
  })

  test('should fetchDashboardSkeleton when refreshButton called its function onRefresh', async () => {
    mockSomeFunctions()
    let element
    await act(() => {
      element = create(<HomeScreen {...props} />)
    })
    expectToBeDefined(element, 'DashboardImageBackground')

    const refreshButton = element.root.findAllByType(ManualRefresh)[0]
    expect(refreshButton).toBeDefined()

    await refreshButton.props.onRefresh()
    expect(dashboardSkeleton.fetchDashboardSkeleton).toHaveBeenCalled()
  })

  test('should render Tray component successfully', async () => {
    let element
    await act(() => {
      element = create(<HomeScreen {...props} />)
    })
    const TrayComponent = element.root.findByType(Tray)
    expect(TrayComponent).toBeDefined()
  })

  test('should render Error scenario', async () => {
    legacy.legacyAxios.get.mockImplementation(() => new Error('error'))
    let element
    await act(() => {
      element = create(<HomeScreen {...props} />)
    })
    expect(element).toBeDefined()
    expect(
      element.root.children[0].children[0].children[0].children[0].children[0]
        .props.testID
    ).toBe('DashboardImageBackground')
    const refreshButton = element.root.findAllByType(ManualRefresh)[0]
    expect(refreshButton).toBeDefined()
    refreshButton.props.onRefresh()
  })

  test('should render HomeScreen Component', async () => {
    let element
    await act(() => {
      element = create(<HomeScreen {...props} />)
    })

    const HomeScreenComponent = element.root.findByType(HomeScreen)
    expect(HomeScreenComponent).toBeDefined()
  })

  test('should call requestAppTrackingPermission when the platform is ios', async () => {
    executeAppLaunchingTasksHelpers.requestAppTrackingPermission = jest.fn()

    store.getState = () => ({
      ...state,
      appUserData: appUserData,
      app: { deeplinkUrl: undefined }
    })

    act(() => {
      create(<HomeScreen {...props} />)
      jest.advanceTimersByTime(10)
    })

    expect(
      executeAppLaunchingTasksHelpers.requestAppTrackingPermission
    ).toHaveBeenCalled()
  })

  test('should call setAirShipConfigs in useEffect', async () => {
    airship.setUrbanAirshipUserDetails = jest.fn()
    await act(() => {
      create(<HomeScreen {...props} />)
    })
    expect(airship.setUrbanAirshipUserDetails).toHaveBeenCalled()
  })
})
