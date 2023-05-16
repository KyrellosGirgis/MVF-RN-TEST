import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState
} from 'react'

import { VFInput, VFText } from '@vfgroup-oneplatform/foundation/Components'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import Styles from './WebCookieSwitcher.styles'

import DeveloperSettingsCard from 'App/Screens/DeveloperSettings/components/generic/DeveloperSettingsCard/DeveloperSettingsCard'
import { testID } from 'App/Utils/Helpers/testId.helpers'
import { parseObjectFromString } from 'App/Utils/Helpers/string.helpers'
import {
  getStorageMockedWebViewCookies,
  mapFromCookieManagerObjectToString,
  mapFromCookieJSONToCookieManagerObject,
  setStorageMockedWebViewCookies
} from 'App/Services/CookiesManager/CookiesManager.helpers'

const WebCookieSwitcher = forwardRef((_, ref) => {
  const [mockedWebCookies, setMockedWebCookies] = useState('')
  const theme = useTheme()

  const save = async () => {
    const parsedMockedWebCookies = parseObjectFromString(mockedWebCookies, {
      delimiter: ';'
    })
    const mappedMockedWebCookies = mapFromCookieJSONToCookieManagerObject(
      parsedMockedWebCookies
    )
    await setStorageMockedWebViewCookies(mappedMockedWebCookies)
  }

  useImperativeHandle(ref, () => ({ save }))

  const parseStoredMockedWebCookies = async () => {
    const storedMockedWebCookies = await getStorageMockedWebViewCookies()
    const mappedCookiesString = mapFromCookieManagerObjectToString(
      storedMockedWebCookies
    )
    setMockedWebCookies(mappedCookiesString)
  }

  useEffect(() => {
    parseStoredMockedWebCookies()
  }, [])

  return (
    <DeveloperSettingsCard
      title="Web Cookie Switcher"
      childContainerStyle={Styles.cardContainer}
      titleTestID={testID('webCookieTitle')!}
    >
      <VFText
        style={Styles.textStyle(theme)}
        testID={testID('webCookieDescription')}
        i18nKey="Web Cookies"
      />
      <VFText
        style={Styles.textStyle(theme)}
        testID={testID('webCookieExample')}
        i18nKey="ex:- key=value;key=value;key=value"
      />
      <VFInput
        {...Styles.inputThemeStyle(theme)}
        autoCapitalize="none"
        onChangeText={setMockedWebCookies}
        defaultValue={mockedWebCookies}
        testID={testID('webCookieTextBox')}
      />
    </DeveloperSettingsCard>
  )
})

export default WebCookieSwitcher
