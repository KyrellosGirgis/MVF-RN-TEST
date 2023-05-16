import { StyleSheet } from 'react-native'

import Fonts from 'App/Themes/Fonts'

export default StyleSheet.create({
  textWithIconViewTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textWithIconViewTitle: {
    fontSize: Fonts.size.input,
    lineHeight: 24,
    width: '70%'
  }
})
