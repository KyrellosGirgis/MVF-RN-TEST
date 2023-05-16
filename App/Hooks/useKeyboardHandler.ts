import { useEffect, useState } from 'react'
import { Keyboard } from 'react-native'

const useKeyboardHandler = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0)

  useEffect(() => {
    const _keyboardDidShow = (e: any) => {
      setKeyboardHeight(e.endCoordinates.height)
    }

    const _keyboardDidHide = () => {
      setKeyboardHeight(0)
    }

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      _keyboardDidHide
    )
    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  return keyboardHeight
}

export default useKeyboardHandler
