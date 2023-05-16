import React from 'react'
import StatusView from '@vfgroup-oneplatform/foundation/Components/StatusView'

import styles from './SuccessModalBody.styles'

type SuccessModalBodyProps = {
  onPrimaryButtonPress: () => void
  onSecondaryButtonPress: () => void
}

const SuccessModalBody = ({
  onPrimaryButtonPress,
  onSecondaryButtonPress
}: SuccessModalBodyProps) => {
  const lottieProps = {
    type: 'tick',
    autoPlay: true,
    loop: false,
    lottieViewStyle: styles.lottieView
  }

  return (
    <StatusView
      lottieProps={lottieProps}
      title="privacy_settings_quick_action_title"
      description="privacy_settings_quick_action_description"
      textStyles={{ description: styles.description }}
      primaryButtonProps={{
        title: 'privacy_settings_quick_action_primary_button_text',
        onPress: onPrimaryButtonPress
      }}
      secondaryButtonProps={{
        title: 'privacy_settings_quick_action_secondary_button_text',
        onPress: onSecondaryButtonPress
      }}
      containerStyle={styles.successModalContainerStyle}
    />
  )
}

export default SuccessModalBody
