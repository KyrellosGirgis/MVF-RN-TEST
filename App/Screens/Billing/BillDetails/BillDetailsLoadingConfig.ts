import { Dimensions } from 'react-native'
import { setLoadingConfigObject } from '@vfgroup-oneplatform/foundation/Components/Shimmer/Shimmer.utils'

const { width } = Dimensions.get('window')
const headerLoadingConfig = [
  {
    main: setLoadingConfigObject('line', 1, width * 0.3, {
      marginBottom: 0,
      height: 20
    }),
    style: { marginBottom: 8 }
  }
]

export { headerLoadingConfig }
