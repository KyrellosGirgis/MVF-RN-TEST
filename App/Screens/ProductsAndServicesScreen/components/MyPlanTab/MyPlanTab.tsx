import React, { useEffect } from 'react'
import MyPlan from '@vfgroup-oneplatform/framework/MyPlan/Screens/MyPlan'
import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { useDispatch, useSelector } from 'react-redux'

import { getThemeImages } from 'App/Themes'

import { fetchMyPlan } from 'App/Redux/myplan/myPlan.thunk'
import { ThunkStatus } from 'App/Redux/StoreType.d'

const MyPlanTab = () => {
  const theme = useTheme()
  const dispatch = useDispatch()
  const { myPlan, dataLoadingStatus } = useSelector(
    (state: any) => state.myPlan
  )
  const images = getThemeImages(theme.name)

  useEffect(() => {
    loadMyPlan()
  }, [])

  const loadMyPlan = () => {
    dispatch(fetchMyPlan())
  }

  return (
    <MyPlan
      planData={myPlan ?? {}}
      isMyPlanLoading={dataLoadingStatus === ThunkStatus.PENDING}
      isError={dataLoadingStatus === ThunkStatus.REJECTED}
      images={images}
      title="my_plan_card_title"
      subtitle="my_plan_card_subtitle"
      onTryAgainPress={loadMyPlan}
      errorText={'my_plan_error_message'}
    />
  )
}

export default MyPlanTab
