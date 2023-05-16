import React from 'react'
import { View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import renderer from 'react-test-renderer'

import ScreenWrapperView from 'App/Components/ScreenWrapperView/ScreenWrapperView'

describe('WrapperView', () => {
  test.skip('should render View component if platform is android', () => {
    // Platform.OS = 'android'
    const element = renderer.create(<ScreenWrapperView />)
    const ViewComponent = element.root.findByType(View)
    expect(ViewComponent).toBeDefined()
  })

  test('should render SafeAreaView component if platform is ios', () => {
    // Platform.OS = 'ios'
    const element = renderer.create(<ScreenWrapperView />)
    const SafeAreaViewComponent = element.root.findByType(SafeAreaView)
    expect(SafeAreaViewComponent).toBeDefined()
  })
})
