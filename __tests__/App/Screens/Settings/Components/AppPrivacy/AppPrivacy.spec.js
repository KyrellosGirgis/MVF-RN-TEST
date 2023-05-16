/* eslint-disable import/namespace */
import React from 'react'
import { create, act } from 'react-test-renderer'

import CoreAppPrivacy from '@vfgroup-oneplatform/framework/Settings/AppPrivacy/AppPrivacy'

import AppPrivacy from 'App/Screens/Settings/Components/AppPrivacy/AppPrivacy'
import { APP_PRIVACY_PERMISSION_KEYS } from 'App/Screens/Settings/Components/AppPrivacy/AppPrivacy.config'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import * as AppPrivacyHelper from 'App/Screens/Settings/Components/AppPrivacy/AppPrivacy.helper'
import { NetperformUserStatus } from 'App/Services/SDKsManagment/SDKs/NetPerform/Netperform.constants'
import * as NetperformInitializer from 'App/Services/SDKsManagment/SDKs/NetPerform/NetperformInitializer'

describe('Test AppPrivacy Component', () => {
  beforeAll(() => {
    AppPrivacyHelper.enableNetperformPermission = jest.fn()
    AppPrivacyHelper.disableNetperformPermissions = jest.fn()
    AppPrivacyHelper.enablePersonalizedServicePermission = jest.fn()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should render AppPrivacy component correctly', async () => {
    let instance
    await act(async () => {
      instance = create(<AppPrivacy />)
    })
    const coreAppPrivacy = instance.root.findAllByType(CoreAppPrivacy)[0]

    expect(instance).toBeDefined()
    expect(coreAppPrivacy).toBeDefined()
  })

  test('ensure that onAcceptanceChange return the right value and call the right functions when we change improveNetworkStatus value', async () => {
    let instance
    await act(async () => {
      instance = create(<AppPrivacy />)
    })
    const coreAppPrivacy = instance.root.findAllByType(CoreAppPrivacy)[0]
    let onAcceptanceChangeResult =
      await coreAppPrivacy.props.onAcceptanceChange(
        APP_PRIVACY_PERMISSION_KEYS.improveNetworkStatus,
        true
      )

    expect(onAcceptanceChangeResult).toEqual(true)
    expect(AppPrivacyHelper.enableNetperformPermission).toHaveBeenCalledWith(
      true
    )

    onAcceptanceChangeResult = await coreAppPrivacy.props.onAcceptanceChange(
      APP_PRIVACY_PERMISSION_KEYS.improveNetworkStatus,
      false
    )
    expect(onAcceptanceChangeResult).toEqual(true)
    expect(AppPrivacyHelper.disableNetperformPermissions).toHaveBeenCalledTimes(
      1
    )
  })

  test('ensure that onAcceptanceChange return the right value and call the right functions when we change personalizedServiceStatus value', async () => {
    let instance
    await act(async () => {
      instance = create(<AppPrivacy />)
    })
    const coreAppPrivacy = instance.root.findAllByType(CoreAppPrivacy)[0]
    let onAcceptanceChangeResult =
      await coreAppPrivacy.props.onAcceptanceChange(
        APP_PRIVACY_PERMISSION_KEYS.personalizedServiceStatus,
        true
      )

    expect(onAcceptanceChangeResult).toEqual(true)
    expect(
      AppPrivacyHelper.enablePersonalizedServicePermission
    ).toHaveBeenCalledWith(true)

    onAcceptanceChangeResult = await coreAppPrivacy.props.onAcceptanceChange(
      APP_PRIVACY_PERMISSION_KEYS.personalizedServiceStatus,
      false
    )
    expect(onAcceptanceChangeResult).toEqual(true)
    expect(
      AppPrivacyHelper.enablePersonalizedServicePermission
    ).toHaveBeenCalledWith(false)
  })

  test('ensure that checkTogglesStatus return the right result when ssaved improveNetworkStatus is false', async () => {
    EncryptedStorage.getItemParsedToJSON = jest.fn(() => ({
      [NetperformUserStatus.status]: false,
      [NetperformUserStatus.isPersonalized]: false
    }))
    NetperformInitializer.isPersonalizedEnabled = jest.fn(() => false)

    let instance
    await act(async () => {
      instance = create(<AppPrivacy />)
    })

    const coreAppPrivacy = instance.root.findAllByType(CoreAppPrivacy)[0]

    const checkToggleStatusResult =
      await coreAppPrivacy.props.checkTogglesStatus()

    const checkToggleStatusExpectedResult = {
      [APP_PRIVACY_PERMISSION_KEYS.improveNetworkStatus]: {
        isVisible: true,
        toggleValue: false
      },
      [APP_PRIVACY_PERMISSION_KEYS.personalizedServiceStatus]: {
        isVisible: false,
        toggleValue: false
      }
    }
    expect(checkToggleStatusResult).toEqual(checkToggleStatusExpectedResult)
  })

  test('ensure that checkTogglesStatus return the right result when ssaved improveNetworkStatus is true and personalized is false', async () => {
    EncryptedStorage.getItemParsedToJSON = jest.fn(() => ({
      [NetperformUserStatus.status]: true,
      [NetperformUserStatus.isPersonalized]: false
    }))
    NetperformInitializer.isPersonalizedEnabled = jest.fn(() => false)

    let instance
    await act(async () => {
      instance = create(<AppPrivacy />)
    })

    const coreAppPrivacy = instance.root.findAllByType(CoreAppPrivacy)[0]

    const checkToggleStatusResult =
      await coreAppPrivacy.props.checkTogglesStatus()

    const checkToggleStatusExpectedResult = {
      [APP_PRIVACY_PERMISSION_KEYS.improveNetworkStatus]: {
        isVisible: true,
        toggleValue: true
      },
      [APP_PRIVACY_PERMISSION_KEYS.personalizedServiceStatus]: {
        isVisible: true,
        toggleValue: false
      }
    }
    expect(checkToggleStatusResult).toEqual(checkToggleStatusExpectedResult)
  })

  test('ensure that checkTogglesStatus return the right result when ssaved improveNetworkStatus is true and personalized is true', async () => {
    EncryptedStorage.getItemParsedToJSON = jest.fn(() => ({
      [NetperformUserStatus.status]: true,
      [NetperformUserStatus.isPersonalized]: true
    }))
    NetperformInitializer.isPersonalizedEnabled = jest.fn(() => true)

    let instance
    await act(async () => {
      instance = create(<AppPrivacy />)
    })

    const coreAppPrivacy = instance.root.findAllByType(CoreAppPrivacy)[0]

    const checkToggleStatusResult =
      await coreAppPrivacy.props.checkTogglesStatus()

    const checkToggleStatusExpectedResult = {
      [APP_PRIVACY_PERMISSION_KEYS.improveNetworkStatus]: {
        isVisible: true,
        toggleValue: true
      },
      [APP_PRIVACY_PERMISSION_KEYS.personalizedServiceStatus]: {
        isVisible: true,
        toggleValue: true
      }
    }
    expect(checkToggleStatusResult).toEqual(checkToggleStatusExpectedResult)
  })

  test('ensure that checkTogglesStatus return the right result when we make improveNetworkStatus false', async () => {
    NetperformInitializer.isPersonalizedEnabled = jest.fn(() => false)

    let instance
    await act(async () => {
      instance = create(<AppPrivacy />)
    })

    const coreAppPrivacy = instance.root.findAllByType(CoreAppPrivacy)[0]
    await coreAppPrivacy.props.onAcceptanceChange(
      APP_PRIVACY_PERMISSION_KEYS.improveNetworkStatus,
      false
    )

    const checkToggleStatusResult =
      await coreAppPrivacy.props.checkTogglesStatus()

    const checkToggleStatusExpectedResult = {
      [APP_PRIVACY_PERMISSION_KEYS.improveNetworkStatus]: {
        isVisible: true,
        toggleValue: false
      },
      [APP_PRIVACY_PERMISSION_KEYS.personalizedServiceStatus]: {
        isVisible: false,
        toggleValue: false
      }
    }
    expect(checkToggleStatusResult).toEqual(checkToggleStatusExpectedResult)
  })

  test('ensure that checkTogglesStatus return the right result when we make improveNetworkStatus true while personalized is false', async () => {
    NetperformInitializer.isPersonalizedEnabled = jest.fn(() => false)

    let instance
    await act(async () => {
      instance = create(<AppPrivacy />)
    })

    const coreAppPrivacy = instance.root.findAllByType(CoreAppPrivacy)[0]
    await coreAppPrivacy.props.onAcceptanceChange(
      APP_PRIVACY_PERMISSION_KEYS.improveNetworkStatus,
      true
    )

    const checkToggleStatusResult =
      await coreAppPrivacy.props.checkTogglesStatus()

    const checkToggleStatusExpectedResult = {
      [APP_PRIVACY_PERMISSION_KEYS.improveNetworkStatus]: {
        isVisible: true,
        toggleValue: true
      },
      [APP_PRIVACY_PERMISSION_KEYS.personalizedServiceStatus]: {
        isVisible: true,
        toggleValue: false
      }
    }
    expect(checkToggleStatusResult).toEqual(checkToggleStatusExpectedResult)
  })

  test('ensure that checkTogglesStatus return the right result when we make personalized true while improveNetworkStatus is true', async () => {
    EncryptedStorage.getItemParsedToJSON = jest.fn(() => ({
      [NetperformUserStatus.status]: true,
      [NetperformUserStatus.isPersonalized]: false
    }))
    NetperformInitializer.isPersonalizedEnabled = jest.fn(() => true)

    let instance
    await act(async () => {
      instance = create(<AppPrivacy />)
    })

    const coreAppPrivacy = instance.root.findAllByType(CoreAppPrivacy)[0]
    await coreAppPrivacy.props.onAcceptanceChange(
      APP_PRIVACY_PERMISSION_KEYS.personalizedServiceStatus,
      true
    )

    const checkToggleStatusResult =
      await coreAppPrivacy.props.checkTogglesStatus()

    const checkToggleStatusExpectedResult = {
      [APP_PRIVACY_PERMISSION_KEYS.improveNetworkStatus]: {
        isVisible: true,
        toggleValue: true
      },
      [APP_PRIVACY_PERMISSION_KEYS.personalizedServiceStatus]: {
        isVisible: true,
        toggleValue: true
      }
    }
    expect(checkToggleStatusResult).toEqual(checkToggleStatusExpectedResult)
  })
})
