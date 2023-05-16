import React from 'react'
import { View, Image, FlatList, ImageSourcePropType } from 'react-native'
import { VFText } from '@vfgroup-oneplatform/foundation/Components'

import { useTheme } from '@vfgroup-oneplatform/foundation/Components/Themes'

import { AutoTopUpInfoBodyProps } from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/screens/AutoTopUpInfoScreen/AutoTopUpInfoScreen.d'

import styles from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/screens/AutoTopUpInfoScreen/AutoTopUpInfoScreen.styles'

import {
  getNumberIconsByTheme,
  getDescrptionsList
} from 'App/Screens/ProductsAndServicesScreen/components/BalanceTab/screens/AutoTopUpInfoScreen/AutoTopUpInfoScreen.helpers'
import { testID } from 'App/Utils/Helpers/testId.helpers'

const AutoTopUpInfoBody = ({
  selectedTab,
  flatListRef
}: AutoTopUpInfoBodyProps) => {
  const theme = useTheme()

  const imagesList = getNumberIconsByTheme(theme.name)

  const renderDescriptions = (text: string, image: ImageSourcePropType) => {
    return (
      <View
        style={styles.descriptionItemContainer}
        testID={testID('autoTopupDescriptionContainer')}
      >
        <Image
          style={styles.imageStyle}
          source={image}
          testID={testID('autoTopupDescriptionImage')}
        />
        <VFText
          i18nKey={text}
          style={styles.QADescription}
          testID={testID('autoTopupDescriptionText')}
        />
      </View>
    )
  }

  return (
    <View style={styles.bodyContainer}>
      <FlatList
        data={getDescrptionsList(selectedTab)}
        renderItem={({ item, index }) =>
          renderDescriptions(item, imagesList[index])
        }
        keyExtractor={({ index }) => index}
        showsVerticalScrollIndicator={false}
        ref={flatListRef}
        extraData={selectedTab}
        scrollsToTop={false}
      />
    </View>
  )
}

export default AutoTopUpInfoBody
