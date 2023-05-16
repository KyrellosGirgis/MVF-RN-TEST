import { StyleSheet } from 'react-native'

import { Theme } from '@vfgroup-oneplatform/foundation/Components/Themes/Modes/index.d'

import { Fonts } from 'App/Themes'

export default StyleSheet.create<any>({
  htmlComponentBase: (theme: Theme) => ({
    fontSize: Fonts.size.medium,
    lineHeight: 18,
    fontFamily: Fonts.type.VFFont,
    color: theme.colors.text.primary
  }),
  anchorTag: {
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  }
})
