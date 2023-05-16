import React from 'react'
import { ScrollView, View } from 'react-native'
import { VFText } from '@vfgroup-oneplatform/foundation/Components'

import styles from './Tooltip.styles'

type TooltipProps = {
  title: string
  description: string
}

const Tooltip = ({ title, description }: TooltipProps) => (
  <View style={styles.wrapper} testID="Tooltip_Component_Wrapper">
    <VFText
      style={styles.title}
      i18nKey={title}
      testID="Tooltip_Component_Title"
    />
    <ScrollView testID="Tooltip_Componennt_Body_Wrapper">
      <VFText
        style={styles.body}
        i18nKey={description}
        testID="Tooltip_Componennt_Body_Text"
      />
    </ScrollView>
  </View>
)

export default Tooltip
