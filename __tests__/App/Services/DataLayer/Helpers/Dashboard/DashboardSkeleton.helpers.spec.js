import { store } from 'App/Redux'
import { getOptionalNavigationSkeleton } from 'App/Services/DataLayer/Helpers/Dashboard/DashboardSkeleton.helpers'

const dashboardSkeletonData = {
  _embedded: {
    largeTiles: {
      _links: {
        self: {
          href: 'largeTilesSource'
        }
      }
    },
    mediumTiles: {
      _links: {
        self: {
          href: 'mediumTilesSource'
        }
      }
    },
    smallTiles: {
      _links: {
        self: {
          href: 'smallTilesSource'
        }
      }
    }
  },
  sections: [
    {
      type: 'VoV',
      title: 'PAYM+I_TITLE_ID',
      content: {
        href: 'VOVSource'
      }
    },
    {
      type: 'Navigation',
      title: 'Mein Vertrag',
      style: 'basic',
      items: [
        {
          label: 'My Tariff',
          icon: {
            href: 'myTariffIconSource'
          },
          action: {
            href: 'myTariffWebviewSource'
          }
        },
        {
          label: 'Options',
          icon: {
            href: 'optionsIconSource'
          },
          action: {
            href: 'optionsWebviewSource'
          }
        }
      ]
    },
    {
      type: 'Navigation',
      title: 'Customer Account',
      style: 'framedNoImage',
      items: [
        {
          label: 'My Data',
          buttonLabel: 'Open',
          icon: {
            href: 'myDataIconSource'
          },
          action: {
            href: 'myDataWebviewSource'
          }
        },
        {
          label: 'Order Status',
          buttonLabel: 'Check',
          icon: {
            href: 'orderStatusIconSource'
          },
          action: {
            href: 'orderStatusWebviewSource'
          }
        }
      ]
    },
    {
      type: 'Offers',
      title: 'Offers',
      content: {
        href: 'moreoffersWebviewSource'
      }
    },
    {
      type: 'Navigation',
      title: 'Help with disruptions',
      style: 'framedWithImage',
      image: {
        href: 'helpWithDisruptionsImageSource'
      },
      items: [
        {
          label: 'Network ok?',
          buttonLabel: 'Check',
          icon: {
            href: 'networkOkIconSource'
          },
          action: {
            href: 'netperformWebviewSource'
          }
        },
        {
          label: 'Network Coverage',
          buttonLabel: 'Check',
          icon: {
            href: 'networkCoverageIconSource'
          },
          action: {
            href: 'coverageWebviewSource'
          }
        }
      ]
    }
  ],
  optionalNavigation: [
    {
      name: 'item1',
      label: 'OPTION_NAV_PAYM+I_LABEL_ID',
      icon: {
        href: 'offersIconSource'
      },
      action: {
        href: 'moreoffersWebviewSource'
      }
    },
    {
      name: 'item2',
      label: 'Invoice',
      icon: {
        href: 'documentIconSource'
      },
      action: {
        href: 'billOverviewWebviewSource'
      }
    }
  ],
  _links: {
    self: {
      href: 'dashboardSkeletonWebviewSource'
    }
  }
}
describe('Test dashboard skeleton helpers functions', () => {
  beforeEach(() => {
    store.getState = () => ({
      dashboardSkeleton: dashboardSkeletonData
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('should getOptionalNavigationSkeleton return the correct mapped object when there is stored dashboardSkeleton in redux', () => {
    const { optionalNavigation } = dashboardSkeletonData
    const expectedOptionalNavigation = [
      {
        title: optionalNavigation[0].label,
        iconSource: optionalNavigation[0].icon.href,
        action: optionalNavigation[0].action?.href
      },
      {
        title: optionalNavigation[1].label,
        iconSource: optionalNavigation[1].icon.href,
        action: optionalNavigation[1].action?.href
      }
    ]

    const optionalNavigationSkeleton = getOptionalNavigationSkeleton()

    expect(optionalNavigationSkeleton).toEqual(expectedOptionalNavigation)
  })

  test('should getOptionalNavigationSkeleton return the correct mapped object when there is no stored dashboardSkeleton in redux', () => {
    store.getState = () => ({
      dashboardSkeleton: undefined
    })

    const optionalNavigationSkeleton = getOptionalNavigationSkeleton()

    expect(optionalNavigationSkeleton).toEqual(undefined)
  })
})
