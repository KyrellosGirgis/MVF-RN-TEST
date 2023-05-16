import { StyleSheet } from 'react-native'
import { Theme } from '@vfgroup-oneplatform/foundation/Components/Themes/Modes/index.d'

export default StyleSheet.create<any>({
  screenHeader: (theme: Theme) => ({
    backgroundColor: theme.colors.backgroundColorThree
  }),
  shimmerContainer: { marginTop: 20, padding: 16 },
  shimmerText: {
    marginBottom: 0,
    height: 12
  },
  shimmerTextWrapper: { marginBottom: 5 },
  shimmerTitle: {
    marginBottom: 0,
    height: 20
  },
  shimmerTitleWrapper: { marginBottom: 23, marginTop: 43 },
  shimmerSection: {
    marginBottom: 0,
    height: 58
  },
  shimmerSectionWrapper: { marginBottom: 5, marginTop: 22 }
})
