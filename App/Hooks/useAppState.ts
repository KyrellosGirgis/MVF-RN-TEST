import { useState, useEffect } from 'react'
import { AppState, AppStateStatus } from 'react-native'

import { AppStateType } from './Types'

const useAppState = (settings: AppStateType) => {
  const { onChange, onForeground, onBackground } = settings || {}
  const [appState, setAppState] = useState(AppState.currentState)

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (nextAppState === 'active' && appState?.match(/inactive|background/)) {
        onForeground && onForeground()
      } else if (
        appState === 'active' &&
        nextAppState.match(/inactive|background/)
      ) {
        onBackground && onBackground()
      }
      setAppState(nextAppState)
      onChange && onChange(nextAppState)
    }
    const listener = AppState.addEventListener('change', handleAppStateChange)
    return () => listener.remove()
  }, [onChange, onForeground, onBackground, appState])

  return { appState }
}

export default useAppState
