const configurations = [
  {
    dashboardItems: [
      {
        name: 'MainCardComponent'
      },
      {
        name: 'SecondaryCardComponent'
      },
      {
        name: 'ThirdCardComponent'
      },
      {
        name: 'FourthCardComponent'
      }
    ]
  },
  {
    title: 'dashboard_discovery_label',
    componentName: 'DashboardDiscovery',
    discoveryItems: [
      {
        type: 'group',
        name: 'dashboard_basic_group_component_name',
        moreText: 'dashboard_group_component_show_more',
        lessText: 'dashboard_group_component_show_less',
        subItems: [
          {
            screen: 'Settings',
            extraInfo: {
              title: 'settings_title',
              icon: 'ic_settings'
            }
          },
          {
            name: 'Demo component',
            componentId: 'demo-component',
            extraInfo: {
              title: 'dashboard_my_basket_item_title',
              icon: 'icShoppingTrolley'
            }
          }
        ]
      },
      {
        type: 'group',
        name: 'dashboard_assistance_group_component_name',
        componentId: 'demo-component',
        moreText: '',
        lessText: '',
        subItems: [
          {
            name: 'dashboard_demo_component_name',
            componentId: 'demo-component',
            extraInfo: {
              title: 'dashboard_developer_settings_item_title',
              icon: 'icEngineer'
            }
          }
        ]
      },
      {
        type: 'group',
        name: 'dashboard_network_group_component_name',
        componentId: 'network-component',
        moreText: '',
        lessText: '',
        subItems: [
          {
            name: 'dashboard_speed_checker_component_name',
            componentId: 'speed-checker-component',
            extraInfo: {
              title: 'dashboard_speed_checker_item_title',
              icon: 'ic_acceleration_middle'
            }
          }
        ]
      }
    ]
  }
]

export default configurations
