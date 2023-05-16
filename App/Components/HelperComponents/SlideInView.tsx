import React, { useRef, useEffect } from 'react'
import { Animated } from 'react-native'

import { SlideInViewProps } from './SlideInView.d'

const SlideInView = (props: SlideInViewProps) => {
  const slidein = useRef(new Animated.Value(0)).current // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(slidein, {
      toValue: 1,
      duration: 500
    }).start()
  }, [slidein])

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        transform: [
          {
            translateY: slidein.interpolate({
              inputRange: [0, 1],
              outputRange: [600, 0]
            })
          }
        ] // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  )
}
export default SlideInView
