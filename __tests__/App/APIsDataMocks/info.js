const infoData = {
  umid: 'dff164e1-c535-4765-b2e9-d4671bb09c91',
  state: 1,
  permissions: {
    blacklist: false,
    ADV_GENE: false,
    'HVF-DP': true,
    ADV_TWIB: false,
    DEV_GENE: false,
    ADV_POST: false,
    DEV_1: false,
    'LI-NBA': true,
    ADV_1: false,
    DEV_CDEV: false,
    DEV_GEO: false,
    DEV_WBT: false,
    ADV_2: false,
    PDX: true,
    ADV_SMMS: false,
    'LI-OM': true,
    ADV_TOUT: false,
    'HVF-CP': true,
    'LI-OPT': true,
    ADV_EMAL: false,
    DEV_2: false
  },
  permissionsLastModification: {
    blacklist: '2022-04-08T07:44:09.744Z',
    ADV_GENE: '2022-04-08T07:44:09.744Z',
    'HVF-DP': '2022-06-12T20:18:57.795Z',
    ADV_TWIB: '2022-04-08T07:44:09.744Z',
    DEV_GENE: '2022-04-08T07:44:09.744Z',
    ADV_POST: '2022-04-08T07:44:09.744Z',
    DEV_1: '2018-08-23T15:59:45.175Z',
    'LI-NBA': '2022-06-12T20:21:02.623Z',
    ADV_1: '2018-08-23T15:59:45.175Z',
    DEV_CDEV: '2022-04-08T07:44:09.744Z',
    DEV_GEO: '2022-04-08T07:44:09.744Z',
    DEV_WBT: '2022-04-08T07:44:09.744Z',
    ADV_2: '2018-08-23T15:59:45.175Z',
    PDX: '2022-04-08T07:44:09.744Z',
    ADV_SMMS: '2022-04-08T07:44:09.744Z',
    'LI-OM': '2022-06-12T20:21:02.623Z',
    ADV_TOUT: '2022-04-08T07:44:09.744Z',
    'HVF-CP': '2022-06-12T20:18:57.795Z',
    'LI-OPT': '2022-06-12T20:21:02.623Z',
    ADV_EMAL: '2022-04-08T07:44:09.744Z',
    DEV_2: '2018-08-23T15:59:45.175Z'
  },
  notificationHistory: [
    {
      name: 'APP_HVF',
      version: 1,
      permissions: ['HVF-CP', 'HVF-DP'],
      date: '2022-06-12T20:18:57.795Z'
    },
    {
      name: 'APP_CS',
      version: 4,
      permissions: ['LI-NBA', 'LI-OM', 'LI-OPT'],
      date: '2022-03-16T13:48:45.306Z'
    }
  ],
  notificationStatus: {
    'LI-NBA': true,
    'HVF-DP': true,
    'LI-OM': true,
    'HVF-CP': true,
    'LI-OPT': true
  },
  attributes: {
    MCC_3522: '01_WEB_I_FM0000_XX_P',
    MCC_3661: '01_WEB_X_DP0000_1D_P',
    Test_Prio_Campcode_1: 'Test_Prio_Cellcode_1',
    domainName: 'tedata.net',
    MCC_3472: '01_WEB_X_IOT000_XX_P',
    marketCode: 'MMC',
    MCC_3042: '01_WEB_X_CO0000_XX_P',
    MCC_3519: '01_WEB_P_PE0000_XX_P',
    cc: 'EG',
    fctk: 'ty8A5tfNXRI.1655160883310.CyGQLKzBEF8jJqRyRexT9HAWSMBVPCN_01mjfuoKk1Y',
    MCC_3521: '01_WEB_O_MYTONE_XX_P',
    city: 'Madinat Sittah Uktubar'
  }
}

const infoPayload = {
  permission: {
    'LI-OM': false,
    'LI-OPT': true,
    'LI-NBA': true
  },
  notification: [
    {
      name: 'APP_CS',
      version: 4,
      permissions: ['LI-OM', 'LI-OPT', 'LI-NBA']
    }
  ]
}

export { infoData, infoPayload }
