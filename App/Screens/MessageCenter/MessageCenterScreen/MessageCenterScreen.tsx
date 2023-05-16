import React, { useEffect, useState } from 'react'
import MessageCenter from '@vfgroup-oneplatform/message-center'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { Images, getThemeImages } from 'App/Themes'

import {
  getAdditionalInbox,
  handlePressMessageCard,
  handlePressMessageCTA
} from './MessageCenterScreen.helper'

import { messageCenterActionTypes } from './MessageCenterScreen.d'

import styles from './MessageCenterScreen.styles'

import { navigateToDashboardScreen } from 'App/Screens/Helpers'

import { testID } from 'App/Utils/Helpers/testId.helpers'

const MessageCenterScreen = () => {
  const [additionalInbox, setAdditionalInbox] = useState()
  const [isInboxLoading, setIsInboxLoading] = useState(true)
  const theme = useTheme()
  const setAdditionalMessages = async () => {
    setIsInboxLoading(true)
    setAdditionalInbox(await getAdditionalInbox())
    setIsInboxLoading(false)
  }

  useEffect(() => {
    setAdditionalMessages()
  }, [])

  return (
    <MessageCenter
      onClose={navigateToDashboardScreen}
      images={{ ...Images, ...getThemeImages(theme.name) }}
      onPressCTA={(action: string) => {
        if (action === messageCenterActionTypes.refresh) {
          setAdditionalMessages()
        } else {
          handlePressMessageCTA(action)
        }
      }}
      testID={testID('messageCenterId')}
      onPressMessageCard={handlePressMessageCard}
      additionalMessages={additionalInbox}
      isAdditionalMessagesLoading={isInboxLoading}
      cardImageProps={{
        style: styles.overviewImageStyle
      }}
    />
  )
}

export default MessageCenterScreen
