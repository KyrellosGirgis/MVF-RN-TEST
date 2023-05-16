/* eslint-disable import/namespace */

import React from 'react'
import { ScrollView } from 'react-native'
import { act, create } from 'react-test-renderer'

import { shallow } from 'enzyme'

import { VFScreen } from '@vfgroup-oneplatform/foundation/Components'

import SDKsRequestsLoggerScreen from 'App/Screens/DeveloperSettings/Screens/NetworkRequestsLogger/SDKsRequestsLogger'

import NetworkRequestsLogger from 'App/Screens/DeveloperSettings/Screens/NetworkRequestsLogger/NetworkRequestsLoggerScreen'

import APIsRequestsLoggerScreen from 'App/Screens/DeveloperSettings/Screens/NetworkRequestsLogger/APIsRequestsLogger'

describe('Network Requests Logger screen Implementation', () => {
  test('should render correctly generic components successfully', async () => {
    let element

    jest.mock('App/Services/StorageWrappers/EncryptedStorage.ts', () => ({
      getItemParsedToJSON: jest.fn(() => ({
        networkLogs: {}
      }))
    }))

    jest.mock(
      'App/Screens/DeveloperSettings/Screens/NetworkRequestsLogger/SDKsRequestsLogger',
      () => ({
        getLogs: () => {}
      })
    )

    await act(async () => {
      element = create(<SDKsRequestsLoggerScreen />)
    })

    expect(
      element.root.findByProps({
        testID: 'logsTestId'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'ClearSDKsRequestsLogs'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'searchBarTestId'
      })
    ).toBeDefined()
  })
})

describe('NetworkRequestsLogger', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<NetworkRequestsLogger />)
  })

  it('should render a VFScreen', () => {
    expect(wrapper.find(VFScreen)).toHaveLength(1)
  })

  it('should render a ScrollView', () => {
    expect(wrapper.find(ScrollView)).toHaveLength(1)
  })

  it('should render SDKsRequestsLoggerScreen by default', () => {
    expect(wrapper.find(SDKsRequestsLoggerScreen)).toHaveLength(1)
  })

  it('should render APIsRequestsLoggerScreen when API_REQUESTS tab is active', () => {
    wrapper.find(VFScreen).prop('configureHeaderTabs').setActiveTab(1)
    expect(wrapper.find(APIsRequestsLoggerScreen)).toHaveLength(1)
  })
})
