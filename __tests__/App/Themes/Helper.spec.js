import { getThemeImages, getThemeColors } from 'App/Themes'
import DarkImages from 'App/Themes/Modes/Dark/Images'
import LightImages from 'App/Themes/Modes/Light/Images'
import LightColors from 'App/Themes/Modes/Light/Colors'
import DarkColors from 'App/Themes/Modes/Dark/Colors'

describe('getThemeImages method', () => {
  it('should return the light theme images', () => {
    expect(getThemeImages('light')).toEqual(LightImages)
  })

  it('should return the dark theme  images', () => {
    expect(getThemeImages('dark')).toEqual(DarkImages)
  })

  it('should return the light theme images when unknown theme is provided', () => {
    expect(getThemeImages('someRandomTheme')).toEqual(LightImages)
  })
})
describe('getThemeColors method', () => {
  it('should return the light theme colors', () => {
    expect(getThemeColors('light')).toEqual({
      name: 'light',
      isDark: false,
      colors: LightColors
    })
  })
  it('should return the dark theme colors', () => {
    expect(getThemeColors('dark')).toEqual({
      name: 'dark',
      isDark: true,
      colors: DarkColors
    })
  })

  it('should return the light theme colors when unknown theme is provided', () => {
    expect(getThemeColors('someRandomTheme')).toEqual({
      name: 'someRandomTheme',
      isDark: false,
      colors: LightColors
    })
  })
})
