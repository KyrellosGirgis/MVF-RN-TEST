import { Role } from 'App/Services/API/Requests/userData/userData.d'

const userDataOriginalResponse = {
  userAccountVBO: {
    authLevel: 'WEB',
    activeContractMobile: {
      id: 123
    },
    mobile: [
      {
        contract: {
          mboId: 123,
          partyRoleId: 234,
          ban: 123456789,
          marketCode: 'MMC',
          subType: 'KD',
          role: Role.CustomerAccountAdmin,
          access: 'CustomerAccount',
          status: 'effective',
          registrationDate: '1970-01-01',
          isActiveContract: true,
          subscription: [
            {
              mboId: 123,
              mboName: ' Business Testkarte',
              partyRoleId: 456,
              ban: 123456789,
              msisdn: 123456789123,
              marketCode: 'MMC',
              subType: 'EK',
              role: Role.SubscriptionAdmin,
              access: 'AccessSubscription',
              status: 'effective',
              registrationDate: '1970-01-01',
              isActiveContract: false,
              isFemtoSubscription: false
            }
          ]
        }
      }
    ],
    onlineUser: {
      emailValidationStatus: 'c',
      firstName: 'Test',
      isFirstLogin: false,
      lastLoginDate: '2022-05-12T00:00:00+01:00',
      lastName: 'Tester1',
      mintUserID: 3333333,
      onlineUserID: 66666666,
      permissionFlag: true,
      primaryEmail: 'yes@vodafone.com',
      title: 'Herr',
      userName: 'AppTest01'
    }
  }
}

const smsLoginUserData = {
  userAccountVBO: {
    authLevel: 'WEB',
    activeContractMobile: {
      id: 123
    },
    onlineUser: {
      onlineUserID: 0,
      title: null,
      firstName: 'test',
      lastName: 'abc',
      isFirstLogin: false
    },
    mobile: [
      {
        contract: {
          mboId: 123,
          partyRoleId: 234,
          ban: 123456789,
          marketCode: 'MMC',
          subType: 'KD',
          role: Role.CustomerAccountAdmin,
          access: 'CustomerAccount',
          status: 'effective',
          registrationDate: '1970-01-01',
          isActiveContract: true,
          subscription: [
            {
              mboId: 123,
              mboName: ' Business Testkarte',
              partyRoleId: 456,
              ban: 123456789,
              msisdn: 123456789123,
              marketCode: 'MMC',
              subType: 'EK',
              role: Role.SubscriptionAdmin,
              access: 'AccessSubscription',
              status: 'effective',
              registrationDate: '1970-01-01',
              isActiveContract: false,
              isFemtoSubscription: false
            }
          ]
        }
      }
    ]
  }
}

const userDataWithAllProducts = {
  userAccountVBO: {
    authLevel: 'WEB',
    onlineUser: {
      mintUserID: 678,
      onlineUserID: 789,
      userName: 'MVATest107',
      title: 'Herr',
      firstName: 'MVATest107',
      lastName: 'MeinVodafone App',
      lastLoginDate: '2022-01-17T00:00:00+01:00',
      primaryEmail: 'abc@vodafone.com',
      emailValidationStatus: 'c',
      isFirstLogin: false,
      permissionFlag: true
    },
    activeContractMobile: { id: 890, name: 'Mobilfunk-Business' },
    activeContractFixednet: { id: 901 },
    activeContractCable: { id: 1234 },
    activeContractUnitymedia: {
      id: 2345,
      name: 'Kabel-Vertrag-Unity.Media'
    },
    mobile: [
      {
        contract: {
          mboId: 3456,
          mboName: 'Mobilfunkvertrag-Postpaid',
          partyRoleId: 4567,
          ban: 123456781,
          marketCode: 'MMC',
          subType: 'EK',
          role: Role.CustomerAccountAdmin,
          access: 'CustomerAccount',
          status: 'effective',
          registrationDate: '1970-01-01',
          isActiveContract: false,
          subscription: [
            {
              mboId: 6789,
              mboName: 'Mobilfunk-Postpaid',
              partyRoleId: 7890,
              ban: 123456781,
              msisdn: 1234567891233,
              marketCode: 'MMC',
              subType: 'EK',
              role: Role.SubscriptionAdmin,
              access: 'AccessSubscription',
              status: 'effective',
              registrationDate: '1970-01-01',
              isActiveContract: false,
              isFemtoSubscription: false
            }
          ]
        }
      },
      {
        contract: {
          subscription: [
            {
              mboId: 890,
              mboName: 'Mobilfunk-Business',
              partyRoleId: 7890,
              ban: 123456782,
              msisdn: 123456789122,
              marketCode: 'MMC',
              subType: 'TN',
              role: Role.SubscriptionAdmin,
              access: 'AccessSubscription',
              status: 'effective',
              registrationDate: '1970-01-01',
              isActiveContract: true,
              isFemtoSubscription: false
            }
          ]
        }
      },
      {
        contract: {
          subscription: [
            {
              mboId: 112,
              partyRoleId: 7890,
              ban: 123456783,
              msisdn: 123456789222,
              marketCode: 'MMO',
              subType: 'TN',
              role: Role.SubscriptionAdmin,
              access: 'AccessSubscription',
              status: 'effective',
              registrationDate: '1970-01-01',
              isActiveContract: false,
              isFemtoSubscription: false
            }
          ]
        }
      }
    ],
    fixednet: [
      {
        mboId: 901,
        partyRoleId: 7890,
        acn: '115',
        uoi: '116',
        subType: 'DSL',
        role: Role.SubscriptionAdmin,
        access: 'DSLSubaccountSubscription',
        status: 'effective',
        registrationDate: '1970-01-01',
        isActiveContract: true
      }
    ],
    cable: [
      {
        id: '1234',
        isActiveContract: true,
        isDefaultContract: true,
        hasCableMail: false,
        subscription: [
          {
            id: '1234',
            activatedDate: '1970-01-01',
            type: 'KIP',
            displayName: 'Red Internet 25 Cable'
          }
        ]
      }
    ],
    unitymedia: [
      {
        id: 2345,
        accountNumber: 117,
        name: 'Kabel-Vertrag-Unity.Media',
        region: 'NRW',
        partyRoleId: 0,
        subType: 'Unity-Media',
        role: 'AD',
        access: 'Residential',
        status: 'activated',
        accessGroups: ['DE_PROFILE', 'DE_ORION', 'DE_ADMIN'],
        registrationDate: '2021-03-26',
        isActiveContract: true,
        isDefaultContract: true,
        subscription: [
          { code: 'A', name: 'Analog TV', status: 8 },
          { code: 'T', name: 'Telefon', status: 8 },
          { code: 'D', name: 'Digital TV', status: 1 },
          { code: 'I', name: 'Internet', status: 8 },
          { code: 'M', name: 'Mobilfunk', status: 8 }
        ]
      }
    ]
  }
}

const userDataWithAllProductsMappedToSubscriptions = {
  mobileSubscriptions: [
    {
      itemTitle: 'Mobilfunk-Postpaid',
      itemSubTitle: '1234567891233',
      itemImage: 'mobile_image',
      id: '1234567891233',
      type: 'mobile',
      marketCode: 'MMC',
      ban: 123456781,
      hasBanAccess: true,
      mboName: 'Mobilfunk-Postpaid',
      mboId: 6789,
      contractMboId: 3456,
      contractRole: Role.CustomerAccountAdmin
    },
    {
      itemTitle: 'Mobilfunk-Business',
      itemSubTitle: '123456789122',
      itemImage: 'mobile_image',
      id: '123456789122',
      type: 'mobile',
      marketCode: 'MMC',
      ban: 123456782,
      hasBanAccess: false,
      mboName: 'Mobilfunk-Business',
      mboId: 890,
      contractMboId: undefined,
      contractRole: undefined
    },
    {
      itemTitle: 'Mobilfunk',
      itemSubTitle: '123456789222',
      itemImage: 'mobile_image',
      id: '123456789222',
      type: 'mobile',
      marketCode: 'MMO',
      ban: 123456783,
      hasBanAccess: false,
      mboName: undefined,
      mboId: 112,
      contractMboId: undefined,
      contractRole: undefined
    }
  ],
  fixednetSubscriptions: [
    {
      itemTitle: 'Internet_and_Festnetz',
      itemSubTitle: 'kundennummer: 115',
      itemImage: 'router_image',
      id: '115',
      type: 'fixednet'
    }
  ],
  cableSubscriptions: [
    {
      itemTitle: 'Red Internet 25 Cable',
      itemSubTitle: 'kundennummer: 1234',
      itemImage: 'router_image',
      id: '1234',
      type: 'cable'
    }
  ],
  unitymediaSubscriptions: [
    {
      itemTitle: 'Kabel-Vertrag-Unity.Media',
      itemSubTitle: 'kundennummer: 117',
      itemImage: 'unityMedia_image',
      id: '117',
      type: 'unitymedia',
      region: 'NRW'
    }
  ]
}

const limitedUsage = {
  container: 'Daten',
  usage: [
    {
      name: '100GB Treue-Geschenk',
      description: '100GB Treue-Geschenk',
      type: 'limited',
      rollOverIndicator: false,
      upgradable: true,
      limitStatus: false,
      isLimitedMember: false,
      remaining: '102400',
      used: '0',
      total: '102400',
      unitOfMeasure: 'MB',
      lastUpdateDate: '2021-12-08T10:08:31',
      endDate: null,
      code: '-1'
    }
  ]
}

const unlimitedUsage = {
  container: 'Daten',
  usage: [
    {
      name: '100GB Treue-Geschenk',
      description: '100GB Treue-Geschenk',
      type: 'limited',
      rollOverIndicator: false,
      upgradable: true,
      limitStatus: false,
      isLimitedMember: false,
      remaining: '102400',
      used: '0',
      total: '102400000',
      unitOfMeasure: 'MB',
      lastUpdateDate: '2021-12-08T10:08:31',
      endDate: null,
      code: '-1'
    }
  ]
}

const limitedUsageVoice = {
  container: 'Minuten',
  usage: [
    {
      name: 'MinutenPaket EU 600',
      description: 'MinutenPaket EU 600',
      type: 'limited',
      rollOverIndicator: false,
      upgradable: false,
      limitStatus: false,
      isLimitedMember: false,
      remaining: '600',
      used: '0',
      total: '600',
      unitOfMeasure: 'Minuten',
      lastUpdateDate: null,
      endDate: null
    }
  ]
}

const unlimitedUsageVoice = {
  container: 'Minuten',
  usage: [
    {
      name: 'Nationale Flat in alle deutschen Netze und im EU-Ausland',
      description: 'Nationale Flat in alle deutschen Netze und im EU-Ausland',
      type: 'limited',
      rollOverIndicator: false,
      upgradable: false,
      limitStatus: false,
      isLimitedMember: false,
      remaining: '0',
      used: '0',
      total: '0',
      unitOfMeasure: 'Minuten',
      lastUpdateDate: null,
      endDate: null
    }
  ]
}

const mappedLimitedBucket = [
  {
    _id: '1234_daten_100GB Treue-Geschenk',
    title: '100GB Treue-Geschenk',
    usageType: 'daten',
    remaining: '100',
    remainingUnit: 'GB',
    remainingValuePercentage: 100,
    billCycleEndDate: '2022-01-04',
    formattedTotal: {
      stringValue: '100',
      unit: 'GB',
      value: 100
    },
    isUnlimited: false
  }
]

const mappedUnlimitedBucket = [
  {
    _id: '1234_daten_100GB Treue-Geschenk',
    title: '100GB Treue-Geschenk',
    usageType: 'daten',
    remaining: 'unlimited',
    remainingUnit: '',
    remainingValuePercentage: 100,
    billCycleEndDate: '2022-01-04',
    formattedTotal: {
      stringValue: '100.000',
      unit: 'GB',
      value: 100000
    },
    isUnlimited: true
  }
]

const mappedUnlimitedBucketVoice = [
  {
    _id: '1234_minuten_Nationale Flat in alle deutschen Netze und im EU-Ausland',
    title: 'Nationale Flat in alle deutschen Netze und im EU-Ausland',
    usageType: 'minuten',
    remaining: 'unlimited',
    remainingUnit: '',
    remainingValuePercentage: 100,
    billCycleEndDate: '2022-01-04',
    formattedTotal: {
      stringValue: '0',
      unit: 'mins',
      value: 0
    },
    isUnlimited: true
  }
]

const mappedLimitedBucketVoice = [
  {
    _id: '1234_minuten_MinutenPaket EU 600',
    title: 'MinutenPaket EU 600',
    usageType: 'minuten',
    remaining: '600',
    remainingUnit: 'mins',
    remainingValuePercentage: 100,
    billCycleEndDate: '2022-01-04',
    formattedTotal: {
      stringValue: '600',
      unit: 'mins',
      value: 600
    },
    isUnlimited: false
  }
]

const subscriptionUnbilledUsageData = {
  serviceUsageVBO: {
    accountId: '123456789',
    type: 'mobile',
    billDetails: {
      billCycleStartDate: '2021-12-28',
      billCycleEndDate: '2022-01-27',
      currentSummary: null,
      lastSummary: null
    },
    usageAccounts: [
      {
        details: {
          msisdn: '1234567891234',
          marketCode: 'MMC',
          amount: '0.00',
          unitOfMeasure: 'EUR',
          billDate: '2021-12-28',
          lastUpdateDate: null
        },
        productSpecification: {
          tariffDetails: {
            name: 'Vodafone Red 2019 XS ohne Smartphone',
            code: 'ABCDE',
            description: 'Red 5 Tariff 2018'
          }
        },
        paymentGroup: [
          {
            description: 'Telefonieren',
            payment: [
              {
                category: 'Aus dem deutschen Vodafone-Netz',
                amount: '0.00',
                previousAmount: '0.00',
                unitOfMeasure: 'EUR',
                startDate: '2021-12-28',
                endDate: '2022-01-27',
                lastUpdateDate: null
              },
              {
                category: 'Im Ausland',
                amount: '0.00',
                previousAmount: '0.00',
                unitOfMeasure: 'EUR',
                startDate: '2021-12-28',
                endDate: '2022-01-27',
                lastUpdateDate: null
              }
            ]
          },
          {
            description: 'Daten/SMS/MMS/Fax',
            payment: [
              {
                category: 'Aus dem deutschen Vodafone-Netz',
                amount: '0.00',
                previousAmount: '0.00',
                unitOfMeasure: 'EUR',
                startDate: '2021-12-28',
                endDate: '2022-01-27',
                lastUpdateDate: null
              },
              {
                category: 'Im Ausland',
                amount: '0.00',
                previousAmount: '0.00',
                unitOfMeasure: 'EUR',
                startDate: '2021-12-28',
                endDate: '2022-01-27',
                lastUpdateDate: null
              }
            ]
          }
        ],
        usageGroup: [
          {
            container: 'MMS',
            usage: [
              {
                name: 'Nationale Flat in alle deutschen Netze und im EU-Ausland',
                description:
                  'Nationale Flat in alle deutschen Netze und im EU-Ausland',
                type: 'limited',
                rollOverIndicator: false,
                upgradable: false,
                limitStatus: false,
                isLimitedMember: false,
                remaining: '0',
                used: '0',
                total: '0',
                unitOfMeasure: 'MMS',
                lastUpdateDate: null,
                endDate: null
              },
              {
                name: 'Nationale in alle deutschen Netze und im EU-Ausland',
                description:
                  'Nationale in alle deutschen Netze und im EU-Ausland',
                type: 'unlimited',
                rollOverIndicator: false,
                upgradable: false,
                limitStatus: false,
                isLimitedMember: false,
                remaining: '0',
                used: '0',
                total: '0',
                unitOfMeasure: 'MMS',
                lastUpdateDate: null,
                endDate: null
              },
              {
                name: 'Nationale in alle deutschen Netze und im EU-Ausland',
                description:
                  'Nationale in alle deutschen Netze und im EU-Ausland',
                type: 'limited',
                rollOverIndicator: false,
                upgradable: false,
                limitStatus: false,
                isLimitedMember: false,
                remaining: '100',
                used: '200',
                total: '300',
                unitOfMeasure: 'MMS',
                lastUpdateDate: null,
                endDate: null
              }
            ]
          },
          {
            container: 'SMS',
            usage: [
              {
                name: 'Nationale Flat in alle deutschen Netze und im EU-Ausland',
                description:
                  'Nationale Flat in alle deutschen Netze und im EU-Ausland',
                type: 'limited',
                rollOverIndicator: false,
                upgradable: false,
                limitStatus: false,
                isLimitedMember: false,
                remaining: '0',
                used: '0',
                total: '0',
                unitOfMeasure: 'SMS',
                lastUpdateDate: null,
                endDate: null
              },
              {
                name: 'Nationale in alle deutschen Netze und im EU-Ausland',
                description:
                  'Nationale in alle deutschen Netze und im EU-Ausland',
                type: 'unlimited',
                rollOverIndicator: false,
                upgradable: false,
                limitStatus: false,
                isLimitedMember: false,
                remaining: '0',
                used: '0',
                total: '0',
                unitOfMeasure: 'SMS',
                lastUpdateDate: null,
                endDate: null
              },
              {
                name: 'Nationale in alle deutschen Netze und im EU-Ausland',
                description:
                  'Nationale in alle deutschen Netze und im EU-Ausland',
                type: 'limited',
                rollOverIndicator: false,
                upgradable: false,
                limitStatus: false,
                isLimitedMember: false,
                remaining: '50',
                used: '450',
                total: '500',
                unitOfMeasure: 'SMS',
                lastUpdateDate: null,
                endDate: null
              }
            ]
          },
          {
            container: 'Minuten',
            usage: [
              {
                name: 'Nationale Flat in alle deutschen Netze und im EU-Ausland',
                description:
                  'Nationale Flat in alle deutschen Netze und im EU-Ausland',
                type: 'limited',
                rollOverIndicator: false,
                upgradable: false,
                limitStatus: false,
                isLimitedMember: false,
                remaining: '0',
                used: '0',
                total: '0',
                unitOfMeasure: 'Minuten',
                lastUpdateDate: null,
                endDate: null
              }
            ]
          },
          {
            container: 'Daten',
            usage: [
              {
                name: 'Datenvolumen Inland & EU',
                description: 'Datenvolumen Inland & EU',
                type: 'limited',
                rollOverIndicator: false,
                upgradable: true,
                isLimitedMember: false,
                remaining: '4096',
                used: '0',
                total: '6144',
                unitOfMeasure: 'MB',
                lastUpdateDate: '2022-01-16T14:56:22',
                endDate: null,
                code: '-1'
              },
              {
                name: 'Vodafone Pässe',
                description: 'Vodafone Pässe',
                type: 'limited',
                rollOverIndicator: false,
                upgradable: true,
                isLimitedMember: false,
                remaining: '115343360',
                used: '0',
                total: '115343360',
                unitOfMeasure: 'MB',
                lastUpdateDate: '2022-01-16T14:56:22',
                endDate: null,
                code: '-2'
              },
              {
                name: 'Vodafone Pass im EU-Ausland',
                description: 'Vodafone Pass im EU-Ausland',
                type: 'limited',
                rollOverIndicator: false,
                upgradable: true,
                isLimitedMember: false,
                remaining: '55296',
                used: '0',
                total: '61440',
                unitOfMeasure: 'MB',
                lastUpdateDate: '2022-01-16T14:56:22',
                endDate: null,
                code: '-3'
              },
              {
                name: 'GigaDepot-Datenvolumen Inland & EU',
                description: 'GigaDepot-Datenvolumen Inland & EU',
                type: 'limited',
                rollOverIndicator: true,
                upgradable: false,
                limitStatus: false,
                isLimitedMember: false,
                remaining: '4096',
                used: '0',
                total: '10240',
                unitOfMeasure: 'MB',
                lastUpdateDate: '2022-01-16T14:56:22',
                endDate: null,
                code: '-5'
              }
            ]
          }
        ]
      }
    ]
  }
}

const subscriptionUnbilledUsageDataMapped = [
  {
    _id: '890_daten_GigaDepot-Datenvolumen Inland & EU',
    title: 'Mobilfunk-Business GigaDepot-Datenvolumen Inland & EU',
    usageType: 'daten',
    isUnlimited: false,
    billCycleEndDate: '2022-01-27',
    formattedTotal: { value: 10, unit: 'GB', stringValue: '10' },
    remaining: '4',
    remainingUnit: 'GB',
    remainingValuePercentage: 40
  },
  {
    _id: '890_daten_Datenvolumen Inland & EU',
    title: 'Mobilfunk-Business Datenvolumen Inland & EU',
    usageType: 'daten',
    isUnlimited: false,
    billCycleEndDate: '2022-01-27',
    formattedTotal: { value: 6, unit: 'GB', stringValue: '6' },
    remaining: '4',
    remainingUnit: 'GB',
    remainingValuePercentage: 66.66666666666666
  },
  {
    _id: '890_sms_Nationale in alle deutschen Netze und im EU-Ausland',
    title:
      'Mobilfunk-Business Nationale in alle deutschen Netze und im EU-Ausland',
    usageType: 'sms',
    isUnlimited: false,
    billCycleEndDate: '2022-01-27',
    formattedTotal: { value: 500, unit: 'SMS', stringValue: '500' },
    remaining: '50',
    remainingUnit: 'SMS',
    remainingValuePercentage: 10
  },
  {
    _id: '890_sms_Nationale in alle deutschen Netze und im EU-Ausland',
    title:
      'Mobilfunk-Business Nationale in alle deutschen Netze und im EU-Ausland',
    usageType: 'sms',
    isUnlimited: true,
    billCycleEndDate: '2022-01-27',
    formattedTotal: { value: 0, unit: 'SMS', stringValue: '0' },
    remaining: 'unlimited',
    remainingUnit: '',
    remainingValuePercentage: 100
  },
  {
    _id: '890_sms_Nationale Flat in alle deutschen Netze und im EU-Ausland',
    title:
      'Mobilfunk-Business Nationale Flat in alle deutschen Netze und im EU-Ausland',
    usageType: 'sms',
    isUnlimited: true,
    billCycleEndDate: '2022-01-27',
    formattedTotal: { value: 0, unit: 'SMS', stringValue: '0' },
    remaining: 'unlimited',
    remainingUnit: '',
    remainingValuePercentage: 100
  },
  {
    _id: '890_mms_Nationale in alle deutschen Netze und im EU-Ausland',
    title:
      'Mobilfunk-Business Nationale in alle deutschen Netze und im EU-Ausland',
    usageType: 'mms',
    isUnlimited: false,
    billCycleEndDate: '2022-01-27',
    formattedTotal: { value: 300, unit: 'MMS', stringValue: '300' },
    remaining: '100',
    remainingUnit: 'MMS',
    remainingValuePercentage: 33.33333333333333
  },
  {
    _id: '890_mms_Nationale in alle deutschen Netze und im EU-Ausland',
    title:
      'Mobilfunk-Business Nationale in alle deutschen Netze und im EU-Ausland',
    usageType: 'mms',
    isUnlimited: true,
    billCycleEndDate: '2022-01-27',
    formattedTotal: { value: 0, unit: 'MMS', stringValue: '0' },
    remaining: 'unlimited',
    remainingUnit: '',
    remainingValuePercentage: 100
  },
  {
    _id: '890_mms_Nationale Flat in alle deutschen Netze und im EU-Ausland',
    title:
      'Mobilfunk-Business Nationale Flat in alle deutschen Netze und im EU-Ausland',
    usageType: 'mms',
    isUnlimited: true,
    billCycleEndDate: '2022-01-27',
    formattedTotal: { value: 0, unit: 'MMS', stringValue: '0' },
    remaining: 'unlimited',
    remainingUnit: '',
    remainingValuePercentage: 100
  },
  {
    _id: '890_minuten_Nationale Flat in alle deutschen Netze und im EU-Ausland',
    title:
      'Mobilfunk-Business Nationale Flat in alle deutschen Netze und im EU-Ausland',
    usageType: 'minuten',
    isUnlimited: true,
    billCycleEndDate: '2022-01-27',
    formattedTotal: { value: 0, unit: 'mins', stringValue: '0' },
    remaining: 'unlimited',
    remainingUnit: '',
    remainingValuePercentage: 100
  }
]

const unbilledUsageMappedDataTiles = [
  {
    _id: '6789_daten_Datenvolumen Inland & EU',
    title: 'Mobilfunk-Postpaid Datenvolumen Inland & EU',
    usageType: 'daten',
    remaining: '4',
    remainingUnit: 'GB',
    remainingValuePercentage: 66.66666666666666,
    billCycleEndDate: '2022-01-27',
    formattedTotal: {
      stringValue: '6',
      unit: 'GB',
      value: 6
    },
    isUnlimited: false
  },
  {
    _id: '6789_daten_GigaDepot-Datenvolumen Inland & EU',
    title: 'Mobilfunk-Postpaid GigaDepot-Datenvolumen Inland & EU',
    usageType: 'daten',
    remaining: '4',
    remainingUnit: 'GB',
    remainingValuePercentage: 40,
    billCycleEndDate: '2022-01-27',
    formattedTotal: {
      stringValue: '10',
      unit: 'GB',
      value: 10
    },
    isUnlimited: false
  }
]

const unbilledUsageMappedVoiceTiles = [
  {
    _id: '6789_minuten_Nationale Flat in alle deutschen Netze und im EU-Ausland',
    title: `Mobilfunk-Postpaid Nationale Flat in alle deutschen Netze und im EU-Ausland`,
    usageType: 'minuten',
    remaining: 'unlimited',
    remainingUnit: '',
    remainingValuePercentage: 100,
    billCycleEndDate: '2022-01-27',
    formattedTotal: {
      stringValue: '0',
      unit: 'mins',
      value: 0
    },
    isUnlimited: true
  }
]

const unbilledUsageMappedSMSTiles = [
  {
    _id: '6789_sms_Nationale Flat in alle deutschen Netze und im EU-Ausland',
    title: `Mobilfunk-Postpaid Nationale Flat in alle deutschen Netze und im EU-Ausland`,
    usageType: 'sms',
    remaining: 'unlimited',
    remainingUnit: '',
    remainingValuePercentage: 100,
    billCycleEndDate: '2022-01-27',
    formattedTotal: {
      stringValue: '0',
      unit: 'SMS',
      value: 0
    },
    isUnlimited: true
  },
  {
    _id: '6789_sms_Nationale in alle deutschen Netze und im EU-Ausland',
    title: `Mobilfunk-Postpaid Nationale in alle deutschen Netze und im EU-Ausland`,
    usageType: 'sms',
    remaining: 'unlimited',
    remainingUnit: '',
    remainingValuePercentage: 100,
    billCycleEndDate: '2022-01-27',
    formattedTotal: {
      stringValue: '0',
      unit: 'SMS',
      value: 0
    },
    isUnlimited: true
  },
  {
    _id: '6789_sms_Nationale in alle deutschen Netze und im EU-Ausland',
    title: `Mobilfunk-Postpaid Nationale in alle deutschen Netze und im EU-Ausland`,
    usageType: 'sms',
    remaining: '50',
    remainingUnit: 'SMS',
    remainingValuePercentage: 10,
    billCycleEndDate: '2022-01-27',
    formattedTotal: {
      stringValue: '500',
      unit: 'SMS',
      value: 500
    },
    isUnlimited: false
  }
]

const unbilledUsageMappedMMSTiles = [
  {
    _id: '6789_mms_Nationale Flat in alle deutschen Netze und im EU-Ausland',
    title: `Mobilfunk-Postpaid Nationale Flat in alle deutschen Netze und im EU-Ausland`,
    usageType: 'mms',
    remaining: 'unlimited',
    remainingUnit: '',
    remainingValuePercentage: 100,
    billCycleEndDate: '2022-01-27',
    formattedTotal: {
      stringValue: '0',
      unit: 'MMS',
      value: 0
    },
    isUnlimited: true
  },
  {
    _id: '6789_mms_Nationale in alle deutschen Netze und im EU-Ausland',
    title: `Mobilfunk-Postpaid Nationale in alle deutschen Netze und im EU-Ausland`,
    usageType: 'mms',
    remaining: 'unlimited',
    remainingUnit: '',
    remainingValuePercentage: 100,
    billCycleEndDate: '2022-01-27',
    formattedTotal: {
      stringValue: '0',
      unit: 'MMS',
      value: 0
    },
    isUnlimited: true
  },
  {
    _id: '6789_mms_Nationale in alle deutschen Netze und im EU-Ausland',
    title: `Mobilfunk-Postpaid Nationale in alle deutschen Netze und im EU-Ausland`,
    usageType: 'mms',
    remaining: '100',
    remainingUnit: 'MMS',
    remainingValuePercentage: 33.33333333333333,
    billCycleEndDate: '2022-01-27',
    formattedTotal: {
      stringValue: '300',
      unit: 'MMS',
      value: 300
    },
    isUnlimited: false
  }
]

const unbilledUsageMappedTiles = [
  ...unbilledUsageMappedMMSTiles,
  ...unbilledUsageMappedSMSTiles,
  ...unbilledUsageMappedVoiceTiles,
  ...unbilledUsageMappedDataTiles
]

export {
  userDataOriginalResponse,
  limitedUsage,
  unlimitedUsage,
  mappedLimitedBucket,
  mappedUnlimitedBucket,
  unlimitedUsageVoice,
  limitedUsageVoice,
  mappedLimitedBucketVoice,
  mappedUnlimitedBucketVoice,
  userDataWithAllProducts,
  userDataWithAllProductsMappedToSubscriptions,
  smsLoginUserData,
  subscriptionUnbilledUsageData,
  unbilledUsageMappedTiles,
  unbilledUsageMappedDataTiles,
  unbilledUsageMappedVoiceTiles,
  subscriptionUnbilledUsageDataMapped
}
