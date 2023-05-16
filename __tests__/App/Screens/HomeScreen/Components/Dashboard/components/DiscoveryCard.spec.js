/* eslint-disable import/namespace */
import React from 'react'
import { create } from 'react-test-renderer'

import DiscoveryCard from 'App/Screens/HomeScreen/components/Dashboard/components/DiscoveryCard/DiscoveryCard'

describe('Render cards in dashboard discovery section', () => {
  const cardConfig = {
    title: 'Kundenkonto',
    items: [
      {
        name: 'dashboard_slack_item_title',
        buttonText: 'Öffnen',
        extraInfo: {
          title: 'Vertragsdaten',
          icon: 'document'
        },
        onPress: () => console.log('entered')
      },
      {
        name: 'dashboard_slack_item_title',
        buttonText: 'Öffnen',
        extraInfo: {
          title: 'Alles zum Umzug',
          icon: 'smarthome_kit'
        },
        onPress: () => console.log('entered')
      },
      {
        name: 'dashboard_slack_item_title',
        buttonText: 'Öffnen',
        extraInfo: {
          title: 'Einstellungen & Infos',
          icon: 'ic_settings'
        },
        onPress: () => console.log('entered')
      }
    ]
  }
  const cardWithoutImage = create(
    <DiscoveryCard title={cardConfig.title} items={cardConfig.items} />
  )
  test('should render card Body successfully', () => {
    expect(cardWithoutImage.root.children[0]).toBeTruthy()
  })

  test('should not render image by default', () => {
    const cardImage = cardWithoutImage.root.findAllByProps({
      testID: 'card_image'
    })

    expect(cardImage.length).toEqual(0)
  })

  test('should render image if passed', () => {
    const cardWithImage = create(
      <DiscoveryCard
        title={cardConfig.title}
        items={cardConfig.items}
        cardImageSource="dashboardMap"
      />
    )

    const cardImage = cardWithImage.root.findByProps({
      testID: 'card_image'
    })

    expect(cardImage).toBeTruthy()
  })
})
