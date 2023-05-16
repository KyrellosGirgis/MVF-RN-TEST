import { StyleSheet } from 'react-native'

import Fonts from 'App/Themes/Fonts'

export default StyleSheet.create({
  headerTitle: {
    fontSize: Fonts.size.xh4,
    fontFamily: Fonts.type.VodafoneLt,
    lineHeight: 30,
    marginTop: 5
  },
  headerContent: {
    fontSize: Fonts.size.medium,
    lineHeight: 18,
    marginTop: 16
  }
})
