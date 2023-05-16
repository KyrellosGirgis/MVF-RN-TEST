/* eslint-disable import/namespace */

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import {
  handleDeepLinkNavigation,
  handleDeeplinkingWhenAppIsOpened
} from 'App/Services/Deeplinks/Deeplinks.helper'
import { appActions } from 'App/Redux/reducers/AppReducer/app.reducer'
import * as Redux from 'App/Redux'
import * as NavigationFunctions from 'App/Containers'
import Routes from 'App/Containers/AppNavigation/Routes'

import { openWebView } from 'App/Screens/WebViewScreen/WebViewScreen.helper'

jest.mock('App/Screens/WebViewScreen/WebViewScreen.helper', () => {
  return {
    openWebView: jest.fn()
  }
})

const CMSData = {
  deeplinkScreens: [
    {
      screenId: 'app_settings',
      deeplinkSchemes: ['mvf://app_settings']
    }
  ]
}

describe('test Utils Deeplinks Helper functions ', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  beforeAll(() => {
    NavigationFunctions.NavigationFunctions.push = jest.fn()
    NavigationFunctions.NavigationFunctions.navigate = jest.fn()
  })

  test('should handleDeepLinkNavigation return undefined if no url passed', async () => {
    Redux.store.dispatch = jest.fn((callback) => callback)
    const result = await handleDeepLinkNavigation()

    expect(Redux.store.dispatch).toHaveBeenCalledWith(
      appActions.setDeeplinkUrl(undefined)
    )

    expect(result).toEqual(undefined)
  })

  test('should handleDeepLinkNavigation perform the expected flow when no CMS available and the link is defined in app', async () => {
    EncryptedStorage.getItemParsedToJSON = jest.fn(() => undefined)
    Redux.store.dispatch = jest.fn((callback) => callback)

    await handleDeepLinkNavigation('mvf://home')
    expect(Redux.store.dispatch).toHaveBeenCalledWith(
      appActions.setDeeplinkUrl(undefined)
    )

    expect(
      NavigationFunctions.NavigationFunctions.navigate
    ).toHaveBeenCalledWith(Routes.HomeScreen, {
      openedFromDeeplink: true,
      deeplinkParams: {
        deepLinkScreenName: 'home',
        'mvf://home': undefined
      }
    })
  })

  test('should handleDeepLinkNavigation perform the expected flow when no CMS available and the link is not defined in app', async () => {
    EncryptedStorage.getItemParsedToJSON = jest.fn(() => undefined)
    Redux.store.dispatch = jest.fn((callback) => callback)

    await handleDeepLinkNavigation('mvf://app_settings')
    expect(Redux.store.dispatch).toHaveBeenCalledWith(
      appActions.setDeeplinkUrl(undefined)
    )

    expect(openWebView).toHaveBeenCalled()
  })

  test('should handleDeepLinkNavigation perform the expected flow when CMS is available and the link is defined in app', async () => {
    EncryptedStorage.getItemParsedToJSON = jest.fn(() => CMSData)
    Redux.store.dispatch = jest.fn((callback) => callback)

    await handleDeepLinkNavigation('mvf://app_settings?biometrics=on')
    expect(Redux.store.dispatch).toHaveBeenCalledWith(
      appActions.setDeeplinkUrl(undefined)
    )

    expect(NavigationFunctions.NavigationFunctions.push).toHaveBeenCalledWith(
      Routes.Settings,
      {
        openedFromDeeplink: true,
        deeplinkParams: { biometrics: 'on', deepLinkScreenName: 'app_settings' }
      }
    )
  })

  test('should handleDeeplinkingWhenAppIsOpened perform the expected flow when finishing onboarding', async () => {
    EncryptedStorage.getBoolean = jest.fn(() => true)
    EncryptedStorage.getItemParsedToJSON = jest.fn(() => undefined)

    Redux.store.dispatch = jest.fn((callback) => callback)

    await handleDeeplinkingWhenAppIsOpened('mvf://home')

    expect(Redux.store.dispatch).toHaveBeenCalledWith(
      appActions.setDeeplinkUrl(undefined)
    )

    expect(
      NavigationFunctions.NavigationFunctions.navigate
    ).toHaveBeenCalledWith(Routes.HomeScreen, {
      openedFromDeeplink: true,
      deeplinkParams: {
        deepLinkScreenName: 'home',
        'mvf://home': undefined
      }
    })
  })

  test('should handleDeeplinkingWhenAppIsOpened perform the expected flow before finishing onboarding', async () => {
    EncryptedStorage.getBoolean = jest.fn(() => false)
    Redux.store.dispatch = jest.fn((callback) => callback)

    await handleDeeplinkingWhenAppIsOpened('mvf://app_settings')
    expect(Redux.store.dispatch).not.toHaveBeenCalledWith(
      appActions.setDeeplinkUrl(undefined)
    )
  })
})
