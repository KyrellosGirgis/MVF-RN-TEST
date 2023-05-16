import React from 'react'
import { PrivacySettings as PrivacySettingsComponent } from '@vfgroup-oneplatform/framework/PrivacySettings'
import { create, act } from 'react-test-renderer'
import Shimmer from '@vfgroup-oneplatform/foundation/Components/Shimmer'

import Routes from 'App/Containers/AppNavigation/Routes'
import * as NavigationFunctions from 'App/Containers'

import PrivacySettings from 'App/Screens/PrivacySettings/PrivacySettings'
import privacySettingsData from 'App/Screens/PrivacySettings/Configurations/PrivacySettingsSections.json'

jest.mock('App/Utils/Helpers/generic.helpers', () => {
  const actualHelper = jest.requireActual('App/Utils/Helpers/generic.helpers')
  return {
    ...actualHelper,
    delay: jest.fn(() => Promise.resolve())
  }
})

describe('Privacy settings screen test', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should render Privacy settings sections successfully', () => {
    const privacySections = {
      header: 'privacySettingsHeader',
      contents: [
        {
          id: '10',
          title: 'termsOfUseItemTitle',
          description: 'termsOfUseItemDescription',
          actionIcon: 'PrivacySettingsTermsOfUse',
          actionTitle: 'termsOfUseActionTitle',
          actionKey: 'TermsOfUseScreen'
        },
        {
          id: '20',
          title: 'cookiesAndTrackingItemTitle',
          description: 'cookiesAndTrackingItemDescription',
          actionIcon: 'PrivacySettingsCookiesAndTracking',
          actionTitle: 'cookiesAndTrackingItemActionTitle',
          actionKey: 'PersonalPreferences'
        },
        {
          id: '30',
          title: 'adviceAndOffersItemTitle',
          description: 'adviceAndOffersItemDescription',
          actionIcon: 'PrivacySettingsAdviceAndOffers',
          actionTitle: 'adviceAndOffersActionTitle',
          actionKey: 'ThirdPartyTracking'
        },
        {
          id: '40',
          title: 'vodafoneHappyItemTitle',
          description: 'vodafoneHappyItemDescription',
          actionIcon: 'ic_rewards',
          actionTitle: 'vodafoneHappyItemActionTitle',
          actionKey: 'EmptyScreen'
        },
        {
          id: '50',
          title: 'contactPreferencesItemTitle',
          description: 'contactPreferencesItemDescription',
          actionIcon: 'ic_contact_us_customer_care',
          actionTitle: 'contactPreferencesItemActionTitle',
          actionKey: 'ContactPreferences'
        },
        {
          id: '60',
          title: 'privacyNotesItemTitle',
          description: 'privacyNotesItemDescription',
          actionIcon: 'PrivacySettingsPrivacyNotes',
          actionTitle: 'privacyNotesActionTitle',
          actionKey: 'EmptyScreen'
        },
        {
          id: '70',
          title: 'imprintItemTitle',
          description: 'imprintItemDescription',
          actionIcon: 'PrivacySettingsImprint',
          actionTitle: 'imprintActionTitle',
          actionKey: 'ImprintDetailsScreen'
        }
      ]
    }
    expect(privacySettingsData).toEqual(privacySections)
  })

  test('should render Privacy settings shimmer screen successfully', () => {
    NavigationFunctions.NavigationFunctions.popToTop = jest.fn()

    const element = create(<PrivacySettings />)

    const privacySettingsShimmerScreen = element.root.findByProps({
      testID: 'Privacy_Settings_Shimmer_VFScreen'
    })

    const shimmerWrapper = element.root.findByProps({
      testID: 'Privacy_Settings_Shimmer_Wrapper'
    })

    const shimmerComponents = element.root.findAllByType(Shimmer)

    expect(privacySettingsShimmerScreen).toBeTruthy()
    expect(privacySettingsShimmerScreen.props.title).toBe(
      'privacy_settings_title'
    )
    expect(shimmerWrapper).toBeTruthy()
    expect(shimmerWrapper).toBeTruthy()
    expect(shimmerComponents.length).toBe(1)

    privacySettingsShimmerScreen.props.onClose()
    expect(
      NavigationFunctions.NavigationFunctions.popToTop
    ).toHaveBeenCalledTimes(1)
  })

  test('should render Privacy settings screen successfully', async () => {
    NavigationFunctions.NavigationFunctions.popToTop = jest.fn()
    NavigationFunctions.NavigationFunctions.navigate = jest.fn()

    let element

    await act(async () => {
      element = create(<PrivacySettings />)
      jest.runAllTimers()
    })
    const privacySettingsScreen = element.root.findAllByType(
      PrivacySettingsComponent
    )[0]

    expect(privacySettingsScreen).toBeTruthy()

    privacySettingsScreen.props.onClose()
    expect(
      NavigationFunctions.NavigationFunctions.popToTop
    ).toHaveBeenCalledTimes(1)

    jest.clearAllMocks()

    privacySettingsScreen.props.onActionItemPress(Routes.ThirdPartyTracking)
    expect(
      NavigationFunctions.NavigationFunctions.navigate
    ).toHaveBeenCalledWith(Routes.ThirdPartyTracking, {})
  })
})
