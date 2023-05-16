import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js'
import mock from 'react-native-permissions/mock'

jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter')

jest.mock('react-native-fs', () => ({}))

jest.mock('react-native-config', () => {
  return {
    BASE_URL_LEGACY: 'https://www.vodafone.de',
    BASE_URL_DXL: 'https://api.vodafone.de',
    LEGACY_BASE_URL: 'https://www.vodafone.de'
  }
})

jest.mock('axios', () => {
  return {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    create: () => ({
      interceptors: {
        request: { use: jest.fn(), eject: jest.fn() },
        response: { use: jest.fn(), eject: jest.fn() }
      },
      get: jest.fn(),
      post: jest.fn(),
      put: jest.fn()
    }),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn() }
    }
  }
})

jest.mock('axios-cache-adapter', () => {
  return {
    setupCache: jest.fn().mockReturnValue({ adapter: 'mockAdapter' })
  }
})

jest.mock('react-native', () => {
  const RN = jest.requireActual('react-native')
  RN.NativeModules.CustomApiCallModule = {
    getRequestNoRedirectionsWithUrl: jest.fn()
  }
  RN.NativeModules.NetPerformContext = {
    isPersonalized: false
  }
  RN.NativeModules.NetPerformSpeedTest = {
    startSpeedtest: jest.fn()
  }
  RN.NativeModules.NetPerformSpeedTestHistory = {
    getAllSpeedtests: jest.fn()
  }

  RN.NativeModules.SettingsManager = {
    settings: { AppleLocale: 'en-US', AppleLanguages: ['en-US'] }
  }
  RN.NativeModules.ExitAppModule = {
    exitApp: jest.fn()
  }
  RN.Platform = { OS: 'ios' }

  RN.NativeModules.ACPTarget = {
    registerTargetRequests: jest.fn()
  }
  RN.NativeModules.RNPermissions = mock
  return RN
})

jest.mock('react-native-permissions', () => {
  return mock
})

jest.mock('@react-native-firebase/crashlytics', () => {
  return jest.fn().mockReturnValue({
    log: jest.fn(),
    recordError: jest.fn(),
    crash: jest.fn()
  })
})

jest.mock('@react-native-cookies/cookies', () => {
  return {
    clearAll: jest.fn(),
    get: jest.fn()
  }
})

jest.mock('react-native-device-info', () => {
  return {
    getVersion: () => 1.0,
    getSystemVersion: () => '15',
    getBuildNumber: () => '1',
    getBundleId: () => 'id'
  }
})

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo)

jest.mock('@react-native-async-storage/async-storage', () => ({
  multiSet: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(null)
    })
  }),
  multiGet: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve([
        ['cache/test1', 'test1'],
        ['cache/test2', 'test2']
      ])
    })
  }),
  setItem: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(null)
    })
  }),
  removeItem: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(null)
    })
  }),
  getAllKeys: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(['cache/test1', 'cache/test2'])
    })
  }),
  multiRemove: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve()
    })
  })
  // we moved the getItem Mocking to files which are needed
}))

jest.mock('App/Services/StorageWrappers/EncryptedStorage.ts', () => ({
  getItem: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(null)
    })
  }),
  setItem: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(null)
    })
  }),
  removeItem: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(null)
    })
  }),
  getItemParsedToJSON: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(null)
    })
  }),
  setObject: jest.fn(() => {
    return new Promise((resolve, reject) => {
      resolve(null)
    })
  })
}))

jest.mock('react-native-keychain', () => ({
  getGenericPassword: jest.fn(),
  getInternetCredentials: jest.fn(),
  hasInternetCredentials: jest.fn(),
  setGenericPassword: jest.fn(),
  setInternetCredentials: jest.fn(),
  resetGenericPassword: jest.fn(),
  resetInternetCredentials: jest.fn()
}))

jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock')
)

jest.mock('react-redux', () => {
  return {
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
    connect: (mapStateToProps, mapDispatchToProps) => (ReactComponent) => ({
      mapStateToProps,
      mapDispatchToProps,
      ReactComponent
    }),
    Provider: ({ children }) => children
  }
})

jest.mock('redux-persist', () => {
  const real = jest.requireActual('redux-persist')
  return {
    ...real,
    persistReducer: jest.fn().mockImplementation((config, reducers) => reducers)
  }
})

jest.mock('react-native-sensitive-info', () => {
  return {
    getItem: jest.fn(),
    setItem: jest.fn(),
    deleteItem: jest.fn()
  }
})

jest.mock('@react-navigation/native', () => {
  return {
    ...jest.requireActual('@react-navigation/native'),
    useNavigationState: jest.fn(),
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      addListener: jest.fn(),
      dispatch: jest.fn()
    }),
    useFocusEffect: jest.fn(),
    useRoute: jest.fn(() => ({
      params: {
        animateSplash: false
      }
    }))
  }
})

jest.mock('@appdynamics/react-native-agent', () => {
  return {
    Instrumentation: {
      start: jest.fn(),
      restartAgent: jest.fn(),
      shutdownAgent: jest.fn()
    },
    InteractionCaptureMode: jest.fn()
  }
})

jest.mock('jail-monkey', () => {
  return { isJailBroken: jest.fn(() => true) }
})

jest.mock('App/Utils/Helpers/generic.helpers', () => {
  const actualHelper = jest.requireActual('App/Utils/Helpers/generic.helpers')
  return {
    ...actualHelper,
    translate: (str) => str,
    testID: (str) => str,
    openExternalWebView: jest.fn(),
    isDeviceConnectedToNetwork: jest.fn(),
    removeKeysFromObject: jest.fn()
  }
})

jest.mock('App/Utils/Helpers/testId.helpers', () => {
  const actualHelper = jest.requireActual('App/Utils/Helpers/testId.helpers')
  return {
    ...actualHelper,
    testID: (str) => str
  }
})

jest.mock('rn-fetch-blob', () => {
  return {
    DocumentDir: () => {}
  }
})

jest.mock('react-native-share', () => ({
  open: jest.fn()
}))

jest.mock('urbanairship-react-native', () => {
  return {
    UrbanAirship: {
      setUserNotificationsEnabled: jest.fn(),
      setAutoLaunchDefaultMessageCenter: jest.fn(),
      addListener: jest.fn(),
      refreshInbox: jest.fn(),
      setAutobadgeEnabled: jest.fn(),
      setNamedUser: jest.fn(),
      addTag: jest.fn(),
      removeTag: jest.fn(),
      takeOff: jest.fn(),
      enableFeature: jest.fn(),
      disableFeature: jest.fn(),
      getInboxMessages: async () => {}
    },
    EventType: {},
    Feature: jest.fn()
  }
})

jest.mock('@vfgroup-oneplatform/netperform-sdk', () => ({}))

jest.mock('@vfgroup-oneplatform/netperform', () => ({
  requestNetperformPermissions: jest.fn()
}))

jest.mock('react-native-infy-qrcode-scanner', () => jest.fn())
