import { StyleSheet, StatusBar } from 'react-native'
import { get as _get } from 'lodash'
import { Theme } from '@vfgroup-oneplatform/foundation/Components/Themes/Modes/index.d'

export default StyleSheet.create({
  backgroundImage: { paddingTop: _get(StatusBar, 'currentHeight', 0) },
  contentWrapper: (theme: Theme) => ({
    backgroundColor: theme.colors.backgroundColor,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flex: 1,
    paddingLeft: 10
  }),
  errorText: (theme: Theme) => ({
    color: theme.colors.textColor
  })
})
