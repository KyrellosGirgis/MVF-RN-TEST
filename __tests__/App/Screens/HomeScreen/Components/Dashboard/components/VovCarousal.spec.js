/* eslint-disable import/namespace */
import React from 'react'
import { create } from 'react-test-renderer'

import { Pagination } from '@vfgroup-oneplatform/foundation/Components'
import CardCarousel from '@vfgroup-oneplatform/foundation/Components/CardCarousel'

import VovCarousel from 'App/Screens/HomeScreen/components/Dashboard/components/VovCard/VovCarousel'

describe('Render cards in Vov carousal section', () => {
  test('should render cards successfully if cards data received successfully ', () => {
    const props = {
      data: [
        {
          action: 'VOVSource',
          extraInfo: {
            title: 'PAYM+I_TITLE_ID',
            image: {
              uri: 'https://media.vodafone.de/www/images/app/benefit_world/icon_discount_640dpi.png'
            }
          }
        },
        {
          action: 'VOVSource',
          extraInfo: {
            title: 'PAYM+I_TITLE_ID',
            image: {
              uri: 'https://media.vodafone.de/www/images/app/benefit_world/icon_discount_640dpi.png'
            }
          }
        },
        {
          action: 'VOVSource',
          extraInfo: {
            title: 'PAYM+I_TITLE_ID',
            image: {
              uri: 'https://media.vodafone.de/www/images/app/benefit_world/icon_discount_640dpi.png'
            }
          }
        }
      ]
    }
    const VovCarouselUI = create(<VovCarousel {...props} />)

    expect(
      VovCarouselUI.root.findByProps({
        testID: 'MainCard'
      })
    ).toBeDefined()
    const pagination = VovCarouselUI.root.findAllByType(Pagination)[0]
    expect(pagination).toBeDefined()
    expect(pagination.props.activeDotIndex).toBe(0)
    const cardCarousel = VovCarouselUI.root.findAllByType(CardCarousel)[0]
    expect(cardCarousel).toBeDefined()
    expect(cardCarousel.props.activeCardIndex).toBe(0)
    cardCarousel.props.onSwipe(2)
    expect(cardCarousel.props.activeCardIndex).toBe(2)
  })
  test('should not render cards successfully if cards data received successfully ', () => {
    const props = {
      data: []
    }
    const VovCarouselUI = create(<VovCarousel {...props} />)
    const cardCarousel = VovCarouselUI.root.findAllByType(CardCarousel)[0]
    expect(cardCarousel).not.toBeDefined()
  })
})
