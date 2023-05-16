import React, { useEffect, useRef, useState } from 'react'

import OnBoarding, { StepStatuses } from '@vfgroup-oneplatform/onboarding'
import { DynamicStep } from '@vfgroup-oneplatform/onboarding/OnBoarding.d'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'
import { find as _find, cloneDeep } from 'lodash'

import { useDispatch, useSelector } from 'react-redux'

import {
  onboardingSteps as OnboardingStepsJSON,
  onBoardingStepsTypes
} from './Configurations/OnBoardingSteps'

import { getThemeImages } from 'App/Themes'

import {
  checkIfBiometricsExecluded,
  removeExcludedOnboardingSteps,
  updateOnboardingStepsStatus
} from './OnBoarding.helper'

import OnboardingErrorScreen from './Screens/OnboardingErrorScreen/OnboardingErrorScreen'

import { getOnboardingCompList } from 'App/Screens/OnBoarding/Components'

import { getFirstNameFromAppUserData } from 'App/Services/AppUserData/AppUserData.helpers'

import { setCurrentLogoPosition } from 'App/Services/SplashAnimationHandler/SplashAnimationHandler.helpers'

import { onboardingActions } from 'App/Redux/reducers/onboarding.reducer'

import { NavigationFunctions } from 'App/Containers'
import Routes from 'App/Containers/AppNavigation/Routes'
import EncryptedStorage from 'App/Services/StorageWrappers/EncryptedStorage'
import STORAGE_KEYS from 'App/Services/StorageWrappers/StorageKeys.constants'
import useStartSplashEndAnimation from 'App/Hooks/useStartSplashEndAnimation'

import { StoreType, ThunkStatus } from 'App/Redux/StoreType.d'
import { SplashProps, ScreenProps } from 'App/types'
import { shouldShowThirdPartyStep } from 'App/Services/API/Requests/ThirdPartyPermissions/ThirdPartyPermissions.helper'

interface OnBoardingScreen extends ScreenProps {
  splashProps: SplashProps
}

const OnBoardingScreen = ({ splashProps }: OnBoardingScreen) => {
  const onboardingRef = useRef()
  const [isOnboardingLoading, setIsOnboardingLoading] = useState(true)
  const [onboardingCompList, setOnboardingCompList] = useState()
  const [isLogoPositionChanged, setIsLogoPositionChanged] = useState(false)
  const [errorObject, setErrorObject] = useState(undefined)
  const { setSplashLogoPosition } = splashProps
  const { checkedSteps, isOnboardingStarted } = useSelector(
    (state: any) => state.onboarding
  )
  const [onboardingSteps, setOnboardingSteps] = useState<DynamicStep[]>(
    cloneDeep(OnboardingStepsJSON)
  )

  const { isUserDataLoading, isUserDataFailed } = useSelector(
    ({ appUserData: { appUserDataLoadingStatus } }: StoreType) => ({
      isUserDataLoading: appUserDataLoadingStatus === ThunkStatus.PENDING,

      isUserDataFailed: appUserDataLoadingStatus === ThunkStatus.REJECTED
    })
  )

  const theme = useTheme()
  const themeImages = getThemeImages(theme.name)
  const LogoViewRef = useRef(null)
  const dispatch = useDispatch()
  useStartSplashEndAnimation({
    LogoViewRef,
    splashProps,
    screenName: Routes.OnBoarding
  })

  const getFinalOnboardingSteps = (excludedTypes: string[]) => {
    const stepsToDisplay = removeExcludedOnboardingSteps({
      onboardingSteps,
      excludedTypes
    })
    return updateOnboardingStepsStatus(stepsToDisplay, checkedSteps)
  }

  const updateOnboardingSteps = (newSteps: DynamicStep[]) => {
    setOnboardingSteps(newSteps)
    onboardingRef.current?.timeLineRef?.updateSteps?.(newSteps)
  }

  const initOnboardingconfigs = async () => {
    setErrorObject(undefined)
    const execludedTypes = []

    const isBiometricsExecluded = await checkIfBiometricsExecluded()
    isBiometricsExecluded &&
      execludedTypes.push(onBoardingStepsTypes.BiometricsStep)
    try {
      const isThirdPartyPermissionsExecluded: boolean =
        !(await shouldShowThirdPartyStep())
      isThirdPartyPermissionsExecluded &&
        execludedTypes.push(onBoardingStepsTypes.ThirdPartyPermissionsStep)

      const onboardingSteps = getFinalOnboardingSteps(execludedTypes)
      updateOnboardingSteps(onboardingSteps)
    } catch (error) {
      setErrorObject(error?.content)
    }

    setIsOnboardingLoading(false)
  }

  useEffect(() => {
    isUserDataLoading
      ? setIsOnboardingLoading(true)
      : !isUserDataFailed && initOnboardingconfigs()
  }, [isUserDataLoading])

  useEffect(() => {
    setTimeout(async () => {
      setOnboardingCompList(await getOnboardingCompList())
    }, 0)
  }, [])

  setCurrentLogoPosition(LogoViewRef, setSplashLogoPosition, () => {
    !isLogoPositionChanged && setIsLogoPositionChanged(true)
  })

  const setLogoRef = (logoRef: any) => {
    LogoViewRef.current = logoRef
  }

  const onStartOnBoarding = () => {
    dispatch(onboardingActions.setIsOnboardingStarted(true))
  }

  const onStepsCompleted = async () => {
    await EncryptedStorage.setItem(STORAGE_KEYS.isOnboardingFinished, 'true')
  }

  const onOnBoardingFinish = () => {
    NavigationFunctions.replace(Routes.HomeScreen, {
      shouldRefresh: false,
      animateSplash: false
    })
  }

  const updateStepStatus = (
    steps: DynamicStep[],
    index: number,
    status: StepStatuses
  ) => {
    steps[index].status = status
    updateOnboardingSteps([...steps])
  }

  const onStepUpdateAction = (steps: DynamicStep[], index: number) => {
    if (steps[index].type === onBoardingStepsTypes.PermissionsStep) {
      EncryptedStorage.setItem(
        STORAGE_KEYS.isOnboardingDevicePermissionsFinished,
        'true'
      )
    }
  }

  const onStepUpdate = (_: DynamicStep, id: number, status: StepStatuses) => {
    if (!_find(checkedSteps, { id })) {
      dispatch(
        onboardingActions.setCheckedSteps([...checkedSteps, { id, status }])
      )
      updateStepStatus(onboardingSteps, id, status)
      onStepUpdateAction(onboardingSteps, id)
    }
  }

  const getLastActivatedStepIndex = () => {
    if (checkedSteps.length === onboardingSteps.length) {
      return []
    }

    const lastActiveSections =
      !isOnboardingStarted && checkedSteps.length === 0
        ? []
        : isOnboardingStarted && checkedSteps.length === 0
        ? [0]
        : [checkedSteps.length]
    return lastActiveSections
  }

  return errorObject ? (
    <OnboardingErrorScreen
      getLogoRef={setLogoRef}
      errorText={errorObject?.body}
      onTryAgain={() => {
        setIsOnboardingLoading(true)
        initOnboardingconfigs()
      }}
    />
  ) : (
    // @ts-ignore
    <OnBoarding
      ref={onboardingRef}
      getLogoRef={setLogoRef}
      isStarted={isOnboardingStarted}
      steps={onboardingSteps}
      stepsImages={themeImages}
      onStartPress={onStartOnBoarding}
      onStepUpdate={onStepUpdate}
      initialActiveSteps={getLastActivatedStepIndex()}
      componentList={onboardingCompList}
      onStepsCompleted={onStepsCompleted}
      onFinishPress={onOnBoardingFinish}
      isFinished={onboardingSteps.length === checkedSteps.length}
      userName={getFirstNameFromAppUserData()}
      withToBi
      logoSize={32}
      isLoading={isOnboardingLoading}
    />
  )
}

export default OnBoardingScreen
