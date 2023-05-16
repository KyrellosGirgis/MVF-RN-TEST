import { StyleSheet } from 'react-native'

import { Theme } from '@vfgroup-oneplatform/foundation/Components/Themes/Modes/index.d'

import { Fonts } from 'App/Themes'

export default StyleSheet.create<any>({
  componentWrapper: { width: '80%' },
  htmlContainerStyle: { width: '95%' },
  headerHtmlBaseText: {
    fontSize: Fonts.size.regularSmall,
    lineHeight: 22
  },
  expandCollapseButtonText: (theme: Theme, isCollapsed: boolean = false) => ({
    marginTop: isCollapsed ? 24 : -10,
    marginBottom: 15,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: Fonts.size.regularSmall,
    lineHeight: 22,
    color: theme.colors.showMoreColor
  }),
  continueButton: { marginBottom: 42 },
  continueButtonText: {
    fontSize: Fonts.size.input,
    lineHeight: 24
  },
  collapsedContentWrapper: { marginTop: 37 },
  collapsedContentTitle: {
    fontSize: Fonts.size.input,
    lineHeight: 24
  },
  collapsedContentSubTitle: {
    fontSize: Fonts.size.medium,
    lineHeight: 18,
    fontWeight: 'bold',
    marginVertical: 28
  },
  permissionSectionWrapper: { marginBottom: 44 },
  permissionTitleWrapper: {
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  permissionTitle: {
    fontSize: Fonts.size.input,
    lineHeight: 24,
    width: '82%'
  }
})
