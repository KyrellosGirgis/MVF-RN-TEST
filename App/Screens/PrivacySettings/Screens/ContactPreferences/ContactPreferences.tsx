import React, { useEffect, useState } from 'react'
import { includes as _includes } from 'lodash'

import {
  LightThemeColors,
  useTheme
} from '@vfgroup-oneplatform/foundation/Components/Themes'

import { ContactPreferences as ContactPreferencesComponent } from '@vfgroup-oneplatform/framework/PrivacySettings/Screens'

import { getThemeImages } from 'App/Themes'

import useSuccessModal from 'App/Screens/PrivacySettings/Hooks/useSuccessModal'

import {
  getStateInitialized,
  onScreenBackPress
} from 'App/Screens/PrivacySettings/Screens/Helper'

import {
  contactPreferencesTextSection,
  contactPreferencesSections
} from 'App/Screens/PrivacySettings/Configurations/ContactPreferencesData'

import {
  ContactPreferencesSection,
  PrivacySettingsState,
  SectionItem
} from 'App/Screens/PrivacySettings/Configurations/PrivacySettings'

import { delay } from 'App/Utils/Helpers/generic.helpers'
import { navigateToDashboardScreen } from 'App/Screens/Helpers'

const ContactPreferences = () => {
  const theme = useTheme()
  const images = getThemeImages(theme.name)
  const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState(true)
  const [setShowSuccessModal, setSuccessModalLoading] = useSuccessModal()

  const [preferencesState, setPreferencesState] =
    useState<PrivacySettingsState>(
      getStateInitialized(
        contactPreferencesSections.flatMap((item) => item.items)
      )
    )

  useEffect(() => {
    if (isConfirmButtonDisabled && _includes(preferencesState, true)) {
      setIsConfirmButtonDisabled(false)
    } else if (!isConfirmButtonDisabled && !_includes(preferencesState, true)) {
      setIsConfirmButtonDisabled(true)
    }
  }, [preferencesState])

  const onToggle = (key: string) => {
    setPreferencesState({ ...preferencesState, [key]: !preferencesState[key] })
  }

  const onToggleParent = (parentKey: string, sectionItems: SectionItem[]) => {
    const parentState = !preferencesState[parentKey]

    setPreferencesState({
      ...preferencesState,
      ...getStateInitialized(sectionItems, parentState)
    })
  }

  const onToggleChild = (key: string, section: ContactPreferencesSection) => {
    const { parentPermissionTitle, items } = section
    const childNewState = !preferencesState[key]
    const parentCurrentState = preferencesState[parentPermissionTitle]
    let parentNewState = parentCurrentState

    const otherChildrenItems = items.filter(
      (item) => item.title !== key && item.title !== parentPermissionTitle
    )

    const areOtherChildrenPermissionsClosed = otherChildrenItems.every(
      (child) => !preferencesState[child.title]
    )

    if (areOtherChildrenPermissionsClosed && !childNewState) {
      parentNewState = false
    } else if (!parentCurrentState && childNewState) {
      parentNewState = true
    }

    setPreferencesState({
      ...preferencesState,
      [section.parentPermissionTitle]: parentNewState,
      [key]: childNewState
    })
  }

  const getItemToggleFunction = (
    section: ContactPreferencesSection,
    itemTitle: string
  ) => {
    if (section.hasParentPermission) {
      if (section.parentPermissionTitle === itemTitle) {
        return () => onToggleParent(itemTitle, section.items)
      }
      return () => onToggleChild(itemTitle, section)
    }
    return () => onToggle(itemTitle)
  }

  const getContactPreferencesData = () =>
    contactPreferencesSections.map((section) =>
      section.items.map((item) => ({
        ...item,
        initialValue: preferencesState[item.title],
        onAcceptanceChange: getItemToggleFunction(section, item.title)
      }))
    )

  const onConfirm = async () => {
    setSuccessModalLoading(true)
    setShowSuccessModal(true)
    await delay(2000)
    setSuccessModalLoading(false)
  }

  return (
    <ContactPreferencesComponent
      onClose={navigateToDashboardScreen}
      onBack={() => onScreenBackPress(!isConfirmButtonDisabled)}
      section={contactPreferencesTextSection}
      contactPrefData={getContactPreferencesData()}
      images={images}
      isButtonDisabled={isConfirmButtonDisabled}
      onButtonPress={onConfirm}
    />
  )
}

ContactPreferences.defaultProps = {
  theme: LightThemeColors
}

export default ContactPreferences
