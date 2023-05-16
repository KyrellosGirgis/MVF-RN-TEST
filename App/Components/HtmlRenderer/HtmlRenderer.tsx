import React from 'react'
import { TextStyle, View, ViewStyle } from 'react-native'
import RenderHtml from 'react-native-render-html'
import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import styles from './HtmlRenderer.styles'
import { Fonts } from 'App/Themes'

import Tooltip from 'App/Components/HtmlRenderer/Components/Tooltip/Tooltip'

import { showModal } from 'App/Containers/AppModal/AppModal.helpers'
import { openWebView } from 'App/Screens/WebViewScreen/WebViewScreen.helper'
import { testID as getTestID } from 'App/Utils/Helpers/testId.helpers'

type HtmlRendererProps = {
  source: string
  tooltipModalTitle: string
  testID?: string
  containerTestID?: string
  containerStyle?: ViewStyle
  baseTextStyle?: TextStyle
  tagsStyle?: {}
}

const HtmlRenderer = ({
  source,
  containerStyle,
  baseTextStyle,
  containerTestID,
  testID,
  tooltipModalTitle,
  tagsStyle
}: HtmlRendererProps) => {
  const theme = useTheme()

  const AnchorTagRenderer = ({ TDefaultRenderer, ...props }: any) => {
    const onPress = () => {
      if (props.tnode.attributes.href) {
        openWebView(props.tnode.attributes.href)
      } else if (props.tnode.attributes.type === 'overlay') {
        const tooltipConfig = {
          title: tooltipModalTitle,
          modalBody: (
            <Tooltip
              title={props.tnode.data}
              description={props.tnode.attributes.alt}
            />
          )
        }
        showModal(tooltipConfig)
      }
    }
    return <TDefaultRenderer {...props} onPress={onPress} />
  }

  return (
    <View style={containerStyle} testID={getTestID(containerTestID)}>
      <RenderHtml
        source={{
          html: source
        }}
        baseStyle={{ ...styles.htmlComponentBase(theme), ...baseTextStyle }}
        tagsStyles={{
          a: styles.anchorTag,
          ...tagsStyle
        }}
        systemFonts={[Fonts.type.VFFont]}
        renderers={{
          a: AnchorTagRenderer
        }}
        defaultTextProps={{ testID: getTestID(testID) }}
      />
    </View>
  )
}

export default HtmlRenderer
