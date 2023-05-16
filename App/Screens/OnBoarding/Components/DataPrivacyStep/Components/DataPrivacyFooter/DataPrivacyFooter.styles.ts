import { StyleSheet } from 'react-native'

import Fonts from 'App/Themes/Fonts'

export default StyleSheet.create({
  consentButton: { marginVertical: 32 },
  dataPrivacyPressableText: {
    fontSize: Fonts.size.regularSmall,
    lineHeight: 22,
    marginBottom: 40,
    textDecorationLine: 'underline',
    textAlign: 'center'
  }
})
