import { StyleSheet } from 'react-native'

import { Fonts } from 'App/Themes'

export default StyleSheet.create({
  wrapper: { marginTop: 20, marginBottom: 40, marginHorizontal: 16 },
  title: {
    fontSize: Fonts.size.xh4,
    lineHeight: 22,
    marginBottom: 16,
    fontWeight: 'bold'
  },
  body: { fontSize: Fonts.size.regularSmall, lineHeight: 22 }
})
