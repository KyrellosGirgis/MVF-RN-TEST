import { Alert } from 'react-native'

import Config from 'react-native-config'
import JailMonkey from 'jail-monkey'

import { checkIfJailBrokenOrRooted } from 'App/Utils/Helpers/jailBroken.helpers'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'

describe('test JailBroken helper functions with IOS Platform', () => {
  beforeAll(() => {
    EncryptedStorage.setItem = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should checkIfJailBrokenOrRooted show alert successfully', async () => {
    Config.ENABLE_ROOTED_OR_JAILBROKEN_ALERT = 'true'
    EncryptedStorage.getBoolean = jest.fn(() => false)
    JailMonkey.isJailBroken = () => true

    let onOkPress
    let alertTitle
    let alertDescription

    Alert.alert = jest.fn((title, description, buttons) => {
      alertTitle = title
      alertDescription = description
      onOkPress = buttons[0].onPress
      onOkPress()
    })

    await checkIfJailBrokenOrRooted()
    expect(Alert.alert).toHaveBeenCalled()

    expect(alertTitle).toEqual('Jailbroken_title')
    expect(alertDescription).toEqual('jailbroken_description')
  })

  test('should checkIfJailBrokenOrRooted not show alert when enableRootedOrJailBrokenAlert is false', async () => {
    Config.ENABLE_ROOTED_OR_JAILBROKEN_ALERT = 'false'
    EncryptedStorage.getBoolean = jest.fn(() => false)
    JailMonkey.isJailBroken = () => true

    const result = await checkIfJailBrokenOrRooted()
    expect(result).toEqual(undefined)
  })

  test('should checkIfJailBrokenOrRooted not show alert when alertIsShown is true', async () => {
    Config.ENABLE_ROOTED_OR_JAILBROKEN_ALERT = 'true'
    EncryptedStorage.getBoolean = jest.fn(() => true)
    JailMonkey.isJailBroken = () => true

    const result = await checkIfJailBrokenOrRooted()
    expect(result).toEqual(undefined)
  })

  test('should checkIfJailBrokenOrRooted not show alert when isJailBroken returns false', async () => {
    Config.ENABLE_ROOTED_OR_JAILBROKEN_ALERT = 'true'
    EncryptedStorage.getBoolean = jest.fn(() => false)
    JailMonkey.isJailBroken = () => false

    const result = await checkIfJailBrokenOrRooted()
    expect(result).toEqual(undefined)
  })
})

describe('test JailBroken helper functions with ANDROID Platform', () => {
  beforeAll(() => {
    const GenericHelpers = require('App/Utils/Helpers/generic.helpers')
    GenericHelpers.isIOS = false
    EncryptedStorage.setItem = jest.fn()
  })

  test('should checkIfJailBrokenOrRooted show alert successfully', async () => {
    Config.ENABLE_ROOTED_OR_JAILBROKEN_ALERT = 'true'
    EncryptedStorage.getBoolean = jest.fn(() => false)
    JailMonkey.isJailBroken = () => true

    let onOkPress
    let alertTitle
    let alertDescription

    Alert.alert = jest.fn((title, description, buttons) => {
      alertTitle = title
      alertDescription = description
      onOkPress = buttons[0].onPress
      onOkPress()
    })

    await checkIfJailBrokenOrRooted()
    expect(Alert.alert).toHaveBeenCalled()

    expect(alertTitle).toEqual('rooted_title')
    expect(alertDescription).toEqual('rooted_description')
  })
})
