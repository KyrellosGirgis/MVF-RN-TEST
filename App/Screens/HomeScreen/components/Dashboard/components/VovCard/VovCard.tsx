import React from 'react'
import { Image, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import {
  VFText,
  VFTouchableInScroll
} from '@vfgroup-oneplatform/foundation/Components'
import {
  withTheme,
  Metrics
} from '@vfgroup-oneplatform/foundation/Components/Themes'
import ParallaxScroll from '@vfgroup-oneplatform/framework/CommonUI/ParallaxScroll'

import styles from './VovCard.Styles'

import { testID } from 'App/Utils/Helpers/testId.helpers'

const VovCard = (props: any) => {
  const toggleModal = () => {
    // open deep link
  }

  const renderBackground = () => (
    <Image
      source={props.extraInfo.image}
      style={styles.imageStyle}
      testID={testID('VOVCard_Image')}
      accessible
    />
  )
  const renderContent = () => {
    return (
      <View style={styles.textContainer}>
        <View>
          <VFText
            style={styles.title}
            i18nKey={props.extraInfo.title}
            testID={testID('VOVCard_title')}
          />
          <VFText
            style={styles.subTitle}
            i18nKey={'dashboard_upgrade_component_subtitle_topup'}
            testID={testID('VOVCard_subTitle')}
          />
        </View>
        <View style={styles.textIconContainer}>
          {/* <View style={styles.btn}>
            <VFText
              style={styles.text}
              i18nKey={'dashboard_upgrade_component_button_topup'}
              accessibilityLabel="DBtopupNow"
              testID={testID('VOVCard_buttonTitle')}
            />
            <Icon
              name={Images.icChevronRightWhite}
              testID={testID('VOVCard_Image')}
              type="image"
            />
          </View> */}
        </View>
      </View>
    )
  }

  return (
    <VFTouchableInScroll
      onPress={toggleModal}
      accessible={false}
      accessibilityLabel="DBeditorialCard"
    >
      <LinearGradient
        style={styles.container}
        colors={props.theme.colors.backgroundGradientColors}
        {...Metrics.backgroundGradientOrientation}
      >
        <ParallaxScroll
          ref={props.setParallaxRef}
          background={renderBackground()}
          content={renderContent()}
        />
      </LinearGradient>
    </VFTouchableInScroll>
  )
}

export default withTheme(VovCard)
