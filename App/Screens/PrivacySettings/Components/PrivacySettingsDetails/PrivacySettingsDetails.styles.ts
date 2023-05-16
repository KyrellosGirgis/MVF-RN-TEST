import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: (theme) => ({
    flex: 1,
    backgroundColor: theme.colors.backgroundColorThree,
    marginTop: 0,
    marginBottom: 0
  }),
  headline: (theme) => ({
    fontSize: 24,
    color: theme.colors.headerColor,
    fontWeight: 'bold',
    paddingBottom: 15,
    marginTop: 30
  }),
  text: (theme) => ({
    fontSize: 16,
    color: theme.colors.textColorSix
  }),
  contentContainerStyle: {
    paddingHorizontal: 15,
    paddingVertical: 30
  }
})
