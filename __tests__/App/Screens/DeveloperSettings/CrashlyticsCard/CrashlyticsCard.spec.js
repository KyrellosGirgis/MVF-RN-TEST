import React from 'react'
import { create } from 'react-test-renderer'

import crashlytics from '@react-native-firebase/crashlytics'

import CrashlyticsCard from 'App/Screens/DeveloperSettings/components/CrashlyticsCard/CrashlyticsCard'

describe('Crashlytics card in developerSettings tests', () => {
  test('should render component successfully', async () => {
    const element = create(<CrashlyticsCard />)

    expect(
      element.root.findByProps({
        testID: 'DevSettings_crashlyticsCardTitle'
      })
    ).toBeDefined()
    expect(
      element.root.findByProps({
        testID: 'DevSettings_crashlyticsErrorBtn'
      })
    ).toBeDefined()

    expect(
      element.root.findByProps({
        testID: 'DevSettings_crashlyticsCrashBtn'
      })
    ).toBeDefined()
  })

  test('should trigger crashlytics error when pressing on trigger error button', async () => {
    const element = create(<CrashlyticsCard />)
    const errorBtn = element.root.findByProps({
      testID: 'DevSettings_crashlyticsErrorBtn'
    })
    errorBtn.props.onPress()
    expect(crashlytics().log).toHaveBeenCalled()
    expect(crashlytics().recordError).toHaveBeenCalled()
  })

  test('should trigger crashlytics crash when pressing on trigger crash button', async () => {
    const element = create(<CrashlyticsCard />)
    const crashBtn = element.root.findByProps({
      testID: 'DevSettings_crashlyticsCrashBtn'
    })
    crashBtn.props.onPress()
    expect(crashlytics().log).toHaveBeenCalled()
    expect(crashlytics().crash).toHaveBeenCalled()
  })
})
