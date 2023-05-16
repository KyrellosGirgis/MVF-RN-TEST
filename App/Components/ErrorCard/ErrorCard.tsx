import React from 'react'
import { View } from 'react-native'
import { withTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import DashboardErrorCard from '@vfgroup-oneplatform/framework/Dashboard/Dashboard/DashboardErrorCard/DashboardErrorCard'

import { LoadingErrorProps } from 'App/Components/ErrorCard/ErrorCard.d'

import styles from 'App/Components/ErrorCard/ErrorCard.styles'

const ErrorCard = ({ errorText, errorHandler, theme }: LoadingErrorProps) => {
  return (
    <View
      style={{ ...styles.boxShadow, ...styles.errorContainer(theme) }}
      testID="loading_error_container"
    >
      <DashboardErrorCard
        errorText={errorText}
        errorHandler={errorHandler}
        errorDetailsTextStyle={styles.errorDetailsTextStyle}
      />
    </View>
  )
}

export default withTheme(ErrorCard)
