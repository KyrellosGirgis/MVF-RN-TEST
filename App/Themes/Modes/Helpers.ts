import DarkImages from './Dark/Images'
import LightImages from './Light/Images'
import DarkColors from './Dark/Colors'
import LightColors from './Light/Colors'

export function getThemeImages(themeName) {
  switch (themeName) {
    case 'light':
      return LightImages
    case 'dark':
      return DarkImages
    default:
      return LightImages
  }
}

export function getThemeColors(themeName) {
  const isDark = themeName === 'dark'
  return {
    name: themeName,
    isDark,
    colors: isDark ? DarkColors : LightColors
  }
}
