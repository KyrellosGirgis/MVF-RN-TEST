/* eslint-disable import/namespace */
import * as NetperformSDK from '@vfgroup-oneplatform/netperform-sdk'
import Config from 'react-native-config'

import { store } from 'App/Redux'
import {
  stopNetperform,
  startNetperform,
  startPersonalizedNetperform,
  stopPersonalizedNetperform,
  isPersonalizedEnabled,
  initializeNetpreform
} from 'App/Services/SDKsManagment/SDKs/NetPerform/NetperformInitializer'

jest.mock('@vfgroup-oneplatform/netperform-sdk', () => ({
  ENVIRONMENTS: { PROD: 'PROD', PRE_PROD: 'PRE_PROD' },
  createInstance: jest.fn(),
  stop: jest.fn(),
  isOptedIn: jest.fn(),
  start: jest.fn(),
  startPersonalized: jest.fn(),
  stopPersonalized: jest.fn(),
  isPersonalized: jest.fn()
}))

const state = {
  appUserData: { currentlyActiveSubscription: { id: '123456' } }
}

describe('Test NetperformInitializer', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should stopNetperform call function stop from netperform sdk', async () => {
    NetperformSDK.default.isOptedIn = jest.fn(() => true)
    await stopNetperform()
    expect(NetperformSDK.stop).toHaveBeenCalledTimes(1)
  })

  test('should stopNetperform not call function stop from netperform sdk', async () => {
    NetperformSDK.default.isOptedIn = jest.fn(() => false)
    await stopNetperform()
    expect(NetperformSDK.stop).not.toHaveBeenCalled()
  })

  test('should initializeNetpreform call createInstance function from netperform sdk with correct env if production', () => {
    Config.IS_PRODUCTION = 'true'
    initializeNetpreform()
    expect(NetperformSDK.createInstance).toHaveBeenCalledWith(
      NetperformSDK.ENVIRONMENTS.PROD
    )
  })

  test('should initializeNetpreform call createInstance function from netperform sdk with correct env if not production', () => {
    Config.IS_PRODUCTION = 'false'
    initializeNetpreform()
    expect(NetperformSDK.createInstance).toHaveBeenCalledWith(
      NetperformSDK.ENVIRONMENTS.PRE_PROD
    )
  })

  test('should startNetperform call initializeNetpreform and start function from netperform sdk', () => {
    Config.IS_PRODUCTION = 'false'
    startNetperform()
    expect(NetperformSDK.createInstance).toHaveBeenCalledWith(
      NetperformSDK.ENVIRONMENTS.PRE_PROD
    )
    expect(NetperformSDK.start).toHaveBeenCalledTimes(1)
  })

  test('should startPersonalizedNetperform call initializeNetpreform and startPersonalized function from netperform sdk', () => {
    Config.IS_PRODUCTION = 'false'
    store.getState = () => state

    startPersonalizedNetperform()

    expect(NetperformSDK.createInstance).toHaveBeenCalledWith(
      NetperformSDK.ENVIRONMENTS.PRE_PROD
    )
    expect(NetperformSDK.startPersonalized).toHaveBeenCalledWith(
      state.appUserData.currentlyActiveSubscription.id
    )
  })

  test('should stopPersonalizedNetperform call stopPersonalized function from netperform sdk', () => {
    stopPersonalizedNetperform()

    expect(NetperformSDK.stopPersonalized).toHaveBeenCalledWith(true)
  })

  test('should isPersonalizedEnabled call function isPersonalized from netperform sdk and return true when isPersonalized returns true', async () => {
    NetperformSDK.default.isPersonalized = jest.fn(() => Promise.resolve(true))
    const isPersonalizedValue = await isPersonalizedEnabled()
    expect(NetperformSDK.default.isPersonalized).toHaveBeenCalledTimes(1)
    expect(isPersonalizedValue).toBe(true)
  })

  test('should isPersonalizedEnabled call function isPersonalized from netperform sdk and return false when isPersonalized returns false', async () => {
    NetperformSDK.default.isPersonalized = jest.fn(() => Promise.resolve(false))
    const isPersonalizedValue = await isPersonalizedEnabled()
    expect(NetperformSDK.default.isPersonalized).toHaveBeenCalledTimes(1)
    expect(isPersonalizedValue).toBe(false)
  })

  test('should isPersonalizedEnabled call function isPersonalized from netperform sdk and return false when isPersonalized throws error', async () => {
    NetperformSDK.default.isPersonalized = jest.fn(() => {
      throw new Error('error')
    })
    const isPersonalizedValue = await isPersonalizedEnabled()
    expect(NetperformSDK.default.isPersonalized).toHaveBeenCalledTimes(1)
    expect(isPersonalizedValue).toBe(false)
  })
})
