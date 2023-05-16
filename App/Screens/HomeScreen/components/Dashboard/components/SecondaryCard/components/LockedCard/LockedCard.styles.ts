import { StyleSheet } from 'react-native'
import { Theme } from '@vfgroup-oneplatform/foundation/Components/Themes/Modes/index.d'

export default StyleSheet.create<any>({
  lockedCardContainer: { flex: 1 },
  padLockIconStyle: {
    alignSelf: 'center',
    marginTop: 12.6
  },
  lockedCardText: (theme: Theme) => ({
    fontSize: 16.6,
    marginTop: 8,
    lineHeight: 20.8,
    color: theme.colors.headerTitleColor
  })
})
