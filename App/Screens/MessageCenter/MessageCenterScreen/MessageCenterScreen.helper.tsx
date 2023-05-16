import { MessageItem } from '@vfgroup-oneplatform/message-center/Components/MessageCenterCard/index.d'

import React from 'react'

import DownloadPDFErrorTray from 'App/Screens/MessageCenter/MessageCenterScreen/Components/DownloadPDFErrorTray/DownloadPDFErrorTray'

import { CableInboxItem } from 'App/Services/API/Requests/Inbox/CableInbox/CableInbox.d'

import { managePDFDownload } from 'App/Services/API/Requests/DownloadPDF/downloadPDF.helper'

import { messageCenterActionTypes } from 'App/Screens/MessageCenter/MessageCenterScreen/MessageCenterScreen.d'

import { openWebView } from 'App/Screens/WebViewScreen/WebViewScreen.helper'

import { NavigationFunctions } from 'App/Containers'
import Routes from 'App/Containers/AppNavigation/Routes'
import { store } from 'App/Redux'
import { UserDataServicesTypes } from 'App/Services/API/Requests/userData/userData.d'
import { loadCableInboxMessages } from 'App/Services/API/Requests/Inbox/CableInbox/CableInboxRequest'
import { showModal, closeModal } from 'App/Containers/AppModal/AppModal.helpers'
import {
  hideBlurView,
  showBlurView
} from 'App/Containers/AppNavigation/AppNavigation.helpers'
import { handleDeeplinkingWhenAppIsOpened } from 'App/Services/Deeplinks/Deeplinks.helper'

const messageCenterActions = (actionParam: string) => ({
  [messageCenterActionTypes.webViewUrl]: () => {
    openWebView(actionParam)
  },
  [messageCenterActionTypes.appScreen]: () => {
    NavigationFunctions.navigate(actionParam)
  },
  [messageCenterActionTypes.deepLinkUrl]: () => {
    handleDeeplinkingWhenAppIsOpened(actionParam)
  },
  [messageCenterActionTypes.downloadPDF]: async () => {
    showBlurView({ showSpinner: true, opacity: 0.8 })
    try {
      actionParam && (await managePDFDownload(actionParam))
    } catch (error) {
      showErrorTrayModal()
    } finally {
      hideBlurView()
    }
  }
})

const showErrorTrayModal = () => {
  const errorTrayModalConfig = {
    title: 'PDF_error_tray_header',
    modalBody: (
      <DownloadPDFErrorTray
        onPrimaryButtonPress={() => {
          closeModal()
        }}
      />
    ),
    withHeaderCloseButton: false
  }
  showModal(errorTrayModalConfig)
}

const handleMessageCenterActions = (action: string) => {
  const [actionType, actionUrl] = action.split(/:(.*)/s)
  messageCenterActions(actionUrl)[actionType]()
}

const handlePressMessageCTA = (action: string) => {
  action && exports.handleMessageCenterActions(action)
}

const handlePressMessageCard = (_: string, message: MessageItem) => {
  !message?.disableOpenDetails &&
    NavigationFunctions.navigate(Routes.MessageDetailsScreen, {
      message: message
    })
}

const mapCableInboxResponseForUI = async () => {
  try {
    const cableInboxResponse = await loadCableInboxMessages()

    return cableInboxResponse?.map((cableInboxItem: CableInboxItem) => {
      return {
        title: cableInboxItem?.name,
        extras: {
          icon: 'id_document',
          unreadIcon: 'id_document'
        },
        sentDate: cableInboxItem?.creationDate,
        actionText1: 'messageCenter_download_button',
        action1: `${messageCenterActionTypes.downloadPDF}:${cableInboxItem?.href}`,
        withShowMore: false,
        isRead: true,
        disableOpenDetails: true,
        category: {
          id: 1,
          name: 'Documents'
        }
      }
    })
  } catch (error) {
    return [
      {
        title: 'messageCenter_error_text',
        image: 'errorCard',
        extras: {},
        actionText1: 'messageCenter_try_again_button',
        action1: messageCenterActionTypes.refresh,
        withShowMore: false,
        isRead: true,
        withReadIcon: false,
        disableOpenDetails: true
      }
    ]
  }
}

const getAdditionalInbox = async () => {
  const { currentlyActiveSubscription } = store.getState().appUserData
  const cableInbox =
    currentlyActiveSubscription?.type === UserDataServicesTypes.cable
      ? await exports.mapCableInboxResponseForUI()
      : []

  return cableInbox
}
export {
  handlePressMessageCard,
  handlePressMessageCTA,
  handleMessageCenterActions,
  mapCableInboxResponseForUI,
  getAdditionalInbox
}
