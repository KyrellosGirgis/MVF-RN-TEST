import { StyleSheet } from 'react-native'

import {
  Metrics,
  Fonts,
  Colors
} from '@vfgroup-oneplatform/foundation/Components/Themes'

export default StyleSheet.create({
  containerStyle: {
    marginBottom: 32,
    borderRadius: 10,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 1, height: 1 },
    backgroundColor: Colors.transparent,
    shadowOpacity: 0,
    elevation: 0
  },
  headerContainerStyle: {
    flex: 1,
    paddingBottom: Metrics.doubleBaseMargin,
    justifyContent: 'center',
    paddingHorizontal: 0
  },
  headerStyle: (theme) => ({
    color: theme.colors.headerTitleColor,
    fontWeight: '500',
    fontSize: 25,
    fontFamily: Fonts.type.bold.fontFamily
  }),
  itemsContainerStyle: (theme) => ({
    flex: 3,
    backgroundColor: theme.colors.tintColor,
    borderRadius: 6,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 1
  }),
  listCont: {
    paddingBottom: 13
  },
  firstItemContainerStyle: {
    borderTopWidth: 0
  },
  showMoreButtonStyle: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Metrics.doubleBaseMargin
  },
  showMoreTextStyle: (theme) => ({
    fontSize: 16.6,
    letterSpacing: 0,
    color: theme.colors.showMoreColor,
    textAlign: 'center'
  }),
  buttonStyle: {
    paddingHorizontal: 16,
    backgroundColor: Colors.light_grey
  },
  image: {
    width: '100%',
    height: 184
  }
})
