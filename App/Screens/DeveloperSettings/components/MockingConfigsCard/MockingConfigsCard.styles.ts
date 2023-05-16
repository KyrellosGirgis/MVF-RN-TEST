import { StyleSheet } from 'react-native'
import { Theme } from '@vfgroup-oneplatform/foundation/Components/Themes/Provider/index.d'

export default StyleSheet.create({
  mockingContainerCard: {
    paddingLeft: 0
  },
  textStyle: (theme) => ({
    color: theme.colors.headerColor,
    marginTop: 10,
    marginHorizontal: 10
  })
})

export const inputThemeStyle = (theme: Theme) => ({
  baseColor: theme.colors.textInput.default.baseColor,
  tintColor: theme.colors.textInput.default.tintColor,
  selectionColor: theme.colors.textInput.default.selectionColor,
  textColor: theme.colors.textColor
})
