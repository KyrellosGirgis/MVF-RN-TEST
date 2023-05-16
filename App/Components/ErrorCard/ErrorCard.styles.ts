import { Platform, StyleSheet } from 'react-native'
import {
  Metrics,
  Colors
} from '@vfgroup-oneplatform/foundation/Components/Themes'

import { Fonts } from 'App/Themes'

import { theme } from 'App/Components/ErrorCard/ErrorCard.d'

export default StyleSheet.create<any>({
  errorContainer: (theme: theme) => {
    return {
      alignItems: 'center',
      backgroundColor: theme.isDark
        ? theme.colors.backgroundColorFour
        : theme.colors.backgroundColor,
      marginTop: Metrics.doubleBaseMargin,
      borderRadius: 6,
      marginBottom: 9,
      height: 150
    }
  },

  errorDetailsTextStyle: {
    fontFamily: Fonts.type.VFFont,
    fontSize: 16,
    paddingTop: 15,
    lineHeight: 22,
    paddingBottom: 19
  },
  boxShadow: {
    shadowColor: Platform.OS === 'ios' ? Colors.blackRGBA(0.16) : Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: Platform.OS === 'ios' ? 8 : 0,
    shadowRadius: Platform.OS === 'ios' ? 6 : 0,
    elevation: Platform.OS === 'ios' ? 0 : 6
  }
})
