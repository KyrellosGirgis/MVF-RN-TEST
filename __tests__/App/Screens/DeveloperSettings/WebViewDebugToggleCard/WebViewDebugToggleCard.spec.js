import React, { createRef } from 'react'
import { act, create } from 'react-test-renderer'

import WebViewDebugToggleCard from 'App/Screens/DeveloperSettings/components/WebViewDebugToggleCard/WebViewDebugToggleCard'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

describe('WebViewDebugToggleCard', () => {
  const webCookieSwitcher = create(<WebViewDebugToggleCard />)
  test('should render the WebViewDebugToggleCard toggle', async () => {
    expect(
      webCookieSwitcher.root.findByProps({
        testID: 'WebViewDebugToggle'
      })
    ).toBeDefined()
  })

  test('should save shouldDebugWebView toggle initial value in encrypted storage after calling the save function', async () => {
    EncryptedStorage.getBoolean = jest.fn(() => false)
    EncryptedStorage.setBoolean = jest.fn()
    const ref = createRef()
    await act(async () => {
      create(<WebViewDebugToggleCard ref={ref} />)
    })
    ref.current.save()

    expect(EncryptedStorage.setBoolean).toHaveBeenCalledWith(
      STORAGE_KEYS.shouldDebugWebView,
      false
    )
  })

  test('should save shouldDebugWebView should toggle value when changed in encrypted storage after calling the save function', async () => {
    EncryptedStorage.getBoolean = jest.fn(() => true)
    EncryptedStorage.setBoolean = jest.fn()
    const ref = createRef()
    let element
    await act(async () => {
      element = create(<WebViewDebugToggleCard ref={ref} />)
    })

    element.root
      .findByProps({
        testID: 'WebViewDebugToggle'
      })
      .props.onChange(true)

    ref.current.save()
    expect(EncryptedStorage.setBoolean).toHaveBeenCalledWith(
      STORAGE_KEYS.shouldDebugWebView,
      false
    )
  })
})
