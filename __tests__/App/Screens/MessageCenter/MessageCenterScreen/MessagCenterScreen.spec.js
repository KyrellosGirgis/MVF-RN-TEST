/* eslint-disable import/namespace */
import React from 'react'
import { shallow } from 'enzyme'

import MessageCenterScreen from 'App/Screens/MessageCenter/MessageCenterScreen/MessageCenterScreen'
import * as navigateHelper from 'App/Screens/Helpers'
import {
  handlePressMessageCTA,
  handlePressMessageCard,
  getAdditionalInbox
} from 'App/Screens/MessageCenter/MessageCenterScreen/MessageCenterScreen.helper'
import * as NavigationFunctions from 'App/Containers'
import { messageCenterActionTypes } from 'App/Screens/MessageCenter/MessageCenterScreen/MessageCenterScreen.d'

jest.mock(
  'App/Screens/MessageCenter/MessageCenterScreen/MessageCenterScreen.helper',
  () => {
    return {
      getAdditionalInbox: jest.fn(),
      handlePressMessageCTA: jest.fn(),
      handlePressMessageCard: jest.fn()
    }
  }
)
describe('render MessageCenterScreen component ', () => {
  navigateHelper.navigateToDashboardScreen = jest.fn()
  NavigationFunctions.NavigationFunctions.navigate = jest.fn()
  const element = shallow(<MessageCenterScreen />)
  const messageCenter = element.find({ testID: 'messageCenterId' })
  const messageCenterProps = messageCenter.props()
  test('should render message center component successfully', () => {
    expect(messageCenter).toBeDefined()
  })

  test('should navigateToDashboardScreen when close messageCenter', () => {
    messageCenterProps.onClose()
    expect(navigateHelper.navigateToDashboardScreen).toBeCalled()
  })
  test('should call handlePressMessageCTA when invoke onPressCTA with any action other than refresh ', () => {
    messageCenterProps.onPressCTA('action')
    expect(handlePressMessageCTA).toBeCalled()
  })
  test('should call getAdditionalInbox when invoke onPressCTA with refresh action', () => {
    messageCenterProps.onPressCTA(messageCenterActionTypes.refresh)
    expect(getAdditionalInbox).toBeCalled()
  })
  test('should call handlePressMessageCard onClicking on message card ', () => {
    messageCenterProps.onPressMessageCard()
    expect(handlePressMessageCard).toBeCalled()
  })
})
