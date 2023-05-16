import { StyleSheet, Dimensions } from 'react-native'

import { Colors } from '@vfgroup-oneplatform/foundation/Components/Themes'
import { Theme } from '@vfgroup-oneplatform/foundation/Components/Themes/Modes/index.d'

import { Fonts } from 'App/Themes'

const { height: screenHeight } = Dimensions.get('screen')

const styles = StyleSheet.create<any>({
  QAContainer: {
    marginTop: 0,
    justifyContent: 'space-between',
    height: screenHeight - 90,
    paddingHorizontal: 16
  },
  QASubTitle: {
    fontSize: 24,
    fontFamily: Fonts.type.VodafoneLt,
    lineHeight: 30,
    marginTop: 18
  },
  QADescription: {
    fontSize: 16,
    fontFamily: Fonts.type.VFFont,
    width: '100%',
    lineHeight: 22,
    flexShrink: 1
  },
  headerStyle: {
    alignItems: 'center',
    marginTop: 20
  },
  overlayStyle: (theme: Theme) => ({
    backgroundColor: theme.isDark ? Colors.black : Colors.whiteSmoke,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  }),
  tabsContainer: { marginBottom: 8 },
  sectionTitle: (theme: Theme) => ({
    fontSize: 24,
    marginTop: 34,
    marginBottom: 8,
    lineHeight: 22,
    color: theme.colors.textColorThree,
    ...Fonts.type.bold
  }),
  footerContainer: { marginTop: 24, marginBottom: 64 },
  footerText: {
    fontSize: 16,
    marginTop: 24,
    alignSelf: 'center',
    ...Fonts.type.bold
  },
  separator: { backgroundColor: Colors.white_two, height: 1 },
  inActive: {
    backgroundColor: Colors.white
  },
  footerBtn: (theme: Theme) => ({
    marginTop: 16,
    backgroundColor: theme.isDark ? Colors.black : Colors.whiteSmoke
  }),
  imageStyle: {
    width: 24,
    height: 24,
    alignSelf: 'flex-start',
    marginRight: 16
  },
  bodyContainer: { marginTop: 15, flex: 1 },
  itemsContainer: {
    flex: 1
  },
  itemsContainerHeight: (height: number) => ({
    height: height
  }),
  scrollViewContentContainerStyle: (height: number) => ({
    marginTop: 16,
    paddingHorizontal: 0,
    height: height
  }),
  descriptionItemContainer: {
    flexDirection: 'row',
    marginTop: 24
  },
  QATitleStyle: {
    fontSize: 16,
    lineHeight: 22,
    ...Fonts.type.bold
  },
  customTapTextStyle: {
    color: Colors.black
  }
})

export default styles
