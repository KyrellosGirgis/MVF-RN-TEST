import React from 'react'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import styles from './HTMLDescription.styles'

import HtmlRenderer from 'App/Components/HtmlRenderer/HtmlRenderer'
import { translate } from 'App/Utils/Helpers/generic.helpers'
import FrameworkTestIds from 'App/Utils/testIds/framework.testIds'

interface HTMLDescriptionProps {
  description: string
  [name: string]: string
}

const HTMLDescription = ({ description, ...props }: HTMLDescriptionProps) => {
  const theme = useTheme()

  return (
    <HtmlRenderer
      source={translate(description)}
      tooltipModalTitle="subtray_privacy_title"
      testID={`${FrameworkTestIds.OBDescription}-${description}`}
      containerStyle={styles.htmlRendererContainer(theme, true)}
      tagsStyle={styles.htmlRendererTags(theme)}
      {...props}
    />
  )
}

export default HTMLDescription
