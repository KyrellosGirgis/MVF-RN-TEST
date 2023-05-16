import React from 'react'
import UsageInfoCard from '@vfgroup-oneplatform/framework/CommonUI/UsageInfoCard'

import { withTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import styles from './UsageInfoTile.styles'
import { getThemeImages } from 'App/Themes'
import { Props } from './UsageInfoTile.d'

import UsageEditCard from 'App/Screens/HomeScreen/components/Dashboard/components/UsagesCarousel/components/UsageEditCard/UsageEditCard'

import { truncate } from 'App/Utils/Helpers/string.helpers'
import { TILE_ICONS } from 'App/Utils/Enums'
import {
  constructFooterText,
  constructLeftOfText
} from 'App/Services/API/Requests/Dashboard/subscriptionUnbilledUsage/UsageData.helpers'
import { NavigationFunctions } from 'App/Containers'
import Routes from 'App/Containers/AppNavigation/Routes'
import { isMobilePostpaidSubscription } from 'App/Services/AppUserData/AppUserData.helpers'

const UsageInfoTile = ({
  item,
  index,
  isActiveCard,
  theme,
  swipeOpacity
}: Props) => {
  const {
    title,
    usageType,
    remaining,
    remainingUnit,
    formattedTotal,
    isUnlimited,
    billCycleEndDate,
    remainingValuePercentage,
    isRoaming = false
  } = item

  const icon = TILE_ICONS[usageType]
  const Images = getThemeImages(theme.name)

  const footerRightIcon = isRoaming ? Images.roaming : null
  const footerText = constructFooterText(
    usageType,
    isUnlimited,
    billCycleEndDate
  )

  const leftOfText = isUnlimited ? '' : constructLeftOfText(formattedTotal)

  const onCardPress = () => {
    isMobilePostpaidSubscription() &&
      NavigationFunctions.navigate(Routes.ProductsAndServicesScreen, {
        isMobilePostpaidSubscription: true
      })
  }

  if (usageType === 'edit') {
    return <UsageEditCard />
  }
  return (
    <UsageInfoCard
      icon={Images[icon]}
      title={truncate(title, 28)}
      footerText={footerText}
      remaining={remaining}
      remainingUnit={remainingUnit}
      remainingText={leftOfText}
      value={remainingValuePercentage}
      footerRightIcon={footerRightIcon}
      animate={isActiveCard}
      delay={!index ? 2400 : 10}
      style={styles.usageInfoCard}
      titleContainerStyle={{ opacity: swipeOpacity.current }}
      onPress={onCardPress}
    />
  )
}

export default withTheme(UsageInfoTile)
