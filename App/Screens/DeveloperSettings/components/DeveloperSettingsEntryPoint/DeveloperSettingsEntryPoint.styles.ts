import { StyleSheet } from 'react-native'

import { Colors } from '@vfgroup-oneplatform/foundation/Components/Themes'

export const styles = StyleSheet.create({
  hiddenBtn: {
    zIndex: 999,
    position: 'absolute',
    top: 100,
    height: 1,
    width: 15,
    backgroundColor: Colors.transparent
  }
})
