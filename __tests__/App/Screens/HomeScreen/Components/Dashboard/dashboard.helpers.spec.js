/* eslint-disable import/namespace */
import PermissionsManager from '@vfgroup-oneplatform/foundation/PermissionsManager'
import { IOSPermissionTypes } from '@vfgroup-oneplatform/foundation/PermissionsManager/permissionTypes'

import _ from 'lodash'

import * as DashboardHelpers from 'App/Screens/HomeScreen/components/Dashboard/dashboard.helpers'

import {
  DiscoverItemsNavigation,
  getDashboardObject,
  getDiscoverSectionsSkeleton,
  handleOnPressDiscoverItem
} from 'App/Screens/HomeScreen/components/Dashboard/dashboard.helpers'
import { store } from 'App/Redux'
import { requestAppTrackingPermission } from 'App/Services/AppLifecycleManager/helpers/executeAppLaunchingTasks.helpers'

const expectedMapppedDiscoverSections = [
  {
    title: 'Help with disruptions',
    cardImageSource: 'helpWithDisruptionsImageSource',
    componentId: 'discoverComponentCard',
    items: [
      {
        buttonText: 'Check',
        onPress: () => {},
        action: 'netperformWebviewSource',
        extraInfo: {
          title: 'Network ok?',
          Icon: { uri: 'networkOkIconSource' }
        }
      },
      {
        buttonText: 'Check',
        onPress: () => {},
        action: 'coverageWebviewSource',
        extraInfo: {
          title: 'Network Coverage',
          Icon: { uri: 'networkCoverageIconSource' }
        }
      }
    ],
    moreText: 'dashboard_group_component_show_more',
    lessText: 'dashboard_group_component_show_less'
  },
  {
    type: 'Offers',
    action: 'moreoffersWebviewSource',
    componentId: 'VovCard',
    extraInfo: { title: 'Offers', image: undefined }
  },
  {
    title: 'Customer Account',
    componentId: 'discoverComponentCard',
    cardImageSource: undefined,
    items: [
      {
        buttonText: 'Open',
        onPress: () => {},
        action: 'myDataWebviewSource',
        extraInfo: { title: 'My Data', Icon: { uri: 'myDataIconSource' } }
      },
      {
        buttonText: 'Check',
        onPress: () => {},
        action: 'orderStatusWebviewSource',
        extraInfo: {
          title: 'Order Status',
          Icon: { uri: 'orderStatusIconSource' }
        }
      }
    ],
    moreText: 'dashboard_group_component_show_more',
    lessText: 'dashboard_group_component_show_less'
  },
  {
    name: 'Mein Vertrag',
    type: 'group',
    componentId: 'demo-component',
    subItems: [
      {
        screen: 'myTariffWebviewSource',
        extraInfo: { title: 'My Tariff', Icon: 'myTariffIconSource' }
      },
      {
        screen: 'optionsWebviewSource',
        extraInfo: { title: 'Options', Icon: 'optionsIconSource' }
      }
    ],
    moreText: 'dashboard_group_component_show_more',
    lessText: 'dashboard_group_component_show_less'
  },
  {
    type: 'discover_fixed_component',
    componentId: 'VovCard',
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
]
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

const mockRequestPermissions = jest.fn()

jest.mock('@vfgroup-oneplatform/foundation/PermissionsManager', () => {
  return jest.fn().mockImplementation(() => {
    return { requestPermissions: mockRequestPermissions }
  })
})

describe('test HomeScreen dashboard helper functions ', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  beforeEach(() => {
    store.getState = () => ({
      dashboardSkeleton: dashboardSkeletonData
    })
  })

  test('should getDiscoverSectionsSkeleton return the correct mapped object when there is stored dashboardSkeleton in redux', () => {
    const discoverSectionsSkeleton = getDiscoverSectionsSkeleton()
    expect(JSON.stringify(discoverSectionsSkeleton)).toStrictEqual(
      JSON.stringify(expectedMapppedDiscoverSections)
    )
  })

  test('should call cloneDeep and getDiscoverSectionsSkeleton', () => {
    const expectedCloned = [
      { dashboardItems: [[Object], [Object], [Object], [Object]] },
      {
        title: 'dashboard_discovery_label',
        componentName: 'DashboardDiscovery',
        discoveryItems: [[Object], [Object], [Object]]
      }
    ]
    _.cloneDeep = jest.fn(() => expectedCloned)
    DashboardHelpers.getDiscoverSectionsSkeleton = jest.fn()
    getDashboardObject()
    expect(_.cloneDeep).toBeCalled()
    expect(DashboardHelpers.getDiscoverSectionsSkeleton).toBeCalled()
  })

  test('should call requestPermissions with right permissions', async () => {
    const permissionList = {
      [IOSPermissionTypes.APP_TRACKING_TRANSPARENCY]: true
    }
    await requestAppTrackingPermission()
    const permissionsManager = new PermissionsManager()
    expect(PermissionsManager).toBeCalled()
    expect(permissionsManager.requestPermissions).toBeCalledWith(
      {},
      permissionList
    )
  })

  test('should call the right handler for given title', () => {
    DiscoverItemsNavigation.settings_title = jest.fn()
    handleOnPressDiscoverItem({
      extraInfo: { title: 'settings_title' }
    })
    expect(DiscoverItemsNavigation.settings_title).toBeCalled()
  })

  test('should getDiscoverSectionsSkeleton return the correct mapped object when there is no stored dashboardSkeleton in redux', () => {
    store.getState = () => ({
      dashboardSkeleton: undefined
    })

    const discoverSectionsSkeleton = getDiscoverSectionsSkeleton()

    expect(discoverSectionsSkeleton).toEqual(undefined)
  })
})
