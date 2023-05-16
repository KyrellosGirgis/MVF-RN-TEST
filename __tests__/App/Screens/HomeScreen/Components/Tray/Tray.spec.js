/* eslint-disable import/namespace */
import React from 'react'
import { Logout } from '@vfgroup-oneplatform/framework/CommonUI'

import { useSelector } from 'react-redux'
import { create, act } from 'react-test-renderer'

import store from 'App/Redux/store'

import Tray from 'App/Screens/HomeScreen/components/Tray/Tray'

import logOutHandler from 'App/Screens/Login/Implementations/LogoutImplementation/LogoutImplementation'
import { ThunkStatus } from 'App/Redux/StoreType.d'
import * as optionalNavigationHelpers from 'App/Services/DataLayer/Helpers/Dashboard/DashboardSkeleton.helpers'

jest.mock(
  'App/Screens/Login/Implementations/LogoutImplementation/LogoutImplementation',
  () => jest.fn()
)
const props = {
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
  },
  appUserDataLoadingStatus: false
}

const state = {
  smallTiles: {
    smallTiles: [],
    smallTilesLoadingStatus: ThunkStatus.PENDING
  },
  dashboardSkeleton: {
    dashboardSkeletonLoadingStatus: ThunkStatus.FULFILLED
  },
  appUserData: userData,
  appUserDataLoadingStatus: false
}

describe('Test Tray component', () => {
  beforeAll(() => {
    useSelector.mockImplementation((callBack) => {
      return callBack(state)
    })
    store.getState = () => state
  })
  optionalNavigationHelpers.getOptionalNavigationSkeleton = jest.fn(() => [
    {
      title: 'topup',
      iconSource: 'src',
      action: 'src'
    }
  ])

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should render Tray Component successfully', async () => {
    let element
    await act(() => {
      element = create(<Tray {...props} />)
    })
    const SubscriptionLoadingScreen = element.root.findByProps({
      testID: 'switch_product_loading_screen'
    })

    expect(SubscriptionLoadingScreen).toBeDefined()
    expect(() => element.root.findByType(Logout)).toThrowError()
  })

  test('should render Tray Component with Logout successfully', async () => {
    let trayConfig = {}
    props.withTrayProps.setTrayConfig = jest.fn((_, config) => {
      trayConfig = config
    })

    let element
    await act(() => {
      element = create(<Tray {...props} />)
    })

    trayConfig.onPressSubTrayItems({ itemTitle: 'logout_title' })

    expect(element.root.findByType(Logout)).toBeDefined()
  })

  test('should hide LogoutModal when call toggleModal prop', async () => {
    let trayConfig = {}
    props.withTrayProps.setTrayConfig = jest.fn((_, config) => {
      trayConfig = config
    })

    let element
    await act(() => {
      element = create(<Tray {...props} />)
    })

    trayConfig.onPressSubTrayItems({ itemTitle: 'logout_title' })

    const LogoutModal = element.root.findByType(Logout)
    expect(LogoutModal).toBeDefined()
    LogoutModal.props.toggleModal()
    expect(() => element.root.findByType(Logout)).toThrowError()
  })

  test('should hide LogoutModal when call closeModal prop', async () => {
    let trayConfig = {}
    props.withTrayProps.setTrayConfig = jest.fn((_, config) => {
      trayConfig = config
    })

    let element
    await act(() => {
      element = create(<Tray {...props} />)
    })

    trayConfig.onPressSubTrayItems({ itemTitle: 'logout_title' })

    const LogoutModal = element.root.findByType(Logout)
    expect(LogoutModal).toBeDefined()
    LogoutModal.props.closeModal()
    expect(() => element.root.findByType(Logout)).toThrowError()
  })

  test('should hide LogoutModal and logout when call LogoutModal prop', async () => {
    let trayConfig = {}
    props.withTrayProps.setTrayConfig = jest.fn((_, config) => {
      trayConfig = config
    })

    let element
    await act(() => {
      element = create(<Tray {...props} />)
    })

    trayConfig.onPressSubTrayItems({ itemTitle: 'logout_title' })

    const LogoutModal = element.root.findByType(Logout)
    LogoutModal.props.logout()

    expect(() => element.root.findByType(Logout)).toThrowError()
    expect(logOutHandler).toHaveBeenCalled()
  })

  test('should open Tray modal when call toggleModal', async () => {
    let trayConfig = {}
    props.withTrayProps.setTrayConfig = jest.fn((_, config) => {
      trayConfig = config
    })

    let element
    await act(() => {
      element = create(<Tray {...props} />)
    })

    trayConfig.toggleModal(true)

    await act(async () => {
      element.update(<Tray {...props} />)
    })

    expect(trayConfig.isModalVisible).toBe(true)
  })
})
