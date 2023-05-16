import React from 'react'
import { create, act } from 'react-test-renderer'

import EncryptedStorageLogs from 'App/Screens/DeveloperSettings/Screens/EncryptedStorageLogs/EncryptedStorageLogs'

describe('Encrypted Storage Logs tests', () => {
  const mockSetState = jest.fn()

  jest.mock('react', () => ({
    useState: () => [{}, mockSetState]
  }))

  jest.mock(
    'App/Screens/DeveloperSettings/Screens/EncryptedStorageLogs/EncryptedStorageLogs',
    () => ({
      readAllStoredEncryptedData: () => {
        mockSetState({ asa: 'asa' })
      }
    })
  )

  test('should render correctly generic components successfully', async () => {
    let element

    jest.mock('App/Services/StorageWrappers/EncryptedStorage.ts', () => ({
      getAllItems: jest.fn(() => ({
        name: 'any_name',
        id: '1'
      }))
    }))

    await act(async () => {
      element = create(<EncryptedStorageLogs />)
    })
    expect(
      element.root.findByProps({
        testID: 'logsTestId'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        closeButtonTestID: 'EScloseIcon'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'searchBarTestId'
      })
    ).toBeDefined()

    const searchBar = element.root.findByProps({
      testID: 'searchBarTestId'
    })
    searchBar.props.onChangeText('name')
  })
})
