import { create, act } from 'react-test-renderer'

import React from 'react'

import { useNetInfo } from '@react-native-community/netinfo'

import { AlertBanner } from '@vfgroup-oneplatform/foundation/Components'

import { store } from 'App/Redux'
import { OfflineModeAlert } from 'App/Components'

jest.mock('App/Hooks/usePrevious', () => {
  return jest.fn(() => false)
})

jest.mock('App/Utils/Helpers/generic.helpers', () => {
  const actualHelper = jest.requireActual('App/Utils/Helpers/generic.helpers')
  return {
    ...actualHelper,
    translate: (str) => str,
    delay: jest.fn()
  }
})

describe('Ensure that OfflineModeAlert works fine', () => {
  beforeAll(() => {
    store.dispatch = jest.fn()
  })

  test('Ensure that OfflineModeAlert to be defined', () => {
    const OfflineModeAlertComponent = create(<OfflineModeAlert />)
    expect(OfflineModeAlertComponent).toBeDefined()
  })

  test('Ensure that OfflineModeAlert display the right text when isConnected after disconnected', async () => {
    useNetInfo.mockReturnValue({ isConnected: false })

    let component
    await act(async () => {
      component = create(<OfflineModeAlert />)
    })
    const alertBannerComponent = component.root.findAllByType(AlertBanner)[0]

    useNetInfo.mockReturnValue({ isConnected: true })

    await act(async () => {
      component.update(<OfflineModeAlert />)
      jest.runAllTimers()
    })

    expect(alertBannerComponent.props.alertMessage).toBe(
      'alert_banner_message_online'
    )
    expect(alertBannerComponent.props.isVisible).toBe(false)
  })

  test('Ensure that OfflineModeAlert display the right text when not isConnected', async () => {
    useNetInfo.mockReturnValue({ isConnected: false })
    let component
    await act(async () => {
      component = create(<OfflineModeAlert />)
    })
    const alertBannerComponent = component.root.findAllByType(AlertBanner)[0]

    expect(component).toBeDefined()
    expect(alertBannerComponent).toBeDefined()
    expect(alertBannerComponent.props.alertMessage).toBe(
      'alert_banner_message_offline'
    )
    expect(alertBannerComponent.props.isVisible).toBe(true)
  })
})
