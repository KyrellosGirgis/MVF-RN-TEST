const TrayFourItems = {
  optionalItems: [
    {
      title: 'Top up',
      icon: 'icTopUp',
      subTray: {
        subTrayItems: []
      },
      trayAction: 'topupTrayAction'
    },
    {
      title: 'Settings',
      icon: 'ic_settings',
      subTray: {
        subTrayItems: []
      },
      trayAction: 'settingsTrayAction'
    }
  ],
  account: {
    title: 'tray_accounts_section_title',
    subTrayID: 'account',
    subTray: {
      subTrayTitle: 'sub_tray_accounts_section_title',
      subTrayDesc: 'sub_tray_select_one'
    },
    trayAction: 'myAccountTrayAction.class'
  },
  products: {
    title: 'tray_my_products_section_title',
    subTrayID: 'products',
    subTray: {
      subTrayTitle: 'sub_tray_my_products_title',
      subTrayDesc: 'sub_tray_select_one'
    },
    trayAction: 'productsTrayAction'
  }
}

export default TrayFourItems
