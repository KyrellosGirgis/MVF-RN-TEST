import { StyleSheet } from 'react-native'

import { Colors } from '@vfgroup-oneplatform/foundation/Components/Themes'

export default StyleSheet.create<any>({
  containerStyle: (isConnected: boolean) => ({
    backgroundColor: isConnected ? Colors.success : Colors.vfRedRGBA(1)
  })
})
