import { StyleSheet } from 'react-native'
import { Theme } from '@vfgroup-oneplatform/foundation/Components/Themes/Modes/index.d'

export default StyleSheet.create<any>({
  htmlRendererContainer: (theme: Theme, isAdvancedChildren?: boolean) => ({
    color: theme.colors.textColorTwo,
    fontSize: 14.6,
    lineHeight: 18.7,
    marginStart: isAdvancedChildren ? 10 : 42,
    marginEnd: 60,
    marginTop: 5
  }),
  htmlRendererTags: (theme: Theme) => ({
    a: { color: theme.colors.hyperlinkFive, textDecorationLine: 'none' }
  })
})
