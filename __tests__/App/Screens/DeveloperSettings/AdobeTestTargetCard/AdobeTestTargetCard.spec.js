/* eslint-disable import/namespace */
import React, { createRef } from 'react'
import { create, act } from 'react-test-renderer'

import AdobeTestTargetCard from 'App/Screens/DeveloperSettings/components/AdobeTestTargetCard/AdobeTestTargetCard'

import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'

describe('Test AdobeTestTargetCard', () => {
  test('should render Adobe Test Target Card successfully', async () => {
    let element
    await act(async () => {
      element = create(<AdobeTestTargetCard />)
    })
    expect(
      element.root.findByProps({
        testID: 'adobe_live_radio'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'adobe_test_radio'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'adobe_test1_radio'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'adobe_test2_radio'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'adobe_test3_radio'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'adobe_test4_radio'
      })
    ).toBeDefined()
  })

  test('should save the selected adobe target in the encrypted storage after calling the save function', async () => {
    EncryptedStorage.getItem = jest.fn(() => 'test')
    EncryptedStorage.setItem = jest.fn(() => 'test')
    const ref = createRef()
    await act(async () => {
      create(<AdobeTestTargetCard ref={ref} />)
    })
    ref.current.save()

    expect(EncryptedStorage.removeItem).not.toHaveBeenCalledWith(
      STORAGE_KEYS.selectedAdobeTestTarget
    )

    expect(EncryptedStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEYS.selectedAdobeTestTarget,
      'test'
    )
  })

  test('should remove the saved adobe target from the encrypted storage if the selected target is live', async () => {
    EncryptedStorage.getItem = jest.fn(() => 'live')
    EncryptedStorage.setItem = jest.fn(() => 'live')
    const ref = createRef()
    await act(async () => {
      create(<AdobeTestTargetCard ref={ref} />)
    })
    ref.current.save()

    expect(EncryptedStorage.removeItem).toHaveBeenCalledWith(
      STORAGE_KEYS.selectedAdobeTestTarget
    )
    expect(EncryptedStorage.setItem).not.toHaveBeenCalledWith(
      STORAGE_KEYS.selectedAdobeTestTarget,
      'live'
    )
  })
})
