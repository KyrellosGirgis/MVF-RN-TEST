/* eslint-disable import/namespace */
import {
  CableResponse,
  expectedCableMappedValues
} from '__tests__/App/Screens/MessageCenter/MessageCenterScreen/data'

import * as CableInboxAPIs from 'App/Services/API/Requests/Inbox/CableInbox/CableInboxRequest'

import * as messageCenterHelpers from 'App/Screens/MessageCenter/MessageCenterScreen/MessageCenterScreen.helper'
import * as NavigationFunctions from 'App/Containers'
import Routes from 'App/Containers/AppNavigation/Routes'
import { store } from 'App/Redux'
import * as NavHelpers from 'App/Containers/AppNavigation/AppNavigation.helpers'
import * as Modal from 'App/Containers/AppModal/AppModal.helpers'
import * as downloadHelplers from 'App/Services/API/Requests/DownloadPDF/downloadPDF.helper'

describe('test message center helpers ', () => {
  NavigationFunctions.NavigationFunctions.navigate = jest.fn()

  test('should call showModal when call handleMessageCenterActions with type PDF and manageDownloadPDF Fails ', () => {
    Modal.showModal = jest.fn()
    downloadHelplers.managePDFDownload = jest.fn(() => {
      throw Error()
    })
    messageCenterHelpers.handleMessageCenterActions('pdf:vodafone')

    expect(Modal.showModal).toHaveBeenCalled()
  })
  test('should call showBlurView when call handlePressMessageCard with type PDF  ', () => {
    NavHelpers.showBlurView = jest.fn()
    const document = CableResponse[0].href
    messageCenterHelpers.handleMessageCenterActions('pdf:' + document)

    expect(NavHelpers.showBlurView).toHaveBeenCalled()
  })

  test('should call managePDFDownload when call handleMessageCenterActions with type PDF ', () => {
    downloadHelplers.managePDFDownload = jest.fn()
    const document = CableResponse[0].href
    messageCenterHelpers.handleMessageCenterActions('pdf:' + document)

    expect(downloadHelplers.managePDFDownload).toHaveBeenCalled()
  })

  test('should navigate to details Screen when call handlePressMessageCard', () => {
    const message = { messageId: 1 }

    messageCenterHelpers.handlePressMessageCard('', message)
    expect(
      NavigationFunctions.NavigationFunctions.navigate
    ).toHaveBeenCalledWith(Routes.MessageDetailsScreen, {
      message
    })
  })

  test('should call handleMessageCenterActions when call handlePressMessageCTA ', () => {
    messageCenterHelpers.handleMessageCenterActions = jest.fn()
    messageCenterHelpers.handlePressMessageCTA('url:vodafone')
    expect(
      messageCenterHelpers.handleMessageCenterActions
    ).toHaveBeenCalledWith('url:vodafone')
  })
  test('should map Cable Inbox Response correctly ', async () => {
    CableInboxAPIs.loadCableInboxMessages = jest.fn(() => CableResponse)
    const mappedValues = await messageCenterHelpers.mapCableInboxResponseForUI()
    expect(mappedValues).toMatchObject(expectedCableMappedValues)
  })

  test('getAdditionalInbox should call mapCableInboxResponseForUI if currently active subscription type is Cable', async () => {
    messageCenterHelpers.mapCableInboxResponseForUI = jest.fn()
    store.getState = jest.fn(() => ({
      appUserData: {
        currentlyActiveSubscription: { id: '123', type: 'cable' }
      }
    }))

    await messageCenterHelpers.getAdditionalInbox()
    expect(messageCenterHelpers.mapCableInboxResponseForUI).toHaveBeenCalled()
  })

  test('getAdditionalInbox should NOT call mapCableInboxResponseForUI if currently active subscription type is not Cable', async () => {
    messageCenterHelpers.mapCableInboxResponseForUI = jest.fn()
    store.getState = jest.fn(() => ({
      appUserData: {
        currentlyActiveSubscription: { id: '123', type: 'mobile' }
      }
    }))

    await messageCenterHelpers.getAdditionalInbox()
    expect(
      messageCenterHelpers.mapCableInboxResponseForUI
    ).toHaveBeenCalledTimes(0)
  })
})
