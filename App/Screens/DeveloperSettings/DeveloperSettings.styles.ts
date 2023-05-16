import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: (theme, keyboardHeight) => ({
    flex: 1,
    backgroundColor: theme.colors.backgroundColorThree,
    marginTop: 30,
    marginBottom: keyboardHeight - 10
  }),
  title: (theme) => ({
    fontSize: 20,
    color: theme.colors.headerColor,
    fontWeight: 'bold'
  }),
  logContainerStyle: { paddingLeft: 10 },
  contentContainerStyle: {
    paddingBottom: 10
  },
  cardSectionStyleWithNoBorder: {
    alignItems: 'center'
  },
  button: { width: '40%', borderRadius: 20 },

  contentCardSectionStyle: {
    borderBottomWidth: 0,
    marginLeft: 20
  },
  inactiveContainerStyle: {
    margin: 0
  },
  clearButton: {
    margin: 10,
    borderRadius: 15
  }
})
