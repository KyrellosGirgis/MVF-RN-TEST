const TrayJson = {
  optionalItems: [],
  account: {
    title: 'tray_accounts_section_title',
    subTrayID: 'account',
    subTray: {
      subTrayTitle: 'sub_tray_accounts_section_title',
      subTrayDesc: 'sub_tray_select_one',
      subTrayItems: [
        {
          itemTitle: 'messages_section_title',
          itemSubtitleWithBadge: 'messages_item_subtitle_new_unread',
          itemSubTitle: 'messages_no_new_messages',
          itemImage: 'message_icon',
          itemExtraData: {},
          accessibilityID: 'message_card'
        },
        {
          itemTitle: 'addresses_section_title',
          itemSubTitle: 'addresses_section_subtitle',
          itemImage: 'address_icon',
          itemExtraData: {},
          accessibilityID: 'address_card'
        },
        {
          itemTitle: 'subtray_privacy_title',
          itemSubTitle: 'subtray_privacy_subtitle',
          itemImage: 'privacy_settings',
          itemExtraData: {},
          accessibilityID: 'privacy_settings_card'
        },
        {
          itemTitle: 'my_password_title',
          itemSubTitle: 'my_password_title_subtitle',
          itemImage: 'change_password_icon',
          itemExtraData: {},
          accessibilityID: 'password_card'
        },
        {
          itemTitle: 'settings_title',
          itemSubTitle: 'appsettings_subtitle',
          itemImage: 'appsettings_icon',
          itemExtraData: {},
          accessibilityID: 'appsettings_card'
        },
        {
          itemTitle: 'logout_title',
          itemSubTitle: 'logout_subtitle',
          itemImage: 'logout_icon',
          itemExtraData: {},
          accessibilityID: 'logoout_card'
        }
      ],
      isLoading: false
    },
    trayAction: 'myAccountTrayAction.class'
  },
  products: {
    title: 'tray_my_products_section_title',
    subTrayID: 'products',
    subTray: {
      subTrayTitle: 'sub_tray_my_products_title',
      subTrayDesc: 'sub_tray_select_one',
      subTrayItems: [],
      isLoading: true,
      isExpandedTrayEnabled: true,
      expandedTrayItems: []
    },
    trayAction: 'productsTrayAction'
  }
}

const SecondLevelTrayConfig = {
  welcomeMessage: 'tobi_second_level_help_msg',
  welcomeMessageBreakTime: 3000
}

const TrayTabsConfig = {
  mobileSubscriptions: {
    id: 'MobileID',
    title: 'products_mobile_title'
  },
  fixednetSubscriptions: {
    id: 'FixedNetID',
    title: 'products_fixednet_title'
  },
  cableSubscriptions: { id: 'CableID', title: 'products_cable_title' },
  unitymediaSubscriptions: {
    id: 'UnityMediaID',
    title: 'products_unitymedia_title'
  }
}

export default TrayJson

export { SecondLevelTrayConfig, TrayTabsConfig }
