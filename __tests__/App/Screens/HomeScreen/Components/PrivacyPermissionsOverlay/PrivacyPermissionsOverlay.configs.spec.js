import { getPrivacySettingsSections } from 'App/Screens/HomeScreen/components/PrivacyPermissionsOverlay/PrivacyPermissionsOverlay.configs'

describe('test getPrivacySettingsSections', () => {
  let state = {
    privacyBasicProfile: true,
    privacyAdvancedProfile: false,
    privacyPost: false,
    privacyMessaging: false,
    privacyPhoneCalls: false,
    privacyEmail: false
  }

  const onToggleChangeMock = jest.fn((key) => {
    state = {
      ...state,
      [key]: !state[key]
    }
  })

  const privacySettingsSections = getPrivacySettingsSections(
    state,
    onToggleChangeMock
  )

  test('should change state of the basic profile with false when toggled', async () => {
    const toggleItem = privacySettingsSections[1].actions.items[0]
    toggleItem.onToggle()

    // SHOULD CALL THE FUNCTION THAT UPDATE THE STATE WITH THE CORRESPONDING STATE_KEY (privacyBasicProfile)
    expect(onToggleChangeMock).toBeCalledWith('privacyBasicProfile')
    // THE STATE SHOULD BE FALSE
    expect(state.privacyBasicProfile).toBeFalsy()
  })

  test('should change state of the advacned profile with true when toggled', async () => {
    const toggleElement = privacySettingsSections[1].actions.items[1]
    toggleElement.onToggle()

    expect(onToggleChangeMock).toBeCalledWith('privacyAdvancedProfile')
    expect(state.privacyAdvancedProfile).toBeTruthy()
  })

  test('should change state of the post toggle to be true when toggled', async () => {
    const toggleElement = privacySettingsSections[2].actions.items[0]
    toggleElement.onToggle()

    expect(onToggleChangeMock).toBeCalledWith('privacyPost')
    expect(state.privacyPost).toBeTruthy()
  })

  test('should change state of the message toggle to be true when toggled', async () => {
    const toggleElement = privacySettingsSections[2].actions.items[1]
    toggleElement.onToggle()

    expect(onToggleChangeMock).toBeCalledWith('privacyMessaging')
    expect(state.privacyMessaging).toBeTruthy()
  })

  test('should change state of the phoneCalls toggle to be true when toggled', async () => {
    const toggleElement = privacySettingsSections[2].actions.items[2]
    toggleElement.onToggle()

    expect(onToggleChangeMock).toBeCalledWith('privacyPhoneCalls')
    expect(state.privacyPhoneCalls).toBeTruthy()
  })

  test('should change state of the email toggle to be true when toggled', async () => {
    const toggleElement = privacySettingsSections[2].actions.items[3]
    toggleElement.onToggle()

    expect(onToggleChangeMock).toBeCalledWith('privacyEmail')
    expect(state.privacyEmail).toBeTruthy()
  })
})
