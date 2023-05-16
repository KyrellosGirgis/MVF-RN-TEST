import { StyleSheet, Platform } from 'react-native'

import { Theme } from '@vfgroup-oneplatform/foundation/Components/Themes/Modes/index.d'

import { Fonts } from 'App/Themes'

export default StyleSheet.create<any>({
  background: (theme: Theme) => ({
    backgroundColor: theme.colors.activeGrey,
    height: 500,
    alignSelf: 'center',
    borderRadius: 12.5
  }),
  icon: {
    alignSelf: 'center',
    marginTop: 171
  },
  description: (theme: Theme) => ({
    fontSize: Platform.OS === 'ios' ? 16.6 : 16,
    lineHeight: 18.8,
    textAlign: 'center',
    marginHorizontal: 25,
    fontFamily: Fonts.type.VFFont,
    color: theme.colors.textColorTwo,
    marginTop: 11.3,
    marginBottom: 23
  }),
  header: (theme: Theme) => ({
    fontSize: Platform.OS === 'ios' ? 21.6 : 21,
    lineHeight: 18.8,
    textAlign: 'center',
    marginHorizontal: 25,
    fontWeight: 'bold',
    color: theme.colors.accentColor,
    marginBottom: 5
  }),
  tryAgainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center'
  },
  tryAgainImage: {
    width: 24,
    height: 24,
    marginLeft: 6
  },
  tryAgainText: (theme: Theme) => ({
    textAlign: 'center',
    fontFamily: Fonts.type.VFFont,
    fontSize: Fonts.size.regularSmall,
    color: theme.colors.tryAgainColor
  })
})
