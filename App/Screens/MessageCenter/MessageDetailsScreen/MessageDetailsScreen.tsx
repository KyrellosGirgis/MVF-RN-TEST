import { MessageView } from 'urbanairship-react-native/lib/commonjs/MessageView'

import React, { useState } from 'react'

import { VFHeader } from '@vfgroup-oneplatform/foundation/Components/index.js'

import { useRoute } from '@react-navigation/native'
import type { RouteProp } from '@react-navigation/native'

import styles from './MessageDetailsScreen.style'

import { MessageDetailsScreenProps } from './MessageDetailsScreen.d'

import { NavigationFunctions } from 'App/Containers/index.js'
import { testID } from 'App/Utils/Helpers/testId.helpers'

import { LoadingIndicator } from 'App/Components'

const MessageDetailsScreen = () => {
  const [animating, setAnimating] = useState(true)
  const { message } =
    useRoute<RouteProp<MessageDetailsScreenProps, 'messageDetails'>>()?.params

  return (
    <>
      <VFHeader
        onClose={NavigationFunctions.goBack}
        headerStyle={styles.headerStyle}
        testID={testID('messageDetailsHeader')}
        closeButtonTestID={testID('messageDetailsCloseBtn')}
      />
      <MessageView
        messageId={message?.id}
        style={styles.MessageView}
        testID={testID('messageDetailsView')}
        onLoadFinished={() => {
          setAnimating(false)
        }}
      />
      {animating && (
        <LoadingIndicator
          containerStyle={styles.loadingIndicator}
          testID={testID('messageDetailsLoadingIndicator')}
        />
      )}
    </>
  )
}
export default MessageDetailsScreen
