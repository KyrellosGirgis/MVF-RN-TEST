import React from 'react'
import { create, act } from 'react-test-renderer'

import * as redux from 'react-redux'

import MockingConfigsCard from 'App/Screens/DeveloperSettings/components/MockingConfigsCard/MockingConfigsCard'
import DeveloperSettingsCard from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCard/DeveloperSettingsCard'
import DeveloperSettingsCardSection from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCardSection/DeveloperSettingsCardSection'

jest.mock('react', () => {
  const originReact = jest.requireActual('react')
  const mUseRef = jest.fn()
  return {
    ...originReact,
    useRef: mUseRef
  }
})

describe('Mock Configurations tests', () => {
  test('should render correctly generic components successfully', async () => {
    const card = create(<DeveloperSettingsCard />)
    const section = create(<DeveloperSettingsCardSection />)
    expect(card).toBeDefined()
    expect(section).toBeDefined()
  })
})

describe('should render Mock configuration children successfully', () => {
  test('should render Mock configuration successfully', async () => {
    let element
    const spy = jest.spyOn(redux, 'useSelector')
    spy.mockReturnValue({ testCaseName: '', mockFileName: '' })
    await act(async () => {
      element = create(<MockingConfigsCard />)
    })

    expect(
      element.root.findByProps({
        testID: 'DeveloperSettingTestCaseName_input'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'DeveloperSettingTestCaseURL_input'
      })
    ).toBeDefined()
  })
})
