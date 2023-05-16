import { StyleSheet } from 'react-native'

export default StyleSheet.create<any>({
  container: (theme) => ({
    flex: 1,
    backgroundColor: theme.colors.backgroundColorThree,
    paddingTop: 30
  }),
  cardSectionStyleWithNoBorder: {
    borderBottomWidth: 0
  },
  textStyle: (theme) => ({
    fontSize: 16.6,
    lineHeight: 22,
    letterSpacing: 0,
    color: theme.colors.headerColor
  }),

  tilte: (theme) => ({
    fontSize: 20,
    color: theme.colors.headerColor,
    fontWeight: 'bold'
  }),

  logContainerStyle: {
    paddingHorizontal: 10,
    backgroundColor: '#FFFFF8',
    paddingTop: 10
  },
  contentContainerStyle: {
    paddingBottom: 70
  },

  contentCardSectionStyle: {
    borderBottomWidth: 0,
    marginLeft: 20
  },
  inactiveContainerStyle: {
    margin: 0
  },
  clearButton: {
    margin: 16,
    borderRadius: 15
  },
  keyText: { color: 'yellow', marginVertical: 5, fontWeight: 'bold' },
  jsonViewrTheme: {
    scheme: 'monokai',
    author: 'wimer hazenberg (http://www.monokai.nl)',
    base00: '#272822',
    base01: '#383830',
    base02: '#49483e',
    base03: '#75715e',
    base04: '#a59f85',
    base05: '#f8f8f2',
    base06: '#f5f4f1',
    base07: '#f9f8f5',
    base08: '#f92672',
    base09: '#fd971f',
    base0A: '#f4bf75',
    base0B: '#a6e22e',
    base0C: '#a1efe4',
    base0D: '#66d9ef',
    base0E: '#ae81ff',
    base0F: '#cc6633'
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'grey',
    padding: 10,
    marginTop: 20
  },
  toggleTitle: { fontWeight: 'bold' }
})
