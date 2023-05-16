import { Platform, StyleSheet } from 'react-native'

import { Fonts } from 'App/Themes'

export default StyleSheet.create({
  iconAndTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
    alignItems: 'center'
  },
  title: {
    marginTop: 0,
    ...Fonts.type.bold,
    fontSize: Platform.OS === 'ios' ? 16.6 : 16,
    width: '80%'
  },
  subtitle: {
    fontSize: Platform.OS === 'ios' ? 16.6 : 16,
    lineHeight: 22.9
  },
  billAmountContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 5,
    padding: 18
  },
  billAmount: {
    marginTop: 0,
    fontSize: Platform.OS === 'ios' ? 30.6 : 30
  },
  container: {
    borderRadius: 6,
    overflow: 'hidden',
    justifyContent: 'space-between'
  },
  containerWrapper: { flex: 1, padding: 18 },
  icon: {
    marginRight: 10,
    width: 20,
    height: 20
  },
  errorCard: {
    flex: 1,
    padding: 6
  },
  cardBody: {
    flex: 1
  }
})
