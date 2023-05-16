import { Theme } from '@vfgroup-oneplatform/foundation/Components/Themes/Modes/index.d'
import { StyleSheet } from 'react-native'

export default StyleSheet.create<any>({
  container: (theme: Theme) => ({
    paddingTop: 50,
    paddingBottom: 62,
    justifyContent: 'flex-end',
    height: '100%',
    paddingHorizontal: 30,
    backgroundColor: theme.colors.backgroundColorFive
  }),
  primaryButton: {
    marginBottom: 17
  },
  buttonsWrappers: {
    justifyContent: 'space-between'
  }
})
