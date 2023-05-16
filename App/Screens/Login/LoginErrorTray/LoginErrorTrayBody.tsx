import React from 'react'
import { View } from 'react-native'

import { VFButton, VFText } from '@vfgroup-oneplatform/foundation/Components'

import styles from './LoginErrorTrayBody.styles'

import { ErrorTrayBodyProps } from './LoginError'

export default function LoginErrorTrayBody({
  errorMessage,
  CTAhandler
}: ErrorTrayBodyProps) {
  return (
    <View style={styles.errorTrayBodyStyle} testID="ErrorTrayBody">
      <VFText
        i18nKey={errorMessage}
        type="primary"
        style={styles.errorMessage}
        testID="ErrorMessage"
      />
      <VFButton
        title={CTAhandler.title}
        onPress={CTAhandler.handler}
        testID="ErrorTrayBody_button"
      />
    </View>
  )
}
