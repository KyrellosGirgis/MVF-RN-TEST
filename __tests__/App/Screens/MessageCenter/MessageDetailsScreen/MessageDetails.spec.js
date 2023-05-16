import React from 'react'
import { create, act } from 'react-test-renderer'

import { ActivityIndicator } from 'react-native'

import { useRoute } from '@react-navigation/native'

import * as NavigationFunctions from 'App/Containers'
import MessageDetailsScreen from 'App/Screens/MessageCenter/MessageDetailsScreen/MessageDetailsScreen'

describe('render MessageCenterScreen component ', () => {
  let element
  const props = {
    params: {
      message: { id: '1' }
    }
  }
  NavigationFunctions.NavigationFunctions.goBack = jest.fn()
  beforeEach(async () => {
    useRoute.mockImplementation(() => props)
    await act(async () => {
      element = create(<MessageDetailsScreen />)
    })
  })

  test('should render message details component successfully', async () => {
    const VFHeaderComponent = element.root.findByProps({
      testID: 'messageDetailsHeader'
    })
    expect(VFHeaderComponent).toBeDefined()
    const MessageViewComponent = element.root.findByProps({
      testID: 'messageDetailsView'
    })
    expect(MessageViewComponent).toBeDefined()
    const MessageDetailsIndicator = element.root.findByProps({
      testID: 'messageDetailsLoadingIndicator'
    })
    expect(MessageDetailsIndicator).toBeDefined()
  })
  test('should goBack message center when close message details', () => {
    const VFHeaderComponent = element.root.findByProps({
      testID: 'messageDetailsHeader'
    })
    VFHeaderComponent.props.onClose()
    expect(NavigationFunctions.NavigationFunctions.goBack).toBeCalled()
  })
  test('should send messageID to messageViewComponent', () => {
    const MessageViewComponent = element.root.findByProps({
      testID: 'messageDetailsView'
    })
    expect(MessageViewComponent.props.messageId).toEqual(
      props.params.message.id
    )
  })
  test('should hide indicator when call onLoadFinished ', () => {
    const MessageViewComponent = element.root.findByProps({
      testID: 'messageDetailsView'
    })
    MessageViewComponent.props.onLoadFinished()
    expect(element.root.findAllByType(ActivityIndicator).length).toEqual(0)
  })
})
