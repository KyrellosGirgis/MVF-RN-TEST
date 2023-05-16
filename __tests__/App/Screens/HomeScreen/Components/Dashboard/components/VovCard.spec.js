/* eslint-disable import/namespace */
import React from 'react'
import { create } from 'react-test-renderer'

import VovCard from 'App/Screens/HomeScreen/components/Dashboard/components/VovCard/VovCard'

describe('Render card in dashboard discovery section', () => {
  const cardConfig = {
    type: 'discover_fixed_component',
    action: 'VOVSource',
    componentId: 'VovCard',
    extraInfo: { title: 'PAYM+I_TITLE_ID', image: 'image' }
  }

  const cardWithoutImage = create(<VovCard extraInfo={cardConfig.extraInfo} />)
  test('should render card title successfully', () => {
    const cardTitle = cardWithoutImage.root.findAllByProps({
      testID: 'VOVCard_title'
    })
    expect(cardTitle.length).not.toEqual(0)
  })

  test('should render card sub-title successfully', () => {
    const cardTitle = cardWithoutImage.root.findAllByProps({
      testID: 'VOVCard_subTitle'
    })
    expect(cardTitle.length).not.toEqual(0)
  })

  test('should render card image successfully', () => {
    const cardTitle = cardWithoutImage.root.findAllByProps({
      testID: 'VOVCard_Image'
    })
    expect(cardTitle.length).not.toEqual(0)
  })
})
