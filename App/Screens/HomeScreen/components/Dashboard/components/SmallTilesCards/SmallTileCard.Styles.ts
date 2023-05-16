import { Platform, StyleSheet } from 'react-native'

import { Theme } from '@vfgroup-oneplatform/foundation/Components/Themes/Modes/index.d'

import { Fonts } from 'App/Themes'

export default StyleSheet.create<any>({
  DashboardErrorCardContainer: { flex: 1 },
  mainContainer: { overflow: 'hidden' },

  iconAndTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    marginRight: 8,
    marginTop: 10,
    marginLeft: 10
  },
  subtitleConatier: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginHorizontal: 12.5,
    marginBottom: 5
  },
  title: {
    width: '70%',
    marginTop: 10,
    ...Fonts.type.bold,
    fontSize: Platform.OS === 'ios' ? 16.6 : 16
  },
  subtitle: {
    fontSize: Platform.OS === 'ios' ? 16.6 : 16,
    lineHeight: 22.9
  },
  rightSubtitle: (theme: Theme) => ({
    color: theme.colors.textColorTwo,
    fontSize: Platform.OS === 'ios' ? 14.6 : 14,
    lineHeight: 18.6,
    marginBottom: 1
  }),
  continer: {
    height: '100%',
    justifyContent: 'space-between'
  },
  containerMyOffer: {
    flex: 1,
    borderRadius: 6,
    overflow: 'hidden'
  },
  imageMyOffer: {
    flex: 1,
    borderRadius: 6,

    flexDirection: 'column',
    justifyContent: 'space-between'
  }
})
