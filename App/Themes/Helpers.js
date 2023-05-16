import { Dimensions } from 'react-native'

import Config from 'App/Config/index'

const { width } = Dimensions.get('window')

const scaleFontSize = (size) =>
  (width / Config.STANDARD_SCREEN_WIDTH) * size - 1

const scaleLineHeight = (lineHeight) =>
  (width / Config.STANDARD_SCREEN_WIDTH) * lineHeight

export { scaleFontSize, scaleLineHeight }
